'use client';
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// --- LineChart Component (Consolidated within Dashboard.jsx) ---
function LineChart({ theme }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Define colors based on the current theme
    const textColor = theme === "dark" ? "#E2E8F0" : "#4A5568"; // gray-200 / gray-700
    const gridColor = theme === "dark" ? "rgba(80, 80, 80, 0.5)" : "rgba(200, 200, 200, 0.5)";
    const lineColor = theme === "dark" ? "#63B3ED" : "#4299E1"; // blue-300 / blue-500
    const backgroundColor = theme === "dark" ? "rgba(99, 179, 237, 0.2)" : "rgba(66, 153, 225, 0.2)";
    const tooltipBgColor = theme === "dark" ? "rgba(45, 55, 72, 0.9)" : "rgba(255, 255, 255, 0.9)";
    const tooltipBorderColor = theme === "dark" ? "#4A5568" : "#CBD5E0";

    // Destroy any existing chart instance to prevent memory leaks and re-render issues
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    // Create a new Chart.js instance
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Monthly Sales",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: lineColor,
            backgroundColor: backgroundColor,
            tension: 0.1,
            pointBackgroundColor: lineColor,
            pointBorderColor: theme === "dark" ? "#1A202C" : "#FFFFFF",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
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
        scales: {
          x: {
            ticks: {
              color: textColor,
            },
            grid: {
              color: gridColor,
            },
            title: {
              display: true,
              text: "Month",
              color: textColor,
            },
          },
          y: {
            ticks: {
              color: textColor,
              beginAtZero: true,
            },
            grid: {
              color: gridColor,
            },
            title: {
              display: true,
              text: "Value",
              color: textColor,
            },
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

export default LineChart;
