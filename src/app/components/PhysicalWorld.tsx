import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  Physics,
  RigidBody,
  CapsuleCollider,
  BallCollider,
  CylinderCollider,
  CuboidCollider,
  InstancedRigidBodies,
  InstancedRigidBodyProps,
} from "@react-three/rapier";
import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PhysicalWorld = ({
  toggleBodies,
  seeWalls,
  setCount,
  gravity,
  spinDirection,
}: any) => {
  const cube = useRef<any>();
  const sphere = useRef<any>();
  const cylinder = useRef<any>();
  const capsule = useRef<any>();
  const lathe = useRef<any>();
  const twistRef = useRef<any>();

  const cubeCount = 200;
  const cubes = useRef(null);

  // useEffect(() => {
  //   for (let i = 0; i < cubeCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(
  //         Math.random() * 10 - 5,
  //         Math.random() * 10 + 5,
  //         Math.random() * 10 - 5
  //       ),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubes.current.setMatrixAt(i, matrix);
  //   }
  // }, []);

  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < cubeCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.5,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }
    return instances;
  }, []);

  const [hovered, set] = useState<any>();

  useCursor(hovered, "pointer");

  const handleClick = (ref: any) => {
    ref.current.applyImpulse(
      {
        x: 0,
        y: 15,
        z: 0,
      },
      true
    );
    ref.current.applyTorqueImpulse({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 10,
    });
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, spinDirection * time * 2, 0);

    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    twistRef.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 3;
    const z = Math.sin(angle) * 3;

    twistRef.current.setNextKinematicTranslation({
      x,
      y: 0.72,
      z,
    });
  });

  return (
    <Physics gravity={gravity} debug={seeWalls}>
      <RigidBody ref={cube} canSleep={false} restitution={1.2}>
        <mesh
          castShadow
          position={[0, 3, 0]}
          onClick={() => handleClick(cube)}
          onPointerOver={() => set(true)}
          onPointerLeave={() => {
            set(false);
          }}
        >
          <boxGeometry args={[2, 1, 1]} />
          <meshStandardMaterial color="deepskyblue" />
        </mesh>
      </RigidBody>

      <RigidBody
        ref={sphere}
        position={[3, 3, 0]}
        colliders={false}
        canSleep={false}
      >
        <BallCollider args={[1]} restitution={1.2} mass={2}>
          <mesh
            castShadow
            onClick={() => handleClick(sphere)}
            onPointerOver={() => set(true)}
            onPointerLeave={() => {
              set(false);
            }}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </BallCollider>
      </RigidBody>

      <RigidBody
        ref={lathe}
        position={[6, 3, 4]}
        scale={2}
        colliders={"hull"}
        canSleep={false}
        restitution={1.2}
      >
        <mesh
          castShadow
          onClick={() => handleClick(lathe)}
          onPointerOver={() => set(true)}
          onPointerLeave={() => {
            set(false);
          }}
        >
          <latheGeometry args={[]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>

      <RigidBody
        rotation={[Math.PI / 2, 0, 0]}
        position={[-4, 3, 0]}
        colliders={false}
        ref={cylinder}
        canSleep={false}
        restitution={1.2}
      >
        <CylinderCollider args={[0.5, 1.5]} mass={2}>
          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
            onClick={() => handleClick(cylinder)}
            onPointerOver={() => set(true)}
            onPointerLeave={() => {
              set(false);
            }}
          >
            <torusGeometry args={[1, 0.5, 12]} />
            <meshStandardMaterial color="gold" />
          </mesh>
        </CylinderCollider>
      </RigidBody>

      <RigidBody
        ref={capsule}
        colliders={false}
        position={[-4, 3, 4]}
        canSleep={false}
      >
        <CapsuleCollider args={[0.74, 0.8]} mass={2} restitution={1.2}>
          <mesh
            castShadow
            onClick={() => handleClick(capsule)}
            onPointerOver={() => set(true)}
            onPointerLeave={() => {
              set(false);
            }}
          >
            <capsuleGeometry args={[0.75, 1.5, 4, 8]} />
            <meshStandardMaterial color="silver" />
          </mesh>
        </CapsuleCollider>
      </RigidBody>

      <RigidBody type="fixed">
        <mesh receiveShadow position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </RigidBody>

      <RigidBody
        ref={twistRef}
        friction={0}
        type="kinematicPosition"
        position={[0, 0.71, 0]}
        onCollisionEnter={() => setCount((prev: any) => prev + 1)}
      >
        <mesh castShadow scale={[0.4, 1, 5]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="violet" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed">
        <CuboidCollider
          args={[8, 4, 0.5]}
          position={[0, 3.5, 11.5]}
          rotation={[Math.PI * 0.25, 0, 0]}
        />
        <CuboidCollider
          args={[8, 4, 0.5]}
          position={[0, 3.5, -11.5]}
          rotation={[-Math.PI * 0.25, 0, 0]}
        />
        <CuboidCollider
          args={[8, 4, 0.5]}
          position={[8.5, 4.5, 0]}
          rotation={[0, Math.PI / 2, 0]}
          rotate-x={-Math.PI * 0.25}
        />
        <CuboidCollider
          args={[8, 4, 0.5]}
          position={[-8.5, 4.5, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </RigidBody>

      {toggleBodies && (
        // @ts-ignore
        <InstancedRigidBodies restitution={0.7} instances={instances}>
          <instancedMesh
            castShadow
            ref={cubes}
            args={[undefined, undefined, cubeCount]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="white" />
          </instancedMesh>
        </InstancedRigidBodies>
      )}
    </Physics>
  );
};

export default PhysicalWorld;
