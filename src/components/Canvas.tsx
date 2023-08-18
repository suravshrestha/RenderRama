import Point from "../geometry/Point";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../config";

import Sketch from "react-p5";
import p5Types from "p5"; // for typechecking and intellisense

interface Props {
  points: Point[];
  transformedPoints: Point[];
}

const Canvas = ({ points, transformedPoints }: Props) => {
  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(220);

    // 2 points + 1 empty point
    if (points.length >= 3) {
      // Begin drawing the polygon
      p5.beginShape();

      // Loop through the points and add each vertex to the shape
      points.forEach((point) => {
        const x = parseInt(point.x);
        const y = parseInt(point.y);
        p5.vertex(x, y);
      });

      // Set the stroke color for the original polygon outline
      p5.stroke(0, 0, 0); // Black color

      // Close the shape
      p5.endShape(p5.CLOSE);
    }

    // Draw the transformed polygon
    if (transformedPoints.length >= 3) {
      // Begin drawing the transformed polygon
      p5.beginShape();

      // Set the stroke color for the transformed polygon outline
      p5.stroke(0, 0, 255); // Blue color

      // Loop through the transformed points and add each vertex to the transformed shape
      transformedPoints.forEach((transformedPoint) => {
        const x = parseInt(transformedPoint.x);
        const y = parseInt(transformedPoint.y);
        p5.vertex(x, y);
      });

      // End the shape for the transformed polygon
      p5.endShape(p5.CLOSE);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Canvas;
