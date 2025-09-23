import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  type = 'no-results', // 'no-results', 'no-saved', 'error'
  onRetry,
  onRefinePreferences 
}) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-saved':
        return {
          icon: 'Bookmark',
          title: 'No Saved Internships',
          description: `You haven't saved any internships yet. Start exploring opportunities and save the ones that interest you!`,
          primaryAction: {
            label: 'Browse Internships',
            action: () => window.location?.reload(),
            variant: 'default'
          },
          secondaryAction: null
        };
      
      case 'error':
        return {
          icon: 'AlertCircle',
          title: 'Something Went Wrong',
          description: `We're having trouble loading your internship recommendations. Please try again or check your internet connection.`,
          primaryAction: {
            label: 'Try Again',
            action: onRetry,
            variant: 'default'
          },
          secondaryAction: {
            label: 'Go Back',
            action: () => window.history?.back(),
            variant: 'outline'
          }
        };
      
      default: // 'no-results'
        return {
          icon: 'Search',
          title: 'No Internships Found',
          description: `We couldn't find any internships matching your current filters. Try adjusting your search criteria or refining your preferences to discover more opportunities.`,
          primaryAction: {
            label: 'Refine Preferences',
            action: onRefinePreferences,
            variant: 'default'
          },
          secondaryAction: {
            label: 'Start New Search',
            action: () => window.location?.reload(),
            variant: 'outline'
          }
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon 
          name={content?.icon} 
          size={40} 
          className={`${
            type === 'error' ? 'text-error' : 
            type === 'no-saved' ? 'text-primary' : 'text-muted-foreground'
          }`} 
        />
      </div>
      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {content?.title}
      </h3>
      {/* Description */}
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        {content?.description}
      </p>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {content?.primaryAction && (
          <Button
            variant={content?.primaryAction?.variant}
            onClick={content?.primaryAction?.action}
            iconName="RefreshCw"
            iconPosition="left"
          >
            {content?.primaryAction?.label}
          </Button>
        )}
        
        {content?.secondaryAction && (
          <Button
            variant={content?.secondaryAction?.variant}
            onClick={content?.secondaryAction?.action}
          >
            {content?.secondaryAction?.label}
          </Button>
        )}
      </div>
      {/* Additional Help Links */}
      {type === 'no-results' && (
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Need help finding the right internships?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 text-sm">
            <Link 
              to="/questionnaire-flow" 
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Retake Assessment
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <Link 
              to="/resume-upload" 
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Upload New Resume
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <button 
              onClick={() => window.open('mailto:support@internyukti.com', '_blank')}
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Contact Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;