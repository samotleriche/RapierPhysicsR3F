import React, { useRef, useState, useMemo } from "react";
import { Perf } from "r3f-perf";

import { Stage, useCursor, Html, Float } from "@react-three/drei";
import { Suspense } from "react";
import PhysicalWorldScene from "./PhysicalWorld";

const Experience = ({
  toggleBodies,
  seeWalls,
  gravity,
  spinDirection,
  setCount,
}: any) => {
  return (
    <>
      {seeWalls && <Perf openByDefault trackGPU={true} position="top-left" />}

      <ambientLight intensity={0.5} />
      <color attach="background" args={["#000"]} />
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />

      {/* <Html
        transform
        distanceFactor={13}
        position={[-6, 6, -6]}
        onClick={() => console.log("Hello")}
        occlude={"blending"}
      >
        <div className="flex flex-col items-center justify-center group bg-indigo-700 p-5 w-auto">
          <h1 className="text-center text-2xl font-semibold">
            React Three Fiber
          </h1>
          <button
            onClick={() => console.log("Hello")}
            className="cursor-pointer hover:bg-indigo-300 hover:-translate-y-1 hover:text-slate-800 active:text-slate-800 active:bg-indigo-300 active:translate-y-1 transition-all ease-in-out duration-150 py-2 px-3 bg-indigo-500 text-xl font-semibold rounded-md my-2"
          >
            Zero Gravity
          </button>
        </div>
      </Html> */}

      {/* <mesh onClick={handleGravityClick} position={[-6, 5, -5.5]}>
        <boxGeometry args={[4, 2, 0.5]} />
        <meshStandardMaterial color="hotpink" />
      </mesh> */}

      <Suspense fallback={"Loading..."}>
        <PhysicalWorldScene
          toggleBodies={toggleBodies}
          seeWalls={seeWalls}
          setCount={setCount}
          gravity={gravity}
          spinDirection={spinDirection}
        />
      </Suspense>
    </>
  );
};

export default Experience;
