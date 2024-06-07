import { DragControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

export function Stl(props) {
  const material = new THREE.MeshBasicMaterial({ wireframe: true });
  const mandibular = useLoader(STLLoader, "/56_Mandibular.stl");
  const material2 = new THREE.MeshStandardMaterial({
    color: 0xfd867c,
    roughness: 0.3,
    metalness: 0.1,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedVertexIndex, setSelectedVertexIndex] = useState(null);
  const [points, setPoints] = useState();
  const [forces, setForces] = useState();
  const ref = useRef();
  const temp = new THREE.Vector3();
  const tempMatrix = new THREE.Matrix4();
  tempMatrix.identity();

  const handleDown = (e) => {
    const geometry = e.object.geometry;
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    const clickPosition = new THREE.Vector3().copy(e.point);
    const selectedPoints = [];
    const selectedForces = [];

    let closestVertexIndex = -1;
    let minDistance = Infinity;

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      const distance = vertex.distanceTo(clickPosition);

      if (distance < minDistance) {
        minDistance = distance;
        closestVertexIndex = i;
      }

      const dist = distance / 8;
      if (dist < 1) {
        selectedPoints.push(i);
        selectedForces.push(0.5 + 0.5 * Math.cos(Math.PI * dist));
      }
    }
    setPoints(selectedPoints);
    setForces(selectedForces.map((value) => value / 3));
    if (closestVertexIndex !== -1) {
      setIsDragging(true);
      setSelectedVertexIndex(closestVertexIndex);
    }
  };

  const handleUp = (e) => {
    console.log("up!");
    setIsDragging(false);
    setSelectedVertexIndex(null);
  };

  const handleDrag = (
    localMatrix,
    deltaLocalMatrix,
    worldMatrix,
    deltaWorldMatrix
  ) => {
    if (!isDragging || selectedVertexIndex === null) return;
    const geometry = ref.current.children[0].geometry;
    const positionAttribute = geometry.attributes.position;
    const matrix = localMatrix.clone().multiply(tempMatrix.invert());
    const vec = new THREE.Vector3();
    const mat = new THREE.Matrix4();
    vec.applyMatrix4(matrix);

    for (let i = 0; i < points.length; ++i) {
      temp.fromBufferAttribute(positionAttribute, points[i]);
      const tmp = vec.clone().multiplyScalar(forces[i]);
      mat.makeTranslation(tmp);
      temp.applyMatrix4(mat);
      positionAttribute.setXYZ(points[i], temp.x, temp.y, temp.z);
    }
    tempMatrix.copy(localMatrix);
    positionAttribute.needsUpdate = true;
  };

  return (
    <group onPointerDown={handleDown}>
      <DragControls
        autoTransform={false}
        onDrag={handleDrag}
        onDragEnd={handleUp}
        ref={ref}
      >
        <mesh material={material} name="mandibular">
          <primitive object={mandibular} />
        </mesh>
      </DragControls>
    </group>
  );
}
