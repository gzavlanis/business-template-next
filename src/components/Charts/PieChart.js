'use client';
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChart({ theme }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const textColor = theme === "dark" ? "#E2E8F0" : "#4A5568";
    const tooltipBgColor = theme === "dark" ? "rgba(45, 55, 72, 0.9)" : "rgba(255, 255, 255, 0.9)";
    const tooltipBorderColor = theme === "dark" ? "#4A5568" : "#CBD5E0";

    // Distinct color palette for segments, adjusted for theme
    const segmentColors =
      theme === "dark"
        ? ["#F6E05E", "#A3BFFA", "#FBD38D", "#9AE6B4", "#B794F4"] // Yellow, Light Blue, Peach, Light Green, Light Purple
        : ["#D69E2E", "#63B3ED", "#C05621", "#38A169", "#805AD5"]; // Darker tones for light theme

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Category A", "Category B", "Category C", "Category D", "Category E"],
        datasets: [
          {
            label: "Distribution",
            data: [25, 20, 15, 30, 10],
            backgroundColor: segmentColors.map((color) => `${color}B3`), // Add transparency
            borderColor: theme === "dark" ? "#1A202C" : "#FFFFFF",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right", // Pie charts often look good with legend on the side
            labels: {
              color: textColor,
            },
          },
          tooltip: {
            backgroundColor: tooltipBgColor,
            borderColor: tooltipBorderColor,
            borderWidth: 1,
            titleColor: textColor,
            bodyColor: textColor,
            padding: 10,
            cornerRadius: 8,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [theme]);

  return (
    <div className="relative w-full h-80 p-2">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default PieChart;
