import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStages = ({ currentStage, progress, className = '' }) => {
  const stages = [
    {
      id: 'upload',
      label: 'Uploading',
      icon: 'Upload',
      description: 'Securely uploading your resume',
      range: [0, 25]
    },
    {
      id: 'translate',
      label: 'Translating',
      icon: 'Languages',
      description: 'Converting to English if needed',
      range: [25, 50]
    },
    {
      id: 'parse',
      label: 'Parsing',
      icon: 'FileSearch',
      description: 'Extracting information from document',
      range: [50, 75]
    },
    {
      id: 'analyze',
      label: 'Analyzing',
      icon: 'Brain',
      description: 'AI analyzing skills and experience',
      range: [75, 100]
    }
  ];

  const getStageStatus = (stage) => {
    if (progress >= stage?.range?.[1]) return 'completed';
    if (progress >= stage?.range?.[0]) return 'active';
    return 'pending';
  };

  const getStageProgress = (stage) => {
    if (progress < stage?.range?.[0]) return 0;
    if (progress >= stage?.range?.[1]) return 100;
    return ((progress - stage?.range?.[0]) / (stage?.range?.[1] - stage?.range?.[0])) * 100;
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-4">
        {stages?.map((stage, index) => {
          const status = getStageStatus(stage);
          const stageProgress = getStageProgress(stage);
          
          return (
            <div key={stage?.id} className="flex items-center space-x-4">
              {/* Stage Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                status === 'completed'
                  ? 'bg-success text-success-foreground'
                  : status === 'active' ?'bg-primary text-primary-foreground animate-pulse' :'bg-muted text-muted-foreground'
              }`}>
                {status === 'completed' ? (
                  <Icon name="Check" size={20} />
                ) : status === 'active' ? (
                  <Icon name={stage?.icon} size={20} className="animate-spin" />
                ) : (
                  <Icon name={stage?.icon} size={20} />
                )}
              </div>
              {/* Stage Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium ${
                    status === 'completed'
                      ? 'text-success'
                      : status === 'active' ?'text-primary' :'text-muted-foreground'
                  }`}>
                    {stage?.label}
                  </h4>
                  {status === 'active' && (
                    <span className="text-xs text-muted-foreground">
                      {Math.round(stageProgress)}%
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {stage?.description}
                </p>

                {/* Progress Bar for Active Stage */}
                {status === 'active' && (
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${stageProgress}%` }}
                    />
                  </div>
                )}

                {/* Completed Bar */}
                {status === 'completed' && (
                  <div className="w-full bg-success rounded-full h-1" />
                )}

                {/* Pending Bar */}
                {status === 'pending' && (
                  <div className="w-full bg-muted rounded-full h-1" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Overall Progress */}
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingStages;