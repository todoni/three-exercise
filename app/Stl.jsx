import { DragControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { BufferGeometry } from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

var start, end;
export function Stl(props) {
  const loader = new STLLoader();
  const geometry2 = new BufferGeometry();
  const material = new THREE.MeshBasicMaterial({ wireframe: true });
  const mandibular = useLoader(STLLoader, "/56_Mandibular.stl");
  const maxillary = useLoader(STLLoader, "56_Maxillary.stl");
  const material2 = new THREE.MeshStandardMaterial({
    color: 0xfd867c,
    roughness: 0.3,
    metalness: 0.1,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedVertexIndex, setSelectedVertexIndex] = useState(null);
  const [objectIndex, setObjectIndex] = useState(null);
  const ref = useRef();
  const temp = new THREE.Vector3();
  let tempMatrix = new THREE.Matrix4();
  /*loader.load("/56_Mandibular.stl", function (geometry) {
    console.log("geometry", geometry);
    geometry2.setAttribute("position", geometry.attributes.position);
    //return geometry;
  });*/
  // console.log("geometry2", geometry2);

  const handleDown = (e) => {
    //e.stopPropagation();
    console.time();
    e.object.name === "maxillary" ? setObjectIndex(1) : setObjectIndex(0);
    const geometry = e.object.geometry;
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    const clickPosition = new THREE.Vector3().copy(e.point);
    console.log("asdf", geometry, e.object);

    let closestVertexIndex = -1;
    let minDistance = Infinity;

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      const distance = vertex.distanceTo(clickPosition);

      if (distance < minDistance) {
        minDistance = distance;
        closestVertexIndex = i;
      }
    }

    if (closestVertexIndex !== -1) {
      setIsDragging(true);
      setSelectedVertexIndex(closestVertexIndex);
    }
    console.timeEnd();
  };

  const handleUp = (e) => {
    console.log("up!");
    setIsDragging(false);
    setSelectedVertexIndex(null);
  };

  const handleMove = (e) => {
    if (!isDragging || selectedVertexIndex === null) return;

    const geometry = e.object.geometry;
    const positionAttribute = geometry.attributes.position;

    // movementX와 movementY를 사용하여 드래그된 거리만큼 vertex를 이동
    const vertex = new THREE.Vector3();
    vertex.fromBufferAttribute(positionAttribute, selectedVertexIndex);

    vertex.x += e.movementX; // 적절한 스케일링을 위해 0.01 곱하기
    vertex.y -= e.movementY; // 적절한 스케일링을 위해 0.01 곱하기

    positionAttribute.setXYZ(selectedVertexIndex, vertex.x, vertex.y, vertex.z);
    positionAttribute.needsUpdate = true;
  };
  const test = (origin) => {
    console.log("origin", origin);
  };

  const handleDrag = (
    localMatrix,
    deltaLocalMatrix,
    worldMatrix,
    deltaWorldMatrix
  ) => {
    console.log(localMatrix, deltaLocalMatrix, worldMatrix, deltaWorldMatrix);
    const geometry = ref.current.children[objectIndex].geometry;
    const positionAttribute = geometry.attributes.position;
    temp.fromBufferAttribute(positionAttribute, selectedVertexIndex);
    tempMatrix.multiply(deltaLocalMatrix.invert());
    //const matrix = deltaLocalMatrix - tempMatrix;
    temp.applyMatrix4(tempMatrix);
    tempMatrix = deltaLocalMatrix;
    positionAttribute.setXYZ(selectedVertexIndex, temp.x, temp.y, temp.z);
    positionAttribute.needsUpdate = true;
  };

  return (
    <group onPointerDown={handleDown}>
      <DragControls
        autoTransform={false}
        onDragStart={() => test(selectedVertexIndex)}
        onDrag={handleDrag}
        onDragEnd={() => console.log("end")}
        ref={ref}
      >
        <mesh material={material} name="mandibular">
          <primitive object={mandibular} />
        </mesh>
        <mesh material={material} position={[0, 10, 0]} name="maxillary">
          <primitive object={maxillary} />
        </mesh>
      </DragControls>
    </group>
  );
}
