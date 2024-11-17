// src/components/ActivityForm.jsx
import { useState, useEffect } from "react";
import { createActivity, updateActivity } from "../services/api";

const ActivityForm = ({
  fetchActivities,
  editingActivity,
  setEditingActivity,
}) => {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingActivity) {
      setType(editingActivity.type);
      setDuration(editingActivity.duration);
      setCaloriesBurned(editingActivity.caloriesBurned);
    } else {
      setType("");
      setDuration("");
      setCaloriesBurned("");
    }
  }, [editingActivity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const activityData = {
      type,
      duration: Number(duration),
      caloriesBurned: Number(caloriesBurned),
    };

    try {
      if (editingActivity) {
        await updateActivity(editingActivity._id, activityData);
        setEditingActivity(null);
      } else {
        await createActivity(activityData);
      }
      fetchActivities();
      setType("");
      setDuration("");
      setCaloriesBurned("");
      setError("");
    } catch (error) {
      console.error("Error submitting activity:", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleCancel = () => {
    setEditingActivity(null);
    setType("");
    setDuration("");
    setCaloriesBurned("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--card-bg-color)] shadow-md rounded px-8 pt-6 pb-8 mb-8 mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <h3 className="text-xl font-semibold mb-4 text-yellow-500 text-center">
        {editingActivity ? "Edit Activity" : "Add Activity"}
      </h3>

      <div className="mb-4 flex items-center">
        <label className="text-gray-200 text-sm font-bold mr-4 w-28">
          Type:
        </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter activity type"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label className="text-gray-200 text-sm font-bold mr-4 w-28">
          Duration:
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          min="1"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter duration"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label className="text-gray-200 text-sm font-bold mr-4 w-28">
          Calories:
        </label>
        <input
          type="number"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          required
          min="0"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter calories burned"
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1.5 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          {editingActivity ? "Update" : "Add"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default ActivityForm;
