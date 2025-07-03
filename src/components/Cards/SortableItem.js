'use client';
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DollarSign, Users, ShoppingCart, LifeBuoy, BarChart, Package, Megaphone, Activity
} from 'lucide-react';

import LineChart from "../Charts/LineChart";
import BarChartFn from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughnutChart";
import PieChart from "../Charts/PieChart";
import ScatterChart from "../Charts/ScatterChart";

// A simple component for each sortable item (dashboard card)
function SortableItem({ id, content, theme, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  // Apply CSS transform and transition for smooth dragging effects.
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto", // Ensure dragged item stays on top.
    boxShadow: isDragging ? (theme === "dark" ? "0 10px 15px -3px rgba(0,0,0,0.3)" : "0 10px 15px -3px rgba(0,0,0,0.1)") : "none",
    minHeight: content.type === 'chart' ? '380px' : (content.type === 'metric' ? '190px' : '200px'),
  };

  // --- IconMap: Maps string names to Lucide React components ---
// This allows storing icon references as strings in localStorage and retrieving them as components.
const IconMap = {
  DollarSign: DollarSign,
  Users: Users,
  ShoppingCart: ShoppingCart,
  LifeBuoy: LifeBuoy,
  BarChart: BarChart, // Note: This is a Lucide icon, distinct from the Chart.js BarChart component
  Package: Package,
  Megaphone: Megaphone,
  Activity: Activity,
};

  // Dynamically apply card background and text colors based on the theme.
  const cardClasses = theme === "dark" ? "bg-gray-800 text-gray-200 hover:shadow-xl" : "bg-white text-gray-800 hover:shadow-xl";
  // Dynamically apply paragraph text color based on the theme.
  const paragraphClasses = theme === "dark" ? "text-gray-300" : "text-gray-600";

  // Apply border styles that change on hover, creating a "shadow-like" effect.
  const borderClasses =
    theme === "dark"
      ? "border-2 border-gray-700 hover:border-blue-500 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 hover:ring-offset-gray-800"
      : "border-2 border-gray-300 hover:border-blue-700 hover:ring-2 hover:ring-blue-700 hover:ring-offset-2 hover:ring-offset-white";

  // Retrieve the icon component from the IconMap using the string name
  const IconComponent = content.icon ? IconMap[content.icon] : null;

  return (
    <div
      ref={setNodeRef} // Connects the DOM node to dnd-kit for drag operations.
      style={style} // Apply dynamic styling for transforms and transitions.
      {...attributes} // Essential for accessibility (ARIA attributes).
      {...listeners} // Event listeners for drag interactions.
      // Tailwind CSS classes for general styling, responsiveness, and hover effects.
      className={`p-6 rounded-lg shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing focus:outline-none
        ${cardClasses} ${borderClasses} ${isDragging ? "opacity-70" : ""}`}
    >
      {/* Conditionally render content based on item type */}
      {content.type === 'chart' ? (
        <div className="flex-grow flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold mb-3 text-center">{content.title}</h3>
          {/* Render different chart types */}
          {content.chartType === 'line' && <LineChart theme={theme} />}
          {content.chartType === 'bar' && <BarChartFn theme={theme} />}
          {content.chartType === 'doughnut' && <DoughnutChart theme={theme} />}
          {content.chartType === 'pie' && <PieChart theme={theme} />}
          {content.chartType === 'scatter' && <ScatterChart theme={theme} />}
        </div>
      ) : content.type === 'metric' ? ( // NEW: Render metric card
        <div className="flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold mb-3">{content.title}</h3>
          <div className="flex items-center space-x-3 mt-auto mb-2"> {/* mt-auto pushes content towards bottom */}
            {/* Render icon if provided */}
            {IconComponent && <IconComponent size={36} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />}
            {/* Render numerical value */}
            <span className="text-4xl font-bold">{content.value}</span>
          </div>
          {/* Render optional unit */}
          {content.unit && <p className={`text-lg ${paragraphClasses}`}>{content.unit}</p>}
        </div>
      ) : ( // Fallback for any other type (e.g., if 'type' is not specified or unrecognized)
        <div className="flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold mb-3">{content.title}</h3>
          <p className={paragraphClasses}>{content.description}</p>
        </div>
      )}
    </div>
  );
}

export default SortableItem;
