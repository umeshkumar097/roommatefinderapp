import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPlan: (plan: 'basic' | 'premium' | 'vip') => void;
  postType: 'roommate' | 'room';
}

export function PricingModal({ open, onOpenChange, onSelectPlan, postType }: PricingModalProps) {
  const plans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      icon: Sparkles,
      price: '₹99',
      duration: '15 days',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: [
        'Profile listed for 15 days',
        'Basic profile visibility',
        'Email notifications',
        '5 contact reveals',
        'Standard support',
      ],
      popular: false,
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      icon: Zap,
      price: '₹199',
      duration: '1 month',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      features: [
        'Profile listed for 1 month',
        'Priority listing (Top 10)',
        'WhatsApp + Email notifications',
        'Unlimited contact reveals',
        'Verified badge',
        'Priority support',
      ],
      popular: true,
    },
    {
      id: 'vip' as const,
      name: 'VIP',
      icon: Crown,
      price: '₹499',
      duration: '3 months',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      features: [
        'Profile listed for 3 months',
        'Featured listing (Top 3)',
        'All communication channels',
        'Unlimited everything',
        'Verified + Premium badge',
        '24/7 dedicated support',
        'Profile boost every week',
      ],
      popular: false,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
            Choose Your Plan 🚀
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Post your {postType === 'roommate' ? 'profile' : 'room listing'} and get matched faster!
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 ${plan.borderColor} ${plan.bgColor} p-6 hover:scale-105 transition-transform duration-200`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 shadow-lg">
                      🔥 Most Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${plan.color} mb-4`}>
                    <Icon className="size-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-slate-600">{plan.duration} listing</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white h-11`}
                  onClick={() => {
                    onSelectPlan(plan.id);
                    onOpenChange(false);
                  }}
                >
                  Select {plan.name}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
          <p className="text-center text-slate-700">
            💡 <strong>Pro Tip:</strong> Premium and VIP listings get 5x more responses! Start getting matched today.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
