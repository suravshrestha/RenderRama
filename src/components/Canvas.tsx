import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; // for typechecking and intellisense

const Canvas: React.FC = () => {
  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(800, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(220);
    p5.triangle(0, 0, 400, 0, 0, 250)
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Canvas;
