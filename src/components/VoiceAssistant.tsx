import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useVoiceIntegration } from '@/hooks/useVoiceIntegration';
import { cn } from '@/lib/utils';

interface VoiceAssistantProps {
  language: string;
  onCommand?: (command: string) => void;
  className?: string;
  size?: 'default' | 'large';
  prompt?: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  language,
  onCommand,
  className,
  size = 'default',
  prompt
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(prompt || '');
  
  const { 
    speakText, 
    startListening, 
    stopListening, 
    isListening, 
    speaking, 
    transcript,
    supported 
  } = useVoiceIntegration({
    language,
    onResult: (text: string) => {
      onCommand?.(text);
      setIsOpen(false);
    }
  });

  const getText = (key: string) => {
    const translations = {
      english: {
        aiAssistant: "AI Voice Assistant",
        askAnything: "Ask me anything in your language",
        listening: "Listening...",
        tapToSpeak: "Tap to speak",
        speaking: "Speaking...",
      },
      tamil: {
        aiAssistant: "AI குரல் உதவியாளர்",
        askAnything: "உங்கள் மொழியில் என்னிடம் கேளுங்கள்",
        listening: "கேட்டுக்கொண்டிருக்கிறது...",
        tapToSpeak: "பேச அழுத்தவும்",
        speaking: "பேசுகிறது...",
      },
      hindi: {
        aiAssistant: "AI वॉयस असिस्टेंट",
        askAnything: "अपनी भाषा में मुझसे कुछ भी पूछें",
        listening: "सुन रहा है...",
        tapToSpeak: "बोलने के लिए दबाएं",
        speaking: "बोल रहा है...",
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['english']] || key;
  };

  const handleVoiceClick = () => {
    if (isListening) {
      stopListening();
    } else {
      if (currentPrompt) {
        speakText(currentPrompt);
        setCurrentPrompt('');
      }
      setIsOpen(true);
      setTimeout(() => startListening(), 500);
    }
  };

  useEffect(() => {
    if (prompt && prompt !== currentPrompt) {
      setCurrentPrompt(prompt);
      speakText(prompt);
    }
  }, [prompt, currentPrompt, speakText]);

  if (!supported) {
    return null;
  }

  const isCompact = size === 'default';

  return (
    <>
      {/* Voice Assistant Button */}
      <Button
        variant="voice"
        size={isCompact ? "voice" : "xl"}
        onClick={handleVoiceClick}
        className={cn(
          "glow-voice transition-all duration-300",
          isListening && "animate-pulse",
          speaking && "bg-accent-gold/80",
          className
        )}
      >
        {isListening ? (
          <MicOff className={cn("h-8 w-8", !isCompact && "h-12 w-12")} />
        ) : speaking ? (
          <Volume2 className={cn("h-8 w-8", !isCompact && "h-12 w-12")} />
        ) : (
          <Mic className={cn("h-8 w-8", !isCompact && "h-12 w-12")} />
        )}
      </Button>

      {/* Voice Assistant Card - Show when active */}
      {(isOpen || isListening || speaking) && (
        <Card className="fixed top-4 left-4 right-4 z-50 gradient-card glow-gold border-accent-gold/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  isListening ? "bg-red-500 animate-pulse" : 
                  speaking ? "bg-accent-gold animate-pulse" : 
                  "bg-accent-gold"
                )}>
                  {isListening ? (
                    <MicOff className="h-6 w-6 text-white" />
                  ) : speaking ? (
                    <Volume2 className="h-6 w-6 text-white" />
                  ) : (
                    <Mic className="h-6 w-6 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-accent-gold text-sm">
                  {getText('aiAssistant')}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {isListening ? getText('listening') :
                   speaking ? getText('speaking') :
                   getText('askAnything')}
                </p>
                {transcript && (
                  <p className="text-sm mt-2 p-2 bg-background/50 rounded">
                    {transcript}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground"
              >
                ✕
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};