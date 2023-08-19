import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../config";
import Point3D from "../geometry/Point3D";

import Sketch from "react-p5";
import p5Types from "p5"; // for typechecking and intellisense

interface Props {
  translationVector3d: Point3D;
  rotationVector3d: Point3D;
  scalingVector3d: Point3D;
  shearingVector3d: Point3D;
}

const Canvas3D = ({
  translationVector3d,
  rotationVector3d,
  scalingVector3d,
  shearingVector3d,
}: Props) => {
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

    p5.translate(
      translationVector3d.x,
      translationVector3d.y,
      translationVector3d.z
    );

    p5.angleMode(p5.DEGREES);
    p5.rotateX(rotationVector3d.x);
    p5.rotateY(rotationVector3d.y);
    p5.rotateZ(rotationVector3d.z);

    p5.scale(scalingVector3d.x, scalingVector3d.y, scalingVector3d.z);

    p5.shearX(shearingVector3d.x);
    p5.shearY(shearingVector3d.y);

    p5.box(25);
  };

  return (
    <div className="sticky top-20">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Canvas3D;
