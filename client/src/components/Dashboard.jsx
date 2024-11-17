import { useState, useEffect } from "react";
import { getActivities, getGoals } from "../services/api";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [activitySummary, setActivitySummary] = useState({
    totalActivities: 0,
    totalDuration: 0,
    totalCalories: 0,
  });
  const [error, setError] = useState("");

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      const activitiesData = response.data.data;
      setActivities(activitiesData);
      calculateActivitySummary(activitiesData);
      setError("");
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Failed to fetch activities.");
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await getGoals();
      setGoals(response.data.data);
      setError("");
    } catch (error) {
      console.error("Error fetching goals:", error);
      setError("Failed to fetch goals.");
    }
  };

  const calculateActivitySummary = (activitiesData) => {
    const totalActivities = activitiesData.length;
    const totalDuration = activitiesData.reduce(
      (sum, activity) => sum + activity.duration,
      0
    );
    const totalCalories = activitiesData.reduce(
      (sum, activity) => sum + activity.caloriesBurned,
      0
    );
    setActivitySummary({ totalActivities, totalDuration, totalCalories });
  };

  useEffect(() => {
    fetchActivities();
    fetchGoals();
  }, []);

  const calculateGoalProgress = (goal) => {
    const progress = goal.target - goal.targetLeft;
    const percentage = (progress / goal.target) * 100;
    return Math.min(percentage, 100);
  };

  const activityLabels = activities.map((activity) => {
    const date = new Date(activity.date);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return `${formattedDate} - ${activity.type}`;
  });

  const activityDurations = activities.map((activity) => activity.duration);
  const caloriesBurned = activities.map((activity) => activity.caloriesBurned);

  const goalStatuses = goals.reduce(
    (acc, goal) => {
      if (goal.completed) {
        acc.completed += 1;
      } else {
        acc.inProgress += 1;
      }
      return acc;
    },
    { completed: 0, inProgress: 0 }
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: "Date - Activity", color: "#e0e0e0" },
        ticks: { color: "#e0e0e0" },
      },
      y: {
        title: { display: true, text: "Values", color: "#e0e0e0" },
        ticks: { color: "#e0e0e0" },
      },
    },
    plugins: {
      legend: { position: "top", labels: { color: "#e0e0e0" } },
    },
  };

  const lineChartData = {
    labels: activityLabels,
    datasets: [
      {
        label: "Activity Duration (mins)",
        data: activityDurations,
        fill: false,
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: activityLabels,
    datasets: [
      {
        label: "Calories Burned",
        data: caloriesBurned,
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        data: [goalStatuses.completed, goalStatuses.inProgress],
        backgroundColor: ["rgb(34, 197, 94)", "rgb(59, 130, 246)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="container mx-auto px-8 py-8 text-white">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--card-bg-color)] shadow-md rounded p-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-yellow-400">
            Total Activities
          </h3>
          <p className="text-4xl font-bold text-blue-400">
            {activitySummary.totalActivities}
          </p>
        </div>
        <div className="bg-[var(--card-bg-color)] shadow-md rounded p-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-yellow-400">
            Total Duration
          </h3>
          <p className="text-4xl font-bold text-green-400">
            {activitySummary.totalDuration} mins
          </p>
        </div>
        <div className="bg-[var(--card-bg-color)] shadow-md rounded p-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-yellow-400">
            Total Calories Burned
          </h3>
          <p className="text-4xl font-bold text-red-400">
            {activitySummary.totalCalories}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 text-yellow-400">
          Activity Duration Over Time
        </h3>
        <div className="bg-[var(--card-bg-color)] shadow-md rounded p-4 h-[300px]">
          {activities.length > 0 ? (
            <Line data={lineChartData} options={chartOptions} />
          ) : (
            <p>No activity data available for the chart.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Calories Burned Over Time
          </h3>
          <div className="bg-[var(--card-bg-color)] shadow-md rounded p-4 h-[300px]">
            {activities.length > 0 ? (
              <Bar data={barChartData} options={chartOptions} />
            ) : (
              <p>No activity data available for the chart.</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            Goals Completion Status
          </h3>
          <div className="bg-[var(--card-bg-color)] shadow-md rounded p-4 h-[300px] flex justify-center items-center">
            {goals.length > 0 ? (
              <div className="w-48 h-48">
                <Doughnut data={doughnutChartData} options={chartOptions} />
              </div>
            ) : (
              <p>No goal data available for the chart.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
