"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "@/app/components/Experience";
import { OrbitControls, Text3D, Center } from "@react-three/drei";
import Overlay from "./components/Overlay";
import { useState } from "react";

export default function Home() {
  const [gravity, setGravity] = useState<any>([0, -9.81, 0]);
  const [count, setCount] = useState<number>(0);
  const [seeWalls, setSeeWalls] = useState<boolean>(false);
  const [toggleBodies, setToggleBodies] = useState<boolean>(false);

  const [spinDirection, setSpinDirection] = useState<number>(1);

  const handleGravityClick = () => {
    gravity[1] === -9.81 ? setGravity([0, 1, 0]) : setGravity([0, -9.81, 0]);
  };
  return (
    <main id="canvas-container" className="h-full relative">
      <Overlay
        setSeeWalls={setSeeWalls}
        handleGravityClick={handleGravityClick}
        gravity={gravity}
        setSpinDirection={setSpinDirection}
        setToggleBodies={setToggleBodies}
      />
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 1,
          far: 100,
          position: [9, 7, 12],
        }}
      >
        <OrbitControls maxZoom={1} maxDistance={70} makeDefault />
        <Center disableY>
          <Text3D
            font={"./helvetiker_regular.typeface.json"}
            position={[0, 6, 0]}
          >
            <meshNormalMaterial />
            Hits:
            {count}
          </Text3D>
        </Center>
        <Experience
          toggleBodies={toggleBodies}
          seeWalls={seeWalls}
          setCount={setCount}
          gravity={gravity}
          spinDirection={spinDirection}
        />
      </Canvas>
    </main>
  );
}
