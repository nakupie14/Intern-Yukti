import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const IllustrationSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeStep, setActiveStep] = useState(0);

  const content = {
    en: {
      title: "Your Journey to the Perfect Internship",
      subtitle: "Simple steps, powerful results",
      steps: [
        {
          title: "Choose Your Path",
          description: "Start with a questionnaire or upload your resume - whatever feels right for you",
          icon: "Route",
          illustration: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
        },
        {
          title: "AI Analysis",
          description: "Our smart AI analyzes your skills, interests, and goals to understand you better",
          icon: "Brain",
          illustration: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
        },
        {
          title: "Perfect Matches",
          description: "Get personalized internship recommendations that align with your career aspirations",
          icon: "Target",
          illustration: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
        },
        {
          title: "Apply & Succeed",
          description: "Apply directly through our platform and track your applications in real-time",
          icon: "CheckCircle",
          illustration: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop"
        }
      ]
    },
    hi: {
      title: "सही इंटर्नशिप तक आपकी यात्रा",
      subtitle: "सरल कदम, शक्तिशाली परिणाम",
      steps: [
        {
          title: "अपना रास्ता चुनें",
          description: "प्रश्नावली से शुरू करें या अपना रिज्यूमे अपलोड करें - जो भी आपको सही लगे",
          icon: "Route",
          illustration: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
        },
        {
          title: "AI विश्लेषण",
          description: "हमारा स्मार्ट AI आपको बेहतर समझने के लिए आपके कौशल, रुचियों और लक्ष्यों का विश्लेषण करता है",
          icon: "Brain",
          illustration: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
        },
        {
          title: "सही मैच",
          description: "व्यक्तिगत इंटर्नशिप सिफारिशें प्राप्त करें जो आपकी करियर आकांक्षाओं के साथ मेल खाती हैं",
          icon: "Target",
          illustration: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
        },
        {
          title: "आवेदन करें और सफल हों",
          description: "हमारे प्लेटफॉर्म के माध्यम से सीधे आवेदन करें और वास्तविक समय में अपने आवेदनों को ट्रैक करें",
          icon: "CheckCircle",
          illustration: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop"
        }
      ]
    },
    ta: {
      title: "சரியான இன்டர்ன்ஷிப்பிற்கான உங்கள் பயணம்",
      subtitle: "எளிய படிகள், சக்திவாய்ந்த முடிவுகள்",
      steps: [
        {
          title: "உங்கள் பாதையைத் தேர்ந்தெடுங்கள்",
          description: "கேள்வித்தாளுடன் தொடங்குங்கள் அல்லது உங்கள் ரெஸ்யூமேவைப் பதிவேற்றுங்கள் - உங்களுக்கு சரியானது எதுவாக இருந்தாலும்",
          icon: "Route",
          illustration: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
        },
        {
          title: "AI பகுப்பாய்வு",
          description: "எங்கள் ஸ்மார்ட் AI உங்களை நன்றாகப் புரிந்துகொள்ள உங்கள் திறன்கள், ஆர்வங்கள் மற்றும் இலக்குகளை பகுப்பாய்வு செய்கிறது",
          icon: "Brain",
          illustration: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
        },
        {
          title: "சரியான பொருத்தங்கள்",
          description: "உங்கள் தொழில் அபிலாஷைகளுடன் ஒத்துப்போகும் தனிப்பயனாக்கப்பட்ட இன்டர்ன்ஷிப் பரிந்துரைகளைப் பெறுங்கள்",
          icon: "Target",
          illustration: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
        },
        {
          title: "விண்ணப்பிக்கவும் & வெற்றி பெறுங்கள்",
          description: "எங்கள் தளத்தின் மூலம் நேரடியாக விண்ணப்பிக்கவும் மற்றும் உண்மையான நேரத்தில் உங்கள் விண்ணப்பங்களைக் கண்காணிக்கவும்",
          icon: "CheckCircle",
          illustration: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop"
        }
      ]
    },
    te: {
      title: "సరైన ఇంటర్న్‌షిప్‌కు మీ ప్రయాణం",
      subtitle: "సరళమైన దశలు, శక్తివంతమైన ఫలితాలు",
      steps: [
        {
          title: "మీ మార్గాన్ని ఎంచుకోండి",
          description: "ప్రశ్నావళితో ప్రారంభించండి లేదా మీ రెజ్యూమ్‌ను అప్‌లోడ్ చేయండి - మీకు సరైనది ఏదైనా",
          icon: "Route",
          illustration: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
        },
        {
          title: "AI విశ్లేషణ",
          description: "మా స్మార్ట్ AI మిమ్మల్ని బాగా అర్థం చేసుకోవడానికి మీ నైపుణ్యాలు, ఆసక్తులు మరియు లక్ష్యాలను విశ్లేషిస్తుంది",
          icon: "Brain",
          illustration: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
        },
        {
          title: "పర్ఫెక్ట్ మ్యాచ్‌లు",
          description: "మీ కెరీర్ ఆకాంక్షలతో సరిపోలే వ్యక్తిగతీకరించిన ఇంటర్న్‌షిప్ సిఫార్సులను పొందండి",
          icon: "Target",
          illustration: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
        },
        {
          title: "దరఖాస్తు చేసి విజయం సాధించండి",
          description: "మా ప్లాట్‌ఫారమ్ ద్వారా నేరుగా దరఖాస్తు చేసుకోండి మరియు రియల్ టైమ్‌లో మీ దరఖాస్తులను ట్రాక్ చేయండి",
          icon: "CheckCircle",
          illustration: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop"
        }
      ]
    },
    bn: {
      title: "নিখুঁত ইন্টার্নশিপের জন্য আপনার যাত্রা",
      subtitle: "সহজ পদক্ষেপ, শক্তিশালী ফলাফল",
      steps: [
        {
          title: "আপনার পথ বেছে নিন",
          description: "একটি প্রশ্নাবলী দিয়ে শুরু করুন বা আপনার রেজিউমে আপলোড করুন - যা আপনার কাছে সঠিক মনে হয়",
          icon: "Route",
          illustration: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
        },
        {
          title: "AI বিশ্লেষণ",
          description: "আমাদের স্মার্ট AI আপনাকে আরও ভালভাবে বুঝতে আপনার দক্ষতা, আগ্রহ এবং লক্ষ্যগুলি বিশ্লেষণ করে",
          icon: "Brain",
          illustration: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
        },
        {
          title: "নিখুঁত ম্যাচ",
          description: "আপনার ক্যারিয়ারের আকাঙ্ক্ষার সাথে সামঞ্জস্যপূর্ণ ব্যক্তিগতকৃত ইন্টার্নশিপ সুপারিশ পান",
          icon: "Target",
          illustration: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
        },
        {
          title: "আবেদন করুন এবং সফল হন",
          description: "আমাদের প্ল্যাটফর্মের মাধ্যমে সরাসরি আবেদন করুন এবং রিয়েল-টাইমে আপনার আবেদনগুলি ট্র্যাক করুন",
          icon: "CheckCircle",
          illustration: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop"
        }
      ]
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentContent = content?.[currentLanguage] || content?.en;

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {currentContent?.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentContent?.subtitle}
          </p>
        </div>

        {/* Steps Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Steps List */}
          <div className="space-y-8">
            {currentContent?.steps?.map((step, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                  activeStep === index
                    ? 'bg-primary/10 border-2 border-primary/20 shadow-lg scale-105'
                    : 'bg-card border border-border hover:bg-muted/50'
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={step?.icon} size={20} />
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      activeStep === index
                        ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
                    }`}>
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    activeStep === index ? 'text-primary' : 'text-foreground'
                  }`}>
                    {step?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              {currentContent?.steps?.map((step, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    activeStep === index
                      ? 'opacity-100 scale-100' :'opacity-0 scale-110'
                  }`}
                >
                  <Image
                    src={step?.illustration}
                    alt={step?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-bold text-foreground mb-1">{step?.title}</h4>
                      <p className="text-sm text-muted-foreground">{step?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {currentContent?.steps?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-primary scale-125' :'bg-border hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-success/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-8 bg-card border border-border rounded-2xl px-8 py-6 shadow-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                {currentLanguage === 'hi' ? 'औसत समय: 5 मिनट' :
                 currentLanguage === 'ta' ? 'சராசரி நேரம்: 5 நிமிடங்கள்' :
                 currentLanguage === 'te' ? 'సగటు సమయం: 5 నిమిషాలు' :
                 currentLanguage === 'bn'? 'গড় সময়: ৫ মিনিট' : 'Average time: 5 minutes'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-success" />
              <span className="text-sm text-muted-foreground">
                {currentLanguage === 'hi' ? '10,000+ छात्र' :
                 currentLanguage === 'ta' ? '10,000+ மாணவர்கள்' :
                 currentLanguage === 'te' ? '10,000+ విద్యార్థులు' :
                 currentLanguage === 'bn'? '10,000+ শিক্ষার্থী' : '10,000+ students'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} className="text-accent" />
              <span className="text-sm text-muted-foreground">
                {currentLanguage === 'hi' ? '4.9/5 रेटिंग' :
                 currentLanguage === 'ta' ? '4.9/5 மதிப்பீடு' :
                 currentLanguage === 'te' ? '4.9/5 రేటింగ్' :
                 currentLanguage === 'bn'? '4.9/5 রেটিং' : '4.9/5 rating'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IllustrationSection;