import Point2D from "../geometry/Point2D";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../config";

import React from "react";

interface Props {
  points: Point2D[];
  setTransformedPoints: (points: Point2D[]) => void;
  setPoints: (points: Point2D[]) => void;
}

const PointsInputTable = ({
  points,
  setPoints,
  setTransformedPoints,
}: Props) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: keyof Point2D // x or y
  ) => {
    // Handle empty input
    if (event.target.value === "") {
      const newPoints = points.slice();
      newPoints[index][key] = "";
      return setPoints(newPoints);
    }

    // Handle point range
    const value = parseInt(event.target.value);
    if (
      (key === "x" && Math.abs(value) > CANVAS_WIDTH / 2) ||
      (key === "y" && Math.abs(value) > CANVAS_HEIGHT / 2)
    ) {
      return;
    }

    // Update state
    const newPoints = points.slice();
    newPoints[index][key] = event.target.value;
    setPoints(newPoints);
  };

  // Append row if table is full
  if (points[points.length - 1].y) {
    points.push({ x: "", y: "" });
  }

  return (
    <table className="border-collapse border border-slate-500 p-1 sticky top-20">
      <thead className="h-8">
        <tr>
          <th className="border border-slate-700" colSpan={2}>
            <div className="flex items-center justify-center space-x-6">
              <span>Points</span>
              <button
                type="button"
                className="text-red-600 underline"
                onClick={() => {
                  setPoints([
                    { x: "", y: "" },
                    { x: "", y: "" },
                  ]);

                  setTransformedPoints([]);
                }}
              >
                Reset
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <thead className="h-8">
        <tr>
          <th className="border border-slate-700">X</th>
          <th className="border border-slate-700">Y</th>
        </tr>
      </thead>
      <tbody>
        {points.map((coord, index) => (
          <tr key={index}>
            <td className="border border-slate-700">
              <input
                className="w-full text-center"
                value={coord.x}
                onChange={(e) => {
                  handleInputChange(e, index, "x");
                }}
              />
            </td>
            <td className="border border-slate-700">
              <input
                className="w-full text-center"
                value={coord.y}
                onChange={(e) => handleInputChange(e, index, "y")}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PointsInputTable;
