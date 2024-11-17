// src/pages/Activities.jsx
import ActivityList from "../components/ActivityList";

const Activities = () => {
  return (
    <div className="container mx-auto px-6 py-1">
      {/* <h2 className="text-3xl font-bold mb-8 text-center text-[var(--primary-color)]">
        Add Activity
      </h2> */}

      <div className=" shadow-md rounded  max-w-xl mx-auto ">
        <ActivityList />
      </div>
    </div>
  );
};

export default Activities;
