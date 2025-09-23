import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const content = {
    en: {
      title: "How We're Different",
      subtitle: "Discover what makes InternYukti the perfect choice for your internship journey",
      features: [
        {
          title: "Multi-Language First",
          description: "Support for 15+ Indian languages including Hindi, Tamil, Telugu, Bengali, and more. Your comfort, your language.",
          icon: "Globe",
          gradient: "from-blue-500 to-cyan-500"
        },
        {
          title: "Smart Resume Upload",
          description: "AI-powered resume parsing that understands multiple languages and extracts skills, education, and achievements instantly.",
          icon: "Brain",
          gradient: "from-purple-500 to-pink-500"
        },
        {
          title: "Inclusive Voice Access",
          description: "Voice input functionality for accessibility, making the platform usable for everyone regardless of typing ability.",
          icon: "Mic",
          gradient: "from-green-500 to-emerald-500"
        },
        {
          title: "Offline-Friendly",
          description: "Works seamlessly even with poor internet connectivity. Your progress is saved and synced when you\'re back online.",
          icon: "Wifi",
          gradient: "from-orange-500 to-red-500"
        }
      ]
    },
    hi: {
      title: "हम कैसे अलग हैं",
      subtitle: "जानें कि InternYukti को आपकी इंटर्नशिप यात्रा के लिए सही विकल्प क्या बनाता है",
      features: [
        {
          title: "बहुभाषी प्राथमिकता",
          description: "हिंदी, तमिल, तेलुगु, बंगाली और अन्य सहित 15+ भारतीय भाषाओं का समर्थन। आपकी सुविधा, आपकी भाषा।",
          icon: "Globe",
          gradient: "from-blue-500 to-cyan-500"
        },
        {
          title: "स्मार्ट रिज्यूमे अपलोड",
          description: "AI-संचालित रिज्यूमे पार्सिंग जो कई भाषाओं को समझता है और तुरंत कौशल, शिक्षा और उपलब्धियों को निकालता है।",
          icon: "Brain",
          gradient: "from-purple-500 to-pink-500"
        },
        {
          title: "समावेशी आवाज पहुंच",
          description: "पहुंच के लिए आवाज इनपुट कार्यक्षमता, टाइपिंग क्षमता की परवाह किए बिना सभी के लिए प्लेटफॉर्म को उपयोग योग्य बनाना।",
          icon: "Mic",
          gradient: "from-green-500 to-emerald-500"
        },
        {
          title: "ऑफलाइन-अनुकूल",
          description: "खराब इंटरनेट कनेक्टिविटी के साथ भी निर्बाध रूप से काम करता है। आपकी प्रगति सहेजी जाती है और जब आप वापस ऑनलाइन होते हैं तो सिंक हो जाती है।",
          icon: "Wifi",
          gradient: "from-orange-500 to-red-500"
        }
      ]
    },
    ta: {
      title: "நாங்கள் எப்படி வித்தியாசமானவர்கள்",
      subtitle: "உங்கள் இன்டர்ன்ஷிப் பயணத்திற்கு InternYukti ஐ சரியான தேர்வாக மாற்றுவது என்ன என்பதைக் கண்டறியுங்கள்",
      features: [
        {
          title: "பல மொழி முதல்",
          description: "இந்தி, தமிழ், தெலுங்கு, பெங்காலி மற்றும் பலவற்றை உள்ளடக்கிய 15+ இந்திய மொழிகளுக்கான ஆதரவு। உங்கள் வசதி, உங்கள் மொழி।",
          icon: "Globe",
          gradient: "from-blue-500 to-cyan-500"
        },
        {
          title: "ஸ்மார்ட் ரெஸ்யூம் பதிவேற்றம்",
          description: "பல மொழிகளைப் புரிந்துகொண்டு உடனடியாக திறன்கள், கல்வி மற்றும் சாதனைகளைப் பிரித்தெடுக்கும் AI-இயங்கும் ரெஸ்யூம் பாகுபடுத்தல்।",
          icon: "Brain",
          gradient: "from-purple-500 to-pink-500"
        },
        {
          title: "உள்ளடக்கிய குரல் அணுகல்",
          description: "அணुகலுக்கான குரல் உள்ளீட்டு செயல்பாடு, தட்டச்சு திறனைப் பொருட்படுத்தாமல் அனைவருக்கும் தளத்தை பயன்படுத்தக்கூडியதாக ஆக்குகிறது।",
          icon: "Mic",
          gradient: "from-green-500 to-emerald-500"
        },
        {
          title: "ஆஃப்லைன்-நட்பு",
          description: "மோசமான இணைய இணைப்புடன் கூட தடையின்றி வேலை செய்கிறது. உங்கள் முன்னேற்றம் சேமிக்கப்பட்டு நீங்கள் மீண்டும் ஆன்லைனில் வரும்போது ஒத்திசைக்கப்படும்।",
          icon: "Wifi",
          gradient: "from-orange-500 to-red-500"
        }
      ]
    },
    te: {
      title: "మేము ఎలా భిన్నంగా ఉన్నాము",
      subtitle: "మీ ఇంటర్న్‌షిప్ ప్రయాణానికి InternYukti ను సరైన ఎంపికగా మార్చేది ఏమిటో కనుగొనండి",
      features: [
        {
          title: "బహుభాషా మొదట",
          description: "హిందీ, తమిళ్, తెలుగు, బెంగాలీ మరియు మరిన్నింటితో సహా 15+ భారతీయ భాషలకు మద్దతు. మీ సౌకర్యం, మీ భాష.",
          icon: "Globe",
          gradient: "from-blue-500 to-cyan-500"
        },
        {
          title: "స్మార్ట్ రెజ్యూమ్ అప్‌లోడ్",
          description: "బహుళ భాషలను అర్థం చేసుకుని తక్షణమే నైపుణ్యాలు, విద్య మరియు విజయాలను సేకరించే AI-శక్తితో కూడిన రెజ్యూమ్ పార్సింగ్.",
          icon: "Brain",
          gradient: "from-purple-500 to-pink-500"
        },
        {
          title: "కలుపుకొని వెళ్ళే వాయిస్ యాక్సెస్",
          description: "ప్రాప్యత కోసం వాయిస్ ఇన్‌పుట్ కార్యాచరణ, టైపింగ్ సామర్థ్యంతో సంబంధం లేకుండా అందరికీ ప్లాట్‌ఫారమ్‌ను ఉపయోగించదగినదిగా చేస్తుంది.",
          icon: "Mic",
          gradient: "from-green-500 to-emerald-500"
        },
        {
          title: "ఆఫ్‌లైన్-స్నేహపూర్వక",
          description: "పేలవమైన ఇంటర్నెట్ కనెక్టివిటీతో కూడా సజావుగా పని చేస్తుంది. మీ పురోగతి సేవ్ చేయబడుతుంది మరియు మీరు తిరిగి ఆన్‌లైన్‌లో ఉన్నప్పుడు సింక్ చేయబడుతుంది.",
          icon: "Wifi",
          gradient: "from-orange-500 to-red-500"
        }
      ]
    },
    bn: {
      title: "আমরা কীভাবে আলাদা",
      subtitle: "আপনার ইন্টার্নশিপ যাত্রার জন্য InternYukti কে নিখুঁত পছন্দ করে তোলে তা আবিষ্কার করুন",
      features: [
        {
          title: "বহুভাষিক প্রথম",
          description: "হিন্দি, তামিল, তেলুগু, বাংলা এবং আরও অনেক সহ 15+ ভারতীয় ভাষার জন্য সমর্থন। আপনার আরাম, আপনার ভাষা।",
          icon: "Globe",
          gradient: "from-blue-500 to-cyan-500"
        },
        {
          title: "স্মার্ট রেজিউমে আপলোড",
          description: "AI-চালিত রেজিউমে পার্সিং যা একাধিক ভাষা বোঝে এবং তাৎক্ষণিকভাবে দক্ষতা, শিক্ষা এবং অর্জনগুলি বের করে।",
          icon: "Brain",
          gradient: "from-purple-500 to-pink-500"
        },
        {
          title: "অন্তর্ভুক্তিমূলক ভয়েস অ্যাক্সেস",
          description: "অ্যাক্সেসিবিলিটির জন্য ভয়েস ইনপুট কার্যকারিতা, টাইপিং ক্ষমতা নির্বিশেষে সবার জন্য প্ল্যাটফর্মটি ব্যবহারযোগ্য করে তোলে।",
          icon: "Mic",
          gradient: "from-green-500 to-emerald-500"
        },
        {
          title: "অফলাইন-বান্ধব",
          description: "দুর্বল ইন্টারনেট সংযোগের সাথেও নির্বিঘ্নে কাজ করে। আপনার অগ্রগতি সংরক্ষিত হয় এবং আপনি আবার অনলাইনে এলে সিঙ্ক হয়।",
          icon: "Wifi",
          gradient: "from-orange-500 to-red-500"
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

  const currentContent = content?.[currentLanguage] || content?.en;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {currentContent?.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {currentContent?.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentContent?.features?.map((feature, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature?.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={feature?.icon} size={28} color="white" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-border to-transparent group-hover:via-primary transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {currentLanguage === 'hi' ? 'आज ही शुरू करें' :
               currentLanguage === 'ta' ? 'இன்றே தொடங்குங்கள்' :
               currentLanguage === 'te' ? 'ఈరోజే ప్రారంభించండి' :
               currentLanguage === 'bn'? 'আজই শুরু করুন' : 'Start Your Journey Today'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {currentLanguage === 'hi' ? 'हजारों छात्रों में शामिल हों जिन्होंने InternYukti के साथ अपना सही इंटर्नशिप मैच पाया है।' :
               currentLanguage === 'ta' ? 'InternYukti உடன் தங்கள் சரியான இன்டர்ன்ஷிப் பொருத்தத்தைக் கண்டறிந்த ஆயிரக்கணக்கான மாணவர்களுடன் சேருங்கள்।' :
               currentLanguage === 'te' ? 'InternYukti తో వారి సరైన ఇంటర్న్‌షిప్ మ్యాచ్‌ను కనుగొన్న వేలాది మంది విద్యార్థులతో చేరండి।' :
               currentLanguage === 'bn'? 'হাজার হাজার শিক্ষার্থীর সাথে যোগ দিন যারা InternYukti এর সাথে তাদের নিখুঁত ইন্টার্নশিপ ম্যাচ খুঁজে পেয়েছে।' : 'Join thousands of students who have found their perfect internship match with InternYukti.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Building" size={16} />
                <span>500+ Companies</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Star" size={16} />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;