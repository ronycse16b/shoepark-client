import { useState } from "react";

const Modal = ({ isOpen, onClose, title, children, onConfirm }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed z-50 inset-0 flex items-center justify-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} bg-black bg-opacity-50 transition-opacity duration-200`}
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-500 text-white rounded-md">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
