import React from "react";
import Point2D from "../../geometry/Point2D";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../config";

interface Props {
  translationVector: Point2D;
  setTranslationVector: React.Dispatch<React.SetStateAction<Point2D>>;
  setTranslateChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Translation: React.FC<Props> = ({
  translationVector,
  setTranslationVector,
  setTranslateChecked,
}) => {
  const handleTranslationVectorInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof Point2D // x or y
  ) => {
    // Handle empty input
    if (event.target.value === "") {
      return setTranslationVector({ ...translationVector, [key]: "" });
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
    setTranslationVector({ ...translationVector, [key]: event.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setTranslateChecked(isChecked);
  };

  return (
    <div>
      <label className="inline-flex items-center m-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600"
          onChange={handleCheckboxChange}
        />
        <span className="ml-2 text-gray-700">Translate</span>
      </label>
      <hr />
      <div className="ml-9">
        Translation Vector: (
        <input
          type="number"
          className="border border-slate-700 w-12 h-5 text-center"
          value={translationVector.x}
          onChange={(e) => {
            handleTranslationVectorInputChange(e, "x");
          }}
        />
        ,{" "}
        <input
          type="number"
          className="border border-slate-700 w-12 h-5 text-center"
          value={translationVector.y}
          onChange={(e) => {
            handleTranslationVectorInputChange(e, "y");
          }}
        />
        )
      </div>
      <hr className="border-t border-gray-300 my-4" />
    </div>
  );
};

export default Translation;
