import Point from "./geometry/Point";

import PointsInputTable from "./components/PointsInputTable";
import Canvas from "./components/Canvas";
import TwoDimensionalTransformationMenu from "./components/TwoDimensionalTransformationMenu";

import { useState } from "react";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("2d");

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
  };

  const [points, setPoints] = useState<Point[]>([
    // Initial empty rows
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  const [transformedPoints, setTransformedPoints] = useState<Point[]>([]);

  return (
    <div className="m-10 mx-28">
      <h1 className="sticky top-5 text-3xl font-bold underline text-center">
        RenderRama
      </h1>
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
                <TwoDimensionalTransformationMenu
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
