import Point2D from "../geometry/Point2D";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../config";

import Sketch from "react-p5";
import p5Types from "p5"; // for typechecking and intellisense

interface Props {
  points: Point2D[];
  transformedPoints: Point2D[];
}

const Canvas2D = ({ points, transformedPoints }: Props) => {
  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(220);

    const centerX = p5.width / 2; // Center X coordinate of the canvas
    const centerY = p5.height / 2; // Center Y coordinate of the canvas

    // Draw the x and y axes
    p5.stroke(0); // Black color
    p5.line(centerX, 0, centerX, p5.height); // Vertical line (y-axis)
    p5.line(0, centerY, p5.width, centerY); // Horizontal line (x-axis)

    // Draw the original polygon
    if (points.length >= 3) {
      p5.beginShape();
      p5.stroke(0); // Black color

      points.forEach((point) => {
        const x = centerX + parseInt(point.x);
        const y = centerY - parseInt(point.y); // Invert y-coordinate to match p5.js coordinate system
        p5.vertex(x, y);
      });

      p5.endShape(p5.CLOSE);
    }

    // Draw the transformed polygon
    if (transformedPoints.length >= 3) {
      p5.beginShape();
      p5.stroke(0, 0, 255); // Blue color

      transformedPoints.forEach((transformedPoint) => {
        const x = centerX + parseInt(transformedPoint.x);
        const y = centerY - parseInt(transformedPoint.y); // Invert y-coordinate
        p5.vertex(x, y);
      });

      p5.endShape(p5.CLOSE);
    }
  };

  return (
    <div className="sticky top-36">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Canvas2D;
