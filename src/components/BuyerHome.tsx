import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Heart, 
  Star, 
  Play,
  MapPin,
  Palette,
  Shirt,
  Crown,
  Home
} from 'lucide-react';
import craftsCollection from '@/assets/crafts-collection.jpg';
import silkSaree from '@/assets/silk-saree.jpg';
import brassLamp from '@/assets/brass-lamp.jpg';

export const BuyerHome = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Sarees', icon: Shirt, color: 'bg-primary' },
    { name: 'Pottery', icon: Home, color: 'bg-secondary' },
    { name: 'Jewelry', icon: Crown, color: 'bg-accent-gold' },
    { name: 'Handicrafts', icon: Palette, color: 'bg-accent-maroon' },
  ];

  const products = [
    {
      id: 1,
      name: 'Kanchi Silk Saree',
      price: 3000,
      image: silkSaree,
      artisan: 'Priya Devi',
      location: 'Kanchipuram, Tamil Nadu',
      rating: 4.8,
      hasStory: true,
    },
    {
      id: 2,
      name: 'Brass Temple Lamp',
      price: 1500,
      image: brassLamp,
      artisan: 'Ravi Kumar',
      location: 'Thanjavur, Tamil Nadu',
      rating: 4.9,
      hasStory: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Artispeech</h1>
            <p className="text-primary-foreground/80 text-sm">Discover Authentic Indian Crafts</p>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for handicrafts, sarees, pottery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 h-12 bg-primary-foreground text-foreground"
          />
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card key={category.name} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs font-medium">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Seasonal Banner */}
      <div className="px-6 pb-6">
        <Card className="overflow-hidden bg-gradient-to-r from-accent-gold/20 to-accent-maroon/20">
          <CardContent className="p-0">
            <div className="relative h-32">
              <img 
                src={craftsCollection} 
                alt="Diwali Special Collection"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/80 to-accent-maroon/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-lg font-bold">✨ Diwali Specials</h3>
                  <p className="text-sm opacity-90">Authentic Festival Collection</p>
                  <Button variant="gold" size="sm" className="mt-2">
                    Explore Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Products */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Featured Artisans</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Artisan Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                        <Palette className="h-3 w-3 text-secondary-foreground" />
                      </div>
                      <span className="text-sm font-medium">{product.artisan}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{product.location}</span>
                    </div>

                    {/* Rating and Story */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent-gold text-accent-gold" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      
                      {product.hasStory && (
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Play className="h-3 w-3 mr-1" />
                          Play Story
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Placeholder */}
      <div className="h-20" />
    </div>
  );
};