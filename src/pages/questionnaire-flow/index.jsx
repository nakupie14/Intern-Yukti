import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from './components/ProgressIndicator';
import EducationLevelStep from './components/EducationLevelStep';
import SkillsPickerStep from './components/SkillsPickerStep';
import InterestsStep from './components/InterestsStep';
import LocationStep from './components/LocationStep';
import VoiceInputButton from './components/VoiceInputButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const QuestionnaireFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Form data state
  const [formData, setFormData] = useState({
    educationLevel: '',
    skills: [],
    interests: [],
    location: {
      city: '',
      customCity: '',
      workPreference: ''
    }
  });

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const handleNext = () => {
    if (currentStep < 4) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    } else {
      navigate('/landing-page');
    }
  };

  const handleEducationLevelSelect = (level) => {
    setFormData(prev => ({ ...prev, educationLevel: level }));
  };

  const handleSkillsChange = (skills) => {
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleInterestsChange = (interests) => {
    setFormData(prev => ({ ...prev, interests }));
  };

  const handleLocationChange = (location) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const handleComplete = () => {
    setIsLoading(true);
    
    // Save questionnaire data to localStorage
    localStorage.setItem('questionnaireData', JSON.stringify({
      ...formData,
      completedAt: new Date()?.toISOString(),
      source: 'questionnaire'
    }));

    // Simulate processing time
    setTimeout(() => {
      navigate('/internship-results');
    }, 2000);
  };

  const handleVoiceResult = (transcript) => {
    // Simple voice command processing
    const lowerTranscript = transcript?.toLowerCase();
    
    if (lowerTranscript?.includes('next') || lowerTranscript?.includes('continue')) {
      handleNext();
    } else if (lowerTranscript?.includes('back') || lowerTranscript?.includes('previous')) {
      handlePrevious();
    } else if (currentStep === 1 && lowerTranscript?.includes('high school')) {
      handleEducationLevelSelect('high-school');
    } else if (currentStep === 1 && lowerTranscript?.includes('undergraduate')) {
      handleEducationLevelSelect('undergraduate');
    } else if (currentStep === 1 && lowerTranscript?.includes('graduate')) {
      handleEducationLevelSelect('graduate');
    }
  };

  const renderCurrentStep = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading next step...</p>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <EducationLevelStep
            selectedLevel={formData?.educationLevel}
            onLevelSelect={handleEducationLevelSelect}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <SkillsPickerStep
            selectedSkills={formData?.skills}
            onSkillsChange={handleSkillsChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <InterestsStep
            selectedInterests={formData?.interests}
            onInterestsChange={handleInterestsChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <LocationStep
            selectedLocation={formData?.location}
            onLocationChange={handleLocationChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Smart Questionnaire
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Answer a few questions to get personalized internship recommendations tailored just for you
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-12">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={4}
              className="max-w-4xl mx-auto"
            />
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8 md:p-12">
            {renderCurrentStep()}
          </div>

          {/* Voice Input Button */}
          <VoiceInputButton
            onVoiceResult={handleVoiceResult}
            className="fixed bottom-6 right-6 z-40"
            size="lg"
          />

          {/* Help Section */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/5 rounded-full">
              <Icon name="HelpCircle" size={16} className="text-primary" />
              <span className="text-sm text-primary font-medium">
                Need help? Try using voice commands like "next" or "previous"
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex justify-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/landing-page')}
              iconName="Home"
              iconPosition="left"
            >
              Back to Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/resume-upload')}
              iconName="Upload"
              iconPosition="left"
            >
              Try Resume Upload Instead
            </Button>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && currentStep === 4 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Processing Your Responses
            </h3>
            <p className="text-muted-foreground">
              Our AI is analyzing your preferences to find the perfect internship matches...
            </p>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireFlow;