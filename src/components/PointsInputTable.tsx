import Point from "../geometry/Point";
import { CANVAS_WIDTH } from "../../config";

import React from "react";

interface Props {
  points: Point[];
  setPoints: (points: Point[]) => void;
}

const PointsInputTable = ({ points, setPoints }: Props) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: keyof Point // x or y
  ) => {
    // Handle empty input
    if (event.target.value === "") {
      const newPoints = points.slice();
      newPoints[index][key] = "";
      return setPoints(newPoints);
    }

    // Handle point range
    const value = parseInt(event.target.value);
    if (value > CANVAS_WIDTH || value < 0) {
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
    <table className="border-collapse border border-slate-500 p-1">
      <thead className="h-8">
        <tr>
          <th className="border border-slate-700" colSpan={2}>
            <div className="flex items-center justify-center space-x-6">
              <span>Points</span>
              <button
                type="button"
                className="text-red-600 underline"
                onClick={() =>
                  setPoints([
                    { x: "", y: "" },
                    { x: "", y: "" },
                  ])
                }
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