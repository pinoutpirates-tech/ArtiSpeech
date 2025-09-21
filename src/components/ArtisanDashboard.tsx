import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Package,
  IndianRupee,
  HelpCircle,
  Bell,
  TrendingUp,
  Clock,
  Star,
  User,
  ArrowLeft,
} from "lucide-react";

import { VoiceAssistant } from "./VoiceAssistant";
import { AddProduct } from "./AddProduct";
import { MyOrders } from "./MyOrders";
import { Payments } from "./Payments";
import { HelpSupport } from "./HelpSupport";
import { MyStall } from "./MyStall";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  timestamp: string;
}

export const ArtisanDashboard = ({
  language,
  onBack,
}: {
  language: string;
  onBack: () => void;
}) => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "addProduct" | "orders" | "payments" | "help" | "stall"
  >("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState(2450);
  const [orders, setOrders] = useState(3);

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
        recentActivity: "Recent Activity",
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
        recentActivity: "சமீபத்திய செயல்பாடு",
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
        myStall: "मेरी दुकान",
        quickActions: "त्वरित कार्य",
        recentActivity: "हाल की गतिविधि",
      },
    };
    return (
      translations[language as keyof typeof translations]?.[
        key as keyof typeof translations["english"]
      ] || key
    );
  };

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
    setSales(sales + product.price); // simulate sales increase
  };

  // 🔄 Handle different views
  if (currentView === "addProduct") {
    return (
      <AddProduct
        language={language}
        onBack={() => setCurrentView("dashboard")}
        onProductAdded={handleAddProduct}
        goToStall={() => setCurrentView("stall")}
      />
    );
  }

  if (currentView === "orders") {
    return (
      <MyOrders
        language={language}
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  if (currentView === "payments") {
    return (
      <Payments
        language={language}
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  if (currentView === "help") {
    return (
      <HelpSupport
        language={language}
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  if (currentView === "stall") {
    return (
      <MyStall
        language={language}
        onBack={() => setCurrentView("dashboard")}
        products={products}
        goToAddProduct={() => setCurrentView("addProduct")}
      />
    );
  }

  // 🏠 Main Dashboard View
  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Back Button */}
      <div className="flex items-center gap-4 mb-4 px-4 pt-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="glow-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Artisan Dashboard</h1>
      </div>

      {/* Header */}
      <div className="gradient-primary text-primary-foreground px-6 py-4 glow-primary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{getText("welcome")}</h1>
            <p className="text-primary-foreground/80 text-sm">
              Artisan Dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Badge
              variant="outline"
              className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
            >
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="p-6">
        <Card className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-[1.02] duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-90" />
          <div className="absolute inset-0 bg-black/30" />
          <CardContent className="relative z-10 p-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-lg drop-shadow-md">
                {getText("aiAssistant")}
              </h3>
              <p className="text-sm text-white/90 mt-1">
                {getText("askAnything")}
              </p>
            </div>
            <VoiceAssistant language={language} />
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center rounded-xl shadow-md bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-300 transform hover:scale-105 hover:shadow-lg transition duration-300">
            <CardContent className="p-4">
              <IndianRupee className="h-6 w-6 mx-auto text-orange-700" />
              <p className="text-2xl font-bold">₹{sales}</p>
              <p className="text-sm text-muted-foreground">
                {getText("todaysSales")}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center rounded-xl shadow-md bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-300 transform hover:scale-105 hover:shadow-lg transition duration-300">
            <CardContent className="p-4">
              <Clock className="h-6 w-6 mx-auto text-blue-700" />
              <p className="text-2xl font-bold">{orders}</p>
              <p className="text-sm text-muted-foreground">
                {getText("pendingOrders")}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center rounded-xl shadow-md bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-300 transform hover:scale-105 hover:shadow-lg transition duration-300">
            <CardContent className="p-4">
              <Star className="h-6 w-6 mx-auto text-green-700" />
              <p className="text-2xl font-bold">{products.length}</p>
              <p className="text-sm text-muted-foreground">
                {getText("totalProducts")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4">{getText("quickActions")}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button
            className="h-24 flex flex-col gap-2 rounded-xl text-white shadow-md bg-gradient-to-r from-orange-400 to-red-400 hover:from-red-400 hover:to-orange-400 transform hover:scale-105 hover:shadow-lg transition duration-300"
            onClick={() => setCurrentView("addProduct")}
          >
            <Plus className="h-6 w-6" />
            {getText("addProduct")}
          </Button>

          <Button
            className="h-24 flex flex-col gap-2 rounded-xl text-white shadow-md bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-indigo-400 hover:to-blue-400 transform hover:scale-105 hover:shadow-lg transition duration-300"
            onClick={() => setCurrentView("orders")}
          >
            <Package className="h-6 w-6" />
            {getText("myOrders")}
          </Button>

          <Button
            className="h-24 flex flex-col gap-2 rounded-xl text-white shadow-md bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-orange-400 hover:to-yellow-400 transform hover:scale-105 hover:shadow-lg transition duration-300"
            onClick={() => setCurrentView("payments")}
          >
            <IndianRupee className="h-6 w-6" />
            {getText("payments")}
          </Button>

          <Button
            className="h-24 flex flex-col gap-2 rounded-xl text-white shadow-md bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-600 hover:to-gray-400 transform hover:scale-105 hover:shadow-lg transition duration-300"
            onClick={() => setCurrentView("help")}
          >
            <HelpCircle className="h-6 w-6" />
            {getText("help")}
          </Button>
        </div>
      </div>

      {/* My Stall */}
      <div className="px-6 pb-6">
        <Button
          className="h-24 w-full flex flex-col gap-2 rounded-xl text-white shadow-md bg-gradient-to-r from-teal-400 to-green-500 hover:from-green-500 hover:to-teal-400 transform hover:scale-105 hover:shadow-lg transition duration-300"
          onClick={() => setCurrentView("stall")}
        >
          <User className="h-6 w-6" />
          {getText("myStall")}
        </Button>
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4">
          {getText("recentActivity")}
        </h2>
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm">New order for Blue Silk Saree</p>
              <Badge variant="outline">₹3,000</Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Payment received</p>
              <Badge variant="outline">₹1,500</Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Product viewed 15 times</p>
              <TrendingUp className="h-4 w-4 text-accent-gold" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
