import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Package, 
  IndianRupee, 
  Mic, 
  HelpCircle, 
  Bell,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

export const ArtisanDashboard = ({ language }: { language: string }) => {
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
        myOrders: "मेरे ऑर्डर",
        payments: "भुगतान",
        help: "सहायता और समर्थन",
        quickActions: "त्वरित कार्य",
        recentActivity: "हाल की गतिविधि"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['english']] || key;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{getText('welcome')}</h1>
            <p className="text-secondary-foreground/80 text-sm">Artisan Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Badge variant="outline" className="bg-secondary-muted">
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* AI Voice Assistant - Always Visible */}
      <div className="p-6">
        <Card className="bg-accent-gold/10 border-accent-gold/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Button variant="voice" size="voice" className="flex-shrink-0">
                <Mic className="h-8 w-8" />
              </Button>
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
          <Card className="text-center">
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
          
          <Card className="text-center">
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
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2">
                <Star className="h-6 w-6 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">12</p>
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
          <Button variant="default" size="wide" className="h-16 flex-col gap-2">
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">{getText('addProduct')}</span>
          </Button>
          
          <Button variant="artisan" size="wide" className="h-16 flex-col gap-2">
            <Package className="h-6 w-6" />
            <span className="text-sm font-medium">{getText('myOrders')}</span>
          </Button>
          
          <Button variant="gold" size="wide" className="h-16 flex-col gap-2">
            <IndianRupee className="h-6 w-6" />
            <span className="text-sm font-medium">{getText('payments')}</span>
          </Button>
          
          <Button variant="outline" size="wide" className="h-16 flex-col gap-2">
            <HelpCircle className="h-6 w-6" />
            <span className="text-sm font-medium">{getText('help')}</span>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4">{getText('recentActivity')}</h2>
        <Card>
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