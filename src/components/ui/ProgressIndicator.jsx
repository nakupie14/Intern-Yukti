import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  steps = [],
  className = '',
  showLabels = true,
  variant = 'default' // 'default', 'minimal', 'detailed'
}) => {
  const defaultSteps = [
    { label: 'Start', icon: 'Play' },
    { label: 'Assessment', icon: 'FileText' },
    { label: 'Processing', icon: 'Loader' },
    { label: 'Results', icon: 'CheckCircle' }
  ];

  const stepData = steps?.length > 0 ? steps : defaultSteps?.slice(0, totalSteps);
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepStatus = (stepIndex) => {
    const stepNumber = stepIndex + 1;
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary animate-pulse';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepIndex) => {
    const stepNumber = stepIndex + 1;
    return stepNumber < currentStep ? 'bg-success' : 'bg-border';
  };

  if (variant === 'minimal') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`w-full ${className}`}>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              {stepData?.[currentStep - 1]?.label || `Step ${currentStep}`}
            </h3>
            <span className="text-sm text-muted-foreground">
              {currentStep}/{totalSteps}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stepData?.map((step, index) => {
            const status = getStepStatus(index);
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-200 ${getStepClasses(status)}`}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <Icon name={step?.icon} size={20} />
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  status === 'current' ? 'text-primary' : 
                  status === 'completed' ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {step?.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">
          Progress
        </span>
        <span className="text-sm text-muted-foreground">
          {currentStep}/{totalSteps}
        </span>
      </div>
      <div className="flex items-center">
        {stepData?.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === stepData?.length - 1;
          
          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${getStepClasses(status)}`}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                {showLabels && (
                  <span className={`mt-2 text-xs font-medium text-center ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </span>
                )}
              </div>
              {!isLast && (
                <div className="flex-1 mx-2">
                  <div className={`h-1 rounded-full transition-all duration-300 ${getConnectorClasses(index)}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;