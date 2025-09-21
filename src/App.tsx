import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginScreen } from "@/components/LoginScreen";
import { ArtisanDashboard } from "@/components/ArtisanDashboard";
import { BuyerHome } from "@/components/BuyerHome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<{ type: "buyer" | "artisan"; language: string } | null>(null);

  const handleLogin = (userType: "buyer" | "artisan", language: string) => {
    setUser({ type: userType, language });
  };

  const handleLogout = () => {
    setUser(null); //  goes back to LoginScreen
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <LoginScreen onLogin={handleLogin} />
                ) : user.type === "artisan" ? (
                  <ArtisanDashboard
                    language={user.language}
                    onBack={handleLogout} //  pass back handler
                  />
                ) : (
                  <BuyerHome
                    language={user.language}
                    onBack={handleLogout} //  pass back handler
                  />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
