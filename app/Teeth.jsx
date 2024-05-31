/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 scene.gltf 
Author: dewa (https://sketchfab.com/dewa)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/teeth-3a0fb31b9d864b27a0846aca8579461c
Title: Teeth
*/

import { DragControls, useGLTF } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

export function Model(props) {
  const { nodes, materials } = useGLTF("/scene.gltf");
  const [point, setPoint] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const material = new THREE.MeshBasicMaterial({ wireframe: true });
  const matrix = new THREE.Matrix4();
  matrix.makeRotationX(-Math.PI / 2).multiplyScalar(4.135);
  const handleStart = (e) => {
    setIsDragging(true);
    console.log("start");
  };
  const handleDrag = (a) => {
    //console.log(a);
    console.log("dragging");
  };
  const handlePointDown = (e) => {
    e.stopPropagation();
    const point = e.point;
    if (!isDragging) {
      console.log("pointdown", point);
      setPoint(point);
    }
  };
  const handleEnd = () => {
    setIsDragging(false);
    console.log("end");
  };
  return (
    <group {...props} dispose={null} onPointerDown={handlePointDown}>
      <DragControls
        autoTransform={false}
        onDragStart={handleStart}
        onDrag={handleDrag}
        onDragEnd={handleEnd}
      >
        <group rotation={[-Math.PI / 2, 0, 0]} scale={4.135}>
          <mesh geometry={nodes.Object_3.geometry} material={materials.Gums} />
          <mesh geometry={nodes.Object_4.geometry} material={materials.Gums} />
          <mesh geometry={nodes.Object_5.geometry} material={materials.Gums} />
          <mesh geometry={nodes.Object_6.geometry} material={materials.Teeth} />
          <mesh geometry={nodes.Object_7.geometry} material={materials.Teeth} />
          <mesh
            geometry={nodes.Object_8.geometry}
            material={materials.Tongue}
          />
        </group>
      </DragControls>
    </group>
  );
}

useGLTF.preload("/scene.gltf");
