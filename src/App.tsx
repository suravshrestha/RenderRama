import Point from "./geometry/Point";

import PointsInputTable from "./components/PointsInputTable";
import Canvas from "./components/Canvas";
import TransformationMenu from "./components/TransformationMenu";

import { useState } from "react";

const App: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([
    // Initial empty rows
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  const [transformedPoints, setTransformedPoints] = useState<Point[]>([]);

  return (
    <div className="m-10 mx-28">
      <h1 className="text-3xl font-bold underline text-center">RenderRama</h1>
      <div className="grid grid-flow-col gap-4 mt-5">
        <div>
          <PointsInputTable
            points={points}
            setPoints={setPoints}
            setTransformedPoints={setTransformedPoints}
          />
        </div>
        <div className="col-span-5">
          <Canvas points={points} transformedPoints={transformedPoints} />
        </div>
        <div className="bg-sky-100 col-span-4">
          <TransformationMenu
            points={points}
            setTransformedPoints={setTransformedPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
