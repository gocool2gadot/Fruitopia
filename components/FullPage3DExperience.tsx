'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HOTSPOTS_DATA } from '@/lib/data';
import { HotspotInfo } from '@/types';
import HotspotModal from './HotspotModal';

/* =========================================================================
   FULL-PAGE 3D SCROLLABLE ANIMATED EXPERIENCE
   - Persistent 3D canvas spanning the entire viewport
   - Scroll-driven camera choreographies (Hero -> Menu -> About -> Location)
   - Procedural 3D cart + floating 3D avocado/leaf particle system
   - Interactive drag-to-rotate & idle gentle auto-rotate
   - Interactive raycasting & smooth camera zoom on dishes
   - Fallback to static render on low-end devices without WebGL
   - Ready for custom .glb model swap
   ========================================================================= */
const USE_EXTERNAL_GLB = false;
const GLB_MODEL_PATH = '/fruitopia_cart.glb';

export default function FullPage3DExperience() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Check WebGL support
    const checkWebGL = () => {
      try {
        const c = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 2. Scene & Fog
    const scene = new THREE.Scene();
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    scene.fog = new THREE.FogExp2(isDark ? 0x0f160d : 0xf7f3ea, 0.035);

    // 3. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.4, 2.6, 5.2);
    const lookAtTarget = new THREE.Vector3(0.5, 1.4, 0);

    // 4. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 5. Lighting
    const hemiLight = new THREE.HemisphereLight(0xfff8ee, 0x7da847, 0.85);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffaee, 1.25);
    dirLight.position.set(7, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xdff0c7, 0.55);
    fillLight.position.set(-6, 6, -5);
    scene.add(fillLight);

    const warmPoint = new THREE.PointLight(0xffb84d, 1.1, 7);
    warmPoint.position.set(0, 2.4, 0.5);
    scene.add(warmPoint);

    (window as any).updateSceneThemeColors = (theme: string) => {
      const dark = theme === 'dark';
      if (scene.fog) scene.fog.color.setHex(dark ? 0x0f160d : 0xf7f3ea);
      hemiLight.color.setHex(dark ? 0xaad682 : 0xfff8ee);
      hemiLight.groundColor.setHex(dark ? 0x0f180d : 0x7da847);
      hemiLight.intensity = dark ? 0.7 : 0.85;
      dirLight.intensity = dark ? 1.0 : 1.25;
    };

    // 6. Interactive Hotspots Registry
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
        new THREE.MeshBasicMaterial({ color: 0x7da847, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
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

    // 7. Procedural 3D Cart Construction
    let cartGroup = new THREE.Group();

    const buildCart = () => {
      const cart = new THREE.Group();

      const avocadoGreenMat = new THREE.MeshStandardMaterial({ color: 0x4f7828, roughness: 0.45, metalness: 0.1 });
      const creamMat = new THREE.MeshStandardMaterial({ color: 0xfff9ea, roughness: 0.6 });
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x8d5c38, roughness: 0.7, metalness: 0.05 });
      const metalMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.25, metalness: 0.85 });
      const brassMat = new THREE.MeshStandardMaterial({ color: 0xd9a842, roughness: 0.35, metalness: 0.7 });

      // Body cabinet
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

      // Bicycle Wheels
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

      // Striped Awning & Canopy
      const poleGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.5, 12);
      [[-1.25, 0.72], [1.25, 0.72], [-1.25, -0.72], [1.25, -0.72]].forEach(([x, z]) => {
        const pole = new THREE.Mesh(poleGeo, brassMat);
        pole.position.set(x, 2.3, z);
        pole.castShadow = true;
        cart.add(pole);
      });

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
      const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffe28a, emissive: 0xffba3b, emissiveIntensity: 0.95 });
      for (let i = -4; i <= 4; i++) {
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), bulbMat);
        bulb.position.set(i * 0.28, -Math.cos((i / 4) * (Math.PI / 2)) * 0.08, 0);
        bulbs.add(bulb);
      }
      cart.add(bulbs);

      // Countertop Items & Hotspots
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

      // 2. Avocado Toast on Mini Board
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

      // 4. Green Buttermilk Bottle
      const milk = new THREE.Group();
      milk.position.set(...HOTSPOTS_DATA.buttermilk.position);
      const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.34, 16), new THREE.MeshStandardMaterial({ color: 0xdfecc5, roughness: 0.3 }));
      const mint = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), new THREE.MeshStandardMaterial({ color: 0x2e6b18 }));
      mint.scale.set(1, 0.2, 1.8);
      mint.position.set(0, 0.18, 0);
      milk.add(bottle, mint);
      attachHotspot(milk, 'buttermilk');
      cart.add(milk);

      // Glass Jar with mini Hass avocados
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
          cartGroup = model;
          scene.add(cartGroup);
        },
        undefined,
        () => {
          cartGroup = buildCart();
          scene.add(cartGroup);
        }
      );
    } else {
      cartGroup = buildCart();
      scene.add(cartGroup);
    }

    // 8. Floating 3D Particles (Avocado slices & leaves)
    const particleCount = 70;
    const pGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array(particleCount * 3);
    const colArr = new Float32Array(particleCount * 3);
    const pCols = [
      new THREE.Color(0x7da847),
      new THREE.Color(0x9cd15b),
      new THREE.Color(0x4f7828),
      new THREE.Color(0xdbe8ba),
      new THREE.Color(0xe6a817),
    ];

    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3] = (Math.random() - 0.5) * 14;
      posArr[i * 3 + 1] = 0.2 + Math.random() * 7.0;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 14;

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
        size: 0.18,
        map: new THREE.CanvasTexture(pCanvas),
        transparent: true,
        opacity: 0.75,
        vertexColors: true,
        depthWrite: false,
      })
    );
    scene.add(particles);

    // Soft Contact Shadow Disc
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shCtx = shadowCanvas.getContext('2d')!;
    const grad = shCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(20, 30, 10, 0.45)');
    grad.addColorStop(0.6, 'rgba(20, 30, 10, 0.15)');
    grad.addColorStop(1, 'rgba(20, 30, 10, 0)');
    shCtx.fillStyle = grad;
    shCtx.fillRect(0, 0, 256, 256);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.8, 3.0),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    scene.add(shadowPlane);

    // 9. SCROLL CHOREOGRAPHY & CAMERA WAYPOINTS
    const desiredCamPos = new THREE.Vector3();
    const desiredLookAt = new THREE.Vector3();
    let desiredCartRotY = 0;
    let desiredCartPosX = 0;

    let currentScroll = 0;
    let targetScroll = 0;

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;
      setScrollProgress(targetScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mouse tracking for parallax tilt
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 10. DRAG-TO-ROTATE (Interactive Spin)
    let isDragging = false;
    let dragStartX = 0;
    let userDragAngleY = 0;
    let idleTimer = 0;

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest('button, a, input, select, textarea, [role="button"], .interactive-control')) {
        return;
      }
      isDragging = true;
      dragStartX = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX;
      userDragAngleY += deltaX * 0.007;
      dragStartX = e.clientX;
      idleTimer = 0;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 11. RAYCASTING FOR INTERACTIVE DISH CLICKS & CAMERA ZOOM
    let zoomTargetDish: string | null = null;
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      // Don't trigger if clicking on interactive UI buttons
      if ((e.target as HTMLElement)?.closest('button, a, input, select, textarea, [role="button"], .interactive-control')) {
        return;
      }
      mouseCoord.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseCoord.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseCoord, camera);
      const hits = raycaster.intersectObjects(scene.children, true);
      const hit = hits.find((h) => h.object.userData && h.object.userData.isHotspot);
      if (hit) {
        const item = HOTSPOTS_DATA[hit.object.userData.id];
        if (item) {
          zoomTargetDish = item.id;
          setActiveHotspot(item);
        }
      }
    };
    window.addEventListener('click', onClick);

    // Global hook for focusing dish from menu card buttons
    (window as any).focusItemOnKart = (id: string) => {
      const item = HOTSPOTS_DATA[id];
      if (item) {
        zoomTargetDish = id;
        setActiveHotspot(item);
        // Scroll smoothly towards counter
        window.scrollTo({ top: window.innerHeight * 0.45, behavior: 'smooth' });
      }
    };

    (window as any).resetKartCamera = () => {
      zoomTargetDish = null;
      setActiveHotspot(null);
      userDragAngleY = 0;
    };

    // 12. ANIMATION & RENDER LOOP
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth scroll lerp
      currentScroll += (targetScroll - currentScroll) * 0.07;

      // CAMERA WAYPOINTS BASED ON SCROLL (0 -> 1)
      if (zoomTargetDish && HOTSPOTS_DATA[zoomTargetDish]) {
        // SMOOTH CAMERA ZOOM IN ON SELECTED DISH
        const dishPos = HOTSPOTS_DATA[zoomTargetDish].position;
        desiredCamPos.set(dishPos[0] * 0.8 + 0.3, dishPos[1] + 0.6, dishPos[2] + 1.2);
        desiredLookAt.set(dishPos[0], dishPos[1], dishPos[2]);
        desiredCartRotY = 0.05;
        desiredCartPosX = 0.0;
      } else if (currentScroll < 0.28) {
        // Stage 1: HERO (0.0 -> 0.28)
        // Inviting front-quarter 3D cart view positioned comfortably on the right side
        const t = currentScroll / 0.28;
        desiredCamPos.set(
          THREE.MathUtils.lerp(3.2, 1.8, t),
          THREE.MathUtils.lerp(2.6, 2.1, t),
          THREE.MathUtils.lerp(5.2, 3.8, t)
        );
        desiredLookAt.set(
          THREE.MathUtils.lerp(0.5, 0.2, t),
          THREE.MathUtils.lerp(1.4, 1.45, t),
          0
        );
        desiredCartRotY = THREE.MathUtils.lerp(0.1, 0.4, t);
        desiredCartPosX = THREE.MathUtils.lerp(0.6, 0.3, t);
      } else if (currentScroll < 0.62) {
        // Stage 2: MENU COUNTER FLY-IN (0.28 -> 0.62)
        // Extreme close-up flyover showcasing counter dishes (Smoothie, Toast, Soup, Buttermilk)
        const t = (currentScroll - 0.28) / (0.62 - 0.28);
        desiredCamPos.set(
          THREE.MathUtils.lerp(1.8, -0.6, t),
          THREE.MathUtils.lerp(2.1, 1.85, t),
          THREE.MathUtils.lerp(3.8, 2.9, t)
        );
        desiredLookAt.set(
          THREE.MathUtils.lerp(0.2, 0.0, t),
          THREE.MathUtils.lerp(1.45, 1.4, t),
          0.3
        );
        desiredCartRotY = THREE.MathUtils.lerp(0.4, -0.3, t);
        desiredCartPosX = THREE.MathUtils.lerp(0.3, -0.4, t);
      } else if (currentScroll < 0.82) {
        // Stage 3: ABOUT US (0.62 -> 0.82)
        // Orbit around to showcase wooden body, chalkboard sign & authentic street cart heritage
        const t = (currentScroll - 0.62) / (0.82 - 0.62);
        desiredCamPos.set(
          THREE.MathUtils.lerp(-0.6, -3.4, t),
          THREE.MathUtils.lerp(1.85, 2.4, t),
          THREE.MathUtils.lerp(2.9, 3.8, t)
        );
        desiredLookAt.set(
          THREE.MathUtils.lerp(0.0, -0.3, t),
          THREE.MathUtils.lerp(1.4, 1.5, t),
          0
        );
        desiredCartRotY = THREE.MathUtils.lerp(-0.3, 0.8, t);
        desiredCartPosX = THREE.MathUtils.lerp(-0.4, 0.2, t);
      } else {
        // Stage 4: LOCATION & CONTACT (0.82 -> 1.0)
        // Warm elevated twilight view looking down at glowing fairy lights and wheels
        const t = (currentScroll - 0.82) / (1.0 - 0.82);
        desiredCamPos.set(
          THREE.MathUtils.lerp(-3.4, 1.2, t),
          THREE.MathUtils.lerp(2.4, 3.8, t),
          THREE.MathUtils.lerp(3.8, 5.8, t)
        );
        desiredLookAt.set(
          THREE.MathUtils.lerp(-0.3, 0.0, t),
          THREE.MathUtils.lerp(1.5, 1.2, t),
          0
        );
        desiredCartRotY = THREE.MathUtils.lerp(0.8, 0.0, t);
        desiredCartPosX = THREE.MathUtils.lerp(0.2, 0.0, t);
      }

      // Add subtle mouse parallax offset to camera
      const mouseParallaxX = mouse.x * 0.25;
      const mouseParallaxY = mouse.y * 0.15;

      camera.position.x += (desiredCamPos.x + mouseParallaxX - camera.position.x) * 0.06;
      camera.position.y += (desiredCamPos.y + mouseParallaxY - camera.position.y) * 0.06;
      camera.position.z += (desiredCamPos.z - camera.position.z) * 0.06;

      lookAtTarget.x += (desiredLookAt.x - lookAtTarget.x) * 0.06;
      lookAtTarget.y += (desiredLookAt.y - lookAtTarget.y) * 0.06;
      lookAtTarget.z += (desiredLookAt.z - lookAtTarget.z) * 0.06;
      camera.lookAt(lookAtTarget);

      // Idle auto-rotate calculation
      if (!isDragging) {
        idleTimer += delta;
      }
      const idleBob = autoRotateEnabled && idleTimer > 1.2 ? Math.sin(elapsed * 0.6) * 0.08 : 0;
      userDragAngleY *= 0.96; // Deceleration damping

      // Cart position & rotation lerp
      if (cartGroup) {
        const targetRotY = desiredCartRotY + userDragAngleY + idleBob;
        cartGroup.rotation.y += (targetRotY - cartGroup.rotation.y) * 0.06;
        cartGroup.position.x += (desiredCartPosX - cartGroup.position.x) * 0.05;
        // Subtle idle floating breathing bob
        cartGroup.position.y = Math.sin(elapsed * 1.5) * 0.03;
      }

      // Floating Particle Drifts
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(elapsed * 1.2 + positions[i]) * 0.003;
        positions[i] += Math.cos(elapsed * 0.8 + positions[i + 1]) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsed * 0.02 + currentScroll * 0.5;

      // Pulse Hotspot Rings
      interactiveHotspots.forEach((h) => {
        const s = 1 + Math.sin(elapsed * 4 + h.pulseOffset) * 0.15;
        h.ringMesh.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Window Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('click', onClick);
      renderer.dispose();
    };
  }, [autoRotateEnabled]);

  // When modal closes, reset camera focus
  const handleCloseModal = () => {
    setActiveHotspot(null);
    if (typeof window !== 'undefined' && (window as any).resetKartCamera) {
      (window as any).resetKartCamera();
    }
  };

  return (
    <>
      {/* 3D WebGL Canvas Layer - Fixed full-page backdrop */}
      <div
        ref={mountRef}
        className="fixed inset-0 z-0 pointer-events-auto"
        aria-hidden="true"
      />

      {/* Low-End Fallback if WebGL Disabled */}
      {!webGLSupported && (
        <div
          className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-40"
          style={{ backgroundImage: `url('/images/hero-cart.jpg')` }}
        />
      )}

      {/* Top 3D Scroll Journey Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 pointer-events-none bg-avocado-500/20">
        <div
          className="h-full bg-gradient-to-r from-avocado-600 via-emerald-400 to-amber-400 transition-all duration-75"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      {/* Floating 3D Navigation Guide Pill (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-30 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--cream-card)]/90 backdrop-blur-md border border-[var(--border)] shadow-xl text-xs font-semibold text-avocado-800 dark:text-avocado-200">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>3D World • Scroll to tour • Drag to spin</span>
        <button
          onClick={() => setAutoRotateEnabled(!autoRotateEnabled)}
          className="interactive-control ml-1 px-2 py-0.5 rounded-md bg-avocado-600/10 hover:bg-avocado-600/20 text-avocado-700 dark:text-avocado-300 text-[11px] font-bold transition-colors cursor-pointer"
          title="Toggle subtle idle auto-rotate"
        >
          {autoRotateEnabled ? 'Auto-Spin: ON' : 'Auto-Spin: OFF'}
        </button>
      </div>

      {/* Clicked Dish Modal Card */}
      <HotspotModal hotspot={activeHotspot} onClose={handleCloseModal} />
    </>
  );
}
