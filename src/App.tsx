import Point2D from "./geometry/Point2D";

import PointsInputTable from "./components/PointsInputTable";
import Canvas2D from "./components/Canvas2D";
import Canvas3D from "./components/Canvas3D";
import TransformationMenu2D from "./components/TransformationMenu2D";

import { useState } from "react";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("2d");

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
  };

  const [points, setPoints] = useState<Point2D[]>([
    // Initial empty rows
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  const [transformedPoints, setTransformedPoints] = useState<Point2D[]>([]);

  return (
    <div className="m-10 mx-28 justify-center">
      <h1 className="sticky top-5 text-3xl font-bold underline text-center">
        RenderRama
      </h1>
      <div className="grid grid-flow-col gap-4 mt-5">
        {activeTab === "2d" && (
          <div>
            <PointsInputTable
              points={points}
              setPoints={setPoints}
              setTransformedPoints={setTransformedPoints}
            />
          </div>
        )}
        <div className="col-span-5">
          {activeTab === "3d" ? (
            <Canvas3D />
          ) : (
            <Canvas2D points={points} transformedPoints={transformedPoints} />
          )}
        </div>
        <div className="bg-sky-100 col-span-4">
          <div className="mt-5">
            <div className="flex space-x-4 mx-4">
              <button
                className={`py-2 px-4 ${
                  activeTab === "2d" ? "bg-gray-400" : "bg-gray-300"
                } hover:bg-gray-400 rounded`}
                onClick={() => handleTabClick("2d")}
              >
                2D
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "3d" ? "bg-gray-400" : "bg-gray-300"
                } hover:bg-gray-400 rounded`}
                onClick={() => handleTabClick("3d")}
              >
                3D
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "curve-modeling" ? "bg-gray-400" : "bg-gray-300"
                } hover:bg-gray-400 rounded`}
                onClick={() => handleTabClick("curve-modeling")}
              >
                Curve modeling
              </button>
            </div>
            <div className="p-4 text-lg">
              {/* Tab content */}
              {activeTab === "2d" && (
                <TransformationMenu2D
                  points={points}
                  setTransformedPoints={setTransformedPoints}
                />
              )}
              {activeTab === "3d" && <p>This is the content for 3D.</p>}
              {activeTab === "curve-modeling" && (
                <p>This is the content for Curve modeling.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
