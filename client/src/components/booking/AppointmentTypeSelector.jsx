import React from "react";

function AppointmentTypeSelector({ appointmentTypes, appointmentType, onSelect }) {
  return (
    <div className="flex flex-col gap-1 items-start border-b border-gray-200 pb-2 mb-2">
      <h1>Select Appointment Type</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2 mb-2 w-full">
        {appointmentTypes.map((type) => {
          const isSelected = appointmentType === type.label;
          return (
            <button
              key={type.label}
              className={`flex items-center justify-center border rounded-xl px-3 py-2 h-12 w-full shadow-sm transition-all font-semibold text-base ${isSelected ? 'border-blue-700 bg-blue-100 text-blue-700 scale-105 drop-shadow-lg' : 'border-gray-200 bg-white text-gray-800'}`}
              onClick={() => onSelect(type.label)}
              type="button"
            >
              <span className="h-6 w-6 mr-2 flex items-center justify-center">
                <type.icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gray-800'}`} />
              </span>
              {type.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AppointmentTypeSelector;
