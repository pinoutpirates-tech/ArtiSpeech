import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Package, 
  IndianRupee, 
  HelpCircle, 
  Bell,
  TrendingUp,
  Clock,
  Star,
  User
} from 'lucide-react';
import { VoiceAssistant } from './VoiceAssistant';
import { AddProduct } from './AddProduct';
import { MyOrders } from './MyOrders';
import { Payments } from './Payments';
import { HelpSupport } from './HelpSupport';
import { MyStall } from './MyStall';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  timestamp: string;
}

export const ArtisanDashboard = ({ language }: { language: string }) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'addProduct' | 'orders' | 'payments' | 'help' | 'stall'>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);

  const getText = (key: string) => {
    const translations = {
      english: {
        welcome: "Welcome back, Priya!",
        aiAssistant: "AI Voice Assistant",
        askAnything: "Ask me anything in your language",
        todaysSales: "Today's Sales",
        pendingOrders: "Pending Orders",
        totalProducts: "Total Products",
        addProduct: "Add New Product",
        myOrders: "My Orders",
        payments: "Payments",
        help: "Help & Support",
        myStall: "My Stall",
        quickActions: "Quick Actions",
        recentActivity: "Recent Activity"
      },
      tamil: {
        welcome: "வரவேற்கிறோம், பிரியா!",
        aiAssistant: "AI குரல் உதவியாளர்",
        askAnything: "உங்கள் மொழியில் என்னிடம் கேளுங்கள்",
        todaysSales: "இன்றைய விற்பனை",
        pendingOrders: "நிலுவையில் உள்ள ஆர்டர்கள்",
        totalProducts: "மொத்த தயாரிப்புகள்",
        addProduct: "புதிய தயாரிப்பு சேர்க்கவும்",
        myOrders: "என் ஆர்டர்கள்",
        payments: "பணம்",
        help: "உதவி மற்றும் ஆதரவு",
        myStall: "என் கடை",
        quickActions: "விரைவு செயல்கள்",
        recentActivity: "சமீபத்திய செயல்பாடு"
      },
      hindi: {
        welcome: "वापसी पर स्वागत है, प्रिया!",
        aiAssistant: "AI वॉयस असिस्टेंट",
        askAnything: "अपनी भाषा में मुझसे कुछ भी पूछें",
        todaysSales: "आज की बिक्री",
        pendingOrders: "लंबित ऑर्डर",
        totalProducts: "कुल उत्पाद",
        addProduct: "नया उत्पाद जोड़ें",
        myOrders: "मेरे ऑर्डر",
        payments: "भुगतान",
        help: "सहायता और समर्थन",
        myStall: "मेरी दुकान",
        quickActions: "त्वरित कार्य",
        recentActivity: "हाल की गतिविधि"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['english']] || key;
  };

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  if (currentView === 'addProduct') {
    return (
      <AddProduct 
        language={language} 
        onBack={() => setCurrentView('dashboard')}
        onProductAdded={handleAddProduct}
      />
    );
  }

  if (currentView === 'orders') {
    return (
      <MyOrders 
        language={language} 
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'payments') {
    return (
      <Payments 
        language={language} 
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'help') {
    return (
      <HelpSupport 
        language={language} 
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'stall') {
    return (
      <MyStall 
        language={language} 
        onBack={() => setCurrentView('dashboard')}
        products={products}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground px-6 py-4 glow-primary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{getText('welcome')}</h1>
            <p className="text-primary-foreground/80 text-sm">Artisan Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Bell className="h-5 w-5" />
            </Button>
            <Badge variant="outline" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* AI Voice Assistant - Always Visible */}
      <div className="p-6">
        <Card className="gradient-gold glow-gold border-accent-gold/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <VoiceAssistant
                language={language}
                className="flex-shrink-0"
                prompt={getText('askAnything')}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-accent-gold text-sm">{getText('aiAssistant')}</h3>
                <p className="text-xs text-muted-foreground mt-1">{getText('askAnything')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center gradient-card glow-primary border-primary/30">
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2">
                <IndianRupee className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-2xl font-bold">₹2,450</p>
                  <p className="text-xs text-muted-foreground">{getText('todaysSales')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center gradient-card glow-primary border-accent-maroon/30">
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2">
                <Clock className="h-6 w-6 text-accent-maroon" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">{getText('pendingOrders')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="text-center gradient-card glow-primary border-secondary/30">
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2">
                <Star className="h-6 w-6 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">{products.length || 12}</p>
                  <p className="text-xs text-muted-foreground">{getText('totalProducts')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4">{getText('quickActions')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="default" 
            size="wide" 
            className="h-16 flex-col gap-2 gradient-primary glow-primary"
            onClick={() => setCurrentView('addProduct')}
          >
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">{getText('addProduct')}</span>
          </Button>
          
          <Button 
            variant="artisan" 
            size="wide" 
            className="h-16 flex-col gap-2 gradient-card glow-primary"
            onClick={() => setCurrentView('orders')}
          >
            <Package className="h-6 w-6" />
            <span className="text-sm font-medium">{getText('myOrders')}</span>
          </Button>
          
          <Button 
            variant="gold" 
            size="wide" 
            className="h-16 flex-col gap-2 gradient-gold glow-gold"
            onClick={() => setCurrentView('payments')}
          >
            <IndianRupee className="h-6 w-6" />
            <span className="text-sm font-medium">{getText('payments')}</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="wide" 
            className="h-16 flex-col gap-2 gradient-card glow-primary"
            onClick={() => setCurrentView('help')}
          >
            <HelpCircle className="h-6 w-6" />
            <span className="text-sm font-medium">{getText('help')}</span>
          </Button>
        </div>
      </div>

      {/* My Stall Button */}
      <div className="px-6 pb-6">
        <Button 
          variant="secondary" 
          size="wide" 
          className="h-16 flex-col gap-2 w-full gradient-card glow-primary"
          onClick={() => setCurrentView('stall')}
        >
          <User className="h-6 w-6" />
          <span className="text-sm font-medium">{getText('myStall')}</span>
        </Button>
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4">{getText('recentActivity')}</h2>
        <Card className="gradient-card glow-primary border-primary/30">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div>
                  <p className="text-sm font-medium">New order for Blue Silk Saree</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">₹3,000</Badge>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <div>
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">₹1,500</Badge>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-gold rounded-full" />
                <div>
                  <p className="text-sm font-medium">Product viewed 15 times</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <TrendingUp className="h-4 w-4 text-accent-gold" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};