import React from "react";


function StepProgressBar({ steps, currentStep = 0, successSteps = [] }) {
  return (
    <div className="h-1/7 w-full flex items-center my-4 justify-center">
      <ul className="steps h-full">
        {steps.map((step, idx) => {
          let className = "step";
          if (successSteps[idx]) className += " step-primary step-success";
          else if (idx < currentStep) className += " step-primary step-success";
          else if (idx === currentStep) className += " step-primary";
          return (
            <li
              key={step.label}
              data-content={step.dataContent || idx + 1}
              className={className}
            >
              {step.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StepProgressBar;
