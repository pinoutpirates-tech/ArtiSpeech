import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react';
import { VoiceAssistant } from './VoiceAssistant';

interface HelpSupportProps {
  language: string;
  onBack: () => void;
}

export const HelpSupport: React.FC<HelpSupportProps> = ({ language, onBack }) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const getText = (key: string) => {
    const translations = {
      english: {
        helpSupport: "Help & Support",
        askAI: "Ask AI Assistant",
        askAnything: "Ask me anything about using the app",
        faq: "Frequently Asked Questions",
        contactUs: "Contact Us",
        callSupport: "Call Support",
        emailSupport: "Email Support",
        chatSupport: "Live Chat",
        faq1Q: "How do I add a new product?",
        faq1A: "Tap on 'Add New Product' from your dashboard, upload a photo, and use voice input to describe your product.",
        faq2Q: "How do I withdraw my earnings?",
        faq2A: "Go to Payments section and tap 'Withdraw Funds'. Choose UPI or Bank transfer and enter your details.",
        faq3Q: "How do delivery partners work?",
        faq3A: "You can choose to deliver yourself or assign a local partner. We have verified delivery partners in your area.",
        faq4Q: "What languages are supported?",
        faq4A: "Our app supports Tamil, Hindi, and English with voice recognition in all languages.",
        faq5Q: "How do I change my language?",
        faq5A: "Language can be changed from the profile settings or by asking the AI assistant.",
        supportHours: "Support Hours: 9 AM - 9 PM"
      },
      tamil: {
        helpSupport: "உதவி மற்றும் ஆதரவு",
        askAI: "AI உதவியாளரிடம் கேளுங்கள்",
        askAnything: "ஆப்பை பயன்படுத்துவது பற்றி என்னிடம் கேளுங்கள்",
        faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        contactUs: "எங்களை தொடர்பு கொள்ளுங்கள்",
        callSupport: "ஆதரவு அழைப்பு",
        emailSupport: "மின்னஞ்சல் ஆதரவு",
        chatSupport: "நேரடி அரட்டை",
        faq1Q: "புதிய தயாரிப்பை எப்படி சேர்ப்பது?",
        faq1A: "உங்கள் டாஷ்போர்டில் 'புதிய தயாரிப்பு சேர்க்கவும்' என்பதை அழுத்தி, புகைப்படம் பதிவேற்றி, குரல் உள்ளீட்டைப் பயன்படுத்தி உங்கள் தயாரிப்பை விவரிக்கவும்.",
        faq2Q: "என் வருவாயை எப்படி எடுப்பது?",
        faq2A: "பேமெண்ட்ஸ் பிரிவுக்குச் சென்று 'பணம் எடுக்கவும்' என்பதை அழுத்தவும். UPI அல்லது வங்கி பரிமாற்றத்தைத் தேர்ந்தெடுத்து உங்கள் விவரங்களை உள்ளிடவும்.",
        faq3Q: "டெலிவரி பங்குதாரர்கள் எப்படி வேலை செய்கிறார்கள்?",
        faq3A: "நீங்கள் நேரடியாக டெலிவர் செய்யலாம் அல்லது உள்ளூர் பங்குதாரரை ஒதுக்கலாம். உங்கள் பகுதியில் சரிபார்க்கப்பட்ட டெலிவரி பங்குதாரர்கள் உள்ளனர்.",
        faq4Q: "எந்த மொழிகள் ஆதரிக்கப்படுகின்றன?",
        faq4A: "எங்கள் ஆப் தமிழ், இந்தி மற்றும் ஆங்கிலத்தை ஆதரிக்கிறது, அனைத்து மொழிகளிலும் குரல் அங்கீகாரத்துடன்.",
        faq5Q: "என் மொழியை எப்படி மாற்றுவது?",
        faq5A: "மொழியை சுயவிவர அமைப்புகளிலிருந்து அல்லது AI உதவியாளரிடம் கேட்டு மாற்றலாம்.",
        supportHours: "ஆதரவு நேரம்: காலை 9 மணி - இரவு 9 மணி"
      },
      hindi: {
        helpSupport: "सहायता और समर्थन",
        askAI: "AI असिस्टेंट से पूछें",
        askAnything: "ऐप का उपयोग करने के बारे में मुझसे कुछ भी पूछें",
        faq: "अक्सर पूछे जाने वाले प्रश्न",
        contactUs: "हमसे संपर्क करें",
        callSupport: "सपोर्ट कॉल करें",
        emailSupport: "ईमेल सपोर्ट",
        chatSupport: "लाइव चैट",
        faq1Q: "नया उत्पाद कैसे जोड़ें?",
        faq1A: "अपने डैशबोर्ड से 'नया उत्पाद जोड़ें' पर टैप करें, फोटो अपलोड करें, और अपने उत्पाद का वर्णन करने के लिए वॉयस इनपुट का उपयोग करें।",
        faq2Q: "अपनी कमाई कैसे निकालें?",
        faq2A: "पेमेंट्स सेक्शन में जाकर 'फंड निकालें' पर टैप करें। UPI या बैंक ट्रांसफर चुनें और अपना विवरण डालें।",
        faq3Q: "डिलीवरी पार्टनर कैसे काम करते हैं?",
        faq3A: "आप खुद डिलीवर कर सकते हैं या स्थानीय पार्टनर असाइन कर सकते हैं। आपके क्षेत्र में सत्यापित डिलीवरी पार्टनर हैं।",
        faq4Q: "कौन सी भाषाएं समर्थित हैं?",
        faq4A: "हमारा ऐप तमिल, हिंदी और अंग्रेजी का समर्थन करता है सभी भाषाओं में वॉयस रिकग्निशन के साथ।",
        faq5Q: "अपनी भाषा कैसे बदलें?",
        faq5A: "भाषा को प्रोफाइल सेटिंग्स से या AI असिस्टेंट से पूछकर बदला जा सकता है।",
        supportHours: "सपोर्ट घंटे: सुबह 9 बजे - रात 9 बजे"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['english']] || key;
  };

  const faqs = [
    { q: getText('faq1Q'), a: getText('faq1A') },
    { q: getText('faq2Q'), a: getText('faq2A') },
    { q: getText('faq3Q'), a: getText('faq3A') },
    { q: getText('faq4Q'), a: getText('faq4A') },
    { q: getText('faq5Q'), a: getText('faq5A') }
  ];

  const handleVoiceCommand = (command: string) => {
    // Mock AI response based on command
    const responses = {
      english: "I'm here to help! You can ask me about adding products, managing orders, withdrawals, or any other app features.",
      tamil: "நான் உதவ இங்கே இருக்கிறேன்! தயாரிப்புகள் சேர்ப்பது, ஆர்டர்கள் நிர்வகிப்பது, பணம் எடுப்பது அல்லது வேறு ஏதேனும் ஆப் அம்சங்களைப் பற்றி என்னிடம் கேட்கலாம்.",
      hindi: "मैं यहाँ मदद के लिए हूँ! आप मुझसे उत्पाद जोड़ने, ऑर्डर प्रबंधन, निकासी, या किसी अन्य ऐप सुविधा के बारे में पूछ सकते हैं।"
    };
    
    alert(responses[language as keyof typeof responses] || responses.english);
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glow-primary">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{getText('helpSupport')}</h1>
        <VoiceAssistant language={language} className="ml-auto" />
      </div>

      <div className="space-y-6">
        {/* AI Assistant */}
        <Card className="gradient-card glow-gold border-accent-gold/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <VoiceAssistant
                language={language}
                onCommand={handleVoiceCommand}
                size="large"
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-accent-gold">{getText('askAI')}</h3>
                <p className="text-xs text-muted-foreground mt-1">{getText('askAnything')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="gradient-card glow-primary border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              {getText('faq')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 last:border-b-0">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                  className="w-full justify-between p-3 h-auto text-left"
                >
                  <span className="text-sm font-medium">{faq.q}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${
                    selectedFaq === index ? 'rotate-90' : ''
                  }`} />
                </Button>
                {selectedFaq === index && (
                  <div className="px-3 pb-3">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Us */}
        <Card className="gradient-card glow-primary border-primary/30">
          <CardHeader>
            <CardTitle>{getText('contactUs')}</CardTitle>
            <p className="text-sm text-muted-foreground">{getText('supportHours')}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start h-16 gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">{getText('callSupport')}</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start h-16 gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">{getText('emailSupport')}</p>
                <p className="text-sm text-muted-foreground">support@artispeech.com</p>
              </div>
            </Button>

            <Button variant="outline" className="w-full justify-start h-16 gap-4">
              <MessageCircle className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">{getText('chatSupport')}</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};