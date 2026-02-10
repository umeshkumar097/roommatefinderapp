import { CreditCard, Smartphone, Wallet, ArrowRight, Shield, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: {
    name: string;
    price: string;
    duration: string;
  };
  onPaymentSuccess: () => void;
}

export function PaymentModal({ open, onOpenChange, plan, onPaymentSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Complete Payment 💳
          </DialogTitle>
          <DialogDescription>
            Secure payment powered by Razorpay
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Order Summary */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border border-purple-200">
            <h4 className="font-semibold mb-3">Order Summary</h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-700">{plan.name} Plan</span>
              <span className="font-semibold">{plan.price}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-700">Duration</span>
              <span className="text-slate-600">{plan.duration}</span>
            </div>
            <div className="border-t border-purple-200 mt-3 pt-3 flex justify-between items-center">
              <span className="font-bold">Total Amount</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {plan.price}
              </span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <Label className="mb-3 block">Select Payment Method</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-slate-200 hover:border-purple-300'
                }`}
              >
                <Smartphone className="size-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs font-medium">UPI</p>
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-slate-200 hover:border-purple-300'
                }`}
              >
                <CreditCard className="size-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs font-medium">Card</p>
              </button>
              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'wallet'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-slate-200 hover:border-purple-300'
                }`}
              >
                <Wallet className="size-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs font-medium">Wallet</p>
              </button>
            </div>
          </div>

          {/* Payment Details */}
          {paymentMethod === 'upi' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="upi">UPI ID</Label>
                <Input
                  id="upi"
                  placeholder="yourname@paytm"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Shield className="size-4 text-blue-600" />
                <p className="text-xs text-blue-700">We support all UPI apps - GPay, PhonePe, Paytm, etc.</p>
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    maxLength={3}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik'].map((wallet) => (
                  <button
                    key={wallet}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    <p className="text-sm font-medium">{wallet}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <Lock className="size-4 text-green-600" />
            <p className="text-xs text-green-700">
              <strong>100% Secure Payment</strong> - Your data is encrypted
            </p>
          </div>

          {/* Pay Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg"
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                Pay {plan.price}
                <ArrowRight className="size-5 ml-2" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-slate-500">
            By proceeding, you agree to our Terms & Conditions
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
