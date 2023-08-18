import Translation from "./transformations/Translation";
import Point from "../geometry/Point";

import React, { useState } from "react";

interface Props {
  points: Point[];
  setTransformedPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}

function TransformationMenu({ points, setTransformedPoints }: Props) {
  const [translateChecked, setTranslateChecked] = useState(false);
  const [translationVector, setTranslationVector] = useState<Point>({
    x: "",
    y: "",
  });

  const handleTransformClick = () => {
    // Initialize the temporary points array
    let tempPoints: Point[] = [];

    if (translateChecked) {
      // Convert the translationVector properties to integers
      const translateX = parseInt(translationVector.x);
      const translateY = parseInt(translationVector.y);

      // Apply translation to each point
      tempPoints = points.map((point) => {
        const newX = (parseInt(point.x) + translateX).toString();
        const newY = (parseInt(point.y) + translateY).toString();
        return { x: newX, y: newY };
      });
    }

    // Update the transformed points
    setTransformedPoints(tempPoints);
  };

  return (
    <div className="p-4 text-lg">
      <Translation
        translationVector={translationVector}
        setTranslationVector={setTranslationVector}
        setTranslateChecked={setTranslateChecked}
      />

      <div className="flex justify-end">
        <button
          onClick={handleTransformClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Transform
        </button>
      </div>
    </div>
  );
}

export default TransformationMenu;
