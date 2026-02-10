import { MapPin, IndianRupee, Calendar, CheckCircle2, Heart, Wifi, Home as HomeIcon, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RoomDetailModal } from './RoomDetailModal';
import { ContactModal } from './ContactModal';
import { useState } from 'react';

interface Room {
  id: number;
  title: string;
  owner: string;
  location: string;
  rent: string;
  deposit: string;
  roomType: string;
  furnishing: string;
  images: string[];
  amenities: string[];
  description: string;
  availableFrom: string;
  preferences: string[];
  verified: boolean;
}

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-purple-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-56 bg-gradient-to-br from-purple-100 to-pink-100">
            <ImageWithFallback
              src={room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/90 hover:bg-white backdrop-blur-sm"
            >
              <Heart className="size-5 text-pink-500" />
            </Button>
            {room.verified && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <CheckCircle2 className="size-4" />
                <span className="text-sm">Verified</span>
              </div>
            )}
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                {room.roomType}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5">
            <div className="mb-3">
              <h4 className="mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {room.title}
              </h4>
              <p className="text-slate-600">by {room.owner}</p>
            </div>

            <p className="text-slate-700 mb-4">{room.description}</p>

            {/* Info Grid */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="size-4 text-purple-600" />
                <span>{room.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <IndianRupee className="size-4 text-green-600" />
                  <span className="text-green-600">{room.rent}/month</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">Deposit: {room.deposit}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="size-4 text-orange-600" />
                <span>Available: {room.availableFrom}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <HomeIcon className="size-4 text-purple-600" />
                <span>{room.furnishing}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <p className="text-slate-600 mb-2">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {room.amenities.slice(0, 4).map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 border border-purple-200">
                    {amenity}
                  </Badge>
                ))}
                {room.amenities.length > 4 && (
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border border-purple-200">
                    +{room.amenities.length - 4} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="text-slate-600 mb-2">Looking for:</p>
              <div className="flex flex-wrap gap-2">
                {room.preferences.map((pref, index) => (
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
                View Details
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-purple-200 hover:bg-purple-50"
                onClick={() => setContactModalOpen(true)}
              >
                Contact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <RoomDetailModal
        room={room}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
      />

      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        recipientName={room.owner}
        recipientType="owner"
      />
    </>
  );
}