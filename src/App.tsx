import Point from "./Point";

import PointsInputTable from "./components/PointsInputTable";
import Canvas from "./components/Canvas";

import { useState } from "react";

function App() {
  const [points, setPoints] = useState<Point[]>([
    // Initial empty rows
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  return (
    <div className="m-10 mx-28">
      <h1 className="text-3xl font-bold underline text-center">RenderRama</h1>
      <div className="grid grid-flow-col gap-4 mt-5">
        <div>
          <PointsInputTable points={points} setPoints={setPoints} />
        </div>
        <div className="col-span-5">
          <Canvas points={points} />
        </div>
        <div className="bg-sky-100 col-span-4">
        </div>
      </div>
    </div>
  );
}

export default App;
