import { useState, useEffect } from 'react';
import { MapPin, DollarSign, Calendar, CheckCircle2, X, Phone, Mail, MessageCircle, Share2, Flag, Briefcase, Home, Heart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Separator } from './ui/separator';
import { ContactModal } from './ContactModal';

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
  phone?: string;
}

interface RoommateDetailModalProps {
  roommate: Roommate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoommateDetailModal({ roommate, open, onOpenChange }: RoommateDetailModalProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [phoneAccessStatus, setPhoneAccessStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');
  const [loading, setLoading] = useState(false);

  // Check status when modal opens
  useEffect(() => {
    if (open && roommate.id) {
      checkPhoneAccessStatus();
    }
  }, [open, roommate.id]);

  const checkPhoneAccessStatus = async () => {
    try {
      const res = await axios.get(`/api/chat/phone-access?targetUserId=${roommate.id}`);
      if (res.data) {
        setPhoneAccessStatus(res.data.status);
      } else {
        setPhoneAccessStatus('none');
      }
    } catch (error) {
      console.error("Error fetching phone access status", error);
    }
  };

  const handleRequestPhoneAccess = async () => {
    try {
      setLoading(true);
      await axios.post('/api/chat/phone-access', { targetUserId: roommate.id });
      setPhoneAccessStatus('pending');
      toast.success("Phone number request sent!");
    } catch (error) {
      toast.error("Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Roommate Profile
            </DialogTitle>
            <DialogDescription>
              Complete profile details and preferences
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <div className="relative mx-auto sm:mx-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-purple-200 shadow-lg">
                  <ImageWithFallback
                    src={roommate.image}
                    alt={roommate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {roommate.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg">
                    <CheckCircle2 className="size-4 sm:size-5" />
                  </div>
                )}
              </div>

              <div className="flex-1 w-full">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl mb-1">
                      {roommate.name}, {roommate.age}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-600 mb-2 text-sm sm:text-base">
                      <Briefcase className="size-3 sm:size-4" />
                      <span>{roommate.occupation}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-pink-500">
                    <Heart className="size-4 sm:size-5" />
                  </Button>
                </div>

                <p className="text-slate-700 mb-4 text-sm sm:text-base">{roommate.bio}</p>

                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm">
                    <DollarSign className="size-3 mr-1" />
                    {roommate.budget}/month
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 border border-orange-200 text-xs sm:text-sm">
                    <Calendar className="size-3 mr-1" />
                    {roommate.moveInDate}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator className="bg-purple-100" />

            {/* Location Details */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-purple-600 text-base sm:text-lg">
                <MapPin className="size-4 sm:size-5" />
                Preferred Location
              </h4>
              <p className="text-slate-700 text-sm sm:text-base">{roommate.location}</p>
            </div>

            <Separator className="bg-purple-100" />

            {/* Lifestyle & Preferences */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-purple-600 text-base sm:text-lg">
                <Home className="size-4 sm:size-5" />
                Vibes & Lifestyle
              </h4>
              <div className="flex flex-wrap gap-2">
                {roommate.preferences.map((pref, index) => (
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

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-4 rounded-xl border border-purple-100">
              <h4 className="mb-3 text-base sm:text-lg font-semibold">About Me</h4>
              <div className="space-y-2 text-slate-700 text-sm sm:text-base">
                <p>🎯 Looking for a clean and friendly roommate</p>
                <p>🏠 Prefer shared living for better vibes and cost-sharing</p>
                <p>📱 Open to virtual meet-ups before finalizing</p>
                <p>✨ Respectful of personal space and boundaries</p>
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
                Send Message
              </Button>
              <div className="grid grid-cols-2 gap-2">
                {phoneAccessStatus === 'approved' ? (
                  <Button variant="outline" className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 text-xs sm:text-sm h-10">
                    <Phone className="size-3 sm:size-4 mr-1 sm:mr-2" />
                    {roommate.phone || "Contact Shared"}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="border-purple-200 hover:bg-purple-50 text-xs sm:text-sm h-10"
                    disabled={phoneAccessStatus === 'pending' || loading}
                    onClick={handleRequestPhoneAccess}
                  >
                    <Phone className="size-3 sm:size-4 mr-1 sm:mr-2" />
                    {phoneAccessStatus === 'pending' ? 'Request Sent' : 'Request Phone'}
                  </Button>
                )}
                <Button variant="outline" className="border-purple-200 hover:bg-purple-50 text-xs sm:text-sm h-10">
                  <Share2 className="size-3 sm:size-4 mr-1 sm:mr-2" />
                  Share
                </Button>
              </div>
              <div className="w-full">
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm h-10">
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
        recipientName={roommate.name}
        recipientType="roommate"
      />
    </>
  );
}