import Point2D from "./geometry/Point2D";
import Point3D from "./geometry/Point3D";

import PointsInputTable from "./components/PointsInputTable";
import Canvas2D from "./components/Canvas2D";
import Canvas3D from "./components/Canvas3D";
import TransformationMenu2D from "./components/TransformationMenu2D";

import { useState } from "react";
import TransformationMenu3D from "./components/TransformationMenu3D";
import CanvasCurveModeling from "./components/CanvasCurveModeling";

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
    <div className="m-5 mx-28 justify-center">
      <div className="text-center sticky top-5">
        <h1 className="text-4xl font-bold text-blue-600">RenderRama</h1>
        <p className="text-lg text-gray-700">
          Where Computer Graphics Concepts Come to Life
        </p>
        <p className="text-lg text-gray-700">All in One Place!</p>
      </div>
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
          {activeTab === "2d" ? (
            <Canvas2D points={points} transformedPoints={transformedPoints} />
          ) : activeTab === "3d" ? (
            <Canvas3D
              translationVector3d={translationVector3d}
              rotationVector3d={rotationVector3d}
              scalingVector3d={scalingVector3d}
              shearingVector3d={shearingVector3d}
            />
          ) : (
            <CanvasCurveModeling />
          )}
        </div>
        <div className="bg-sky-100 border-solid border-blue-500 border-2 rounded-md">
          <div className="mt-5">
            <div className="flex space-x-4 mx-4 justify-center">
              <button
                className={`py-2 px-4 font-semibold text-white ${
                  activeTab === "2d" ? "bg-sky-700" : "bg-sky-600"
                } hover:bg-sky-700 rounded-lg`}
                onClick={() => handleTabClick("2d")}
              >
                2D
              </button>
              <button
                className={`py-2 px-4 font-semibold text-white ${
                  activeTab === "3d" ? "bg-sky-700" : "bg-sky-600"
                } hover:bg-sky-700 rounded-lg`}
                onClick={() => handleTabClick("3d")}
              >
                3D
              </button>
              <button
                className={`py-2 px-4 font-semibold text-white ${
                  activeTab === "curve-modeling" ? "bg-sky-700" : "bg-sky-600"
                } hover:bg-sky-700 rounded-lg`}
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
                <div className="text-justify leading-6">
                  <span className="font-semibold">Bezier curve</span> is a
                  widely used mathematical curve that is defined by two or more
                  control points. It is named after the French engineer Pierre
                  Bézier, who developed it in the 1960s while working at the
                  automotive company Renault.
                  <div className="mt-5">
                    <span className="font-semibold">Cubic Bezier curve</span> is
                    defined by four points, P0, P1, P2, and P3, where P0 and P3
                    are the start and end points of the curve (also known as{" "}
                    <span className="font-semibold">anchor points</span>), and
                    P1 and P2 are the{" "}
                    <span className="font-semibold">control points</span> that
                    influence the curve's shape.
                  </div>
                  <img
                    className="mt-2 mx-auto border-solid border-2 border-black rounded-md"
                    width="356px"
                    src="/bezier-curve.png"
                    alt="Bezier curve with control and anchor points"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
