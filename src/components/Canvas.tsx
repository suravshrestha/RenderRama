import Point from "../geometry/Point";

import Sketch from "react-p5";
import p5Types from "p5"; // for typechecking and intellisense

interface Props {
  points: Point[];
}

const Canvas = ({ points }: Props) => {
  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(750, 500).parent(canvasParentRef);
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

      // Close the shape
      p5.endShape(p5.CLOSE);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Canvas;
