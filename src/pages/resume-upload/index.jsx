import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import VoiceInputToggle from '../../components/ui/VoiceInputToggle';
import FileUploadZone from './components/FileUploadZone';
import ProcessingStages from './components/ProcessingStages';
import ResumeSummaryCard from './components/ResumeSummaryCard';
import LanguageProcessingNotification from './components/LanguageProcessingNotification';
import ErrorHandler from './components/ErrorHandler';
import MobileUploadEnhancements from './components/MobileUploadEnhancements';

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, processing, completed, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const [showLanguageNotification, setShowLanguageNotification] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);

  // Mock resume data for demonstration
  const mockResumeData = {
    name: "Arjun Sharma",
    email: "arjun.sharma@email.com",
    phone: "+91 9876543210",
    confidence: "high",
    originalLanguage: "hi",
    education: [
      {
        degree: "Bachelor of Technology in Computer Science",
        institution: "Indian Institute of Technology, Delhi",
        year: "2021-2025",
        confidence: "high"
      }
    ],
    skills: [
      "Python", "JavaScript", "React", "Node.js", "MongoDB", 
      "Machine Learning", "Data Analysis", "Digital Marketing", 
      "Communication", "Problem Solving"
    ],
    projects: [
      {
        title: "E-commerce Web Application",
        description: "Built a full-stack e-commerce platform using MERN stack with payment integration and user authentication.",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        confidence: "high"
      },
      {
        title: "Machine Learning Price Predictor",
        description: "Developed a machine learning model to predict house prices using Python and scikit-learn.",
        technologies: ["Python", "Scikit-learn", "Pandas", "NumPy"],
        confidence: "medium"
      }
    ],
    achievements: [
      "Winner of College Hackathon 2023",
      "Google Developer Student Club Lead",
      "Published research paper on AI applications"
    ]
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setError(null);
    setUploadState('uploading');
    setUploadProgress(0);

    try {
      // Simulate file upload with progress
      await simulateUpload();
      
      // Detect language (mock)
      const detectedLang = Math.random() > 0.5 ? 'hi' : 'en';
      setDetectedLanguage(detectedLang);
      
      if (detectedLang !== 'en') {
        setShowLanguageNotification(true);
      }
      
      setUploadState('processing');
      
      // Simulate AI processing
      await simulateProcessing();
      
      // Set mock resume data
      setResumeData({
        ...mockResumeData,
        originalLanguage: detectedLang
      });
      
      setUploadState('completed');
      
    } catch (err) {
      setError({
        type: 'processing-failed',
        message: err?.message,
        details: err?.details
      });
      setUploadState('error');
    }
  };

  const simulateUpload = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        setUploadProgress(Math.min(progress, 100));
      }, 200);
    });
  };

  const simulateProcessing = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        setUploadProgress(Math.min(progress, 100));
      }, 300);
    });
  };

  const handleRetry = () => {
    setError(null);
    setUploadState('idle');
    setUploadProgress(0);
    setSelectedFile(null);
    setResumeData(null);
  };

  const handleGoBack = () => {
    navigate('/landing-page');
  };

  const handleConfirmResume = (confirmedData) => {
    // Store resume data for results page
    localStorage.setItem('resumeData', JSON.stringify(confirmedData));
    localStorage.setItem('uploadMethod', 'resume');
    navigate('/internship-results');
  };

  const handleVoiceResult = (transcript) => {
    // Voice input can be used for editing resume details
    console.log('Voice input:', transcript);
  };

  const getPageTitle = () => {
    switch (uploadState) {
      case 'uploading':
        return 'Uploading Resume...';
      case 'processing':
        return 'Analyzing Resume...';
      case 'completed':
        return 'Resume Analysis Complete';
      case 'error':
        return 'Upload Error';
      default:
        return 'Upload Your Resume';
    }
  };

  const getPageDescription = () => {
    switch (uploadState) {
      case 'uploading':
        return 'Securely uploading your resume to our AI system';
      case 'processing':
        return 'Our AI is extracting skills, education, and experience from your resume';
      case 'completed':
        return 'Review the extracted information and get personalized recommendations';
      case 'error':
        return 'We encountered an issue processing your resume';
      default:
        return 'Get instant internship recommendations powered by AI analysis of your resume';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-muted">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link to="/landing-page" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Resume Upload</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {getPageTitle()}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {getPageDescription()}
            </p>
          </div>

          {/* Progress Indicator */}
          {(uploadState === 'uploading' || uploadState === 'processing') && (
            <div className="mb-8">
              <ProcessingStages 
                currentStage={uploadState}
                progress={uploadProgress}
                className="max-w-2xl mx-auto"
              />
            </div>
          )}

          {/* Main Content */}
          <div className="max-w-2xl mx-auto">
            {uploadState === 'idle' && (
              <>
                {isMobile ? (
                  <MobileUploadEnhancements
                    onFileSelect={handleFileSelect}
                    onCameraCapture={handleFileSelect}
                    className="mb-8"
                  />
                ) : (
                  <FileUploadZone
                    onFileSelect={handleFileSelect}
                    isUploading={false}
                    uploadProgress={0}
                    className="mb-8"
                  />
                )}

                {/* Alternative Option */}
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-muted-foreground">
                        Or try our questionnaire
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/questionnaire-flow">
                      <Button
                        variant="outline"
                        size="lg"
                        iconName="FileText"
                        iconPosition="left"
                      >
                        Start Questionnaire Instead
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {(uploadState === 'uploading' || uploadState === 'processing') && (
              <FileUploadZone
                onFileSelect={handleFileSelect}
                isUploading={true}
                uploadProgress={uploadProgress}
                className="mb-8"
              />
            )}

            {uploadState === 'completed' && resumeData && (
              <ResumeSummaryCard
                resumeData={resumeData}
                onEdit={() => console.log('Edit mode activated')}
                onConfirm={handleConfirmResume}
                className="mb-8"
              />
            )}

            {uploadState === 'error' && error && (
              <ErrorHandler
                error={error}
                onRetry={handleRetry}
                onGoBack={handleGoBack}
                className="mb-8"
              />
            )}
          </div>

          {/* Features Highlight */}
          {uploadState === 'idle' && (
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Why Upload Your Resume?
                </h2>
                <p className="text-muted-foreground">
                  Get instant, personalized recommendations based on your actual experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'Zap',
                    title: 'Instant Analysis',
                    description: 'AI extracts skills, education, and projects in seconds'
                  },
                  {
                    icon: 'Languages',
                    title: 'Multi-Language Support',
                    description: 'Upload resumes in Hindi, Tamil, Marathi, and more'
                  },
                  {
                    icon: 'Target',
                    title: 'Personalized Matches',
                    description: 'Get recommendations tailored to your unique profile'
                  }
                ]?.map((feature, index) => (
                  <div key={index} className="text-center p-6 bg-card border border-border rounded-lg">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                      <Icon name={feature?.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {feature?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Language Processing Notification */}
      <LanguageProcessingNotification
        detectedLanguage={detectedLanguage}
        isVisible={showLanguageNotification}
        onClose={() => setShowLanguageNotification(false)}
      />
      {/* Voice Input Toggle */}
      {uploadState === 'completed' && (
        <VoiceInputToggle
          onVoiceResult={handleVoiceResult}
          onVoiceStart={() => console.log('Voice input started')}
          onVoiceEnd={() => console.log('Voice input ended')}
          position="fixed"
        />
      )}
    </div>
  );
};

export default ResumeUpload;