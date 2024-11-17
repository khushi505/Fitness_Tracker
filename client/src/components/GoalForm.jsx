// src/components/GoalForm.jsx
import { useState, useEffect } from "react";
import { createGoal, updateGoal } from "../services/api";

const GoalForm = ({ fetchGoals, editingGoal, setEditingGoal }) => {
  const [type, setType] = useState("");
  const [target, setTarget] = useState("");
  const [targetLeft, setTargetLeft] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingGoal) {
      setType(editingGoal.type);
      setTarget(editingGoal.target);
      setTargetLeft(editingGoal.targetLeft);
    } else {
      setType("");
      setTarget("");
      setTargetLeft("");
    }
  }, [editingGoal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = {
      type,
      target: Number(target),
      targetLeft: Number(targetLeft),
    };

    try {
      if (goalData.targetLeft > goalData.target) {
        setError("Target Left cannot be greater than Target.");
        return;
      }

      if (editingGoal) {
        await updateGoal(editingGoal._id, goalData);
        setEditingGoal(null);
      } else {
        await createGoal(goalData);
      }
      fetchGoals();
      setType("");
      setTarget("");
      setTargetLeft("");
      setError("");
    } catch (error) {
      console.error("Error submitting goal:", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleCancel = () => {
    setEditingGoal(null);
    setType("");
    setTarget("");
    setTargetLeft("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--card-bg-color)] shadow-md rounded px-8 pt-6 pb-8 mb-8 mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <h3 className="text-xl font-semibold mb-4 text-yellow-500 text-center">
        {editingGoal ? "Edit Goal" : "Add Goal"}
      </h3>

      <div className="mb-4 flex items-center">
        <label className="text-gray-200 text-sm font-bold mr-4 w-28">
          Goal Type:
        </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter goal type"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label className="text-gray-200 text-sm font-bold mr-4 w-28">
          Target:
        </label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
          min="1"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter target value"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label className="text-gray-200 text-sm font-bold mr-4 w-28">
          Target Left:
        </label>
        <input
          type="number"
          value={targetLeft}
          onChange={(e) => setTargetLeft(e.target.value)}
          required
          min="0"
          max={target || undefined}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter target left"
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1.5 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          {editingGoal ? "Update" : "Add"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default GoalForm;
