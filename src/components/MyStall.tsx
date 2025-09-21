import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Edit3, Share2, Plus } from 'lucide-react';
import { VoiceAssistant } from './VoiceAssistant';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  timestamp: string;
  status?: 'active' | 'sold' | 'draft';
}

interface MyStallProps {
  language: string;
  onBack: () => void;
  products: Product[];
}

export const MyStall: React.FC<MyStallProps> = ({ language, onBack, products = [] }) => {
  const [isPlayingBio, setIsPlayingBio] = useState(false);

  const getText = (key: string) => {
    const translations = {
      english: {
        myStall: "My Stall",
        editProfile: "Edit Profile",
        shareStall: "Share Stall",
        voiceBio: "Voice Bio",
        playBio: "Play Bio",
        myProducts: "My Products",
        addProduct: "Add Product",
        active: "Active",
        sold: "Sold",
        draft: "Draft",
        noProducts: "No products yet",
        startSelling: "Start by adding your first product",
        artisanSince: "Artisan since 2020",
        totalSales: "Total Sales: ₹45,000",
        happyCustomers: "Happy Customers: 28"
      },
      tamil: {
        myStall: "என் கடை",
        editProfile: "சுயவிவரம் திருத்து",
        shareStall: "கடையை பகிர்",
        voiceBio: "குரல் வாழ்க்கை வரலாறு",
        playBio: "வாழ்க்கை வரலாறு இயக்கு",
        myProducts: "என் தயாரிப்புகள்",
        addProduct: "தயாரிப்பு சேர்க்கவும்",
        active: "செயலில்",
        sold: "விற்பனையானது",
        draft: "வரைவு",
        noProducts: "இன்னும் தயாரிப்புகள் இல்லை",
        startSelling: "உங்கள் முதல் தயாரிப்பை சேர்ப்பதன் மூலம் தொடங்குங்கள்",
        artisanSince: "2020 முதல் கைவினைஞர்",
        totalSales: "மொத்த விற்பனை: ₹45,000",
        happyCustomers: "மகிழ்ச்சியான வாடிக்கையாளர்கள்: 28"
      },
      hindi: {
        myStall: "मेरी दुकान",
        editProfile: "प्रोफाइल संपादित करें",
        shareStall: "दुकान साझा करें",
        voiceBio: "वॉइस बायो",
        playBio: "बायो चलाएं",
        myProducts: "मेरे उत्पाद",
        addProduct: "उत्पाद जोड़ें",
        active: "सक्रिय",
        sold: "बिक गया",
        draft: "मसौदा",
        noProducts: "अभी तक कोई उत्पाद नहीं",
        startSelling: "अपना पहला उत्पाद जोड़कर शुरू करें",
        artisanSince: "2020 से कारीगर",
        totalSales: "कुल बिक्री: ₹45,000",
        happyCustomers: "खुश ग्राहक: 28"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['english']] || key;
  };

  const mockProducts: Product[] = [
    { id: '1', name: 'Blue Silk Saree', price: 3000, image: '/api/placeholder/150/150', status: 'active' },
    { id: '2', name: 'Cotton Handloom', price: 1500, image: '/api/placeholder/150/150', status: 'sold' },
    { id: '3', name: 'Brass Lamp', price: 800, image: '/api/placeholder/150/150', status: 'active' },
    { id: '4', name: 'Wooden Carving', price: 2500, image: '/api/placeholder/150/150', status: 'draft' }
  ];

  const playVoiceBio = () => {
    setIsPlayingBio(true);
    // Mock voice bio playback
    setTimeout(() => {
      setIsPlayingBio(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'sold': return 'bg-blue-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const productsToShow = products.length > 0 ? products : mockProducts;

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glow-primary">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{getText('myStall')}</h1>
        <VoiceAssistant language={language} className="ml-auto" />
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <Card className="gradient-card glow-primary border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <img 
                  src="/api/placeholder/80/80" 
                  alt="Artisan Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary/30"
                />
                <Button
                  variant="voice"
                  size="sm"
                  onClick={playVoiceBio}
                  disabled={isPlayingBio}
                  className={`absolute -bottom-2 -right-2 w-8 h-8 ${isPlayingBio ? 'animate-pulse' : ''}`}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold">Priya Sharma</h2>
                <p className="text-sm text-muted-foreground mb-2">{getText('artisanSince')}</p>
                <p className="text-xs text-muted-foreground mb-1">{getText('totalSales')}</p>
                <p className="text-xs text-muted-foreground">{getText('happyCustomers')}</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  <Edit3 className="h-4 w-4 mr-1" />
                  {getText('editProfile')}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  {getText('shareStall')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Bio Card */}
        <Card className="gradient-card glow-gold border-accent-gold/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Button
                variant="voice"
                onClick={playVoiceBio}
                disabled={isPlayingBio}
                className={`glow-voice ${isPlayingBio ? 'animate-pulse' : ''}`}
              >
                <Play className="h-8 w-8" />
              </Button>
              <div className="flex-1">
                <h3 className="font-semibold text-accent-gold">{getText('voiceBio')}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {isPlayingBio ? 'Playing...' : getText('playBio')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <Card className="gradient-card glow-primary border-primary/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>{getText('myProducts')}</CardTitle>
              <Button variant="default" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                {getText('addProduct')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {productsToShow.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-muted-foreground mb-2">{getText('noProducts')}</h3>
                <p className="text-sm text-muted-foreground">{getText('startSelling')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {productsToShow.map((product) => (
                  <Card key={product.id} className="relative overflow-hidden border-border/30">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(product.status)}`} />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-lg font-bold text-primary">₹{product.price}</p>
                      <p className="text-xs text-muted-foreground capitalize">{getText(product.status)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};