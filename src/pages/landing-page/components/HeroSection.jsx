import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const content = {
    en: {
      tagline: "Smart Internship Recommendations for Every Student",
      subtitle: "Discover personalized internship opportunities through AI-powered assessment and smart resume analysis",
      startQuestionnaire: "Start Questionnaire",
      uploadResume: "Upload Resume for Instant Suggestions",
      questionnaireDesc: "Answer a few questions to get personalized recommendations",
      resumeDesc: "Upload your resume for instant AI-powered suggestions"
    },
    hi: {
      tagline: "हर छात्र के लिए स्मार्ट इंटर्नशिप सिफारिशें",
      subtitle: "AI-संचालित मूल्यांकन और स्मार्ट रिज्यूमे विश्लेषण के माध्यम से व्यक्तिगत इंटर्नशिप अवसर खोजें",
      startQuestionnaire: "प्रश्नावली शुरू करें",
      uploadResume: "तत्काल सुझावों के लिए रिज्यूमे अपलोड करें",
      questionnaireDesc: "व्यक्तिगत सिफारिशें पाने के लिए कुछ प्रश्नों के उत्तर दें",
      resumeDesc: "तत्काल AI-संचालित सुझावों के लिए अपना रिज्यूमे अपलोड करें"
    },
    ta: {
      tagline: "ஒவ்வொரு மாணவருக்கும் ஸ்மார்ட் இன்டர்ன்ஷிப் பரிந்துரைகள்",
      subtitle: "AI-இயங்கும் மதிப்பீடு மற்றும் ஸ்மார்ட் ரெஸ்யூம் பகுப்பாய்வு மூலம் தனிப்பயனாக்கப்பட்ட இன்டர்ன்ஷிப் வாய்ப்புகளைக் கண்டறியுங்கள்",
      startQuestionnaire: "கேள்வித்தாளைத் தொடங்கவும்",
      uploadResume: "உடனடி பரிந்துரைகளுக்கு ரெஸ்யூமே பதிவேற்றவும்",
      questionnaireDesc: "தனிப்பயனாக்கப்பட்ட பரிந்துரைகளைப் பெற சில கேள்விகளுக்கு பதிலளிக்கவும்",
      resumeDesc: "உடனடி AI-இயங்கும் பரிந்துரைகளுக்கு உங்கள் ரெஸ்யூமேவைப் பதிவேற்றவும்"
    },
    te: {
      tagline: "ప్రతి విద్యార్థికి స్మార్ట్ ఇంటర్న్‌షిప్ సిఫార్సులు",
      subtitle: "AI-శక్తితో కూడిన అంచనా మరియు స్మార్ట్ రెజ్యూమ్ విశ్లేషణ ద్వారా వ్యక్తిగతీకరించిన ఇంటర్న్‌షిప్ అవకాశాలను కనుగొనండి",
      startQuestionnaire: "ప్రశ్నావళిని ప్రారంభించండి",
      uploadResume: "తక్షణ సూచనల కోసం రెజ్యూమ్ అప్‌లోడ్ చేయండి",
      questionnaireDesc: "వ్యక్తిగతీకరించిన సిఫార్సులను పొందడానికి కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి",
      resumeDesc: "తక్షణ AI-శక్తితో కూడిన సూచనల కోసం మీ రెజ్యూమ్‌ను అప్‌లోడ్ చేయండి"
    },
    bn: {
      tagline: "প্রতিটি শিক্ষার্থীর জন্য স্মার্ট ইন্টার্নশিপ সুপারিশ",
      subtitle: "AI-চালিত মূল্যায়ন এবং স্মার্ট রেজিউমে বিশ্লেষণের মাধ্যমে ব্যক্তিগতকৃত ইন্টার্নশিপ সুযোগ আবিষ্কার করুন",
      startQuestionnaire: "প্রশ্নাবলী শুরু করুন",
      uploadResume: "তাৎক্ষণিক পরামর্শের জন্য রেজিউমে আপলোড করুন",
      questionnaireDesc: "ব্যক্তিগতকৃত সুপারিশ পেতে কয়েকটি প্রশ্নের উত্তর দিন",
      resumeDesc: "তাৎক্ষণিক AI-চালিত পরামর্শের জন্য আপনার রেজিউমে আপলোড করুন"
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const currentContent = content?.[currentLanguage] || content?.en;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo and Brand */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Zap" size={32} color="white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              InternYukti
            </span>
          </h1>
        </div>

        {/* Main Tagline */}
        <div className="mb-12 animate-slide-up">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
            {currentContent?.tagline}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {currentContent?.subtitle}
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="mb-16 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Start Questionnaire CTA */}
            <div className="group bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon name="FileText" size={28} color="white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {currentContent?.startQuestionnaire}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {currentContent?.questionnaireDesc}
              </p>
              <Link to="/questionnaire-flow">
                <Button 
                  variant="default" 
                  size="lg" 
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="group-hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Upload Resume CTA */}
            <div className="group bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon name="Upload" size={28} color="white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {currentContent?.uploadResume}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {currentContent?.resumeDesc}
              </p>
              <Link to="/resume-upload">
                <Button 
                  variant="outline" 
                  size="lg" 
                  fullWidth
                  iconName="Upload"
                  iconPosition="right"
                  className="group-hover:bg-primary/5 group-hover:border-primary"
                >
                  Upload Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">Students Helped</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-secondary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Partner Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Languages Supported</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-success mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Match Accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;