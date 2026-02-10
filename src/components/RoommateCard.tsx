import { MapPin, Banknote, Calendar, CheckCircle2, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RoommateDetailModal } from './RoommateDetailModal';
import { ContactModal } from './ContactModal';
import { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';

interface Roommate {
  id: number;
  name: string;
  age: number;
  occupation: string;
  location: string;
  budget: string;
  image: string;
  bio: string;
  preferences: string[];
  moveInDate: string;
  verified: boolean;
}

interface RoommateCardProps {
  roommate: Roommate;
}

export function RoommateCard({ roommate }: RoommateCardProps) {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { symbol } = useCurrency();

  // Helper to safely format budget string
  const displayBudget = () => {
    // If budget is already formatted with a symbol (e.g., "₹15000"), return as is
    if (roommate.budget.includes('₹') || roommate.budget.includes('$')) {
      return roommate.budget;
    }
    // Otherwise prepend the active symbol
    return `${symbol}${roommate.budget}`;
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-purple-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100">
            <ImageWithFallback
              src={roommate.image}
              alt={roommate.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/90 hover:bg-white backdrop-blur-sm"
            >
              <Heart className="size-5 text-pink-500" />
            </Button>
            {roommate.verified && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <CheckCircle2 className="size-4" />
                <span className="text-sm">Verified</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {roommate.name}, {roommate.age}
                </h4>
                <p className="text-slate-600">{roommate.occupation}</p>
              </div>
            </div>

            <p className="text-slate-700 mb-4">{roommate.bio}</p>

            {/* Info Grid */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="size-4 text-purple-600" />
                <span>{roommate.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Banknote className="size-4 text-green-600" />
                <span className="text-green-600">{displayBudget()}/month</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="size-4 text-orange-600" />
                <span>Move-in: {roommate.moveInDate}</span>
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="text-slate-600 mb-2">Vibes:</p>
              <div className="flex flex-wrap gap-2">
                {roommate.preferences.map((pref, index) => (
                  <Badge key={index} className="bg-white border border-purple-200 text-purple-700">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => setDetailModalOpen(true)}
              >
                View Profile
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-purple-200 hover:bg-purple-50"
                onClick={() => setContactModalOpen(true)}
              >
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <RoommateDetailModal
        roommate={roommate}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
      />

      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        recipientName={roommate.name}
        recipientType="roommate"
      />
    </>
  );
}