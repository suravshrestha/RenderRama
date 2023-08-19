import { useState } from "react";

interface Props {
  onCurveChange: (points: Point2D[]) => void;
}

interface Point2D {
  x: number;
  y: number;
}

function BezierCurveModeling({ onCurveChange }: Props) {
  const [controlPoints, setControlPoints] = useState<Point2D[]>([
    { x: 100, y: 100 },
    { x: 200, y: 50 },
    { x: 300, y: 200 },
    { x: 400, y: 100 },
  ]);

  const handlePointChange = (index: number, point: Point2D) => {
    const updatedPoints = [...controlPoints];
    updatedPoints[index] = point;
    setControlPoints(updatedPoints);
    onCurveChange(updatedPoints);
  };

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Bezier Curve Modeling</h2>
      {controlPoints.map((point, index) => (
        <div key={index} className="mb-2">
          <label className="block text-gray-600 font-medium mb-1">
            Control Point {index + 1}
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              className="w-16 p-2 border rounded"
              placeholder="X"
              value={point.x}
              onChange={(e) =>
                handlePointChange(index, {
                  ...point,
                  x: parseFloat(e.target.value),
                })
              }
            />
            <input
              type="number"
              className="w-16 p-2 border rounded"
              placeholder="Y"
              value={point.y}
              onChange={(e) =>
                handlePointChange(index, {
                  ...point,
                  y: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BezierCurveModeling;
