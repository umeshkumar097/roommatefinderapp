import { useState } from 'react';
import { MapPin, IndianRupee, Calendar, CheckCircle2, Home as HomeIcon, Users, Phone, MessageCircle, Share2, Flag, User, Heart, Wifi, Car, Dumbbell } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Separator } from './ui/separator';
import { ContactModal } from './ContactModal';

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

interface RoomDetailModalProps {
  room: Room;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoomDetailModal({ room, open, onOpenChange }: RoomDetailModalProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Room Details
            </DialogTitle>
            <DialogDescription>
              Complete listing information and amenities
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            {/* Image Gallery */}
            <div className="relative h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-purple-200 shadow-lg">
              <ImageWithFallback
                src={room.images[0]}
                alt={room.title}
                className="w-full h-full object-cover"
              />
              {room.verified && (
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 shadow-lg text-xs sm:text-sm">
                  <CheckCircle2 className="size-3 sm:size-5" />
                  <span className="hidden sm:inline">Verified Property</span>
                  <span className="sm:hidden">Verified</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 hover:bg-white backdrop-blur-sm h-8 w-8 sm:h-10 sm:w-10"
              >
                <Heart className="size-4 sm:size-5 text-pink-500" />
              </Button>
            </div>

            {/* Title & Price */}
            <div>
              <h3 className="text-xl sm:text-2xl mb-2">{room.title}</h3>
              <div className="flex items-center gap-2 text-slate-600 mb-3 text-sm sm:text-base">
                <User className="size-3 sm:size-4" />
                <span>Posted by {room.owner}</span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                <div className="flex items-center gap-1 text-base sm:text-lg">
                  <IndianRupee className="size-4 sm:size-5 text-green-600" />
                  <span className="text-green-600 font-semibold">{room.rent}/month</span>
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm">
                  {room.roomType}
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border border-blue-200 text-xs sm:text-sm">
                  {room.furnishing}
                </Badge>
              </div>
            </div>

            <Separator className="bg-purple-100" />

            {/* Description */}
            <div>
              <h4 className="mb-3 text-purple-600 text-base sm:text-lg">About this place</h4>
              <p className="text-slate-700 text-sm sm:text-base">{room.description}</p>
            </div>

            <Separator className="bg-purple-100" />

            {/* Key Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-purple-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                    <MapPin className="size-4 sm:size-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs sm:text-sm">Location</p>
                    <p className="text-slate-900 text-sm sm:text-base font-medium">{room.location}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-purple-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                    <IndianRupee className="size-4 sm:size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs sm:text-sm">Security Deposit</p>
                    <p className="text-slate-900 text-sm sm:text-base font-medium">{room.deposit}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-purple-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg">
                    <Calendar className="size-4 sm:size-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs sm:text-sm">Available From</p>
                    <p className="text-slate-900 text-sm sm:text-base font-medium">{room.availableFrom}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-purple-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                    <HomeIcon className="size-4 sm:size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs sm:text-sm">Room Type</p>
                    <p className="text-slate-900 text-sm sm:text-base font-medium">{room.roomType}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-purple-100" />

            {/* Amenities */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-purple-600 text-base sm:text-lg">
                <Wifi className="size-4 sm:size-5" />
                Amenities & Facilities
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {room.amenities.map((amenity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 p-2 sm:p-3 bg-white rounded-lg border border-purple-100 hover:border-purple-300 transition-colors"
                  >
                    <CheckCircle2 className="size-3 sm:size-4 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700 text-xs sm:text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-purple-100" />

            {/* Looking For */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-purple-600 text-base sm:text-lg">
                <Users className="size-4 sm:size-5" />
                Looking For
              </h4>
              <div className="flex flex-wrap gap-2">
                {room.preferences.map((pref, index) => (
                  <Badge 
                    key={index} 
                    className="bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 text-xs sm:text-sm"
                  >
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-purple-100" />

            {/* House Rules */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-4 rounded-xl border border-purple-100">
              <h4 className="mb-3 text-base sm:text-lg font-semibold">House Rules & Guidelines</h4>
              <div className="space-y-2 text-slate-700 text-xs sm:text-sm">
                <p>✅ Maintain cleanliness and hygiene</p>
                <p>✅ Respect quiet hours (11 PM - 7 AM)</p>
                <p>✅ Prior intimation for guests</p>
                <p>✅ No illegal activities</p>
                <p>✅ Monthly rent due on 1st of every month</p>
              </div>
            </div>

            <Separator className="bg-purple-100" />

            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-3 pb-2">
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-11"
                onClick={() => {
                  setContactModalOpen(true);
                }}
              >
                <MessageCircle className="size-4 mr-2" />
                Contact Owner
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="border-purple-200 hover:bg-purple-50 text-xs sm:text-sm h-10">
                  <Phone className="size-3 sm:size-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Request</span> Number
                </Button>
                <Button variant="outline" className="border-purple-200 hover:bg-purple-50 text-xs sm:text-sm h-10">
                  <Calendar className="size-3 sm:size-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">Schedule</span> Visit
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="border-purple-200 hover:bg-purple-50 text-xs sm:text-sm h-10">
                  <Share2 className="size-3 sm:size-4 mr-1 sm:mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm h-10">
                  <Flag className="size-3 sm:size-4 mr-1 sm:mr-2" />
                  Report
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        recipientName={room.owner}
        recipientType="owner"
      />
    </>
  );
}