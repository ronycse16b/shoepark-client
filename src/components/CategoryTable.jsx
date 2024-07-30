'use client'
import React from "react";

const CategoryTable = ({ categories, onEditCategory }) => {
  const renderTableRows = (categories, level = 0) => {
    return categories.map((category) => (
      <React.Fragment key={category._id}>
        <tr>
          <td style={{ paddingLeft: `${level * 20}px` }}>
            {category.name}
          </td>
          <td>
            <button
              className="text-blue-500 hover:text-blue-700 mr-2"
              onClick={() => onEditCategory(category._id)}
            >
              Edit
            </button>
            {/* Add delete button if needed */}
          </td>
        </tr>
        {category.children && category.children.length > 0 && (
          renderTableRows(category.children, level + 1)
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 overflow-auto h-[400px]">
      <h2 className="text-lg font-bold mb-4">Current Categories</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Category Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            renderTableRows(categories)
          ) : (
            <tr>
              <td colSpan="2" className="py-2 px-4 text-center">
                No categories available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
