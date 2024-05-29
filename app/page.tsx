"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Model } from "./Teeth";

export default function Home() {
  const axesHelper2 = new THREE.AxesHelper(5);
  return (
    <div className={" bg-[#3a9c63] w-full h-screen"}>
      <div className="bg-[#3a9c63] w-[200px] h-screen absolute top-0 left-0 z-10" />
      <div className={"h-5/6 p-0 "}>
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
          <Model position={[0, 0, 0]} />
          <axesHelper args={[100]} />
          <gridHelper />
          <OrbitControls />
        </Canvas>
        <div
          className={"text-current text-7xl italic font-light z-40 p-5"}
        ></div>
      </div>
    </div>
  );
}
