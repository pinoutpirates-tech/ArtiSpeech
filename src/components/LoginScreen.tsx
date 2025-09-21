import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Lock, Globe, UserCircle, Palette } from "lucide-react";
import artisanHero from "@/assets/artisan-hero.jpg";

export const LoginScreen = ({
  onLogin,
}: {
  onLogin: (userType: "buyer" | "artisan", language: string) => void;
}) => {
  const [userType, setUserType] = useState<"buyer" | "artisan">("buyer");
  const [language, setLanguage] = useState("english");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    onLogin(userType, language);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white px-6 py-6 text-center shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
          Art-i-Speech
        </h1>
        <p className="text-sm opacity-90 font-medium mt-1">
          Connecting Artisans with the World ✨
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={artisanHero}
          alt="Indian artisan working with traditional crafts"
          className="w-full h-full object-cover object-[center_top]" // 👈 Focuses on face area
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
      </div>

      {/* Login Card Overlapping Hero */}
      <div className="flex-1 flex items-start justify-center px-6 -mt-28">
        <Card className="w-full max-w-md rounded-2xl shadow-2xl bg-white/90 backdrop-blur-xl border border-white/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Welcome Back
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Sign up or log in to continue
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                Full Name
              </label>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>

            {/* Language Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                Select Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-12 mt-1 rounded-xl">
                  <SelectValue placeholder="Choose a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">🇮🇳 English</SelectItem>
                  <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User Type Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button
                  variant={userType === "buyer" ? "default" : "outline"}
                  onClick={() => setUserType("buyer")}
                  className={`h-16 flex-col gap-1 rounded-xl shadow-md transition ${
                    userType === "buyer"
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <UserCircle className="h-6 w-6" />
                  <span className="text-sm font-medium">Buyer</span>
                </Button>
                <Button
                  variant={userType === "artisan" ? "default" : "outline"}
                  onClick={() => setUserType("artisan")}
                  className={`h-16 flex-col gap-1 rounded-xl shadow-md transition ${
                    userType === "artisan"
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Palette className="h-6 w-6" />
                  <span className="text-sm font-medium">Artisan</span>
                </Button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-500" />
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4 text-gray-500" />
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-orange-500 transition"
              />
            </div>

            {/* Buttons */}
            <Button
              size="lg"
              className="w-full h-12 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition"
              onClick={handleLogin}
            >
              {userType === "artisan" ? "Start Creating" : "Start Shopping"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Service</span>{" "}
              and <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
