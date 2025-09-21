import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera, Upload, Mic, Check, X } from 'lucide-react';
import { VoiceAssistant } from './VoiceAssistant';

interface AddProductProps {
  language: string;
  onBack: () => void;
  onProductAdded: (product: any) => void;
}

export const AddProduct: React.FC<AddProductProps> = ({ language, onBack, onProductAdded }) => {
  const [step, setStep] = useState(1);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    nameNative: '',
    descriptionNative: ''
  });
  const [voicePrompt, setVoicePrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getText = (key: string) => {
    const translations = {
      english: {
        addProduct: "Add New Product",
        step1Title: "Upload Product Photo",
        step1Subtitle: "Take a photo or upload from gallery",
        step2Title: "Product Details",
        step2Subtitle: "Tell me about your product",
        step3Title: "Review & Confirm",
        step3Subtitle: "Check all details before publishing",
        takePhoto: "Take Photo",
        uploadPhoto: "Upload from Gallery",
        next: "Next",
        back: "Back",
        confirm: "Confirm & Publish",
        voicePrompt: "Now, please tell me the product name, price, and description. For example: 'Blue silk saree, handwoven, price 3000 rupees'",
        isCorrect: "Is all this information correct?",
        englishVersion: "English Version:",
        nativeVersion: "Your Language:"
      },
      tamil: {
        addProduct: "புதிய தயாரிப்பு சேர்க்கவும்",
        step1Title: "தயாரிப்பு புகைப்படம் பதிவேற்றவும்",
        step1Subtitle: "புகைப்படம் எடுக்கவும் அல்லது கேலரியிலிருந்து பதிவேற்றவும்",
        step2Title: "தயாரிப்பு விவரங்கள்",
        step2Subtitle: "உங்கள் தயாரிப்பைப் பற்றி என்னிடம் சொல்லுங்கள்",
        step3Title: "மதிப்பாய்வு மற்றும் உறுதிப்படுத்தல்",
        step3Subtitle: "வெளியிடுவதற்கு முன் அனைத்து விவரங்களையும் சரிபார்க்கவும்",
        takePhoto: "புகைப்படம் எடுக்கவும்",
        uploadPhoto: "கேலரியிலிருந்து பதிவேற்றவும்",
        next: "அடுத்தது",
        back: "திரும்பு",
        confirm: "உறுதிப்படுத்தி வெளியிடவும்",
        voicePrompt: "இப்போது, தயாரிப்பு பெயர், விலை மற்றும் விளக்கத்தை என்னிடம் சொல்லுங்கள். உதாரணம்: 'இது காஞ்சி பட்டு சாடி, நீல நிறம், கைநூல் வேலை, விலை 3000 ரூபாய்'",
        isCorrect: "இந்த தகவல்கள் அனைத்தும் சரியானதா?",
        englishVersion: "ஆங்கில பதிப்பு:",
        nativeVersion: "உங்கள் மொழி:"
      },
      hindi: {
        addProduct: "नया उत्पाद जोड़ें",
        step1Title: "उत्पाद फोटो अपलोड करें",
        step1Subtitle: "फोटो लें या गैलरी से अपलोड करें",
        step2Title: "उत्पाद विवरण",
        step2Subtitle: "अपने उत्पाद के बारे में बताएं",
        step3Title: "समीक्षा और पुष्टि",
        step3Subtitle: "प्रकाशित करने से पहले सभी विवरण जांचें",
        takePhoto: "फोटो लें",
        uploadPhoto: "गैलरी से अपलोड करें",
        next: "अगला",
        back: "वापस",
        confirm: "पुष्टि करें और प्रकाशित करें",
        voicePrompt: "अब कृपया उत्पाद का नाम, कीमत और विवरण बताएं। उदाहरण: 'नीली रेशमी साड़ी, हाथ से बुनी हुई, कीमत 3000 रुपये'",
        isCorrect: "क्या यह सारी जानकारी सही है?",
        englishVersion: "अंग्रेजी संस्करण:",
        nativeVersion: "आपकी भाषा:"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['english']] || key;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceCommand = (command: string) => {
    // Mock translation and parsing
    const mockTranslation = {
      name: "Handwoven Silk Saree",
      price: "3000",
      description: "Beautiful blue Kanchi silk saree with intricate handwoven patterns",
      nameNative: command.includes('சாடி') ? 'காஞ்சி பட்டு சாடி' : 
                  command.includes('साड़ी') ? 'रेशमी साड़ी' : 
                  command.split(',')[0] || 'Product Name',
      descriptionNative: command
    };
    
    setProductData(mockTranslation);
    setStep(3);
  };

  const handleConfirm = () => {
    const newProduct = {
      id: Date.now(),
      image: productImage,
      ...productData,
      timestamp: new Date().toISOString()
    };
    onProductAdded(newProduct);
    onBack();
  };

  const renderStep1 = () => (
    <Card className="gradient-card glow-primary border-primary/30">
      <CardHeader>
        <CardTitle className="text-center">{getText('step1Title')}</CardTitle>
        <p className="text-center text-muted-foreground text-sm">{getText('step1Subtitle')}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {productImage ? (
          <div className="relative">
            <img 
              src={productImage} 
              alt="Product" 
              className="w-full h-48 object-cover rounded-lg border-2 border-primary/20"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setProductImage(null)}
              className="absolute top-2 right-2 bg-background/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
            <Camera className="h-16 w-16 mx-auto text-primary/50 mb-4" />
            <p className="text-muted-foreground mb-4">No image selected</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            className="h-16 flex-col gap-2"
          >
            <Camera className="h-6 w-6" />
            <span className="text-sm">{getText('takePhoto')}</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            className="h-16 flex-col gap-2"
          >
            <Upload className="h-6 w-6" />
            <span className="text-sm">{getText('uploadPhoto')}</span>
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        <Button 
          onClick={() => setStep(2)} 
          disabled={!productImage}
          className="w-full gradient-primary"
          size="lg"
        >
          {getText('next')}
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="gradient-card glow-gold border-accent-gold/30">
      <CardHeader>
        <CardTitle className="text-center">{getText('step2Title')}</CardTitle>
        <p className="text-center text-muted-foreground text-sm">{getText('step2Subtitle')}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <VoiceAssistant
            language={language}
            onCommand={handleVoiceCommand}
            size="large"
            prompt={getText('voicePrompt')}
            className="mx-auto"
          />
          <p className="text-sm text-muted-foreground mt-4">
            {getText('voicePrompt')}
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
            {getText('back')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="gradient-card glow-primary border-primary/30">
      <CardHeader>
        <CardTitle className="text-center">{getText('step3Title')}</CardTitle>
        <p className="text-center text-muted-foreground text-sm">{getText('step3Subtitle')}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {productImage && (
          <img 
            src={productImage} 
            alt="Product preview" 
            className="w-full h-32 object-cover rounded-lg"
          />
        )}
        
        <div className="space-y-4">
          <Card className="p-4 bg-background/50">
            <h4 className="font-semibold text-accent-gold mb-2">{getText('nativeVersion')}</h4>
            <p className="font-medium">{productData.nameNative}</p>
            <p className="text-sm text-muted-foreground mt-1">{productData.descriptionNative}</p>
          </Card>
          
          <Card className="p-4 bg-background/50">
            <h4 className="font-semibold text-primary mb-2">{getText('englishVersion')}</h4>
            <p className="font-medium">{productData.name}</p>
            <p className="text-2xl font-bold text-primary">₹{productData.price}</p>
            <p className="text-sm text-muted-foreground mt-1">{productData.description}</p>
          </Card>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          {getText('isCorrect')}
        </p>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
            {getText('back')}
          </Button>
          <Button onClick={handleConfirm} className="flex-1 gradient-primary" size="lg">
            <Check className="h-4 w-4 mr-2" />
            {getText('confirm')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glow-primary">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{getText('addProduct')}</h1>
        <VoiceAssistant language={language} className="ml-auto" />
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i === step 
                  ? 'bg-primary text-primary-foreground glow-primary' 
                  : i < step 
                    ? 'bg-accent-gold text-accent-gold-foreground' 
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {i}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};