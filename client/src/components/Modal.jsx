import React from "react";

function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-3xl" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl min-w-[400px] max-h-[90vh] p-0 relative overflow-hidden ${maxWidth} flex flex-col`}>
        {/* Header */}
        <div className="bg-blue-800 px-6 py-4 flex items-center justify-between relative flex-shrink-0">
          <h2 className="text-2xl font-bold text-white tracking-wide pr-8">{title}</h2>
          <button 
            className="absolute top-3 right-3 text-white text-2xl hover:text-blue-200 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200" 
            onClick={onClose}
            title="Close"
          >
            &times;
          </button>
        </div>
        {/* Content */}
        <div className="p-4 bg-blue-50 overflow-y-auto flex-1 min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
