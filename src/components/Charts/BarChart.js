'use client';
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// --- BarChart Component (Consolidated within Dashboard.jsx) ---
function BarChartFn({ theme }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Define colors based on the current theme
    const textColor = theme === "dark" ? "#E2E8F0" : "#4A5568"; // gray-200 / gray-700
    const gridColor = theme === "dark" ? "rgba(80, 80, 80, 0.5)" : "rgba(200, 200, 200, 0.5)";
    const barColor = theme === "dark" ? "#81E6D9" : "#38B2AC"; // teal-300 / teal-500
    const barBorderColor = theme === "dark" ? "#2D3748" : "#A0AEC0"; // gray-800 / gray-400
    const tooltipBgColor = theme === "dark" ? "rgba(45, 55, 72, 0.9)" : "rgba(255, 255, 255, 0.9)";
    const tooltipBorderColor = theme === "dark" ? "#4A5568" : "#CBD5E0";

    // Destroy any existing chart instance to prevent memory leaks and re-render issues
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    // Create a new Chart.js instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
        datasets: [
          {
            label: "Units Sold",
            data: [120, 190, 30, 50, 200],
            backgroundColor: barColor,
            borderColor: barBorderColor,
            borderWidth: 1,
            borderRadius: 4,
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
              text: "Products",
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
              text: "Units",
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

export default BarChartFn;
