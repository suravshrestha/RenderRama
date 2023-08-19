import Transformation3dWithSlider from "./Transformation3dWithSlider";
import Point3D from "../geometry/Point3D";

import React from "react";

interface Props {
  translationVector3d: Point3D;
  setTranslationVector3d: React.Dispatch<React.SetStateAction<Point3D>>;

  rotationVector3d: Point3D;
  setRotationVector3d: React.Dispatch<React.SetStateAction<Point3D>>;
}

function TransformationMenu3D({
  translationVector3d,
  setTranslationVector3d,

  rotationVector3d,
  setRotationVector3d,
}: Props) {
  return (
    <div className="grid grid-flow-col">
      <Transformation3dWithSlider
        transformation="Translate"
        transformationVector3d={translationVector3d}
        setTransformationVector3d={setTranslationVector3d}
        min="-100"
        max="100"
      />

      <Transformation3dWithSlider
        transformation="Rotate"
        transformationVector3d={rotationVector3d}
        setTransformationVector3d={setRotationVector3d}
        min="0"
        max="360"
      />
    </div>
  );
}

export default TransformationMenu3D;
