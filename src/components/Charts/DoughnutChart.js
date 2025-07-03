'use client';
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function DoughnutChart({ theme }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const textColor = theme === "dark" ? "#E2E8F0" : "#4A5568";
    const tooltipBgColor = theme === "dark" ? "rgba(45, 55, 72, 0.9)" : "rgba(255, 255, 255, 0.9)";
    const tooltipBorderColor = theme === "dark" ? "#4A5568" : "#CBD5E0";

    // Distinct color palette for segments, adjusted for theme
    const segmentColors =
      theme === "dark"
        ? ["#F6AD55", "#4FD1C5", "#FC8181", "#667EEA", "#9F7AEA"] // Orange, Teal, Red, Indigo, Purple
        : ["#DD6B20", "#38B2AC", "#E53E3E", "#5A67D8", "#805AD5"]; // Darker tones for light theme

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
        datasets: [
          {
            label: "Votes",
            data: [12, 19, 3, 5, 2],
            backgroundColor: segmentColors.map((color) => `${color}B3`), // Add transparency
            borderColor: theme === "dark" ? "#1A202C" : "#FFFFFF",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%", // Makes it a doughnut chart
        plugins: {
          legend: {
            position: "bottom",
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

export default DoughnutChart;
