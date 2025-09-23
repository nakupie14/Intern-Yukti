import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  className = '' 
}) => {
  const steps = [
    { label: 'Education', icon: 'GraduationCap' },
    { label: 'Skills', icon: 'Star' },
    { label: 'Interests', icon: 'Heart' },
    { label: 'Location', icon: 'MapPin' }
  ];

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

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <div className="flex items-center mb-6">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps?.length - 1;
          
          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepClasses(status)}`}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium text-center ${
                  status === 'current' ? 'text-primary' : 
                  status === 'completed' ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {step?.label}
                </span>
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
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;