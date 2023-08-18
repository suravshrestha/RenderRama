import React from "react";
import Point from "../../geometry/Point";

interface Props {
  scalingVector: Point;
  setScalingVector: React.Dispatch<React.SetStateAction<Point>>;
  setScaleChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scaling: React.FC<Props> = ({
  scalingVector,
  setScalingVector,
  setScaleChecked,
}) => {
  const handleScalingVectorInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof Point // x or y
  ) => {
    // Handle empty input
    if (event.target.value === "") {
      return setScalingVector({ ...scalingVector, [key]: "" });
    }

    // Handle scaling factor
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setScalingVector({ ...scalingVector, [key]: event.target.value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setScaleChecked(isChecked);
  };

  return (
    <div>
      <label className="inline-flex items-center m-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600"
          onChange={handleCheckboxChange}
        />
        <span className="ml-2 text-gray-700">Scale</span>
      </label>
      <hr />
      <div className="ml-9">
        Scaling Factor: (
        <input
          type="number"
          className="border border-slate-700 w-12 h-5 text-center"
          value={scalingVector.x}
          onChange={(e) => {
            handleScalingVectorInputChange(e, "x");
          }}
        />
        ,{" "}
        <input
          type="number"
          className="border border-slate-700 w-12 h-5 text-center"
          value={scalingVector.y}
          onChange={(e) => {
            handleScalingVectorInputChange(e, "y");
          }}
        />
        )
      </div>
      <hr className="border-t border-gray-300 my-4" />
    </div>
  );
};

export default Scaling;
