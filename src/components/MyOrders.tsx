import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, Truck, User, MapPin, Phone } from 'lucide-react';
import { VoiceAssistant } from './VoiceAssistant';

interface Order {
  id: string;
  productName: string;
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
  price: number;
  status: 'pending' | 'confirmed' | 'packed' | 'delivered';
  orderDate: string;
  productImage: string;
}

interface MyOrdersProps {
  language: string;
  onBack: () => void;
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    productName: 'Blue Silk Saree',
    buyerName: 'Priya Sharma',
    buyerPhone: '+91 98765 43210',
    buyerAddress: '123 MG Road, Bangalore, Karnataka 560001',
    price: 3000,
    status: 'pending',
    orderDate: '2024-01-15',
    productImage: 'https://www.sundarisilks.com/cdn/shop/files/Traditional_Silk_Cotton_Saree_In_Indigo_Blue_With_Zari_Butta_1_752X1127.png?v=1749626478'
  },
  {
    id: 'ORD002',
    productName: 'Handwoven Cotton Saree',
    buyerName: 'Anita Devi',
    buyerPhone: '+91 87654 32109',
    buyerAddress: '456 Anna Salai, Chennai, Tamil Nadu 600002',
    price: 1500,
    status: 'confirmed',
    orderDate: '2024-01-14',
    productImage: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR0TAo0qhj7MiL2e8kiE0id1a0Nxyy6s7OutbvY7t2CmTzts4Bz1r9_hKyEBfEPeYXL0Qz6RdFosLdS3m6ISIKG8KkhUyMHT9yZi3bqadR2'
  },
  {
  id: 'ORD003',
  productName: 'Terracotta Flower Pot',
  buyerName: 'Ramesh Kumar',
  buyerPhone: '+91 91234 56789',
  buyerAddress: '78 Gandhi Street, Hyderabad, Telangana 500001',
  price: 800,
  status: 'pending',
  orderDate: '2024-01-16',
  productImage: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT7Bq1gaGLZTws-nMI6denP_n1vgK05JMpifx0sNsdG-N8yfFHmKfYXIUXbmGuwIncgemgloYUU9ml_oxdZ6BhVCPeheRR0rSR1nTRH9koS4dprWlSy6o_Omg'
},
{
  id: 'ORD004',
  productName: 'Wooden Jewelry Box',
  buyerName: 'Meera Joshi',
  buyerPhone: '+91 99887 66554',
  buyerAddress: '22 FC Road, Pune, Maharashtra 411005',
  price: 1200,
  status: 'packed',
  orderDate: '2024-01-13',
  productImage: 'https://m.media-amazon.com/images/I/61iMLo7LhwL.jpg'
},
{
  id: 'ORD005',
  productName: 'Hand-painted Wall Plate',
  buyerName: 'Sunita Agarwal',
  buyerPhone: '+91 98765 11122',
  buyerAddress: '55 Park Street, Kolkata, West Bengal 700016',
  price: 950,
  status: 'delivered',
  orderDate: '2024-01-10',
  productImage: 'http://prettyhomesindia.com/cdn/shop/files/5_9094650c-1b94-49af-96aa-076d815c29a5.jpg?crop=center&height=1200&v=1744186509&width=1200'
},
{
  id: 'ORD006',
  productName: 'Brass Oil Lamp',
  buyerName: 'Arun Singh',
  buyerPhone: '+91 90909 80808',
  buyerAddress: '89 Civil Lines, Lucknow, Uttar Pradesh 226001',
  price: 2200,
  status: 'pending',
  orderDate: '2024-01-17',
  productImage: 'https://m.media-amazon.com/images/I/31OCywHYgDL._UF1000,1000_QL80_.jpg'
}

];

const mockDeliveryPartners = [
  { id: '1', name: 'Ravi Kumar', phone: '+91 99999 11111', rating: 4.8, image: 'https://cdn-icons-png.flaticon.com/512/168/168726.png' },
  { id: '2', name: 'Suresh Babu', phone: '+91 88888 22222', rating: 4.6, image: 'https://cdn-icons-png.flaticon.com/512/168/168726.png' },
  { id: '3', name: 'Mohan Singh', phone: '+91 77777 33333', rating: 4.9, image: 'https://cdn-icons-png.flaticon.com/512/168/168726.png' }
];

