// components/Buttons/Buttons.js
'use client';
import React, { useState, useCallback } from 'react';
import { Plus, Edit, Trash2, Info, CheckCircle, Settings, X } from 'lucide-react'; // Added Info, CheckCircle, Settings, X icons
import { Modal } from '../Modal/Modal';

// --- ButtonsPage Component ---
function Buttons({ theme }) {
  // Modal states
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const inputBgClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
  const inputTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const inputBorderClass = theme === 'dark' ? 'border-gray-600 focus:border-blue-500' : 'border-gray-300 focus:border-blue-700';

  const textColorClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const paragraphClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  const buttonColors = {
    primary: {
      default: theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white',
      outline: theme === 'dark' ? 'border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white' : 'border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white',
      ghost: theme === 'dark' ? 'text-blue-400 hover:bg-blue-900' : 'text-blue-700 hover:bg-blue-100',
    },
    secondary: {
      default: theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-700 hover:bg-gray-800 text-white',
      outline: theme === 'dark' ? 'border border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white' : 'border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white',
      ghost: theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100',
    },
    success: {
      default: theme === 'dark' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-700 hover:bg-green-800 text-white',
      outline: theme === 'dark' ? 'border border-green-600 text-green-400 hover:bg-green-600 hover:text-white' : 'border border-green-700 text-green-700 hover:bg-green-700 hover:text-white',
      ghost: theme === 'dark' ? 'text-green-400 hover:bg-green-900' : 'text-green-700 hover:bg-green-100',
    },
    danger: {
      default: theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-700 hover:bg-red-800 text-white',
      outline: theme === 'dark' ? 'border border-red-600 text-red-400 hover:bg-red-600 hover:text-white' : 'border border-red-700 text-red-700 hover:bg-red-700 hover:text-white',
      ghost: theme === 'dark' ? 'text-red-400 hover:bg-red-900' : 'text-red-700 hover:bg-red-100',
    },
    warning: {
      default: theme === 'dark' ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900',
      outline: theme === 'dark' ? 'border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900' : 'border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900',
      ghost: theme === 'dark' ? 'text-yellow-400 hover:bg-yellow-900' : 'text-yellow-500 hover:bg-yellow-100',
    }
  };

  const buttonSizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const Button = ({ children, color, size, variant = 'default', className = '', ...props }) => {
    const colorClasses = buttonColors[color]?.[variant] || buttonColors.primary.default;
    const sizeClasses = buttonSizes[size] || buttonSizes.md;

    return (
      <button
        className={`rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 focus:ring-offset-2 ${colorClasses} ${sizeClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  // Modal handlers
  const openInfoModal = useCallback(() => setIsInfoModalOpen(true), []);
  const closeInfoModal = useCallback(() => setIsInfoModalOpen(false), []);
  const openConfirmModal = useCallback(() => setIsConfirmModalOpen(true), []);
  const closeConfirmModal = useCallback(() => setIsConfirmModalOpen(false), []);
  const openCustomModal = useCallback(() => setIsCustomModalOpen(true), []);
  const closeCustomModal = useCallback(() => setIsCustomModalOpen(false), []);

  const handleConfirmAction = useCallback(() => {
    console.log("Action confirmed!");
    // Perform actual action here
    closeConfirmModal();
  }, [closeConfirmModal]);


  return (
    <div className={`p-4 rounded-lg w-full max-w-7xl mx-auto flex flex-col space-y-8 mt-6`}>
      <h2 className={`text-3xl font-bold mb-6 ${textColorClass}`}>Button Showcase</h2>
      <p className={`mb-6 ${paragraphClass}`}>
        Explore a variety of button styles, sizes, and colors. These components are designed
        to be reusable and adapt to the current theme.
      </p>

      {/* Solid Buttons */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 ${textColorClass}`}>Solid Buttons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary" size="md">Primary Button</Button>
          <Button color="secondary" size="md">Secondary Button</Button>
          <Button color="success" size="md">Success Button</Button>
          <Button color="danger" size="md">Danger Button</Button>
          <Button color="warning" size="md">Warning Button</Button>
        </div>
        <h4 className={`text-xl font-semibold mb-3 mt-6 ${textColorClass}`}>Sizes</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary" size="sm">Small Button</Button>
          <Button color="primary" size="md">Medium Button</Button>
          <Button color="primary" size="lg">Large Button</Button>
        </div>
      </section>

      {/* Outline Buttons */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 mt-8 ${textColorClass}`}>Outline Buttons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary" size="md" variant="outline">Primary Outline</Button>
          <Button color="secondary" size="md" variant="outline">Secondary Outline</Button>
          <Button color="success" size="md" variant="outline">Success Outline</Button>
          <Button color="danger" size="md" variant="outline">Danger Outline</Button>
          <Button color="warning" size="md" variant="outline">Warning Outline</Button>
        </div>
        <h4 className={`text-xl font-semibold mb-3 mt-6 ${textColorClass}`}>Sizes</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary" size="sm" variant="outline">Small Outline</Button>
          <Button color="primary" size="md" variant="outline">Medium Outline</Button>
          <Button color="primary" size="lg" variant="outline">Large Outline</Button>
        </div>
      </section>

      {/* Ghost Buttons */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 mt-8 ${textColorClass}`}>Ghost Buttons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary" size="md" variant="ghost">Primary Ghost</Button>
          <Button color="secondary" size="md" variant="ghost">Secondary Ghost</Button>
          <Button color="success" size="md" variant="ghost">Success Ghost</Button>
          <Button color="danger" size="md" variant="ghost">Danger Ghost</Button>
          <Button color="warning" size="md" variant="ghost">Warning Ghost</Button>
        </div>
        <h4 className={`text-xl font-semibold mb-3 mt-6 ${textColorClass}`}>Sizes</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary" size="sm" variant="ghost">Small Ghost</Button>
          <Button color="primary" size="md" variant="ghost">Medium Ghost</Button>
          <Button color="primary" size="lg" variant="ghost">Large Ghost</Button>
        </div>
      </section>

      {/* Disabled Buttons */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 mt-8 ${textColorClass}`}>Disabled Buttons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary" size="md" disabled>Disabled Solid</Button>
          <Button color="primary" size="md" variant="outline" disabled>Disabled Outline</Button>
          <Button color="primary" size="md" variant="ghost" disabled>Disabled Ghost</Button>
        </div>
      </section>

      {/* Buttons with Icons */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 mt-8 ${textColorClass}`}>Buttons with Icons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary" size="md">
            <Plus size={18} className="mr-2 inline-block" /> Add Item
          </Button>
          <Button color="secondary" size="md" variant="outline">
            <Edit size={18} className="mr-2 inline-block" /> Edit
          </Button>
          <Button color="danger" size="md" variant="ghost">
            <Trash2 size={18} className="mr-2 inline-block" /> Delete
          </Button>
        </div>
      </section>

      {/* NEW: Buttons to Open Modals */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 mt-8 ${textColorClass}`}>Buttons to Open Modals</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={openInfoModal} color="primary" size="md">
            <Info size={18} className="mr-2 inline-block" /> Open Info Modal
          </Button>
          <Button onClick={openConfirmModal} color="danger" size="md">
            <CheckCircle size={18} className="mr-2 inline-block" /> Open Confirm Modal
          </Button>
          <Button onClick={openCustomModal} color="secondary" size="md">
            <Settings size={18} className="mr-2 inline-block" /> Open Custom Modal
          </Button>
        </div>
      </section>

      {/* Modals */}
      <Modal isOpen={isInfoModalOpen} onClose={closeInfoModal} title="Information" theme={theme}>
        <p className={paragraphClass}>This is an informational modal. It provides important details without requiring a decision from the user.</p>
        <p className={`mt-2 text-sm ${paragraphClass}`}>You can put any kind of content here, like alerts, tips, or simple messages.</p>
      </Modal>

      <Modal isOpen={isConfirmModalOpen} onClose={closeConfirmModal} title="Confirm Action" theme={theme}>
        <p className={paragraphClass}>Are you sure you want to proceed with this action? This cannot be undone.</p>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={closeConfirmModal}
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
              theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmAction}
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
              theme === 'dark' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-700 hover:bg-green-800 text-white'
            }`}
          >
            Confirm
          </button>
        </div>
      </Modal>

      <Modal isOpen={isCustomModalOpen} onClose={closeCustomModal} title="Custom Settings" theme={theme}>
        <p className={paragraphClass}>This modal can contain more complex forms or interactive elements.</p>
        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="customSetting" className={`block text-sm font-medium mb-1 ${textColorClass}`}>Custom Setting:</label>
            <input
              type="text" id="customSetting"
              className={`w-full p-2 rounded-md border ${inputBgClass} ${inputTextColor} focus:ring-2 focus:outline-none`}
              placeholder="Enter value"
            />
          </div>
          <div>
            <label htmlFor="optionSelect" className={`block text-sm font-medium mb-1 ${textColorClass}`}>Choose Option:</label>
            <select
              id="optionSelect"
              className={`w-full p-2 rounded-md border ${inputBgClass} ${inputTextColor} focus:ring-2 focus:outline-none`}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Buttons;
