'use client'
import React, { useState } from 'react';

const VariantForm = () => {
  const [variants, setVariants] = useState(['32', '33', '34']);
  const [prices, setPrices] = useState({});
  const [stocks, setStocks] = useState({});
  const [specialPrices, setSpecialPrices] = useState({});
  const [skus, setSkus] = useState({});
  const [availabilities, setAvailabilities] = useState({});

  const handleAddVariant = () => {
    setVariants([...variants, '']);
  };

  const handleVariantChange = (index, value) => {
    const newVariants = [...variants];
    newVariants[index] = value;
    setVariants(newVariants);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Variant Name</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value="size"
          readOnly
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Total Variants</label>
        {variants.map((variant, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={variant}
              onChange={(e) => handleVariantChange(index, e.target.value)}
            />
            <button
              className="ml-2 text-red-500"
              onClick={() => setVariants(variants.filter((_, i) => i !== index))}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={handleAddVariant}
        >
          + Add Variant
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price & Stock</label>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Size</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Special Price</th>
                <th className="py-2 px-4 border-b">Stock</th>
                <th className="py-2 px-4 border-b">Seller SKU</th>
                <th className="py-2 px-4 border-b">Free Items</th>
                <th className="py-2 px-4 border-b">Availability</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{variant}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => setPrices({ ...prices, [variant]: e.target.value })}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => setSpecialPrices({ ...specialPrices, [variant]: e.target.value })}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => setStocks({ ...stocks, [variant]: e.target.value })}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={(e) => setSkus({ ...skus, [variant]: e.target.value })}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600"
                      onChange={(e) => setAvailabilities({ ...availabilities, [variant]: e.target.checked })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Apply To All
      </button>
    </div>
  );
};

export default VariantForm;