export const MyOrders: React.FC<MyOrdersProps> = ({ language, onBack }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDeliveryPartners, setShowDeliveryPartners] = useState(false);

  const getText = (key: string) => {
    const translations = {
      english: {
        myOrders: "My Orders",
        orderDetails: "Order Details",
        buyerInfo: "Buyer Information",
        deliveryOptions: "Delivery Options",
        selfDelivery: "Self Delivery",
        assignPartner: "Assign Local Partner",
        selectPartner: "Select Delivery Partner",
        pending: "Pending",
        confirmed: "Confirmed",
        packed: "Packed",
        delivered: "Delivered",
        orderDate: "Order Date",
        price: "Price",
        rating: "Rating",
        assign: "Assign"
      },
      tamil: {
        myOrders: "என் ஆர்டர்கள்",
        orderDetails: "ஆர்டர் விவரங்கள்",
        buyerInfo: "வாங்குபவர் தகவல்",
        deliveryOptions: "டெலிவரி விருப்பங்கள்",
        selfDelivery: "சுய டெலிவரி",
        assignPartner: "உள்ளூர் பங்குதாரர் ஒதுக்கீடு",
        selectPartner: "டெலிவரி பங்குதாரர் தேர்வு",
        pending: "நிலுவையில்",
        confirmed: "உறுதிப்படுத்தப்பட்டது",
        packed: "பேக் செய்யப்பட்டது",
        delivered: "டெலிவர் செய்யப்பட்டது",
        orderDate: "ஆர்டர் தேதி",
        price: "விலை",
        rating: "மதிப்பீடு",
        assign: "ஒதுக்கீடு"
      },
      hindi: {
        myOrders: "मेरे ऑर्डर",
        orderDetails: "ऑर्डर विवरण",
        buyerInfo: "खरीदार की जानकारी",
        deliveryOptions: "डिलीवरी विकल्प",
        selfDelivery: "स्वयं डिलीवरी",
        assignPartner: "स्थानीय साझेदार असाइन करें",
        selectPartner: "डिलीवरी पार्टनर चुनें",
        pending: "लंबित",
        confirmed: "पुष्ट",
        packed: "पैक किया गया",
        delivered: "डिलीवर किया गया",
        orderDate: "ऑर्डर दिनांक",
        price: "कीमत",
        rating: "रेटिंग",
        assign: "असाइन करें"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['english']] || key;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'packed': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDeliveryOption = (orderId: string, option: 'self' | 'partner') => {
    if (option === 'partner') {
      setShowDeliveryPartners(true);
    } else {
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'confirmed' as const }
          : order
      ));
      setSelectedOrder(null);
    }
  };

  const assignPartner = (orderId: string, partnerId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'confirmed' as const }
        : order
    ));
    setSelectedOrder(null);
    setShowDeliveryPartners(false);
  };

  if (showDeliveryPartners && selectedOrder) {
    return (
      <div className="min-h-screen bg-gradient-background p-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => setShowDeliveryPartners(false)} className="glow-primary">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{getText('selectPartner')}</h1>
          <VoiceAssistant language={language} className="ml-auto" />
        </div>

        <div className="space-y-4">
          {mockDeliveryPartners.map((partner) => (
            <Card key={partner.id} className="gradient-card glow-primary border-primary/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">{partner.phone}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm">{partner.rating}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => assignPartner(selectedOrder.id, partner.id)}
                    className="gradient-primary"
                  >
                    {getText('assign')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gradient-background p-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)} className="glow-primary">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{getText('orderDetails')}</h1>
          <VoiceAssistant language={language} className="ml-auto" />
        </div>

        <div className="space-y-6">
          {/* Order Info */}
          <Card className="gradient-card glow-primary border-primary/30">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img 
                  src={selectedOrder.productImage} 
                  alt={selectedOrder.productName}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedOrder.productName}</h3>
                  <p className="text-2xl font-bold text-primary">₹{selectedOrder.price}</p>
                  <Badge className={`mt-2 ${getStatusColor(selectedOrder.status)} text-white`}>
                    {getText(selectedOrder.status)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buyer Info */}
          <Card className="gradient-card glow-gold border-accent-gold/30">
            <CardHeader>
              <CardTitle className="text-lg">{getText('buyerInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <span>{selectedOrder.buyerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>{selectedOrder.buyerPhone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span className="text-sm">{selectedOrder.buyerAddress}</span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Options */}
          {selectedOrder.status === 'pending' && (
            <Card className="gradient-card glow-primary border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg">{getText('deliveryOptions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => handleDeliveryOption(selectedOrder.id, 'self')}
                  className="w-full h-16 flex-col gap-2 gradient-primary"
                  size="lg"
                >
                  <Package className="h-6 w-6" />
                  <span>{getText('selfDelivery')}</span>
                </Button>
                <Button 
                  onClick={() => handleDeliveryOption(selectedOrder.id, 'partner')}
                  variant="outline"
                  className="w-full h-16 flex-col gap-2"
                  size="lg"
                >
                  <Truck className="h-6 w-6" />
                  <span>{getText('assignPartner')}</span>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="glow-primary">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{getText('myOrders')}</h1>
        <VoiceAssistant language={language} className="ml-auto" />
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card 
            key={order.id} 
            className="gradient-card glow-primary border-primary/30 cursor-pointer hover:glow-gold transition-all"
            onClick={() => setSelectedOrder(order)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img 
                  src={order.productImage} 
                  alt={order.productName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{order.productName}</h3>
                  <p className="text-sm text-muted-foreground">{order.buyerName}</p>
                  <p className="text-lg font-bold text-primary">₹{order.price}</p>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(order.status)} text-white mb-2`}>
                    {getText(order.status)}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{order.orderDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};