import React from "react";

interface Props {
  rotationAngle: string;
  setRotationAngle: React.Dispatch<React.SetStateAction<string>>;
  rotationDirection: string;
  setRotationDirection: React.Dispatch<React.SetStateAction<string>>;
  setRotateChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Rotation: React.FC<Props> = ({
  rotationAngle,
  setRotationAngle,
  rotationDirection,
  setRotationDirection,
  setRotateChecked,
}) => {
  const handleRotationAngleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Handle empty input
    if (event.target.value === "") {
      return;
    }

    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setRotationAngle(event.target.value);
    }
  };

  const handleRotationDirectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRotationDirection(event.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRotateChecked(isChecked);
  };

  return (
    <div>
      <label className="inline-flex items-center m-2">
        <input
          type="checkbox"
          id="rotate-checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600"
          onChange={handleCheckboxChange}
        />
        <span className="ml-2 font-semibold">Rotate</span>
      </label>
      <hr />
      <div className="ml-9">
        Rotation Angle:{" "}
        <input
          type="number"
          className="border border-slate-700 w-10 h-5 text-center"
          value={rotationAngle}
          onChange={handleRotationAngleInputChange}
        />{" "}
        degrees
        <div className="mt-2">
          Rotation Direction:
          <br />
          <label className="ml-2">
            <input
              type="radio"
              value="clockwise"
              checked={rotationDirection === "clockwise"}
              onChange={handleRotationDirectionChange}
            />{" "}
            Clockwise
          </label>
          <label className="ml-2">
            <input
              type="radio"
              value="anticlockwise"
              checked={rotationDirection === "anticlockwise"}
              onChange={handleRotationDirectionChange}
            />{" "}
            Anticlockwise
          </label>
        </div>
      </div>
      <hr className="border-t border-gray-300 my-4" />
    </div>
  );
};

export default Rotation;
