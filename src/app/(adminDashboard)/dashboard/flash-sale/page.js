'use client';
import { useState, useEffect } from 'react';

export default function FlashPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [minDateTime, setMinDateTime] = useState('');
  const [flashSale, setFlashSale] = useState({});
  const [flashSales, setFlashSales] = useState([]);

  useEffect(() => {
    // Get current date and time in YYYY-MM-DDTHH:MM format
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setMinDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
    
    // Fetch existing flash sale data
    fetch('/api/flash-sale')
      .then(response => response.json())
      .then(data => {
        setFlashSale(data);
        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setStartTime(data.startTime);
          setEndTime(data.endTime);
        }
      });
      
    // Fetch list of flash sales
    fetch('/api/flash-sales')
      .then(response => response.json())
      .then(data => setFlashSales(data));
  }, []);

  const handleUpdateTimes = async () => {
    try {
      const response = await fetch('/api/flash-sale', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          startTime,
          endTime,
        }),
      });

      if (response.ok) {
        const updatedSale = await response.json();
        setFlashSale(updatedSale);
        alert('Flash sale updated successfully!');
      } else {
        alert('Failed to update flash sale.');
      }
    } catch (error) {
      console.error('Error updating flash sale:', error);
    }
  };

  const handleResetSale = async () => {
    try {
      const response = await fetch('/api/flash-sale/reset', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: false,
        }),
      });

      if (response.ok) {
        const updatedSale = await response.json();
        setFlashSale(updatedSale);
        setFlashSales(flashSales.map(sale =>
          sale._id === updatedSale._id ? updatedSale : sale
        ));
        alert('Flash sale has been stopped.');
      } else {
        alert('Failed to stop the flash sale.');
      }
    } catch (error) {
      console.error('Error stopping flash sale:', error);
    }
  };

  const handleUpdate = () => {
    if (title && description && startTime && endTime) {
      handleUpdateTimes();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="p-7 border border-gray-300 rounded-lg bg-gray-50 mt-10">
      <h2 className="text-xl font-bold mb-4">Update Flash Sale</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Flash Sale Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Flash Sale Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1 w-full"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="start-time" className="block text-sm font-medium mb-1">
          Flash Sale Start Time
        </label>
        <input
          type="datetime-local"
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          min={minDateTime}
          className="border border-gray-300 rounded-lg px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="end-time" className="block text-sm font-medium mb-1">
          Flash Sale End Time
        </label>
        <input
          type="datetime-local"
          id="end-time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          min={minDateTime}
          className="border border-gray-300 rounded-lg px-2 py-1 w-full"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
      >
        Update Flash Sale
      </button>
      <button
        onClick={handleResetSale}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Stop Flash Sale
      </button>

      <div className="p-4 border border-gray-300 rounded-lg mt-4">
        <h2 className="text-xl font-bold mb-4">Flash Sale List</h2>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-600 ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white border-r uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white border-r uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white border-r uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white border-r uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white border-r uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flashSales.map((sale) => (
              <tr key={sale._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sale.startTime).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sale.endTime).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.isActive ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
