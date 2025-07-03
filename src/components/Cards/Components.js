'use client';
import React, { useState } from 'react';
import { Users, BarChart } from 'lucide-react';

// --- ComponentsPage Component ---
function Components({ theme }) {
  const cardBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColorClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const paragraphClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const buttonClass = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white';
  const tabActiveBg = theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white';
  const tabInactiveBg = theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700';
  const tabHoverBg = theme === 'dark' ? 'hover:bg-blue-600' : 'hover:bg-blue-500';
  const tabContentBg = theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const [activeTab, setActiveTab] = useState('tab1'); // State for active tab

  return (
    <div className={`p-4 rounded-lg w-full max-w-7xl mx-auto flex flex-col space-y-8`}>
      <h2 className={`text-3xl font-bold mb-6 ${textColorClass}`}>Components Showcase</h2>
      <p className={`mb-6 ${paragraphClass}`}>
        This page demonstrates various UI components like cards and tabs,
        which you can adapt and reuse in your application.
      </p>

      {/* Cards Section */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 ${textColorClass}`}>Card Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Simple Card */}
          <div className={`p-6 rounded-lg shadow-md ${cardBgClass} ${textColorClass}`}>
            <h4 className="text-xl font-semibold mb-2">Basic Card</h4>
            <p className={`${paragraphClass}`}>
              This is a simple card containing a title and some descriptive text.
              It adapts its background and text color based on the selected theme.
            </p>
          </div>

          {/* Card with Image */}
          <div className={`rounded-lg shadow-md overflow-hidden ${cardBgClass}`}>
            <img
              src="https://placehold.co/400x200/9F7AEA/FFFFFF?text=Image+Card"
              alt="Placeholder"
              className="w-full h-48 object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x200/9F7AEA/FFFFFF?text=Image+Load+Error'; }}
            />
            <div className={`p-6 ${textColorClass}`}>
              <h4 className="text-xl font-semibold mb-2">Image Card Title</h4>
              <p className={`${paragraphClass}`}>
                A card featuring a compelling image at the top, followed by textual content.
                Great for showcasing products or articles.
              </p>
            </div>
          </div>

          {/* Card with Actions */}
          <div className={`p-6 rounded-lg shadow-md flex flex-col ${cardBgClass} ${textColorClass}`}>
            <h4 className="text-xl font-semibold mb-2">Action Card</h4>
            <p className={`${paragraphClass} mb-4 flex-grow`}>
              This card includes action buttons at the bottom, useful for interactive elements
              like "Learn More" or "Add to Cart".
            </p>
            <div className="mt-auto flex space-x-2">
              <button className={`px-4 py-2 rounded-md ${buttonClass} transition-colors duration-200`}>
                Learn More
              </button>
              <button className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} transition-colors duration-200`}>
                Share
              </button>
            </div>
          </div>

          {/* Stat Card */}
          <div className={`p-6 rounded-lg shadow-md flex items-center justify-between ${cardBgClass} ${textColorClass}`}>
            <div>
              <p className={`text-sm uppercase font-medium ${paragraphClass}`}>Total Users</p>
              <h4 className="text-4xl font-bold mt-1">12,345</h4>
            </div>
            <Users size={48} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
          </div>

          {/* Feature Card with Icon */}
          <div className={`p-6 rounded-lg shadow-md flex items-start space-x-4 ${cardBgClass} ${textColorClass}`}>
            <BarChart size={36} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
            <div>
              <h4 className="text-xl font-semibold mb-2">Advanced Analytics</h4>
              <p className={`${paragraphClass}`}>
                Access powerful analytics tools to gain deeper insights into your data and make informed decisions.
              </p>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className={`p-6 rounded-lg shadow-md ${cardBgClass} ${textColorClass}`}>
            <p className={`italic mb-4 ${paragraphClass}`}>
              "This platform has transformed our workflow. Highly recommend it to anyone looking for efficiency!"
            </p>
            <div className="flex items-center space-x-3">
              <img
                src="https://placehold.co/40x40/FEB2B2/C53030?text=JD"
                alt="Client Avatar"
                className="w-10 h-10 rounded-full"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/FEB2B2/C53030?text=Error'; }}
              />
              <div>
                <p className="font-semibold">Jane Doe</p>
                <p className={`text-sm ${paragraphClass}`}>CEO, Tech Innovators</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Tabs Section */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 ${textColorClass} mt-8`}>Tabs Example</h3>
        <div className={`rounded-lg shadow-md overflow-hidden ${cardBgClass}`}>
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('tab1')}
              className={`flex-1 py-3 px-4 text-center font-medium rounded-tl-lg transition-colors duration-200
                ${activeTab === 'tab1' ? tabActiveBg : tabInactiveBg} ${tabHoverBg}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tab2')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors duration-200
                ${activeTab === 'tab2' ? tabActiveBg : tabInactiveBg} ${tabHoverBg}`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('tab3')}
              className={`flex-1 py-3 px-4 text-center font-medium rounded-tr-lg transition-colors duration-200
                ${activeTab === 'tab3' ? tabActiveBg : tabInactiveBg} ${tabHoverBg}`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className={`p-6 border-t ${tabContentBg}`}>
            {activeTab === 'tab1' && (
              <div>
                <h4 className="text-xl font-semibold mb-3">Overview Content</h4>
                <p className={`${paragraphClass}`}>
                  This section provides a general overview of the selected item or feature.
                  It contains high-level information and summaries.
                </p>
                <ul className={`list-disc list-inside mt-3 ${paragraphClass}`}>
                  <li>Key Feature 1</li>
                  <li>Key Feature 2</li>
                  <li>Key Feature 3</li>
                </ul>
              </div>
            )}
            {activeTab === 'tab2' && (
              <div>
                <h4 className="text-xl font-semibold mb-3">Detailed Information</h4>
                <p className={`${paragraphClass}`}>
                  Dive deeper into the specifics. Here you'll find comprehensive details,
                  technical specifications, and extended descriptions.
                </p>
                <table className={`w-full text-left mt-4 border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Property</th>
                            <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Dimension</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">10x15x2 cm</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Weight</td>
                            <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">250g</td>
                        </tr>
                    </tbody>
                </table>
              </div>
            )}
            {activeTab === 'tab3' && (
              <div>
                <h4 className="text-xl font-semibold mb-3">Customization Settings</h4>
                <p className={`${paragraphClass}`}>
                  Adjust the settings to personalize your experience. These options
                  control various aspects of the component's behavior.
                </p>
                <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                        <input type="checkbox" id="setting1" className={`form-checkbox h-5 w-5 ${theme === 'dark' ? 'text-blue-500 bg-gray-700 border-gray-600' : 'text-blue-600 border-gray-300'}`} />
                        <label htmlFor="setting1" className="ml-2">Enable Notifications</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="setting2" className={`form-checkbox h-5 w-5 ${theme === 'dark' ? 'text-blue-500 bg-gray-700 border-gray-600' : 'text-blue-600 border-gray-300'}`} defaultChecked />
                        <label htmlFor="setting2" className="ml-2">Show Advanced Options</label>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Components;