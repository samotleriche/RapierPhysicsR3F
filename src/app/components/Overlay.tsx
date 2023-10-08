import React from "react";

const Overlay = ({
  setSeeWalls,
  handleGravityClick,
  gravity,
  setSpinDirection,
  setToggleBodies,
}: any) => {
  return (
    <div className="rounded-md absolute z-10 top-6 right-6 flex flex-col items-center justify-center group bg-indigo-700 p-5 w-auto">
      <h1 className="text-center text-2xl font-semibold">React Three Fiber</h1>
      <button
        onClick={() => handleGravityClick()}
        className="cursor-pointer hover:bg-indigo-300 hover:-translate-y-1 hover:text-slate-800 active:text-slate-800 active:bg-indigo-300 active:translate-y-1 transition-all ease-in-out duration-150 py-2 px-3 bg-indigo-500 text-xl font-semibold rounded-md my-2"
      >
        {JSON.stringify(gravity) === JSON.stringify([0, -9.81, 0])
          ? "Zero Gravity"
          : "Normal Gravity"}
      </button>
      <button
        onClick={() => setSpinDirection((prev: number) => prev * -1)}
        className="cursor-pointer hover:bg-indigo-300 hover:-translate-y-1 hover:text-slate-800 active:text-slate-800 active:bg-indigo-300 active:translate-y-1 transition-all ease-in-out duration-150 py-2 px-3 bg-indigo-500 text-xl font-semibold rounded-md my-2"
      >
        Reverse Spin
      </button>
      <button
        onClick={() => setSeeWalls((prev: boolean) => !prev)}
        className="cursor-pointer hover:bg-indigo-300 hover:-translate-y-1 hover:text-slate-800 active:text-slate-800 active:bg-indigo-300 active:translate-y-1 transition-all ease-in-out duration-150 py-2 px-3 bg-indigo-500 text-xl font-semibold rounded-md my-2"
      >
        See Walls
      </button>
      <button
        onClick={() => setToggleBodies((prev: boolean) => !prev)}
        className="cursor-pointer hover:bg-indigo-300 hover:-translate-y-1 hover:text-slate-800 active:text-slate-800 active:bg-indigo-300 active:translate-y-1 transition-all ease-in-out duration-150 py-2 px-3 bg-indigo-500 text-xl font-semibold rounded-md my-2"
      >
        Toggle Cubes
      </button>
    </div>
  );
};

export default Overlay;
