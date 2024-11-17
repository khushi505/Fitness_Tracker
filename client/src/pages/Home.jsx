// src/pages/Home.jsx
import fitnessPersonImage from "../../public/man.png"; // Update the path if necessary

const Home = () => {
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="text-left text-[var(--primary-color)] font-bold text-xl w-1/2 px-8">
        "Your body can stand almost anything. It’s your mind that you have to
        convince."
      </div>
      <img
        src={fitnessPersonImage}
        alt="Fitness Person"
        className="w-1/4 h-auto px-6"
      />
    </div>
  );
};

export default Home;
