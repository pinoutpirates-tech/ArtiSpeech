import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Wallet, TrendingUp, Calendar, CreditCard, Building } from 'lucide-react';
import { VoiceAssistant } from './VoiceAssistant';

interface PaymentsProps {
  language: string;
  onBack: () => void;
}

export const Payments: React.FC<PaymentsProps> = ({ language, onBack }) => {
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState<'bank' | 'upi'>('upi');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const getText = (key: string) => {
    const translations = {
      english: {
        payments: "Payments",
        todaysSales: "Today's Sales",
        weeklyEarnings: "Weekly Earnings",
        totalBalance: "Total Balance",
        withdrawFunds: "Withdraw Funds",
        withdrawMethod: "Withdrawal Method",
        upiId: "UPI ID",
        bankAccount: "Bank Account",
        accountNumber: "Account Number",
        ifscCode: "IFSC Code",
        accountHolderName: "Account Holder Name",
        amount: "Amount",
        availableBalance: "Available Balance",
        withdraw: "Withdraw",
        cancel: "Cancel",
        recentTransactions: "Recent Transactions",
        paymentReceived: "Payment Received",
        withdrawal: "Withdrawal",
        commission: "Platform Commission"
      },
      tamil: {
        payments: "பணம்",
        todaysSales: "இன்றைய விற்பனை",
        weeklyEarnings: "வாரப் பணம்",
        totalBalance: "மொத்த நிலுவு",
        withdrawFunds: "பணம் எடுத்தல்",
        withdrawMethod: "பணம் எடுக்கும் முறை",
        upiId: "UPI ஐடி",
        bankAccount: "வங்கி கணக்கு",
        accountNumber: "கணக்கு எண்",
        ifscCode: "IFSC குறியீடு",
        accountHolderName: "கணக்கு வைத்திருப்பவர் பெயர்",
        amount: "தொகை",
        availableBalance: "கிடைக்கும் நிலுவு",
        withdraw: "எடுக்கவும்",
        cancel: "ரத்து செய்",
        recentTransactions: "சமீபத்திய பரிவர்த்தனைகள்",
        paymentReceived: "பணம் பெறப்பட்டது",
        withdrawal: "பணம் எடுத்தல்",
        commission: "தளம் கமிஷன்"
      },
      hindi: {
        payments: "भुगतान",
        todaysSales: "आज की बिक्री",
        weeklyEarnings: "साप्ताहिक कमाई",
        totalBalance: "कुल शेष",
        withdrawFunds: "राशि निकालें",
        withdrawMethod: "निकासी की विधि",
        upiId: "UPI आईडी",
        bankAccount: "बैंक खाता",
        accountNumber: "खाता संख्या",
        ifscCode: "IFSC कोड",
        accountHolderName: "खाता धारक का नाम",
        amount: "राशि",
        availableBalance: "उपलब्ध शेष",
        withdraw: "निकालें",
        cancel: "रद्द करें",
        recentTransactions: "हाल के लेन-देन",
        paymentReceived: "भुगतान प्राप्त",
        withdrawal: "निकासी",
        commission: "प्लेटफॉर्म कमीशन"
      }
    };
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['english']] || key;
  };

  const mockTransactions = [
    { id: 1, type: 'payment', description: 'Blue Silk Saree - Order #ORD001', amount: 3000, date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'withdrawal', description: 'Withdrawal to UPI', amount: -1500, date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'commission', description: 'Platform Commission', amount: -150, date: '2024-01-14', status: 'completed' },
    { id: 4, type: 'payment', description: 'Cotton Saree - Order #ORD002', amount: 1500, date: '2024-01-13', status: 'completed' }
  ];

  const handleWithdraw = () => {
    // Mock withdrawal process
    alert(`Withdrawal of ₹${withdrawAmount} initiated successfully!`);
    setShowWithdrawForm(false);
    setWithdrawAmount('');
  };

  if (showWithdrawForm) {
    return (
      <div className="min-h-screen bg-gradient-background p-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => setShowWithdrawForm(false)} className="glow-primary">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{getText('withdrawFunds')}</h1>
          <VoiceAssistant language={language} className="ml-auto" />
        </div>

        <div className="space-y-6">
          {/* Available Balance */}
          <Card className="gradient-card glow-gold border-accent-gold/30">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-muted-foreground">{getText('availableBalance')}</h3>
              <p className="text-3xl font-bold text-accent-gold">₹5,850</p>
            </CardContent>
          </Card>

          {/* Withdrawal Method */}
          <Card className="gradient-card glow-primary border-primary/30">
            <CardHeader>
              <CardTitle>{getText('withdrawMethod')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={withdrawMethod === 'upi' ? 'default' : 'outline'}
                  onClick={() => setWithdrawMethod('upi')}
                  className="h-16 flex-col gap-2"
                >
                  <CreditCard className="h-6 w-6" />
                  <span>{getText('upiId')}</span>
                </Button>
                <Button
                  variant={withdrawMethod === 'bank' ? 'default' : 'outline'}
                  onClick={() => setWithdrawMethod('bank')}
                  className="h-16 flex-col gap-2"
                >
                  <Building className="h-6 w-6" />
                  <span>{getText('bankAccount')}</span>
                </Button>
              </div>

              {withdrawMethod === 'upi' ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="upiId">{getText('upiId')}</Label>
                    <Input id="upiId" placeholder="example@paytm" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="accountNumber">{getText('accountNumber')}</Label>
                    <Input id="accountNumber" placeholder="1234567890" />
                  </div>
                  <div>
                    <Label htmlFor="ifscCode">{getText('ifscCode')}</Label>
                    <Input id="ifscCode" placeholder="SBIN0001234" />
                  </div>
                  <div>
                    <Label htmlFor="accountHolderName">{getText('accountHolderName')}</Label>
                    <Input id="accountHolderName" placeholder="Priya Sharma" />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="amount">{getText('amount')}</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setShowWithdrawForm(false)} className="flex-1">
                  {getText('cancel')}
                </Button>
                <Button 
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                  className="flex-1 gradient-primary"
                >
                  {getText('withdraw')}
                </Button>
              </div>
            </CardContent>
          </Card>
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
        <h1 className="text-xl font-bold">{getText('payments')}</h1>
        <VoiceAssistant language={language} className="ml-auto" />
      </div>

      <div className="space-y-6">
        {/* Earnings Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="gradient-card glow-primary border-primary/30 text-center">
            <CardContent className="p-4">
              <TrendingUp className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">₹2,450</p>
              <p className="text-xs text-muted-foreground">{getText('todaysSales')}</p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card glow-gold border-accent-gold/30 text-center">
            <CardContent className="p-4">
              <Calendar className="h-6 w-6 mx-auto text-accent-gold mb-2" />
              <p className="text-2xl font-bold">₹12,500</p>
              <p className="text-xs text-muted-foreground">{getText('weeklyEarnings')}</p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card glow-primary border-accent-maroon/30 text-center">
            <CardContent className="p-4">
              <Wallet className="h-6 w-6 mx-auto text-accent-maroon mb-2" />
              <p className="text-2xl font-bold">₹5,850</p>
              <p className="text-xs text-muted-foreground">{getText('totalBalance')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Withdraw Button */}
        <Button 
          onClick={() => setShowWithdrawForm(true)}
          className="w-full h-16 gradient-gold text-lg font-semibold glow-gold"
          size="lg"
        >
          <Wallet className="h-6 w-6 mr-2" />
          {getText('withdrawFunds')}
        </Button>

        {/* Recent Transactions */}
        <Card className="gradient-card glow-primary border-primary/30">
          <CardHeader>
            <CardTitle>{getText('recentTransactions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border/20 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.type === 'payment' ? 'bg-green-500' :
                    transaction.type === 'withdrawal' ? 'bg-blue-500' : 
                    'bg-orange-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};