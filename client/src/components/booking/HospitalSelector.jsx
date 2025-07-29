import React from "react";

function HospitalSelector({ hospital, onSelect }) {
  const hospitals = [
    {
      name: "Springfield Hospital",
      address: "742 Evergreen Terrace, Springfield",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Evergreen Medical Center",
      address: "123 Main St, Springfield",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Downtown Health Hub",
      address: "456 Elm St, Springfield",
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd2b?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Northside Family Hospital",
      address: "789 Oak St, Springfield",
      img: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Westside Wellness",
      address: "321 Pine St, Springfield",
      img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Central Care Hospital",
      address: "654 Maple St, Springfield",
      img: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=400&q=80"
    }
  ];
  return (
    <>
      <div>Select Hospital</div>
      <div className="flex flex-col items-start w-full overflow-auto">
        <div className="grid grid-cols-1 pb-5 gap-4 mt-2 mb-2 w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {hospitals.map((hospitalObj) => (
            <button
              key={hospitalObj.name}
              className={`flex flex-row items-center border rounded-xl px-3 pt-2 h-20 w-full shadow-sm transition-all ${hospital === hospitalObj.name ? 'border-blue-700 bg-blue-500 text-white' : 'border-gray-200 bg-white text-gray-800'}`}
              onClick={() => onSelect(hospitalObj.name)}
              type="button"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                <img src={hospitalObj.img} alt={hospitalObj.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start flex-grow">
                <div className={`font-semibold text-base mb-1 ${hospital === hospitalObj.name ? 'text-white' : ''}`}>{hospitalObj.name}</div>
                <div className={`text-gray-200 text-sm mb-2 ${hospital === hospitalObj.name ? 'text-white opacity-80' : 'text-gray-500'}`}>{hospitalObj.address}</div>
              </div>
              <div className="flex items-center h-full">
                {hospital === hospitalObj.name && (
                  <span className="text-white font-bold text-xl">&#10003;</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default HospitalSelector;
