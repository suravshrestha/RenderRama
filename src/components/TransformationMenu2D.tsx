import Translation from "./transformations/Translation";
import Rotation from "./transformations/Rotation";
import Scaling from "./transformations/Scaling";
import Reflection from "./transformations/Reflection";
import Shearing from "./transformations/Shearing";

import Point from "../geometry/Point";

import React, { useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../config";

interface Props {
  points: Point[];
  setTransformedPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}

function TransformationMenu2D({
  points,
  setTransformedPoints,
}: Props) {
  const [translateChecked, setTranslateChecked] = useState(false);
  const [translationVector, setTranslationVector] = useState<Point>({
    x: "",
    y: "",
  });

  const [rotateChecked, setRotateChecked] = useState(false);
  const [rotationAngle, setRotationAngle] = useState("");
  const [rotationDirection, setRotationDirection] = useState("clockwise");

  const [scaleChecked, setScaleChecked] = useState(false);
  const [scalingVector, setScalingVector] = useState<Point>({
    x: "",
    y: "",
  });

  const [reflectChecked, setReflectChecked] = useState(false);
  const [reflectionAbout, setReflectionAbout] = useState("x-axis");

  const [shearingVector, setShearingVector] = useState<Point>({
    x: "",
    y: "",
  });
  const [shearChecked, setShearChecked] = useState(false);
  const [shearDirection, setShearDirection] = useState("x-axis");

  const handleTransformClick = () => {
    // Initialize the temporary points array
    let tempPoints: Point[] = points.filter(
      (point) => !isNaN(parseInt(point.x)) || !isNaN(parseInt(point.y))
    );

    if (translateChecked) {
      // Convert the translationVector properties to integers
      const translateX = parseInt(translationVector.x);
      const translateY = parseInt(translationVector.y);

      const centerX = CANVAS_WIDTH / 2;
      const centerY = CANVAS_HEIGHT / 2;

      // Apply translation to each point
      tempPoints = tempPoints.map((point) => {
        // Convert point coordinates to center-origin coordinates
        const x = parseInt(point.x) - centerX;
        const y = centerY - parseInt(point.y); // Invert y-coordinate

        // Apply translation to the center-origin coordinates
        const translatedX = x + translateX;
        const translatedY = y + translateY;

        // Convert back to canvas coordinates
        const canvasX = translatedX + centerX;
        const canvasY = centerY - translatedY; // Invert y-coordinate

        return {
          x: canvasX.toString(),
          y: canvasY.toString(),
        };
      });
    }

    if (rotateChecked) {
      // Convert the rotation angle to radians
      const rotationAngleRad =
        ((parseInt(rotationAngle) * Math.PI) / 180) *
        (rotationDirection === "anticlockwise" ? 1 : -1);

      tempPoints = tempPoints.map((point) => {
        const x = parseInt(point.x);
        const y = parseInt(point.y);

        // Calculate rotated coordinates around the origin (center of the canvas)
        const rotatedX =
          Math.cos(rotationAngleRad) * x - Math.sin(rotationAngleRad) * y;

        const rotatedY =
          Math.sin(rotationAngleRad) * x + Math.cos(rotationAngleRad) * y;

        return { x: rotatedX.toString(), y: rotatedY.toString() };
      });
    }

    if (scaleChecked) {
      // Parse scaling factors
      const scaleX = parseFloat(scalingVector.x);
      const scaleY = parseFloat(scalingVector.y);

      // Apply scaling to each point
      tempPoints = tempPoints.map((point) => {
        const x = parseInt(point.x);
        const y = parseInt(point.y);

        // Calculate the offset from the center of the canvas
        const offsetX = x - CANVAS_WIDTH / 2;
        const offsetY = y - CANVAS_HEIGHT / 2;

        // Scale the offset
        const scaledOffsetX = offsetX * scaleX;
        const scaledOffsetY = offsetY * scaleY;

        // Calculate the new scaled coordinates by adding the scaled offset to the center
        const scaledX = CANVAS_WIDTH / 2 + scaledOffsetX;
        const scaledY = CANVAS_HEIGHT / 2 + scaledOffsetY;

        return { x: scaledX.toString(), y: scaledY.toString() };
      });
    }

    if (reflectChecked) {
      tempPoints = tempPoints.map((point) => {
        const x = parseInt(point.x);
        const y = parseInt(point.y);

        // Calculate reflected coordinates based on the selected axis or line
        let reflectedX = 0,
          reflectedY = 0;
        if (reflectionAbout === "x-axis") {
          reflectedX = x;
          reflectedY = -y;
        } else if (reflectionAbout === "y-axis") {
          reflectedX = -x;
          reflectedY = y;
        } else if (reflectionAbout === "y=x") {
          reflectedX = y;
          reflectedY = x;
        } else if (reflectionAbout === "y=-x") {
          reflectedX = -y;
          reflectedY = -x;
        }

        return { x: reflectedX.toString(), y: reflectedY.toString() };
      });
    }

    if (shearChecked) {
      const shearX = parseFloat(shearingVector.x);
      const shearY = parseFloat(shearingVector.y);

      tempPoints = tempPoints.map((point) => {
        const x = parseInt(point.x);
        const y = parseInt(point.y);

        let shearedX = x,
          shearedY = y;
        if (shearDirection === "x-axis") {
          shearedX = x + shearX * y;
        } else if (shearDirection === "y-axis") {
          shearedY = y + shearY * x;
        } else {
          shearedX = x + shearX * y;
          shearedY = y + shearY * x;
        }

        return { x: shearedX.toString(), y: shearedY.toString() };
      });
    }

    // Update the transformed points
    setTransformedPoints(tempPoints);
  };

  return (
    <div>
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

      <Scaling
        scalingVector={scalingVector}
        setScalingVector={setScalingVector}
        setScaleChecked={setScaleChecked}
      />

      <Reflection
        reflectionAbout={reflectionAbout}
        setReflectionAbout={setReflectionAbout}
        setReflectChecked={setReflectChecked}
      />

      <Shearing
        shearingVector={shearingVector}
        setShearingVector={setShearingVector}
        shearDirection={shearDirection}
        setShearDirection={setShearDirection}
        setShearChecked={setShearChecked}
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

export default TransformationMenu2D;
