// components/Dashboard/Dashboard.js
'use client'; // This directive makes this a Client Component, as it uses state, effects, and Dnd-kit hooks

import React, { useState, useEffect, useCallback } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";

import SortableItem from "../Cards/SortableItem"; // Assuming SortableItem is also a client component if it uses hooks/events

function Dashboard({ theme }) {
  // THEME PROP: Received from the parent layout/page

  const LOCAL_STORAGE_KEY = "dashboardLayout";

  const defaultItems = [
    { id: 'metric-sales', title: 'Total Sales', type: 'metric', icon: 'DollarSign', value: '€ 1.2M', unit: 'since last month' },
    { id: 'metric-users', title: 'Active Users', type: 'metric', icon: 'Users', value: '2,500', unit: 'daily average' },
    { id: 'metric-orders', title: 'New Orders', type: 'metric', icon: 'ShoppingCart', value: '1,567', unit: 'today' },
    { id: "chart-line", title: "Website Traffic (Line Chart)", type: "chart", chartType: "line" },
    { id: "chart-bar", title: "Product Performance (Bar Chart)", type: "chart", chartType: "bar" },
    { id: "chart-doughnut", title: "User Demographics (Doughnut Chart)", type: "chart", chartType: "doughnut" },
    { id: 'metric-tickets', title: 'Open Tickets', type: 'metric', icon: 'LifeBuoy', value: '45', unit: 'pending resolution' },
    { id: 'metric-revenue', title: 'Revenue Forecast', type: 'metric', icon: 'BarChart', value: '€ 5.1M', unit: 'target' },
    { id: 'metric-inventory', title: 'Product Inventory', type: 'metric', icon: 'Package', value: '8,900', unit: 'items' },
    { id: "chart-pie", title: "Market Share (Pie Chart)", type: "chart", chartType: "pie" },
    { id: "chart-scatter", title: "Customer Satisfaction (Scatter Plot)", type: "chart", chartType: "scatter" },
    { id: 'metric-marketing', title: 'Ad Spend', type: 'metric', icon: 'Megaphone', value: '€ 12K', unit: 'last week' },
    { id: 'metric-engagement', title: 'Engagement Rate', type: 'metric', icon: 'Activity', value: '15.2%', unit: 'vs. prev month' },
  ];

  // Initialize items with default values.
  // We will load from localStorage in a useEffect hook after the component mounts.
  const [items, setItems] = useState(defaultItems);

  // useEffect to load layout from localStorage ONLY on the client side after mount
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure window (and localStorage) is defined
      try {
        const savedLayout = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedLayout) {
          const parsedLayout = JSON.parse(savedLayout);
          // Basic validation to ensure it's an array of objects with 'id'
          if (Array.isArray(parsedLayout) && parsedLayout.every((item) => typeof item === "object" && item !== null && "id" in item)) {
            console.log("Layout loaded from localStorage.");
            setItems(parsedLayout); // Update state with loaded layout
          } else {
            console.log("Invalid layout in localStorage, using default items.");
          }
        } else {
          console.log("No layout found in localStorage, using default items.");
        }
      } catch (error) {
        console.error("Failed to load layout from localStorage:", error);
        // If loading fails, it will remain defaultItems as initialized
      }
    }
  }, []); // Empty dependency array means this runs only once after initial render on the client

  // useEffect to persist items to localStorage whenever 'items' state changes
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure window (and localStorage) is defined
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save layout to localStorage:", error);
      }
    }
  }, [items]); // Runs whenever the 'items' state changes

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [activeId, setActiveId] = useState(null);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(prevItems, oldIndex, newIndex);
        }
        return prevItems;
      });
    }
    setActiveId(null);
  }, []);

  const activeItemContent = activeId ? items.find((item) => item.id === activeId) : null;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min`}>
          {items.map((item) => (
            // Pass the 'theme' prop down to each SortableItem
            <SortableItem
              key={item.id}
              id={item.id}
              content={item}
              theme={theme} // THEME PROP: Passed down to SortableItem for styling
              isDragging={item.id === activeId}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId && activeItemContent ? (
          <SortableItem
            id={activeId}
            content={activeItemContent}
            theme={theme} // THEME PROP: Passed to DragOverlay's item for consistent styling during drag
            isDragging={true}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Dashboard;
