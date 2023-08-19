import Point2D from "./geometry/Point2D";
import Point3D from "./geometry/Point3D";

import PointsInputTable from "./components/PointsInputTable";
import Canvas2D from "./components/Canvas2D";
import Canvas3D from "./components/Canvas3D";
import TransformationMenu2D from "./components/TransformationMenu2D";

import { useState } from "react";
import TransformationMenu3D from "./components/TransformationMenu3D";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("2d");

  const [points, setPoints] = useState<Point2D[]>([
    // Initial empty rows
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  const [transformedPoints, setTransformedPoints] = useState<Point2D[]>([]);

  const [translationVector3d, setTranslationVector3d] = useState<Point3D>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [rotationVector3d, setRotationVector3d] = useState<Point3D>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [scalingVector3d, setScalingVector3d] = useState<Point3D>({
    x: 1,
    y: 1,
    z: 1,
  });

  const [shearingVector3d, setShearingVector3d] = useState<Point3D>({
    x: 0,
    y: 0,
    z: 0,
  });

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
  };

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
        <div>
          {activeTab === "3d" ? (
            <Canvas3D
              translationVector3d={translationVector3d}
              rotationVector3d={rotationVector3d}
              scalingVector3d={scalingVector3d}
              shearingVector3d={shearingVector3d}
            />
          ) : (
            <Canvas2D points={points} transformedPoints={transformedPoints} />
          )}
        </div>
        <div className="bg-sky-100">
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
              {activeTab === "3d" && (
                <TransformationMenu3D
                  translationVector3d={translationVector3d}
                  setTranslationVector3d={setTranslationVector3d}
                  rotationVector3d={rotationVector3d}
                  setRotationVector3d={setRotationVector3d}
                  scalingVector3d={scalingVector3d}
                  setScalingVector3d={setScalingVector3d}
                  shearingVector3d={shearingVector3d}
                  setShearingVector3d={setShearingVector3d}
                />
              )}
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
