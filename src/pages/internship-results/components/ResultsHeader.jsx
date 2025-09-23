import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const ResultsHeader = ({ 
  userName = 'Student',
  assessmentType = 'questionnaire', // 'questionnaire' or 'resume'
  onRefreshResults,
  isRefreshing = false
}) => {
  const getHeaderContent = () => {
    if (assessmentType === 'resume') {
      return {
        title: 'Your Resume-Based Recommendations',
        subtitle: `Based on your uploaded resume, we've found personalized internship opportunities that match your skills and experience.`,
        icon: 'FileText'
      };
    }
    
    return {
      title: 'Your Personalized Recommendations',
      subtitle: `Based on your assessment responses, we've curated internship opportunities that align with your interests and goals.`,
      icon: 'Target'
    };
  };

  const content = getHeaderContent();

  return (
    <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Greeting */}
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Hello {userName}! 👋
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center space-x-2">
            <Icon name={content?.icon} size={24} className="text-primary" />
            <span>{content?.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground mb-4 max-w-2xl leading-relaxed">
            {content?.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefreshResults}
              loading={isRefreshing}
              iconName="RefreshCw"
              iconPosition="left"
            >
              {isRefreshing ? "Refreshing..." : "Get New Recommendations"}
            </Button>
            
            <Link to="/questionnaire-flow">
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit3"
                iconPosition="left"
              >
                Retake Assessment
              </Button>
            </Link>
            
            <Link to="/resume-upload">
              <Button
                variant="ghost"
                size="sm"
                iconName="Upload"
                iconPosition="left"
              >
                Upload New Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="hidden lg:block">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={40} className="text-primary" />
          </div>
        </div>
      </div>
      {/* Stats Bar */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">
              AI-Powered Matching
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              Updated Daily
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">
              Verified Companies
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;