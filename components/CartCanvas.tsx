'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { HOTSPOTS_DATA, CONTACT_INFO } from '@/lib/data';
import { HotspotInfo } from '@/types';

/* =========================================================================
   HOW TO SWAP IN YOUR OWN .GLB MODEL:
   1. Place your 3D model file (e.g., fruitopia_cart.glb) into /public/
   2. Change USE_EXTERNAL_GLB to true below
   3. Update GLB_MODEL_PATH to '/fruitopia_cart.glb'
   4. In Blender, name your dishes 'Smoothie', 'Toast', 'Soup', 'Buttermilk'
      to automatically attach clickable pulsing hotspots!
   ========================================================================= */
const USE_EXTERNAL_GLB = false;
const GLB_MODEL_PATH = '/fruitopia_cart.glb';

interface CartCanvasProps {
  onSelectHotspot: (item: HotspotInfo) => void;
}

export default function CartCanvas({ onSelectHotspot }: CartCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // 1. WebGL Support Check
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 2. Scene & Fog
    const scene = new THREE.Scene();
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    scene.fog = new THREE.FogExp2(isDark ? 0x11170f : 0xf4eedf, 0.04);

    // 3. Camera
    const defaultCam = { x: 3.8, y: 3.2, z: 5.2 };
    const defaultTarget = { x: 0, y: 1.3, z: 0 };
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(defaultCam.x, defaultCam.y, defaultCam.z);

    // 4. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 5. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(defaultTarget.x, defaultTarget.y, defaultTarget.z);
    controls.minDistance = 3.5;
    controls.maxDistance = 11.0;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.9;

    let idleTimer: NodeJS.Timeout;
    const handleUserInteraction = () => {
      controls.autoRotate = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        controls.autoRotate = true;
      }, 3500);
    };

    renderer.domElement.addEventListener('pointerdown', handleUserInteraction);
    renderer.domElement.addEventListener('wheel', handleUserInteraction, { passive: true });

    // 6. Lighting
    const hemiLight = new THREE.HemisphereLight(0xfff7ea, 0x8aa868, 0.85);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    dirLight.position.set(6, 12, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 30;
    dirLight.shadow.camera.left = -5;
    dirLight.shadow.camera.right = 5;
    dirLight.shadow.camera.top = 5;
    dirLight.shadow.camera.bottom = -5;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xdff0c7, 0.5);
    fillLight.position.set(-6, 6, -5);
    scene.add(fillLight);

    const warmPoint = new THREE.PointLight(0xffb84d, 1.0, 6);
    warmPoint.position.set(0, 2.3, 0.4);
    scene.add(warmPoint);

    (window as any).updateSceneThemeColors = (theme: string) => {
      const dark = theme === 'dark';
      if (scene.fog) scene.fog.color.setHex(dark ? 0x11170f : 0xf4eedf);
      hemiLight.color.setHex(dark ? 0xaad682 : 0xfff7ea);
      hemiLight.groundColor.setHex(dark ? 0x0f180d : 0x8aa868);
      hemiLight.intensity = dark ? 0.65 : 0.85;
      dirLight.intensity = dark ? 1.0 : 1.2;
    };

    // 7. Interactive Hotspot Registry
    const interactiveHotspots: Array<{ id: string; ringMesh: THREE.Mesh; pulseOffset: number }> = [];

    const attachHotspot = (parentGroup: THREE.Object3D, hotspotId: string) => {
      const markerGroup = new THREE.Group();
      markerGroup.position.set(0, 0.28, 0);

      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x34d399 })
      );

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.06, 0.09, 24),
        new THREE.MeshBasicMaterial({ color: 0x7da847, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
      );
      ring.rotation.x = Math.PI / 2;

      markerGroup.add(bead, ring);
      parentGroup.add(markerGroup);

      bead.userData = { isHotspot: true, id: hotspotId };
      parentGroup.userData = { isHotspot: true, id: hotspotId };

      interactiveHotspots.push({
        id: hotspotId,
        ringMesh: ring,
        pulseOffset: Math.random() * Math.PI,
      });
    };

    // 8. Build Procedural Food Cart
    const buildCart = () => {
      const cart = new THREE.Group();

      const avocadoGreenMat = new THREE.MeshStandardMaterial({ color: 0x4f7828, roughness: 0.45, metalness: 0.1 });
      const creamMat = new THREE.MeshStandardMaterial({ color: 0xfff9ea, roughness: 0.6 });
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x8d5c38, roughness: 0.7, metalness: 0.05 });
      const metalMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.25, metalness: 0.85 });
      const brassMat = new THREE.MeshStandardMaterial({ color: 0xd9a842, roughness: 0.35, metalness: 0.7 });

      // Cabinet
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.15, 1.4), avocadoGreenMat);
      cabinet.position.y = 0.95;
      cabinet.castShadow = true;
      cabinet.receiveShadow = true;
      cart.add(cabinet);

      // Inlay panels
      const pGeo = new THREE.BoxGeometry(0.95, 0.8, 0.04);
      const pL = new THREE.Mesh(pGeo, creamMat);
      pL.position.set(-0.55, 0.95, 0.71);
      const pR = new THREE.Mesh(pGeo, creamMat);
      pR.position.set(0.55, 0.95, 0.71);
      cart.add(pL, pR);

      // Wooden Countertop
      const counter = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 1.65), woodMat);
      counter.position.y = 1.55;
      counter.castShadow = true;
      counter.receiveShadow = true;
      cart.add(counter);

      // Wheels
      const tireGeo = new THREE.TorusGeometry(0.55, 0.065, 16, 40);
      const rimGeo = new THREE.TorusGeometry(0.5, 0.02, 12, 32);
      const hubGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 16);
      hubGeo.rotateZ(Math.PI / 2);

      [-0.85, 0.85].forEach((xPos) => {
        const wheel = new THREE.Group();
        wheel.position.set(xPos, 0.55, 0.8);
        const tire = new THREE.Mesh(tireGeo, metalMat);
        tire.castShadow = true;
        const rim = new THREE.Mesh(rimGeo, brassMat);
        const hub = new THREE.Mesh(hubGeo, brassMat);
        wheel.add(tire, rim, hub);

        for (let i = 0; i < 8; i++) {
          const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.95), metalMat);
          spoke.rotation.z = (i * Math.PI) / 8;
          wheel.add(spoke);
        }
        cart.add(wheel);
      });

      // Awning Canopy & Posts
      const poleGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.5, 12);
      [[-1.25, 0.72], [1.25, 0.72], [-1.25, -0.72], [1.25, -0.72]].forEach(([x, z]) => {
        const pole = new THREE.Mesh(poleGeo, brassMat);
        pole.position.set(x, 2.3, z);
        pole.castShadow = true;
        cart.add(pole);
      });

      // Striped Awning Canvas Texture
      const stripeCanvas = document.createElement('canvas');
      stripeCanvas.width = 512;
      stripeCanvas.height = 512;
      const sCtx = stripeCanvas.getContext('2d')!;
      for (let i = 0; i < 10; i++) {
        sCtx.fillStyle = i % 2 === 0 ? '#4F7828' : '#FFF9EA';
        sCtx.fillRect((i * 512) / 10, 0, 512 / 10, 512);
      }
      const stripeTex = new THREE.CanvasTexture(stripeCanvas);
      stripeTex.wrapS = THREE.RepeatWrapping;
      stripeTex.wrapT = THREE.RepeatWrapping;

      const awningMat = new THREE.MeshStandardMaterial({ map: stripeTex, roughness: 0.6, side: THREE.DoubleSide });
      const awning = new THREE.Group();
      awning.position.set(0, 3.05, 0);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.14, 1.8), awningMat);
      roof.castShadow = true;
      const valance = new THREE.Mesh(new THREE.BoxGeometry(2.82, 0.28, 0.04), awningMat);
      valance.position.set(0, -0.16, 0.9);
      awning.add(roof, valance, valance.clone().translateZ(-1.8));
      cart.add(awning);

      // Chalkboard Menu Sign
      const signCanvas = document.createElement('canvas');
      signCanvas.width = 512;
      signCanvas.height = 160;
      const bCtx = signCanvas.getContext('2d')!;
      bCtx.fillStyle = '#1c2419';
      bCtx.fillRect(0, 0, 512, 160);
      bCtx.strokeStyle = '#8d5c38';
      bCtx.lineWidth = 10;
      bCtx.strokeRect(5, 5, 502, 150);
      bCtx.fillStyle = '#FAF6ED';
      bCtx.font = 'bold 44px Georgia, serif';
      bCtx.textAlign = 'center';
      bCtx.fillText('🥑 Fruitopia 🥑', 256, 68);
      bCtx.fillStyle = '#86B84A';
      bCtx.font = '22px sans-serif';
      bCtx.fillText('Fresh & Wholesome • Ashok Nagar', 256, 115);

      const signBoard = new THREE.Mesh(
        new THREE.BoxGeometry(1.65, 0.55, 0.05),
        new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(signCanvas), roughness: 0.5 })
      );
      signBoard.position.set(0, 2.7, 0.72);
      signBoard.castShadow = true;
      cart.add(signBoard);

      // Hanging Lights
      const bulbs = new THREE.Group();
      bulbs.position.set(0, 2.85, 0.8);
      const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffe28a, emissive: 0xffba3b, emissiveIntensity: 0.9 });
      for (let i = -4; i <= 4; i++) {
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), bulbMat);
        bulb.position.set(i * 0.28, -Math.cos((i / 4) * (Math.PI / 2)) * 0.08, 0);
        bulbs.add(bulb);
      }
      cart.add(bulbs);

      // Items on Counter
      // 1. Smoothie Jar
      const smoothie = new THREE.Group();
      smoothie.position.set(...HOTSPOTS_DATA.smoothie.position);
      const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.88, transparent: true, roughness: 0.1 });
      const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.35, 16), glassMat);
      const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.28, 16), new THREE.MeshStandardMaterial({ color: 0x82b249, roughness: 0.4 }));
      liquid.position.y = -0.02;
      const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.45, 8), creamMat);
      straw.position.set(0.04, 0.14, 0);
      straw.rotation.z = -0.25;
      smoothie.add(jar, liquid, straw);
      attachHotspot(smoothie, 'smoothie');
      cart.add(smoothie);

      // 2. Toast
      const toast = new THREE.Group();
      toast.position.set(...HOTSPOTS_DATA.toast.position);
      const bread = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.22), new THREE.MeshStandardMaterial({ color: 0xa87747, roughness: 0.9 }));
      bread.position.y = 0.04;
      const guac = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.03, 0.2), new THREE.MeshStandardMaterial({ color: 0x6e9c35, roughness: 0.8 }));
      guac.position.y = 0.075;
      const salsa = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.1, 12), new THREE.MeshStandardMaterial({ color: 0xd94826 }));
      salsa.position.set(0.14, 0.06, 0.08);
      toast.add(new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.03, 0.35), woodMat), bread, guac, salsa);
      attachHotspot(toast, 'toast');
      cart.add(toast);

      // 3. Soup Pot
      const soup = new THREE.Group();
      soup.position.set(...HOTSPOTS_DATA.soup.position);
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.26, 20), new THREE.MeshStandardMaterial({ color: 0xd26848, roughness: 0.3, metalness: 0.2 }));
      const soupSurf = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.02, 20), new THREE.MeshStandardMaterial({ color: 0x4f7828 }));
      soupSurf.position.y = 0.1;
      const ladle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3), woodMat);
      ladle.position.set(0.06, 0.16, 0.06);
      ladle.rotation.z = 0.4;
      soup.add(pot, soupSurf, ladle);
      attachHotspot(soup, 'soup');
      cart.add(soup);

      // 4. Buttermilk Bottle
      const milk = new THREE.Group();
      milk.position.set(...HOTSPOTS_DATA.buttermilk.position);
      const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.34, 16), new THREE.MeshStandardMaterial({ color: 0xdfecc5, roughness: 0.3 }));
      const mint = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), new THREE.MeshStandardMaterial({ color: 0x2e6b18 }));
      mint.scale.set(1, 0.2, 1.8);
      mint.position.set(0, 0.18, 0);
      milk.add(bottle, mint);
      attachHotspot(milk, 'buttermilk');
      cart.add(milk);

      // Glass Jar with mini avocados
      const avoJar = new THREE.Group();
      avoJar.position.set(0, 1.72, -0.3);
      avoJar.add(new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.22, 0.45, 18), glassMat));
      const skinMat = new THREE.MeshStandardMaterial({ color: 0x2a3e14, roughness: 0.9 });
      for (let a = 0; a < 3; a++) {
        const mini = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), skinMat);
        mini.scale.set(1, 1.35, 1);
        mini.position.set((a - 1) * 0.11, -0.08 + (a % 2) * 0.06, 0);
        avoJar.add(mini);
      }
      cart.add(avoJar);

      return cart;
    };

    if (USE_EXTERNAL_GLB) {
      const loader = new GLTFLoader();
      loader.load(
        GLB_MODEL_PATH,
        (gltf) => {
          const model = gltf.scene;
          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.name.includes('Smoothie')) attachHotspot(child, 'smoothie');
              else if (child.name.includes('Toast')) attachHotspot(child, 'toast');
              else if (child.name.includes('Soup')) attachHotspot(child, 'soup');
              else if (child.name.includes('Buttermilk')) attachHotspot(child, 'buttermilk');
            }
          });
          scene.add(model);
        },
        undefined,
        () => {
          scene.add(buildCart());
        }
      );
    } else {
      scene.add(buildCart());
    }

    // 9. Particles System
    const particleCount = 45;
    const pGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array(particleCount * 3);
    const colArr = new Float32Array(particleCount * 3);
    const pCols = [new THREE.Color(0x7da847), new THREE.Color(0x9cd15b), new THREE.Color(0x4f7828), new THREE.Color(0xdbe8ba)];

    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * 8;
      posArr[i * 3 + 1] = 0.5 + Math.random() * 4.5;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = pCols[Math.floor(Math.random() * pCols.length)];
      colArr[i * 3] = c.r;
      colArr[i * 3 + 1] = c.g;
      colArr[i * 3 + 2] = c.b;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d')!;
    pCtx.beginPath();
    pCtx.arc(32, 32, 28, 0, Math.PI * 2);
    pCtx.fillStyle = '#ffffff';
    pCtx.fill();

    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.16,
        map: new THREE.CanvasTexture(pCanvas),
        transparent: true,
        opacity: 0.75,
        vertexColors: true,
        depthWrite: false,
      })
    );
    scene.add(particles);

    // Ground Soft Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(20, 30, 10, 0.45)');
    grad.addColorStop(0.6, 'rgba(20, 30, 10, 0.15)');
    grad.addColorStop(1, 'rgba(20, 30, 10, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 2.8),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    scene.add(shadowPlane);

    // 10. Zoom and Focus Logic
    const zoomToItem = (id: string) => {
      const item = HOTSPOTS_DATA[id];
      if (!item) return;

      controls.autoRotate = false;
      gsap.to(camera.position, {
        x: item.position[0] + 1.2,
        y: item.position[1] + 0.6,
        z: item.position[2] + 1.6,
        duration: 1.2,
        ease: 'power2.out',
      });
      gsap.to(controls.target, {
        x: item.position[0],
        y: item.position[1],
        z: item.position[2],
        duration: 1.2,
        ease: 'power2.out',
      });
      onSelectHotspot(item);
    };

    (window as any).focusItemOnKart = (id: string) => {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        zoomToItem(id);
      }, 400);
    };

    // 11. Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(scene.children, true);
      const isOver = hits.some((h) => h.object.userData && h.object.userData.isHotspot);
      container.style.cursor = isOver ? 'pointer' : 'grab';
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(scene.children, true);
      const hit = hits.find((h) => h.object.userData && h.object.userData.isHotspot);
      if (hit) {
        zoomToItem(hit.object.userData.id);
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('click', onClick);

    // 12. Reset Camera Button
    const resetCamera = () => {
      gsap.to(camera.position, { ...defaultCam, duration: 1.0, ease: 'power2.out' });
      gsap.to(controls.target, {
        ...defaultTarget,
        duration: 1.0,
        ease: 'power2.out',
        onComplete: () => {
          controls.autoRotate = true;
        },
      });
    };
    (window as any).resetKartCamera = resetCamera;

    // 13. Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();
      controls.update();

      // Particle wobble
      const pos = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] += Math.sin(elapsed * 1.5 + pos[i]) * 0.003;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsed * 0.03;

      // Pulse rings
      interactiveHotspots.forEach((h) => {
        const s = 1 + Math.sin(elapsed * 4 + h.pulseOffset) * 0.15;
        h.ringMesh.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
    };
    render();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('click', onClick);
      renderer.dispose();
    };
  }, [onSelectHotspot]);

  if (!webGLSupported) {
    return (
      <div className="w-full h-full bg-[var(--cream-card)] border border-[var(--border)] rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg">
        <span className="text-6xl mb-4">🥑 🛺 🥪</span>
        <h3 className="font-display text-2xl font-bold text-avocado-600 mb-2">Fruitopia Street Kart</h3>
        <p className="text-sm text-[var(--text-muted)] max-width-xs mb-6">
          Wholesome avocado delicacies crafted fresh daily at Ashok Nagar, Chennai.
        </p>
        <a href="#menu" className="bg-avocado-600 text-white font-semibold text-sm px-6 py-3 rounded-full">
          View Today's Menu
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full rounded-3xl touch-none" />

      {/* 3D Scene Controls HUD */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--nav-bg)] backdrop-blur-md border border-[var(--border)] shadow-md text-xs text-[var(--text-muted)] whitespace-nowrap select-none pointer-events-auto">
        <span className="text-avocado-600">✨</span>
        <span>
          <strong>Drag</strong> to rotate • <strong>Scroll</strong> to zoom • <strong>Click</strong> dishes
        </span>
        <button
          onClick={() => (window as any).resetKartCamera?.()}
          className="px-2.5 py-1 rounded-full bg-avocado-600/10 hover:bg-avocado-600 text-avocado-600 hover:text-white font-semibold text-xs transition-colors"
          title="Reset Camera View"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
