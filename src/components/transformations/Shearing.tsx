import Point2D from "../../geometry/Point2D";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../../config";

import React from "react";

interface Props {
  shearingVector: Point2D;
  setShearingVector: React.Dispatch<React.SetStateAction<Point2D>>;

  shearDirection: string;
  setShearDirection: React.Dispatch<React.SetStateAction<string>>;

  setShearChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Shearing: React.FC<Props> = ({
  shearingVector,
  setShearingVector,
  shearDirection,
  setShearDirection,
  setShearChecked,
}) => {
  const handleShearingVectorInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof Point2D // x or y
  ) => {
    // Handle empty input
    if (event.target.value === "") {
      return setShearingVector({ ...shearingVector, [key]: "" });
    }

    // Handle point range
    const value = parseInt(event.target.value);
    if (
      (key === "x" && Math.abs(value) > CANVAS_WIDTH / 2) ||
      (key === "y" && Math.abs(value) > CANVAS_HEIGHT / 2)
    ) {
      return;
    }

    // Update state
    setShearingVector({ ...shearingVector, [key]: event.target.value });
  };

  const handleShearDirectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShearDirection(event.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setShearChecked(isChecked);
  };

  return (
    <div>
      <label className="inline-flex items-center m-2">
        <input
          type="checkbox"
          id="shear-checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600"
          onChange={handleCheckboxChange}
        />
        <span className="ml-2 text-gray-700">Shear</span>
      </label>
      <hr />
      <div className="ml-9">
        Shearing Vector: (
        <input
          type="number"
          className="border border-slate-700 w-12 h-5 text-center"
          value={shearingVector.x}
          onChange={(e) => {
            handleShearingVectorInputChange(e, "x");
          }}
        />
        ,{" "}
        <input
          type="number"
          className="border border-slate-700 w-12 h-5 text-center"
          value={shearingVector.y}
          onChange={(e) => {
            handleShearingVectorInputChange(e, "y");
          }}
        />
        )
        <hr />
        Direction:
        <label className="ml-2">
          <input
            type="radio"
            value="x-axis"
            checked={shearDirection === "x-axis"}
            onChange={handleShearDirectionChange}
          />{" "}
          X
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="y-axis"
            checked={shearDirection === "y-axis"}
            onChange={handleShearDirectionChange}
          />{" "}
          Y
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="both"
            checked={shearDirection === "both"}
            onChange={handleShearDirectionChange}
          />{" "}
          Both
        </label>
      </div>
      <hr className="border-t border-gray-300 my-4" />
    </div>
  );
};

export default Shearing;
