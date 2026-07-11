import { Check } from "lucide-react";

type StepStatus = "done" | "active" | "pending";

interface Step {
  id: string | number;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // index 0-based
  onStepClick?: (index: number) => void;
}

function getStepStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return "done";
  if (index === currentStep) return "active";
  return "pending";
}

export default function Stepper({
  steps,
  currentStep,
  onStepClick,
}: StepperProps) {
  return (
    <nav aria-label="Étapes" className="w-full">
      <ol className="flex items-start w-full">
        {steps.map((step, index) => {
          const status = getStepStatus(index, currentStep);
          const isLast = index === steps.length - 1;
          const isClickable = onStepClick !== undefined && status === "done";

          return (
            <li
              key={step.id}
              className={`flex items-start ${isLast ? "flex-none" : "flex-1"}`}
            >
              {/* Step circle + label */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(index)}
                  aria-current={status === "active" ? "step" : undefined}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 ${
                    status === "done"
                      ? `border-green-600 bg-green-600 text-white ${isClickable ? "cursor-pointer hover:bg-green-700 hover:border-green-700" : "cursor-default"}`
                      : status === "active"
                        ? "border-green-600 bg-white text-green-700 cursor-default"
                        : "border-gray-300 bg-white text-gray-400 cursor-default"
                  }`}
                >
                  {status === "done" ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                {/* Label + description */}
                <div className="mt-2 text-center max-w-[80px] min-w-[60px]">
                  <p
                    className={`text-xs font-medium leading-tight ${
                      status === "active"
                        ? "text-green-700"
                        : status === "done"
                          ? "text-gray-700"
                          : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="flex-1 mt-4 mx-2">
                  <div
                    className={`h-0.5 w-full transition-colors duration-300 ${
                      status === "done" ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
