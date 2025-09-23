import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EducationLevelStep = ({ selectedLevel, onLevelSelect, onNext, onPrevious }) => {
  const educationLevels = [
    {
      id: 'high-school',
      title: 'High School',
      description: 'Currently in grades 9-12 or recently graduated',
      icon: 'BookOpen',
      color: 'bg-gradient-to-br from-blue-100 to-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'undergraduate',
      title: 'Undergraduate',
      description: 'Pursuing or completed Bachelor\'s degree',
      icon: 'GraduationCap',
      color: 'bg-gradient-to-br from-purple-100 to-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'graduate',
      title: 'Graduate',
      description: 'Pursuing or completed Master\'s/PhD',
      icon: 'Award',
      color: 'bg-gradient-to-br from-green-100 to-green-200',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What's your education level?
        </h2>
        <p className="text-muted-foreground">
          Help us understand your academic background to provide better recommendations
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {educationLevels?.map((level) => (
          <div
            key={level?.id}
            onClick={() => onLevelSelect(level?.id)}
            className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              selectedLevel === level?.id
                ? 'ring-2 ring-primary ring-offset-2 shadow-lg'
                : 'hover:shadow-md'
            } ${level?.color}`}
          >
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center shadow-sm ${level?.iconColor}`}>
                <Icon name={level?.icon} size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {level?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {level?.description}
                </p>
              </div>
            </div>
            
            {selectedLevel === level?.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} color="white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!selectedLevel}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default EducationLevelStep;