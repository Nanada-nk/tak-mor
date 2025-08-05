import React, { useState, useRef, useEffect } from 'react';

const PricingFilter = () => {
  const minPrice = 0;
  const maxPrice = 6000; 
  const initialMin = 200;
  const initialMax = 5695; 

  const [minRange, setMinRange] = useState(initialMin);
  const [maxRange, setMaxRange] = useState(initialMax);
  const [isExpanded, setIsExpanded] = useState(true); 

  const rangeRef = useRef(null); 
  const minThumbRef = useRef(null); 
  const maxThumbRef = useRef(null); 

  
  const getPercentage = (value) => {
    return ((value - minPrice) / (maxPrice - minPrice)) * 100;
  };

  
  useEffect(() => {
    if (rangeRef.current && minThumbRef.current && maxThumbRef.current) {
      const minPercent = getPercentage(minRange);
      const maxPercent = getPercentage(maxRange);

     
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;

      
      minThumbRef.current.style.left = `${minPercent}%`;
      maxThumbRef.current.style.left = `${maxPercent}%`;
    }
  }, [minRange, maxRange]); 

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxRange - 1); 
    setMinRange(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minRange + 1); 
    setMaxRange(value);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full">
     
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={toggleExpansion}
      >
        <h3 className="text-xl font-bold text-gray-800">Pricing</h3>
        <button className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

     
      {isExpanded && (
        <div className="flex flex-col items-center space-y-4">
     
          <div className="flex justify-between items-end w-full h-12 mb-4 px-2">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 rounded-sm"
                style={{
                  width: '4%', 
                  height: `${Math.random() * 80 + 20}%`, 
                }}
              ></div>
            ))}
          </div>

        
          <div className="relative w-full h-1 bg-gray-200 rounded-full">
           
            <div
              ref={rangeRef}
              className="absolute h-1 bg-blue-500 rounded-full"
              style={{
                left: `${getPercentage(minRange)}%`,
                width: `${getPercentage(maxRange) - getPercentage(minRange)}%`,
              }}
            ></div>

           
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={minRange}
              onChange={handleMinChange}
              className="absolute appearance-none bg-transparent w-full h-full cursor-pointer z-20"
              style={{
                transform: 'translateX(-50%)', 
                left: `${getPercentage(minRange)}%`,
              }}
            />
        
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={maxRange}
              onChange={handleMaxChange}
              className="absolute appearance-none bg-transparent w-full h-full cursor-pointer z-20"
              style={{
                transform: 'translateX(-50%)', 
                left: `${getPercentage(maxRange)}%`,
              }}
            />
          </div>

      
          <p className="text-lg font-semibold text-gray-800">
            Range : ${minRange} - ${maxRange}
          </p>
        </div>
      )}

      
      <div className="border-t border-gray-200 mt-6 pt-4"></div>
    </div>
  );
};

export default PricingFilter;