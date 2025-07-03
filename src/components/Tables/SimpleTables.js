'use client';
import React, { useState, useCallback } from 'react';

// --- SimpleTables Component ---
function SimpleTables({ theme }) {
  const tableBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const tableBorderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const tableHeaderClass = theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700';
  const tableRowClass = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const tableCellClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-800';
  const inputClass = theme === 'dark' ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-700';

  // Sample data for tables
  const initialData = [
    { id: 1, name: 'Alice Smith', age: 30, city: 'New York' },
    { id: 2, name: 'Bob Johnson', age: 24, city: 'Los Angeles' },
    { id: 3, name: 'Charlie Brown', age: 35, city: 'Chicago' },
    { id: 4, name: 'Diana Prince', age: 28, city: 'Miami' },
    { id: 5, name: 'Eve Adams', age: 42, city: 'Seattle' },
    { id: 6, name: 'Frank White', age: 29, city: 'Boston' },
    { id: 7, name: 'Grace Lee', age: 31, city: 'San Francisco' },
    { id: 8, name: 'Harry Potter', age: 22, city: 'London' },
  ];

  // --- Sortable Table State and Logic ---
  const [sortableData, setSortableData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = useCallback(() => {
    let sortableItems = [...sortableData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortableData, sortConfig]);

  // --- Filterable Table State and Logic ---
  const [filterableData, setFilterableData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useCallback(() => {
    if (searchTerm === '') {
      return filterableData;
    }
    return filterableData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [filterableData, searchTerm]);

  return (
    <div className={`p-4 rounded-lg w-full max-w-7xl mx-auto flex flex-col space-y-8`}>
      <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Data Tables Showcase</h2>

      {/* Basic Static Table */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>1. Basic Static Table</h3>
        <div className={`overflow-x-auto rounded-lg shadow-md ${tableBgClass} ${tableBorderClass} border`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={tableHeaderClass}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-lg">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Age</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tr-lg">City</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {initialData.map((person) => (
                <tr key={person.id} className={tableRowClass}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tableCellClass}`}>{person.id}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{person.name}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{person.age}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{person.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sortable Table */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>2. Sortable Table</h3>
        <div className={`overflow-x-auto rounded-lg shadow-md ${tableBgClass} ${tableBorderClass} border`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={tableHeaderClass}>
              <tr>
                {['id', 'name', 'age', 'city'].map(key => (
                  <th
                    key={key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => requestSort(key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <span className="ml-1">
                      {sortConfig.key === key ? (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedItems().map((person) => (
                <tr key={person.id} className={tableRowClass}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tableCellClass}`}>{person.id}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{person.name}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{person.age}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{person.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Filterable Table */}
      <section>
        <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>3. Filterable Table</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className={`w-full p-2 rounded-md border ${inputClass}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={`overflow-x-auto rounded-lg shadow-md ${tableBgClass} ${tableBorderClass} border`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={tableHeaderClass}>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-lg">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Age</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tr-lg">City</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems().length > 0 ? (
                filteredItems().map((person) => (
                  <tr key={person.id} className={tableRowClass}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tableCellClass}`}>{person.id}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{person.name}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{person.age}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{person.city}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={`px-6 py-4 text-center text-sm ${tableCellClass}`}>No matching data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default SimpleTables