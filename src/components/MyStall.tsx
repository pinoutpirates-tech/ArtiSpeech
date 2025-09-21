import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Share2, ArrowLeft } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface MyStallProps {
  language: string;
  onBack: () => void;
  products: Product[];
  goToAddProduct?: () => void;
}

export const MyStall: React.FC<MyStallProps> = ({
  language,
  onBack,
  products,
  goToAddProduct,
}) => {
  const user = {
    name: "Priya Sharma", // Example
    since: "2020",
    totalSales: "₹45,000",
    happyCustomers: 28,
    gender: "female", // <-- change to "male" if needed
  };

  const avatar =
    user.gender === "female"
      ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png" // 👩 avatar
      : "https://cdn-icons-png.flaticon.com/512/6997/6997670.png"; // 👨 avatar

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${user.name}'s Stall`,
          text: "Check out my artisan products!",
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="glow-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">My Stall</h1>
      </div>

      {/* User Profile */}
      <Card className="mb-6 shadow-md">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <img
              src={avatar}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">
                Artisan since {user.since}
              </p>
              <p className="text-xs text-muted-foreground">
                Total Sales: {user.totalSales} • Happy Customers:{" "}
                {user.happyCustomers}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" /> Share Stall
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Voice Bio */}
      <Card className="mb-6 shadow-md">
        <CardContent className="flex items-center gap-4 p-4">
          <Button
            variant="gold"
            onClick={() =>
              window.speechSynthesis.speak(
                new SpeechSynthesisUtterance(
                  `${user.name}, artisan working since ${user.since}. Total sales ${user.totalSales}, happy customers ${user.happyCustomers}`
                )
              )
            }
          >
            ▶ Play Bio
          </Button>
          <p className="font-medium">Voice Bio</p>
        </CardContent>
      </Card>

      {/* Products Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">My Products</h2>
        <Button
          variant="default"
          size="sm"
          onClick={() => goToAddProduct?.()}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t"
            />
            <CardContent className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-primary font-bold">₹{product.price}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {product.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
