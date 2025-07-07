// --- Modal Component (Internal to Buttons for simplicity) ---
'use client';
import React from 'react';
import { X } from 'lucide-react'; // Added Info, CheckCircle, Settings, X icons

export const Modal = ({ isOpen, onClose, title, children, theme }) => {
  if (!isOpen) return null;

  const modalBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColorClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const closeButtonClass = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900';

  // Define input-related theme classes directly within the Modal component

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`relative rounded-lg shadow-xl p-6 w-full max-w-md ${modalBgClass} ${textColorClass}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className={`p-2 rounded-full transition-colors duration-200 ${closeButtonClass}`}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
              theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};