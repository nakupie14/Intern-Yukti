import React, { useState, useEffect } from 'react';
import VoiceInputToggle from '../../../components/ui/VoiceInputToggle';

const VoiceInputHelper = ({ onVoiceResult, currentField }) => {
  const [isListening, setIsListening] = useState(false);
  const [lastResult, setLastResult] = useState('');

  const handleVoiceStart = () => {
    setIsListening(true);
  };

  const handleVoiceEnd = () => {
    setIsListening(false);
  };

  const handleVoiceResult = (transcript) => {
    if (transcript && transcript?.trim()) {
      setLastResult(transcript);
      onVoiceResult?.(transcript?.trim());
    }
  };

  const getFieldInstructions = () => {
    const instructions = {
      fullName: "Say your full name clearly",
      email: "Speak your email address slowly, including the @ symbol and domain",
      password: "Voice input not recommended for passwords for security reasons",
      confirmPassword: "Voice input not recommended for passwords for security reasons"
    };

    return instructions?.[currentField] || "Speak clearly for voice input";
  };

  // Don't show voice input for password fields
  if (currentField === 'password' || currentField === 'confirmPassword') {
    return null;
  }

  return (
    <div className="space-y-2">
      <VoiceInputToggle
        onVoiceResult={handleVoiceResult}
        onVoiceStart={handleVoiceStart}
        onVoiceEnd={handleVoiceEnd}
        position="inline"
        size="sm"
        className="w-full"
      />
      
      {isListening && (
        <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
          <p className="text-sm text-primary font-medium">
            🎤 Listening... {getFieldInstructions()}
          </p>
        </div>
      )}

      {lastResult && !isListening && (
        <div className="p-3 bg-success/10 border border-success/20 rounded-md">
          <p className="text-sm text-success">
            ✓ Voice input captured: "{lastResult}"
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceInputHelper;