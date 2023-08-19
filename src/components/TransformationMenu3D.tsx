import Transformation3dWithSlider from "./Transformation3dWithSlider";
import Point3D from "../geometry/Point3D";

import React from "react";

interface Props {
  translationVector3d: Point3D;
  setTranslationVector3d: React.Dispatch<React.SetStateAction<Point3D>>;

  rotationVector3d: Point3D;
  setRotationVector3d: React.Dispatch<React.SetStateAction<Point3D>>;

  scalingVector3d: Point3D;
  setScalingVector3d: React.Dispatch<React.SetStateAction<Point3D>>;
}

function TransformationMenu3D({
  translationVector3d,
  setTranslationVector3d,

  rotationVector3d,
  setRotationVector3d,

  scalingVector3d,
  setScalingVector3d,
}: Props) {
  return (
    <div className="grid grid-cols-2">
      <Transformation3dWithSlider
        transformation="Translate"
        transformationVector3d={translationVector3d}
        setTransformationVector3d={setTranslationVector3d}
        defaultValue={0}
        min={-100}
        max={100}
      />

      <Transformation3dWithSlider
        transformation="Rotate"
        transformationVector3d={rotationVector3d}
        setTransformationVector3d={setRotationVector3d}
        min={0}
        max={360}
      />

      <Transformation3dWithSlider
        transformation="Scale"
        transformationVector3d={scalingVector3d}
        setTransformationVector3d={setScalingVector3d}
        min={1}
        max={5}
      />
    </div>
  );
}

export default TransformationMenu3D;
