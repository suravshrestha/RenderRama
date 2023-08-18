import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../config";

import Sketch from "react-p5";
import p5Types from "p5"; // for typechecking and intellisense

const Canvas3D = () => {
  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.WEBGL).parent(
      canvasParentRef
    );
    p5.camera(0, -120, 120, 0, 100, -100, 0, 1, 0);
    p5.debugMode(p5.GRID, 100, 6);
  };

  const draw = (p5: p5Types) => {
    p5.background(220);
    p5.orbitControl();
    p5.box(25);
  };

  return (
    <div className="sticky top-20">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Canvas3D;
