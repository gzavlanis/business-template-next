'use client';
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function ScatterChart({ theme }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const textColor = theme === "dark" ? "#E2E8F0" : "#4A5568";
    const gridColor = theme === "dark" ? "rgba(80, 80, 80, 0.5)" : "rgba(200, 200, 200, 0.5)";
    const pointColor = theme === "dark" ? "#9F7AEA" : "#6B46C1"; // Purple
    const tooltipBgColor = theme === "dark" ? "rgba(45, 55, 72, 0.9)" : "rgba(255, 255, 255, 0.9)";
    const tooltipBorderColor = theme === "dark" ? "#4A5568" : "#CBD5E0";

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Data Points",
            data: [
              { x: 10, y: 20 },
              { x: 15, y: 10 },
              { x: 20, y: 25 },
              { x: 25, y: 15 },
              { x: 30, y: 30 },
              { x: 35, y: 22 },
              { x: 40, y: 18 },
              { x: 45, y: 35 },
              { x: 50, y: 28 },
              { x: 55, y: 40 },
            ],
            backgroundColor: pointColor,
            borderColor: theme === "dark" ? "#1A202C" : "#FFFFFF",
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
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
            callbacks: {
              label: function (context) {
                return `(${context.raw.x}, ${context.raw.y})`; // Custom label for scatter points
              },
            },
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
              text: "X-axis",
              color: textColor,
            },
          },
          y: {
            ticks: {
              color: textColor,
            },
            grid: {
              color: gridColor,
            },
            title: {
              display: true,
              text: "Y-axis",
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

export default ScatterChart;
