import Transformation3dWithSlider from "./Transformation3dWithSlider";
import Point3D from "../geometry/Point3D";

import React from "react";

interface Props {
  translationVector3d: Point3D;
  setTranslationVector3d: React.Dispatch<React.SetStateAction<Point3D>>;
}

function TransformationMenu3D({
  translationVector3d,
  setTranslationVector3d,
}: Props) {
  return (
    <div>
      <Transformation3dWithSlider
        transformation="Translate"
        transformationVector3d={translationVector3d}
        setTransformationVector3d={setTranslationVector3d}
        min="-100"
        max="100"
      />
    </div>
  );
}

export default TransformationMenu3D;
