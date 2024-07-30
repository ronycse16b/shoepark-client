// components/Tree.js
import React from "react";

const TreeNode = ({ node, onNodeClick }) => {
  return (
    <li className="relative">
      <button
        onClick={() => onNodeClick(node._id, node.type)}
        className="block text-gray-800 py-2 px-4 border-b hover:bg-primary hover:text-white w-full text-left flex justify-between items-center"
      >
        {node.name}
        {node.children && node.children.length > 0 && (
          <span className="ml-2">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 2L8.59 3.41 14.17 9H2v2h12.17l-5.58 5.59L10 18l8-8-8-8z" />
            </svg>
          </span>
        )}
      </button>
      {node.children && node.children.length > 0 && (
        <ul className="ml-4">
          {node.children.map((child) => (
            <TreeNode
              key={child._id}
              node={child}
              onNodeClick={onNodeClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default function Tree({ data, onNodeClick }) {
  return (
    <ul>
      {data.map((node) => (
        <TreeNode key={node._id} node={node} onNodeClick={onNodeClick} />
      ))}
    </ul>
  );
}
