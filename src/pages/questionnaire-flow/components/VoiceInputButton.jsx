import React, { useState, useEffect, useRef } from 'react';

import Button from '../../../components/ui/Button';

const VoiceInputButton = ({ 
  onVoiceResult, 
  className = '',
  size = 'default'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef?.current;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US'; // Default to English

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event?.results)?.map(result => result?.[0])?.map(result => result?.transcript)?.join('');

        if (event?.results?.[0]?.isFinal && transcript?.trim()) {
          onVoiceResult?.(transcript?.trim());
        }
      };

      recognition.onerror = (event) => {
        setError(event?.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef?.current) {
        recognitionRef?.current?.abort();
      }
      if (timeoutRef?.current) {
        clearTimeout(timeoutRef?.current);
      }
    };
  }, [onVoiceResult]);

  const startListening = () => {
    if (!isSupported || !recognitionRef?.current) return;

    try {
      recognitionRef?.current?.start();
      
      // Auto-stop after 10 seconds
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef?.current && isListening) {
          recognitionRef?.current?.stop();
        }
      }, 10000);
    } catch (error) {
      setError('Failed to start voice recognition');
    }
  };

  const stopListening = () => {
    if (recognitionRef?.current && isListening) {
      recognitionRef?.current?.stop();
    }
    if (timeoutRef?.current) {
      clearTimeout(timeoutRef?.current);
    }
  };

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant={isListening ? "default" : "outline"}
        size={size}
        onClick={handleToggle}
        disabled={!!error}
        className={`${isListening ? 'animate-pulse bg-red-500 hover:bg-red-600' : ''}`}
        iconName={isListening ? "MicOff" : "Mic"}
        iconPosition="left"
      >
        {isListening ? "Listening..." : "Voice Input"}
      </Button>
      
      {error && (
        <div className="absolute top-full left-0 mt-1 px-3 py-2 bg-error text-error-foreground text-sm rounded-md shadow-lg animate-slide-down z-10">
          Voice input error: {error}
        </div>
      )}
      
      {isListening && (
        <div className="absolute top-full left-0 mt-1 px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md shadow-lg animate-slide-down z-10">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>Listening... Speak now</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceInputButton;