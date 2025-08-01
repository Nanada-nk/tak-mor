import React from "react";

function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-3xl" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`bg-white rounded-2xl shadow-2xl w-full p-0 relative overflow-hidden ${maxWidth}`}>
        {/* Header */}
        <div className="bg-blue-800 px-6 py-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
          <button className="text-white text-3xl hover:text-blue-200" onClick={onClose}>&times;</button>
        </div>
        {/* Content */}
        <div className="p-4 bg-blue-50">
          {children}
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-1.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition text-sm font-semibold" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
