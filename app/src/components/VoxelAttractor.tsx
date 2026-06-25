import { useEffect, useRef } from "react";
import * as THREE from "three";

const VOXEL_COUNT = window.innerWidth < 768 ? 6000 : 12000;
const ATTRACTOR_A = 1.4;
const ATTRACTOR_B = -1.7;
const ATTRACTOR_C = 0.9;
const ATTRACTOR_D = -1.8;
const ATTRACTOR_E = 1.1;
const ATTRACTOR_F = 0.7;
const BOX_SIZE = 0.8;
const ROTATION_SPEED = 0.00025;
const Y_ROT_SPEED = 0.3;
const Z_ROT_SPEED = 0.1;
const POSITION_SCALE = 0.1;
const CAMERA_Z = 30;
const MOUSE_INFLUENCE = 8;
const MOUSE_LERP = 0.05;
const HUE_BASE = 0.11;
const HUE_RANGE = 0.18;
const LIGHTNESS_BASE = 0.6;
const POLE_LIGHTNESS_BOOST = 0.3;
const POLE_THRESHOLD = 3.0;
const COLOR_Y_SCALE = 12.0;
// Luxury enhancements
const PULSE_SPEED = 0.002;
const SIZE_VARIATION = 0.3;

export default function VoxelAttractor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const dpr = Math.min(window.devicePixelRatio, 2);
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = CAMERA_Z;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0xf9f7f0, 1);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "0";

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    
    // Add luxury accent lights
    const goldLight = new THREE.PointLight(0xD4AF37, 0.8, 50);
    goldLight.position.set(-10, 5, 10);
    scene.add(goldLight);
    
    const roseGoldLight = new THREE.PointLight(0xB76E79, 0.6, 50);
    roseGoldLight.position.set(10, -5, 10);
    scene.add(roseGoldLight);

    // Instanced mesh
    const geometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.6,
      flatShading: true,
    });
    const mesh = new THREE.InstancedMesh(geometry, material, VOXEL_COUNT);
    scene.add(mesh);

    const group = new THREE.Group();
    group.add(mesh);
    scene.add(group);

    // Attractor state
    const x = new Float64Array(VOXEL_COUNT);
    const y = new Float64Array(VOXEL_COUNT);
    const z = new Float64Array(VOXEL_COUNT);
    let xj = 0.1,
      yj = 0.1,
      zj = 0.1;

    // Initialize positions
    for (let i = 0; i < VOXEL_COUNT; i++) {
      const xn = Math.sin(yj * ATTRACTOR_B) - ATTRACTOR_C * Math.cos(xj * ATTRACTOR_B);
      const yn = Math.sin(xj * ATTRACTOR_A) - ATTRACTOR_D * Math.cos(yj * ATTRACTOR_A);
      const zn = Math.sin(xj * ATTRACTOR_F) - ATTRACTOR_E * Math.cos(yj * ATTRACTOR_F);
      x[i] = xn;
      y[i] = yn;
      z[i] = zn;
      xj += xn * POSITION_SCALE;
      yj += yn * POSITION_SCALE;
      zj += zn * POSITION_SCALE;
    }

    const dummy = new THREE.Object3D();
    const tempColor = new THREE.Color();

    const isMobile = window.innerWidth < 768;

    function animate() {
      rafRef.current = requestAnimationFrame(animate);

      const now = performance.now();
      const time = now * ROTATION_SPEED;

      // Update attractor positions
      for (let i = 0; i < VOXEL_COUNT; i++) {
        const xn =
          Math.sin(yj * ATTRACTOR_B) - ATTRACTOR_C * Math.cos(xj * ATTRACTOR_B);
        const yn =
          Math.sin(xj * ATTRACTOR_A) - ATTRACTOR_D * Math.cos(yj * ATTRACTOR_A);
        const zn =
          Math.sin(xj * ATTRACTOR_F) - ATTRACTOR_E * Math.cos(yj * ATTRACTOR_F);

        x[i] = xn;
        y[i] = yn;
        z[i] = zn;

        xj += xn * POSITION_SCALE;
        yj += yn * POSITION_SCALE;
        zj += zn * POSITION_SCALE;

        // Color from Y position
        const colorPos = y[i] / COLOR_Y_SCALE + 0.5;
        const hue = colorPos * HUE_RANGE + HUE_BASE;

        if (Math.abs(z[i]) < POLE_THRESHOLD) {
          const lightness =
            LIGHTNESS_BASE +
            (1.0 - Math.abs(z[i]) / POLE_THRESHOLD) * POLE_LIGHTNESS_BOOST;
          tempColor.setHSL(hue, 1.0, lightness);
        } else {
          tempColor.setHSL(hue, 1.0, LIGHTNESS_BASE);
        }

        mesh.setColorAt(i, tempColor);

        // Transform with luxury enhancements
        const pulse = Math.sin(now * PULSE_SPEED + i * 0.1) * SIZE_VARIATION;
        dummy.position.set(x[i], y[i], z[i]);
        dummy.scale.set(
          1 + pulse * 0.3,
          1 + pulse * 0.3,
          1 + pulse * 0.3
        );
        dummy.rotation.set(
          Math.random() * Math.PI + time * 0.5,
          Math.random() * Math.PI + time * 0.3,
          time * 0.2
        );
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      // Rotate group
      group.rotation.y = time * Y_ROT_SPEED;
      group.rotation.z = time * Z_ROT_SPEED;

      // Camera parallax (desktop only)
      if (!isMobile) {
        camera.position.x +=
          (mouseRef.current.x * MOUSE_INFLUENCE - camera.position.x) *
          MOUSE_LERP;
        camera.position.y +=
          (mouseRef.current.y * MOUSE_INFLUENCE - camera.position.y) *
          MOUSE_LERP;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    }

    animate();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x =
        (e.clientX / window.innerWidth - 0.5);
      mouseRef.current.y =
        -(e.clientY / window.innerHeight - 0.5);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
      role="presentation"
    />
  );
}
