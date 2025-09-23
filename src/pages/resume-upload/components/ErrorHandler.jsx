import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorHandler = ({ error, onRetry, onGoBack, className = '' }) => {
  const errorTypes = {
    'file-too-large': {
      icon: 'AlertTriangle',
      title: 'File Too Large',
      message: 'Your resume file exceeds the 10MB limit. Please compress or use a smaller file.',
      color: 'warning',
      suggestions: [
        'Compress your PDF using online tools',
        'Remove high-resolution images',
        'Save as a more compressed format'
      ]
    },
    'unsupported-format': {
      icon: 'FileX',
      title: 'Unsupported Format',
      message: 'Please upload your resume in PDF, DOC, or DOCX format.',
      color: 'error',
      suggestions: [
        'Convert your file to PDF format',
        'Use Microsoft Word to save as DOC/DOCX',
        'Ensure the file is not corrupted'
      ]
    },
    'processing-failed': {
      icon: 'AlertCircle',
      title: 'Processing Failed',
      message: 'We encountered an issue while analyzing your resume. Please try again.',
      color: 'error',
      suggestions: [
        'Check your internet connection',
        'Try uploading again in a few minutes',
        'Ensure your resume has readable text'
      ]
    },
    'network-error': {
      icon: 'Wifi',
      title: 'Connection Issue',
      message: 'Unable to upload your resume. Please check your internet connection.',
      color: 'warning',
      suggestions: [
        'Check your internet connection',
        'Try refreshing the page',
        'Switch to a more stable network'
      ]
    },
    'translation-failed': {
      icon: 'Languages',
      title: 'Translation Error',
      message: 'We had trouble translating your resume. The content might still be processed in the original language.',
      color: 'warning',
      suggestions: [
        'Try uploading an English version if available',
        'Ensure the text is clearly readable',
        'Check if the document contains mostly images'
      ]
    },
    'parsing-error': {
      icon: 'FileSearch',
      title: 'Content Parsing Issue',
      message: 'We had difficulty extracting information from your resume. The format might be complex.',
      color: 'warning',
      suggestions: [
        'Try using a simpler resume template',
        'Ensure text is not embedded in images',
        'Use standard section headings'
      ]
    }
  };

  const errorInfo = errorTypes?.[error?.type] || errorTypes?.['processing-failed'];
  
  const colorClasses = {
    error: {
      bg: 'bg-error/10',
      border: 'border-error/20',
      icon: 'text-error',
      title: 'text-error'
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      icon: 'text-warning',
      title: 'text-warning'
    }
  };

  const colors = colorClasses?.[errorInfo?.color];

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className={`p-6 rounded-lg border ${colors?.bg} ${colors?.border}`}>
        {/* Error Icon */}
        <div className="text-center mb-4">
          <div className={`mx-auto w-16 h-16 rounded-full bg-background flex items-center justify-center ${colors?.icon}`}>
            <Icon name={errorInfo?.icon} size={32} />
          </div>
        </div>

        {/* Error Content */}
        <div className="text-center mb-6">
          <h3 className={`text-lg font-semibold mb-2 ${colors?.title}`}>
            {errorInfo?.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {errorInfo?.message}
          </p>

          {/* Error Details */}
          {error?.details && (
            <div className="text-xs text-muted-foreground bg-background/50 rounded p-2 mb-4">
              <code>{error?.details}</code>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Suggestions:
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {errorInfo?.suggestions?.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRetry}
            fullWidth
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={onGoBack}
            fullWidth
          >
            Go Back
          </Button>
        </div>

        {/* Help Link */}
        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Still having issues?{' '}
            <button className="text-primary hover:underline">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;