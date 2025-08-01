import React from "react";

function ServiceSelector({ services, selected, onChange, disabled }) {
  return (
    <>
      <div>Services</div>
      <div className="flex flex-col items-start w-full overflow-auto">
        <div className="grid grid-cols-3 gap-4 mt-2 mb-2 w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {services.length === 0 ? (
            <div className="text-gray-400 col-span-3">No Service Available.</div>
          ) : (
            services.map((service) => (
              <button
                key={service.name}
                className={`flex flex-row items-center justify-between border rounded-xl px-3 pt-2 h-17 w-full bg-white shadow-sm transition-all ${selected === service.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => onChange(service.name)}
                type="button"
                disabled={disabled}
              >
                <div className="flex flex-col items-start">
                  <div className="font-semibold text-base mb-1">{service.name}</div>
                  <div className="text-gray-500 text-sm mb-2">฿{service.price}</div>
                </div>
                <div className="flex items-center h-full">
                  {selected === service.name && (
                    <span className="text-blue-500 font-bold text-xl">&#10003;</span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ServiceSelector;
