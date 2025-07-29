import React from "react";

function SpecialtySelector({ specialties, selected, onSelect }) {
  return (
    <div className="flex flex-col gap-1 items-start border-b border-gray-200 pb-2 mb-2 w-full">
      <h1>Select Specialty</h1>
      <div className="flex flex-row gap-2 mt-2 w-full flex-wrap justify-start">
        {specialties.map((spec) => (
          <button
            key={spec.key}
            className={`flex items-center justify-center border rounded px-2 py-1 min-h-6 min-w-[80px] shadow-sm transition-all font-normal text-xs ${selected === spec.key ? 'border-blue-700 bg-blue-100 text-blue-700 scale-105 drop-shadow-lg' : 'border-gray-200 bg-white text-gray-800 hover:border-blue-400 hover:bg-blue-50'}`}
            onClick={() => onSelect(spec.key)}
            type="button"
          >
            {spec.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SpecialtySelector;
