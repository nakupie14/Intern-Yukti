import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFileSelect, isUploading, uploadProgress, className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const supportedFormats = [
    { extension: '.pdf', label: 'PDF', icon: 'FileText' },
    { extension: '.doc', label: 'DOC', icon: 'FileText' },
    { extension: '.docx', label: 'DOCX', icon: 'FileText' }
  ];

  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  const handleDragEnter = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e?.dataTransfer?.items && e?.dataTransfer?.items?.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter <= 1) {
      setIsDragOver(false);
    }
  }, [dragCounter]);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      const file = files?.[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      const file = files?.[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [onFileSelect]);

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes?.includes(file?.type)) {
      alert('Please upload a PDF, DOC, or DOCX file.');
      return false;
    }

    if (file?.size > maxSize) {
      alert('File size must be less than 10MB.');
      return false;
    }

    return true;
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-105'
            : isUploading
            ? 'border-warning bg-warning/5' :'border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Upload Icon and Animation */}
        <div className="mb-6">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDragOver
              ? 'bg-primary text-primary-foreground animate-pulse'
              : isUploading
              ? 'bg-warning text-warning-foreground animate-spin'
              : 'bg-primary/10 text-primary'
          }`}>
            <Icon 
              name={isDragOver ? "Download" : isUploading ? "Loader" : "Upload"} 
              size={32} 
            />
          </div>
        </div>

        {/* Upload Text */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {isDragOver
              ? "Drop your resume here"
              : isUploading
              ? "Processing your resume..." :"Upload Your Resume"
            }
          </h3>
          <p className="text-muted-foreground mb-4">
            {isDragOver
              ? "Release to upload your file"
              : isUploading
              ? "AI is analyzing your document"
              : "Drag and drop your resume or click to browse"
            }
          </p>
        </div>

        {/* Progress Bar */}
        {isUploading && uploadProgress > 0 && (
          <div className="mb-6">
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {uploadProgress < 30 ? "Uploading..." : 
               uploadProgress < 60 ? "Translating content..." :
               uploadProgress < 90 ? "Extracting skills..." : "Almost done..."}
            </p>
          </div>
        )}

        {/* File Input */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        {/* Browse Button */}
        {!isUploading && (
          <Button
            variant="default"
            size="lg"
            iconName="FolderOpen"
            iconPosition="left"
            className="mb-6"
            disabled={isUploading}
          >
            Browse Files
          </Button>
        )}

        {/* Supported Formats */}
        <div className="border-t border-border pt-6">
          <p className="text-sm font-medium text-foreground mb-3">Supported Formats</p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {supportedFormats?.map((format) => (
              <div
                key={format?.extension}
                className="flex items-center space-x-1 px-3 py-1 bg-surface rounded-full text-xs font-medium text-muted-foreground"
              >
                <Icon name={format?.icon} size={12} />
                <span>{format?.label}</span>
              </div>
            ))}
          </div>

          <p className="text-sm font-medium text-foreground mb-3">Supported Languages</p>
          <div className="flex flex-wrap justify-center gap-2">
            {supportedLanguages?.map((language) => (
              <div
                key={language?.code}
                className="flex items-center space-x-1 px-3 py-1 bg-surface rounded-full text-xs font-medium text-muted-foreground"
              >
                <span>{language?.flag}</span>
                <span>{language?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* File Size Limit */}
        <p className="text-xs text-muted-foreground mt-4">
          Maximum file size: 10MB
        </p>
      </div>
    </div>
  );
};

export default FileUploadZone;