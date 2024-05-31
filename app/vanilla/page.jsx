"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function Page() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      120,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    camera.position.y = 0;
    camera.position.x = 0;
    const vertices = [];

    for (let i = 0; i < 10; i++) {
      const x = THREE.MathUtils.randFloatSpread(10);
      const y = THREE.MathUtils.randFloatSpread(10);
      const z = THREE.MathUtils.randFloatSpread(10);

      vertices.push(x, y, z);
    }

    const geometry2 = new THREE.BufferGeometry();
    geometry2.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([2, 2, 2], 3)
    );
    const material2 = new THREE.PointsMaterial({ color: 0xff0000, size: 1 });
    const points = new THREE.Points(geometry2, material2);
    scene.add(points);
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    //animate();
  }, []);
  const geometry2 = new THREE.BufferGeometry();
  geometry2.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([2, 2, 2], 3)
  );
  const material2 = new THREE.PointsMaterial({ color: 0xff0000, size: 1 });

  return (
    <div className={" bg-[#3a9c63] w-full h-screen"}>
      <Canvas
        shadows
        camera={{
          position: [7, 7, 7],
          fov: 120,
        }}
      >
        <color attach="background" args={["#404040"]} />
        <directionalLight position={[10, 10, 10]} castShadow />
        <ambientLight />
        <mesh geometry={geometry2} material={material2} />
        <mesh>
          <points args={[1, 1, 1]} />
        </mesh>
        <axesHelper args={[100]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
