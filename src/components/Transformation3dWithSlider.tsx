import Point3D from "../geometry/Point3D";

import React from "react";

interface Props {
  transformation: string;
  transformationVector3d: Point3D;
  setTransformationVector3d: React.Dispatch<React.SetStateAction<Point3D>>;
  min: string;
  max: string;
}

function Transformation3dWithSlider({
  transformation,
  transformationVector3d,
  setTransformationVector3d,
  min,
  max,
}: Props) {
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setTransformationVector3d({
      ...transformationVector3d,
      [key]: event.target.value,
    });
  };

  const handleReset = () => {
    setTransformationVector3d({ x: 0, y: 0, z: 0 });
  };

  return (
    <div>
      <label className="inline-flex items-center m-2">
        <span className="ml-2 text-gray-700">{transformation}</span>&nbsp;
        <button
          className="px-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => handleReset()}
        >
          Reset
        </button>{" "}
      </label>
      <hr />
      <div>
        x:{" "}
        <input
          type="range"
          min={min}
          max={max}
          value={transformationVector3d.x}
          onChange={(event) => handleSliderChange(event, "x")}
        />
      </div>
      <div>
        y:{" "}
        <input
          type="range"
          min={min}
          max={max}
          value={transformationVector3d.y}
          onChange={(event) => handleSliderChange(event, "y")}
        />
      </div>
      <div>
        z:{" "}
        <input
          type="range"
          min={min}
          max={max}
          value={transformationVector3d.z}
          onChange={(event) => handleSliderChange(event, "z")}
        />
      </div>
      <hr className="border-t border-gray-300 my-4" />
    </div>
  );
}

export default Transformation3dWithSlider;
