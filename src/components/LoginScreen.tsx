import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Globe, UserCircle, Palette } from 'lucide-react';
import artisanHero from '@/assets/artisan-hero.jpg';

export const LoginScreen = ({ onLogin }: { onLogin: (userType: 'buyer' | 'artisan', language: string) => void }) => {
  const [userType, setUserType] = useState<'buyer' | 'artisan'>('buyer');
  const [language, setLanguage] = useState('english');
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    onLogin(userType, language);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <h1 className="text-2xl font-bold text-center">Artispeech</h1>
        <p className="text-center text-primary-foreground/80 text-sm mt-1">
          Connecting Artisans with the World
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={artisanHero} 
          alt="Indian artisan working with traditional crafts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-8">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-foreground">Welcome Back</CardTitle>
            <p className="text-muted-foreground text-sm">Choose your language and continue</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Select Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">🇮🇳 English</SelectItem>
                  <SelectItem value="tamil">🔤 தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="hindi">🔤 हिन्दी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">I am a:</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={userType === 'buyer' ? 'default' : 'outline'}
                  size="wide"
                  onClick={() => setUserType('buyer')}
                  className="h-16 flex-col gap-1"
                >
                  <UserCircle className="h-6 w-6" />
                  <span className="text-xs font-medium">Buyer</span>
                </Button>
                <Button
                  variant={userType === 'artisan' ? 'artisan' : 'outline'}
                  size="wide"
                  onClick={() => setUserType('artisan')}
                  className="h-16 flex-col gap-1"
                >
                  <Palette className="h-6 w-6" />
                  <span className="text-xs font-medium">Artisan</span>
                </Button>
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </label>
              <div className="flex gap-2">
                <Badge variant="outline" className="px-3 py-2 h-12 flex items-center">
                  +91
                </Badge>
                <Input
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            {/* Alternative Login */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <Button variant="outline" size="wide" className="h-12">
                <Mail className="h-4 w-4 mr-2" />
                Continue with Google
              </Button>
            </div>

            {/* Login Button */}
            <Button 
              variant={userType === 'artisan' ? 'artisan' : 'default'}
              size="wide" 
              onClick={handleLogin}
              className="h-12 font-semibold"
            >
              {userType === 'artisan' ? 'Start Creating' : 'Start Shopping'}
            </Button>

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};