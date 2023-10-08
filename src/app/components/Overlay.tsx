import React from "react";

const Overlay = ({
  setSeeWalls,
  handleGravityClick,
  gravity,
  setSpinDirection,
  setToggleBodies,
  cubeCount,
  setCubeCount,
}: any) => {
  return (
    <div className="rounded-md absolute z-10 top-6 right-6 flex flex-col items-center justify-center group bg-indigo-700 p-5 w-auto">
      <h1 className="text-center text-2xl font-semibold">React Three Fiber</h1>
      <button
        onClick={() => handleGravityClick()}
        className="w-full cursor-pointer hover:bg-indigo-300 hover:-translate-y-1 hover:text-slate-800 active:text-slate-800 active:bg-indigo-300 active:translate-y-1 transition-all ease-in-out duration-150 py-2 px-3 bg-indigo-500 text-xl font-semibold rounded-md my-2"
      >
        {JSON.stringify(gravity) === JSON.stringify([0, -9.81, 0])
          ? "Zero Gravity"
          : "Normal Gravity"}
      </button>
      <button
        onClick={() => setSpinDirection((prev: number) => prev * -1)}
        className="w-full cursor-pointer hover:bg-indigo-300 hover:-translate-y-1 hover:text-slate-800 active:text-slate-800 active:bg-indigo-300 active:translate-y-1 transition-all ease-in-out duration-150 py-2 px-3 bg-indigo-500 text-xl font-semibold rounded-md my-2"
      >
        Reverse Spin
      </button>
      <button
        onClick={() => setSeeWalls((prev: boolean) => !prev)}
        className="w-full cursor-pointer hover:bg-indigo-300 hover:-translate-y-1 hover:text-slate-800 active:text-slate-800 active:bg-indigo-300 active:translate-y-1 transition-all ease-in-out duration-150 py-2 px-3 bg-indigo-500 text-xl font-semibold rounded-md my-2"
      >
        See Walls
      </button>
      <p>max = 700</p>
      <input
        className="w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="number"
        placeholder={cubeCount}
        value={isNaN(cubeCount) ? 0 : cubeCount}
        onChange={(e) => {
          if (parseInt(e.target.value) > 700) {
            setCubeCount(700);
            return;
          }
          setCubeCount(parseInt(e.target.value));
          setToggleBodies(false);
        }}
      />
      <button
        onClick={() => setToggleBodies((prev: boolean) => !prev)}
        className="w-full cursor-pointer hover:bg-indigo-300 hover:-translate-y-1 hover:text-slate-800 active:text-slate-800 active:bg-indigo-300 active:translate-y-1 transition-all ease-in-out duration-150 py-2 px-3 bg-indigo-500 text-xl font-semibold rounded-md my-2"
      >
        Toggle Cubes
      </button>
    </div>
  );
};

export default Overlay;
