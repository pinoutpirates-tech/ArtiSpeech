import { useState, useCallback, useRef } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

interface VoiceIntegrationProps {
  language: string;
  onResult?: (text: string) => void;
}

export const useVoiceIntegration = ({ language, onResult }: VoiceIntegrationProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { speak, speaking, supported: speechSupported } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setTranscript(result);
      onResult?.(result);
      setIsListening(false);
    },
    onError: (event: any) => {
      console.error('Speech recognition error:', event);
      setIsListening(false);
    },
  });

  const speakText = useCallback((text: string) => {
    if (speechSupported) {
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = voices.find(voice => 
        voice.lang.startsWith(getLanguageCode(language))
      );
      
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
      }

      speak({ 
        text, 
        voice: selectedVoice,
        rate: 0.9,
        pitch: 1
      });
    }
  }, [speak, language, speechSupported]);

  const startListening = useCallback(() => {
    setIsListening(true);
    setTranscript('');
    listen({ 
      lang: getLanguageCode(language),
      interimResults: false,
      continuous: false
    });
  }, [listen, language]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    stop();
  }, [stop]);

  const getLanguageCode = (lang: string): string => {
    switch (lang) {
      case 'tamil': return 'ta-IN';
      case 'hindi': return 'hi-IN';
      case 'english': 
      default: return 'en-IN';
    }
  };

  return {
    speakText,
    startListening,
    stopListening,
    isListening: isListening || listening,
    speaking,
    transcript,
    isProcessing,
    setIsProcessing,
    supported: speechSupported
  };
};