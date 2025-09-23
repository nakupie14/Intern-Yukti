import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileUploadEnhancements = ({ onFileSelect, onCameraCapture, className = '' }) => {
  const [showCameraOptions, setShowCameraOptions] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef?.current?.click();
  };

  const handleCameraSelect = () => {
    cameraInputRef?.current?.click();
    setShowCameraOptions(false);
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileSelect?.(file);
    }
  };

  const handleCameraChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onCameraCapture?.(file);
    }
  };

  const uploadOptions = [
    {
      id: 'file',
      title: 'Choose from Files',
      description: 'Select PDF, DOC, or DOCX from your device',
      icon: 'FolderOpen',
      color: 'primary',
      action: handleFileSelect
    },
    {
      id: 'camera',
      title: 'Take Photo',
      description: 'Capture your resume with camera',
      icon: 'Camera',
      color: 'secondary',
      action: () => setShowCameraOptions(true)
    }
  ];

  const cameraOptions = [
    {
      id: 'photo',
      title: 'Take Photo',
      description: 'Capture a single page',
      icon: 'Camera',
      action: handleCameraSelect
    },
    {
      id: 'scan',
      title: 'Document Scan',
      description: 'Multi-page document scanning',
      icon: 'ScanLine',
      action: handleCameraSelect
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Upload Options */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {uploadOptions?.map((option) => (
          <button
            key={option?.id}
            onClick={option?.action}
            className="w-full p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                option?.color === 'primary' ?'bg-primary/10 text-primary' :'bg-secondary/10 text-secondary'
              }`}>
                <Icon name={option?.icon} size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-foreground mb-1">
                  {option?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {option?.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
      {/* Camera Options Modal */}
      {showCameraOptions && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full bg-card border-t border-border rounded-t-xl animate-slide-up">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Camera Options
                </h3>
                <button
                  onClick={() => setShowCameraOptions(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {cameraOptions?.map((option) => (
                <button
                  key={option?.id}
                  onClick={option?.action}
                  className="w-full p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <Icon name={option?.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-card-foreground mb-1">
                        {option?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {option?.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-border">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowCameraOptions(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraChange}
        className="hidden"
      />
      {/* Mobile Tips */}
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
          Mobile Tips
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
            <span>Ensure good lighting when taking photos</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
            <span>Keep the document flat and in frame</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
            <span>PDF files work best for accurate parsing</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileUploadEnhancements;