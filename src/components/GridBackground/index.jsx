"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const GridBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Prevent duplicate canvases (React StrictMode can run useEffect twice)
    Array.from(mountRef.current.children).forEach((c) => mountRef.current.removeChild(c));

    // --- SCENE / CAMERA / RENDERER ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0915);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // coloquei 60 aqui pra combinar com targetCamZ usado no animate
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    // não bloqueia eventos da UI (mantemos mouse no window/document)
    renderer.domElement.style.pointerEvents = "none";
    mountRef.current.appendChild(renderer.domElement);

    // --- GEOMETRIA ---
    const N = 220;
    const RANGE = 30;
    const THRESHOLD = 9;
    const MAX_NEIGHBORS = 6;

    const points = [];
    for (let i = 0; i < N; i++) {
      points.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * RANGE,
          (Math.random() - 0.5) * RANGE,
          (Math.random() - 0.5) * RANGE
        )
      );
    }

    const linePositions = [];
    for (let i = 0; i < N; i++) {
      const dists = [];
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        const dsq = points[i].distanceToSquared(points[j]);
        if (dsq <= THRESHOLD * THRESHOLD) dists.push({ j, dsq });
      }
      dists.sort((a, b) => a.dsq - b.dsq);
      const neighbors = dists.slice(0, MAX_NEIGHBORS);
      for (const n of neighbors) {
        const a = points[i];
        const b = points[n.j];
        linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    geometry.computeBoundingSphere();

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.06, // um pouco mais visível
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(geometry, material);
    scene.add(lines);

    // --- MOUSE (usando pointermove + fallback) ---
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (event) => {
      // suporta touch/mouse pointer coordinates
      const clientX = ("clientX" in event) ? event.clientX : (event.touches ? event.touches[0].clientX : 0);
      const clientY = ("clientY" in event) ? event.clientY : (event.touches ? event.touches[0].clientY : 0);

      mouseX = (clientX / window.innerWidth) * 2 - 1;
      mouseY = -(clientY / window.innerHeight) * 2 + 1;

      // console.debug('mouse', mouseX.toFixed(2), mouseY.toFixed(2)); // descomente pra debug
    };

    // add on both window and document to maximize compatibility
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointermove", handlePointerMove, { passive: true });

    // --- ANIMAÇÃO (rotação + movimento da câmera com lerp) ---
    let animationId = null;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // rotaciona as linhas (suavemente)
      const targetRotY = mouseX * 1.0;  // intensidade horizontal (aumentei um pouco)
      const targetRotX = mouseY * 0.5;  // intensidade vertical
      lines.rotation.y += (targetRotY - lines.rotation.y) * 0.08;
      lines.rotation.x += (targetRotX - lines.rotation.x) * 0.08;
      lines.rotation.z += 0.0008;

      // movimento da câmera (lerp)
      const targetCamX = mouseX * 10; // intensidade horizontal
      const targetCamY = mouseY * 6;  // intensidade vertical
      const targetCamZ = 30 - Math.abs(mouseY) * 10; // leve zoom ao mover verticalmente

      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // --- RESPONSIVO ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationId);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
};

export default GridBackground;
