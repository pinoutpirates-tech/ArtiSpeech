import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceAssistantProps {
  language: string;
  onCommand?: (command: string) => void;
  className?: string;
  size?: "default" | "large";
  prompt?: string;
  mode?: "input" | "chat"; // input = capture only, chat = mock reply
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  language,
  onCommand,
  className,
  size = "default",
  prompt,
  mode = "chat",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");

  const supported = "webkitSpeechRecognition" in window;

  // 🔹 Mock Q&A
  const mockQA = {
    english: [
      { en: "Today’s sales are ₹2450.", local: "Today’s sales are ₹2450." },
      { en: "You have 3 pending orders.", local: "You have 3 pending orders." },
      { en: "Your best product is the Blue Silk Saree.", local: "Your best product is the Blue Silk Saree." },
    ],
    tamil: [
      { en: "Today’s sales are ₹2450.", local: "இன்றைய விற்பனை ₹2450." },
      { en: "You have 3 pending orders.", local: "உங்களிடம் 3 நிலுவை ஆர்டர்கள் உள்ளன." },
      { en: "Your best product is the Blue Silk Saree.", local: "உங்கள் சிறந்த தயாரிப்பு நீல பட்டு புடவை." },
    ],
    hindi: [
      { en: "Today’s sales are ₹2450.", local: "आज की बिक्री ₹2450 है।" },
      { en: "You have 3 pending orders.", local: "आपके पास 3 लंबित ऑर्डर हैं।" },
      { en: "Your best product is the Blue Silk Saree.", local: "आपका सबसे लोकप्रिय उत्पाद नीली रेशमी साड़ी है।" },
    ],
  };

  const qaSet =
    language === "tamil"
      ? mockQA.tamil
      : language === "hindi"
      ? mockQA.hindi
      : mockQA.english;

  const getText = (key: string) => {
    const translations = {
      english: {
        aiAssistant: "AI Voice Assistant",
        askAnything: "Ask me anything in your language",
        listening: "Listening...",
        speaking: "Speaking...",
      },
      tamil: {
        aiAssistant: "AI குரல் உதவியாளர்",
        askAnything: "உங்கள் மொழியில் என்னிடம் கேளுங்கள்",
        listening: "கேட்டுக்கொண்டிருக்கிறது...",
        speaking: "பேசுகிறது...",
      },
      hindi: {
        aiAssistant: "AI वॉयस असिस्टेंट",
        askAnything: "अपनी भाषा में मुझसे कुछ भी पूछें",
        listening: "सुन रहा है...",
        speaking: "बोल रहा है...",
      },
    };
    return (
      translations[language as keyof typeof translations]?.[
        key as keyof typeof translations["english"]
      ] || key
    );
  };

  const startListening = () => {
    if (!supported) return;
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang =
      language === "tamil"
        ? "ta-IN"
        : language === "hindi"
        ? "hi-IN"
        : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setIsListening(false);

      if (mode === "input") {
        onCommand?.(text);
        setIsOpen(false); // auto-close after capture
      } else {
        // Pick random mock answer
        const randomQA = qaSet[Math.floor(Math.random() * qaSet.length)];
        const reply = `${randomQA.local}`;

        setTranscript(`You: ${text}\nAI: ${reply}`);
        onCommand?.(reply);

        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.lang =
          language === "tamil"
            ? "ta-IN"
            : language === "hindi"
            ? "hi-IN"
            : "en-US";
        setSpeaking(true);
        utterance.onend = () => {
          setSpeaking(false);
          setIsOpen(false); // ✅ close automatically when AI finishes
        };
        window.speechSynthesis.speak(utterance);
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleVoiceClick = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsOpen(true);
      setTimeout(() => startListening(), 300);
    }
  };

  if (!supported) return null;
  const isCompact = size === "default";

  return (
    <>
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

      {(isOpen || isListening || speaking) && (
        <Card className="fixed top-4 left-4 right-4 z-50 gradient-card glow-gold border-accent-gold/30">
          <CardContent className="p-4">
            <h3 className="font-semibold text-accent-gold text-sm">
              {getText("aiAssistant")}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {isListening
                ? getText("listening")
                : speaking
                ? getText("speaking")
                : getText("askAnything")}
            </p>
            {transcript && (
              <p className="text-sm mt-2 p-2 bg-background/50 rounded whitespace-pre-line">
                {transcript}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};
