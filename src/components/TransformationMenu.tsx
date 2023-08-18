import Translation from "./transformations/Translation";
import Rotation from "./transformations/Rotation";
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

  const [rotateChecked, setRotateChecked] = useState(false);
  const [rotationAngle, setRotationAngle] = useState("");
  const [rotationDirection, setRotationDirection] = useState("clockwise");

  const handleTransformClick = () => {
    // Initialize the temporary points array
    let tempPoints: Point[] = [...points]; // Clone the original points

    if (translateChecked) {
      // Convert the translationVector properties to integers
      const translateX = parseInt(translationVector.x);
      const translateY = parseInt(translationVector.y);

      // Apply translation to each point
      tempPoints = tempPoints.map((point) => ({
        x: (parseInt(point.x) + translateX).toString(),
        y: (parseInt(point.y) + translateY).toString(),
      }));
    }

    if (rotateChecked) {
      // Convert the rotation angle to radians
      const rotationAngleRad =
        ((parseInt(rotationAngle) * Math.PI) / 180) *
        (rotationDirection === "anticlockwise" ? -1 : 1);

      // Use the first point as the pivot point
      const pivotX = parseInt(tempPoints[0].x);
      const pivotY = parseInt(tempPoints[0].y);

      tempPoints = tempPoints.map((point) => {
        const x = parseInt(point.x);
        const y = parseInt(point.y);

        // Calculate rotated coordinates around the pivot point
        const rotatedX =
          Math.cos(rotationAngleRad) * (x - pivotX) -
          Math.sin(rotationAngleRad) * (y - pivotY) +
          pivotX;

        const rotatedY =
          Math.sin(rotationAngleRad) * (x - pivotX) +
          Math.cos(rotationAngleRad) * (y - pivotY) +
          pivotY;

        return { x: rotatedX.toString(), y: rotatedY.toString() };
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

      <Rotation
        rotationAngle={rotationAngle}
        setRotationAngle={setRotationAngle}
        rotationDirection={rotationDirection}
        setRotationDirection={setRotationDirection}
        setRotateChecked={setRotateChecked}
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
