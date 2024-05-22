"use client";
import { supabase } from "@/utils/supabase";
import { X } from "lucide-react";
import React, { useState } from "react";

function PointsForm({
  setOpenThingsCovered,
  setThingsCovered,
}) {
  const [points, setPoints] = useState([{ label: 1, value: "" }]);

  const handleChange = (index, value) => {
    const newPoints = [...points];
    newPoints[index].value = value;
    setPoints(newPoints);
  };

  const handleAddField = () => {
    const newLabel = `${points.length + 1}`;
    setPoints([...points, { label: newLabel, value: "" }]);
  };

  const handleSubmit =() => {
    const pointsObject = {};
    points.forEach((point) => {
      pointsObject[point.label] = point.value;
    });
    setThingsCovered(pointsObject);
    setOpenThingsCovered(false);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-8 w-full overflow-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl">Add + Things Covered</h1>
        <X className="cursor-pointer" onClick={() => setOpenThingsCovered(false)} />
      </div>
      <div className="flex flex-col gap-2">
        {points.map((point, index) => (
          <div key={index}>
            <input
              type="text"
              value={point.value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Enter Point No. ${point.label} `}
              className="p-2 border-2 rounded-md w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <div className="flex">
          <button
            className="p-3 bg-primary text-white rounded-md w-[8rem]"
            onClick={handleAddField}
          >
            Add More +
          </button>
        </div>
        <div className="flex">
          <button className="p-3 bg-green-600 text-white rounded-md w-[8rem]" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default PointsForm;
