import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../config";

import Sketch from "react-p5";
import { Vector } from "p5"; // for typechecking and intellisense
import p5Types from "p5";

class Path {
  points: Vector[];
  closed: boolean;

  constructor(p5: p5Types) {
    this.points = [];
    this.points.push(
      p5.createVector(CANVAS_WIDTH / 2 - 150, CANVAS_HEIGHT / 2)
    );
    this.points.push(
      p5.createVector(CANVAS_WIDTH / 2 - 75, CANVAS_HEIGHT / 2 - 75)
    );
    this.points.push(
      p5.createVector(CANVAS_WIDTH / 2 + 75, CANVAS_HEIGHT / 2 + 75)
    );
    this.points.push(
      p5.createVector(CANVAS_WIDTH / 2 + 150, CANVAS_HEIGHT / 2)
    );
    this.closed = false;
  }

  loopIndex(i: number) {
    return (i + this.points.length) % this.points.length;
  }

  numSegments() {
    return Math.floor(this.points.length / 3);
  }

  getSegment(i: number) {
    return [
      this.points[this.loopIndex(i * 3 + 0)],
      this.points[this.loopIndex(i * 3 + 1)],
      this.points[this.loopIndex(i * 3 + 2)],
      this.points[this.loopIndex(i * 3 + 3)],
    ];
  }

  movePoint(point: Vector, x: number, y: number) {
    const i = this.points.indexOf(point);

    if (i % 3 == 0) {
      const dx = x - point.x;
      const dy = y - point.y;
      point.set(x, y);
      if (i - 1 >= 0 || this.closed) {
        this.points[this.loopIndex(i - 1)].add(dx, dy);
      }
      if (i + 1 < this.points.length || this.closed) {
        this.points[this.loopIndex(i + 1)].add(dx, dy);
      }
    } else {
      point.set(x, y);
      const anchorI = i % 3 == 1 ? i - 1 : i + 1;
      const otherI = i % 3 == 1 ? i - 2 : i + 2;
      if ((otherI >= 0 && otherI < this.points.length) || this.closed) {
        const anchor = this.points[this.loopIndex(anchorI)];
        const other = this.points[this.loopIndex(otherI)];

        const dist = Vector.dist(anchor, other);
        const disp = Vector.sub(anchor, point);
        disp.setMag(dist);
        other.set(Vector.add(anchor, disp));
      }
    }
  }

  render(p5: p5Types) {
    for (let i = 0; i < this.numSegments(); i++) {
      const seg = this.getSegment(i);
      p5.stroke(0);
      p5.line(seg[0].x, seg[0].y, seg[1].x, seg[1].y);
      p5.line(seg[2].x, seg[2].y, seg[3].x, seg[3].y);
    }

    p5.stroke(0, 255, 0);
    p5.noFill();
    p5.beginShape();
    p5.vertex(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.numSegments(); i++) {
      const seg = this.getSegment(i);
      p5.bezierVertex(
        seg[1].x,
        seg[1].y,
        seg[2].x,
        seg[2].y,
        seg[3].x,
        seg[3].y
      );
    }
    p5.endShape();

    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      if (i % 3 == 0) {
        p5.noStroke();
        p5.fill(255, 0, 0);
        p5.circle(p.x, p.y, 10);
      } else {
        p5.noStroke();
        p5.fill(0);
        p5.circle(p.x, p.y, 8);
      }
    }
  }
}

const CanvasCurveModeling = () => {
  let path: Path;
  let moving: Vector | null = null;

  // See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);

    path = new Path(p5);
  };

  const draw = (p5: p5Types) => {
    p5.background(220);
    if (path) {
      path.render(p5);
    }
  };

  function mousePressed(p5: p5Types) {
    if (p5.mouseButton == p5.LEFT) {
      if (path) {
        for (const p of path.points) {
          if (p5.dist(p.x, p.y, p5.mouseX, p5.mouseY) < 5) {
            moving = p;
            return;
          }
        }
      }
    }
  }

  function mouseDragged(p5: p5Types) {
    if (moving) {
      path.movePoint(moving, p5.mouseX, p5.mouseY);
    }
  }

  function mouseReleased() {
    if (moving) moving = null;
  }

  return (
    <div className="my-6">
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
      />
    </div>
  );
};

export default CanvasCurveModeling;
