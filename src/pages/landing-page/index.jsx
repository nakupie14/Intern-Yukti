import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import IllustrationSection from './components/IllustrationSection';
import OfflineIndicator from './components/OfflineIndicator';
import VoiceInputFAB from './components/VoiceInputFAB';

const LandingPage = () => {
  useEffect(() => {
    // Set page title based on current language
    const updatePageTitle = () => {
      const currentLanguage = localStorage.getItem('language') || 'en';
      const titles = {
        en: 'InternYukti - Smart Internship Recommendations for Every Student',
        hi: 'InternYukti - हर छात्र के लिए स्मार्ट इंटर्नशिप सिफारिशें',
        ta: 'InternYukti - ஒவ்வொரு மாணவருக்கும் ஸ்மார்ட் இன்டர்ன்ஷிப் பரிந்துரைகள்',
        te: 'InternYukti - ప్రతి విద్యార్థికి స్మార్ట్ ఇంటర్న్‌షిప్ సిఫార్సులు',
        bn: 'InternYukti - প্রতিটি শিক্ষার্থীর জন্য স্মার্ট ইন্টার্নশিপ সুপারিশ'
      };
      document.title = titles?.[currentLanguage] || titles?.en;
    };

    updatePageTitle();

    // Listen for language changes
    const handleLanguageChange = () => {
      updatePageTitle();
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Illustration Section */}
        <IllustrationSection />
      </main>
      {/* Floating Elements */}
      <OfflineIndicator />
      <VoiceInputFAB />
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">IY</span>
                </div>
                <span className="text-xl font-bold text-foreground">InternYukti</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Empowering students across India with AI-powered internship recommendations 
                in their preferred language.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>🇮🇳</span>
                  <span>Made in India</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>🌐</span>
                  <span>15+ Languages</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Start</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/questionnaire-flow" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Start Questionnaire
                  </a>
                </li>
                <li>
                  <a href="/resume-upload" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Upload Resume
                  </a>
                </li>
                <li>
                  <a href="/internship-results" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    View Results
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/help" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} InternYukti. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success">Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;