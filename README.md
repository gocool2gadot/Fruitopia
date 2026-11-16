# 🥑 Fruitopia - Next.js Website

A modern, responsive, high-performance Next.js application for **Fruitopia**, a healthy street food kart in Ashok Nagar, Chennai, featuring an interactive 3D Three.js food kart hero.

---

## 🚀 Features

- **⚡ Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS.
- **🎨 3D Interactive Hero**:
  - Procedural 3D street food kart built with **Three.js**.
  - Striped avocado green & cream awning, wooden counter, bicycle wheels, chalkboard menu sign, and warm glowing hanging lights.
  - Interactive dishes on the counter (**Avocado Smoothie**, **Avocado Toast**, **Broccoli Soup**, **Green Buttermilk**).
  - OrbitControls (drag to rotate, scroll to zoom) with smooth camera clamp and auto-rotation when idle.
  - Interactive 3D hotspots that smoothly zoom the camera to the clicked dish and pop up a detail flyout.
  - Floating avocado slices and botanical green leaf particles drifting in 3D.
  - Low-spec / non-WebGL fallback detection.
  - **Ready for Custom .glb Models**: Easily toggle `USE_EXTERNAL_GLB = true` in `components/CartCanvas.tsx` to load your own 3D asset from `/public/`.
- **🥑 Complete Wholesome Menu**:
  - Filterable tabs: *All Items*, *Smoothies*, *Avocado Toasts*, *Soups*, *Drinks & Sips*.
  - All 7 dishes with authentic pricing, ingredients, and customizable flags.
  - "🔍 View on Kart" button to trigger smooth 3D camera zoom to that exact dish.
  - Instant pre-filled WhatsApp ordering button on each card.
- **📖 About Us**:
  - Story of Chennai's first avocado-centered street food kart.
  - Health pillars (100% Hass avocados, multigrain breads, low-fat cottage cheese).
- **📍 Location & Contact**:
  - 55, 10th Avenue, 2nd Street, Ward 156, Jaganathapuram, Ashok Nagar, Chennai - 600083.
  - Phone: `+91 93422 97441` (one-tap calling).
  - Responsive Google Maps embed.
- **🌓 Light & Dark Theme**:
  - Smooth switching between fresh Avocado & Cream (Light) and Olive Forest Night (Dark).
  - Three.js fog, sky hemisphere light, and ground bounce dynamically synchronize with theme changes.

---

## 🛠️ Project Structure

```
Fruitopia/
├── app/
│   ├── globals.css         # Custom theme variables, scrollbar, animations
│   ├── layout.tsx          # Google Fonts (Fraunces & Inter) & metadata
│   └── page.tsx            # Main single-page layout
├── components/
│   ├── Navbar.tsx          # Responsive navigation bar & dark mode toggle
│   ├── HeroSection.tsx     # Hero text, CTAs & 3D canvas integration
│   ├── CartCanvas.tsx      # Three.js 3D Food Kart, OrbitControls & Hotspots
│   ├── HotspotModal.tsx    # Modal flyout for clicked 3D dishes
│   ├── MenuSection.tsx     # Category filter tabs & item cards
│   ├── AboutSection.tsx    # Brand story & health pillars
│   ├── LocationSection.tsx # Ashok Nagar address, phone & Google Maps
│   ├── FloatingQuickOrder.tsx # Floating WhatsApp order button
│   └── Footer.tsx          # Footer with copyright and quick links
├── lib/
│   └── data.ts             # Menu items, hotspot coordinates & contact info
├── types/
│   └── index.ts            # TypeScript interfaces
├── public/                 # Static assets and .glb 3D models
├── tailwind.config.ts      # Custom avocado, cream & salsa color palettes
├── next.config.mjs         # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies & scripts
```

---

## 🏃 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```

---

## 🎨 How to Swap in Your Own .glb 3D Model

1. Export your 3D model as a `.glb` or `.gltf` file (e.g. from Blender).
2. Place the file inside the `/public/` directory (for example, `/public/fruitopia_cart.glb`).
3. Open `components/CartCanvas.tsx` and change the configuration flags at the top:
   ```typescript
   const USE_EXTERNAL_GLB = true;
   const GLB_MODEL_PATH = '/fruitopia_cart.glb';
   ```
4. In Blender, give your dish meshes or empty parent objects names containing:
   - `Smoothie` (for the Avocado Smoothie hotspot)
   - `Toast` (for the Avocado Toast hotspot)
   - `Soup` (for the Broccoli Soup hotspot)
   - `Buttermilk` (for the Green Buttermilk hotspot)

The loader will automatically attach the glowing pulsating hotspots and camera zoom targets!
