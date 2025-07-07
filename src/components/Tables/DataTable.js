import { useState, useCallback, useRef } from 'react';
import { Edit, Trash2, Download, Upload } from 'lucide-react';

function DataTable({ theme }) {
  const tableBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const tableBorderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const tableHeaderClass = theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700';
  const tableRowClass = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const tableCellClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-800';
  const inputClass = theme === 'dark' ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-700';
  const buttonClass = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white';
  const buttonDisabledClass = 'opacity-50 cursor-not-allowed';

  const initialProducts = [
    { id: 1, name: 'Laptop Pro X1', category: 'Electronics', price: 1200, stock: 50 },
    { id: 2, name: 'Mechanical Keyboard', category: 'Accessories', price: 150, stock: 120 },
    { id: 3, name: 'Wireless Mouse', category: 'Accessories', price: 45, stock: 200 },
    { id: 4, name: 'Smartwatch Series 5', category: 'Wearables', price: 299, stock: 75 },
    { id: 5, name: 'Noise-Cancelling Headphones', category: 'Audio', price: 199, stock: 90 },
    { id: 6, name: 'Gaming Monitor 27"', category: 'Electronics', price: 350, stock: 30 },
    { id: 7, name: 'USB-C Hub', category: 'Accessories', price: 30, stock: 300 },
    { id: 8, name: 'External SSD 1TB', category: 'Storage', price: 90, stock: 150 },
    { id: 9, name: 'Webcam 1080p', category: 'Peripherals', price: 60, stock: 110 },
    { id: 10, name: 'Portable Bluetooth Speaker', category: 'Audio', price: 75, stock: 80 },
    { id: 11, name: 'E-Reader Basic', category: 'Electronics', price: 80, stock: 60 },
    { id: 12, name: 'Ergonomic Office Chair', category: 'Furniture', price: 250, stock: 40 },
    { id: 13, name: 'Desk Lamp with Wireless Charger', category: 'Home Office', price: 55, stock: 95 },
    { id: 14, name: 'VR Headset Lite', category: 'Gaming', price: 400, stock: 25 },
    { id: 15, name: 'Fitness Tracker Band', category: 'Wearables', price: 70, stock: 180 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [columnFilters, setColumnFilters] = useState({
    id: '', name: '', category: '', price: '', stock: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [importStatus, setImportStatus] = useState(null);
  const importFileInputRef = useRef(null);

  const handleFilterChange = useCallback((column, value) => {
    setColumnFilters(prevFilters => ({
      ...prevFilters,
      [column]: value,
    }));
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const handleRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when rows per page changes
  }, []);

  const filteredProducts = useCallback(() => {
    return products.filter(product => {
      return Object.keys(columnFilters).every(key => {
        const filterValue = columnFilters[key].toLowerCase();
        const itemValue = String(product[key]).toLowerCase();
        return itemValue.includes(filterValue);
      });
    });
  }, [products, columnFilters]);

  const paginatedProducts = useCallback(() => {
    const data = filteredProducts();
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredProducts().length / rowsPerPage);

  const handleEdit = useCallback((id) => {
    console.log(`Edit product with ID: ${id}`);
    // In a real app, this would open a modal or navigate to an edit form
  }, []);

  const handleDelete = useCallback((id) => {
    if (window.confirm(`Are you sure you want to delete product with ID: ${id}?`)) {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      console.log(`Deleted product with ID: ${id}`);
    }
  }, []);

  const exportToCsv = useCallback(() => {
    const headers = Object.keys(initialProducts[0]);
    const csvContent = [
      headers.join(','),
      ...products.map(row => headers.map(fieldName => JSON.stringify(row[fieldName])).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'products_table.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Browser does not support download attribute. Cannot export CSV.");
      // Fallback for older browsers if needed, e.g., open in new window
      const url = URL.createObjectURL(blob);
      window.open(url);
    }
  }, [products, initialProducts]);

  const handleImportClick = useCallback(() => {
    importFileInputRef.current.click();
  }, []);

  const handleImport = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) {
      setImportStatus({ type: 'error', message: 'No file selected.' });
      return;
    }

    // Only allow CSV for now due to complexity of Excel parsing without libraries
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setImportStatus({ type: 'error', message: 'Invalid file type. Please upload a CSV file. (Excel files require additional libraries for parsing)' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      try {
        const lines = text.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
        if (lines.length === 0) {
          setImportStatus({ type: 'error', message: 'CSV file is empty.' });
          return;
        }

        const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
        const importedData = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(value => value.trim());
          if (values.length !== headers.length) {
            console.warn(`Skipping row ${i + 1} due to column mismatch:`, lines[i]);
            continue; // Skip rows that don't match header count
          }
          const rowObject = {};
          headers.forEach((header, index) => {
            let value = values[index];
            // Attempt to convert to number if applicable
            if (header === 'id' || header === 'price' || header === 'stock') {
              value = Number(value);
              if (isNaN(value)) {
                console.warn(`Invalid number for ${header} at row ${i + 1}. Keeping as string.`);
              }
            }
            rowObject[header] = value;
          });
          importedData.push(rowObject);
        }

        // Simple validation: check if imported data has at least the required keys
        const requiredKeys = ['id', 'name', 'category', 'price', 'stock'];
        const isValid = importedData.every(row => requiredKeys.every(key => Object.keys(row).includes(key)));

        if (isValid && importedData.length > 0) {
          // Assign new unique IDs to imported items to avoid conflicts, or handle merging
          const maxExistingId = Math.max(...products.map(p => p.id), 0);
          const newProducts = importedData.map((item, index) => ({
            ...item,
            id: item.id || (maxExistingId + 1 + index), // Use existing ID or generate new
            price: Number(item.price) || 0, // Ensure price is number
            stock: Number(item.stock) || 0 // Ensure stock is number
          }));
          setProducts(prevProducts => [...prevProducts, ...newProducts]);
          setImportStatus({ type: 'success', message: `Successfully imported ${newProducts.length} new products.` });
        } else {
          setImportStatus({ type: 'error', message: 'Imported CSV data is invalid or empty after parsing. Please check file format.' });
        }
      } catch (parseError) {
        setImportStatus({ type: 'error', message: `Error parsing CSV file: ${parseError.message}` });
        console.error("CSV parsing error:", parseError);
      }
    };

    reader.onerror = () => {
      setImportStatus({ type: 'error', message: 'Failed to read file.' });
    };

    reader.readAsText(file);
    // Clear the input value so the same file can be selected again after a failed import
    if (importFileInputRef.current) {
        importFileInputRef.current.value = '';
    }
  }, [products]);

  return (
    <div className={`p-4 rounded-lg w-full max-w-full mx-auto flex flex-col space-y-6`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Products Inventory</h2>
        <div className="flex space-x-2">
          <button
            onClick={exportToCsv}
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 flex items-center space-x-2
              ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-700 hover:bg-green-800 text-white'}`}
          >
            <Download size={20} />
            <span>Export to CSV</span>
          </button>
          <input
            type="file"
            ref={importFileInputRef}
            onChange={handleImport}
            className="hidden"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" // .csv and basic Excel (XLSX, XLS)
            aria-label="Upload CSV or Excel file"
          />
          <button
            onClick={handleImportClick}
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 flex items-center space-x-2
              ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-700 hover:bg-purple-800 text-white'}`}
          >
            <Upload size={20} />
            <span>Import Data</span>
          </button>
        </div>
      </div>
      {importStatus && (
        <div className={`p-3 rounded-md text-sm ${importStatus.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
          {importStatus.message}
        </div>
      )}
      <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        This table demonstrates per-column filtering, pagination, and action buttons.
        You can search within each column and control the number of rows displayed.
      </p>

      <div className={`overflow-x-auto rounded-lg shadow-md ${tableBgClass} ${tableBorderClass} border`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={tableHeaderClass}>
            <tr>
              {['ID', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map((header, index) => (
                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {header}
                  {header !== 'Actions' && (
                    <input
                      type="text"
                      placeholder={`Filter ${header}...`}
                      className={`mt-1 block w-full p-1 border rounded-md text-sm ${inputClass}`}
                      value={columnFilters[header.toLowerCase()]}
                      onChange={(e) => handleFilterChange(header.toLowerCase(), e.target.value)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedProducts().length > 0 ? (
              paginatedProducts().map((product) => (
                <tr key={product.id} className={tableRowClass}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tableCellClass}`}>{product.id}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{product.name}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{product.category}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>€{product.price.toFixed(2)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tableCellClass}`}>{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className={`p-2 rounded-md transition-colors duration-200
                        ${theme === 'dark' ? 'text-blue-400 hover:bg-blue-700' : 'text-blue-600 hover:bg-blue-100'}`}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className={`p-2 rounded-md transition-colors duration-200
                        ${theme === 'dark' ? 'text-red-400 hover:bg-red-700' : 'text-red-600 hover:bg-red-100'}`}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={`px-6 py-4 text-center text-sm ${tableCellClass}`}>No matching products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 p-4 rounded-lg shadow-md bg-opacity-70 backdrop-blur-sm"
           style={{ backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.7)' : 'rgba(243, 244, 246, 0.7)' }}>
        <div className="flex items-center space-x-2">
          <label htmlFor="rows-per-page" className={`text-sm font-medium ${tableCellClass}`}>Rows per page:</label>
          <select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className={`p-2 rounded-md border ${inputClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {[5, 10, 20, 50].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <span className={`text-sm ${tableCellClass}`}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md font-semibold transition-colors duration-200 ${buttonClass} ${currentPage === 1 ? buttonDisabledClass : ''}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md font-semibold transition-colors duration-200 ${buttonClass} ${currentPage === totalPages ? buttonDisabledClass : ''}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;