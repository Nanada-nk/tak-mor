import React from "react";

function NextButton({ onClick, disabled, showWarning }) {
  return (
    <div className="h-1/10 flex justify-end items-center px-5 relative">
      <button
        onClick={onClick}
        className="btn btn-primary"
        disabled={disabled}
      >
        Select Specialty & Service {" >"}
      </button>
      {showWarning && (
        <div className="absolute bottom-14 right-0 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in z-50">
          Please select a hospital first if you choose Hospital appointment type!
        </div>
      )}
    </div>
  );
}

export default NextButton;
