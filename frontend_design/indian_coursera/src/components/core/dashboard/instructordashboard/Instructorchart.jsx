import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

function Instructorchart({ courses }) {
  const [currentchart, setcurrentchart] = useState("student");

  // 🎨 StudyNotion color palette
  const COLORS = [
    "#3B82F6", // blue
    "#22C55E", // green
    "#FACC15", // yellow
    "#A855F7", // purple
    "#EF4444", // red
    "#06B6D4", // cyan
    "#F97316", // orange
    "#84CC16", // lime
  ];

  const getcolors = (num) => {
    return Array.from({ length: num }, (_, i) => COLORS[i % COLORS.length]);
  };

  const chartdataforstudents = {
    labels: courses.map((course) => course.coursename),
    datasets: [
      {
        data: courses.map((course) => course.totalstudentsenrolled),
        backgroundColor: getcolors(courses.length),
        borderWidth: 2,
        borderColor: "#0F172A",
        hoverOffset: 12,
      },
    ],
  };

  const chartdataforincome = {
    labels: courses.map((course) => course.coursename),
    datasets: [
      {
        data: courses.map((course) => course.totalamountgenerated),
        backgroundColor: getcolors(courses.length),
        borderWidth: 2,
        borderColor: "#0F172A",
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#CBD5E1",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1E293B",
        titleColor: "#F8FAFC",
        bodyColor: "#CBD5E1",
        borderColor: "#334155",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="bg-[#0B0F19] p-6 rounded-xl shadow-lg text-white w-[300px] h-[400px] max-w-2xl mx-auto border border-gray-800">
      
      {/* Header */}
      <p className="text-xl font-semibold text-yellow-400 mb-4">
        📊 Course Analytics
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setcurrentchart("student")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentchart === "student"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          👨‍🎓 Students
        </button>

        <button
          onClick={() => setcurrentchart("income")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentchart === "income"
              ? "bg-green-500 text-white shadow-md"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          💰 Income
        </button>
      </div>

      {/* Chart Container */}
      <div className="bg-[#111827] p-4 rounded-lg border border-gray-800 shadow-inner">
        <Pie
          data={
            currentchart === "student"
              ? chartdataforstudents
              : chartdataforincome
          }
          options={options}
        />
      </div>
    </div>
  );
}

export default Instructorchart;