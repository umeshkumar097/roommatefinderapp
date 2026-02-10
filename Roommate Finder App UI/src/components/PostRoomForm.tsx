import { useState } from 'react';
import { Home, MapPin, IndianRupee, Calendar, Users, Image as ImageIcon, Sparkles, Wifi, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface PostRoomFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function PostRoomForm({ open, onOpenChange, onSuccess }: PostRoomFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    rent: '',
    deposit: '',
    roomType: 'single',
    furnishing: 'semi',
    description: '',
    availableFrom: '',
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const amenityOptions = [
    'WiFi',
    'AC',
    'Parking',
    'Gym',
    'Swimming Pool',
    'Power Backup',
    'Security',
    'Washing Machine',
    'Water Purifier',
    'Kitchen',
    'Balcony',
    'Elevator',
  ];

  const preferenceOptions = [
    'Working professional',
    'Student',
    'Male only',
    'Female only',
    'Any',
    'Non-smoker',
    'Vegetarian',
    'Pet friendly',
    'LGBTQ+ friendly',
  ];

  const handleSubmit = () => {
    // Simulate form submission
    setTimeout(() => {
      onSuccess();
      onOpenChange(false);
    }, 1000);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const togglePreference = (pref: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Post Your Room 🏠
          </DialogTitle>
          <DialogDescription>
            List your room and find the perfect tenant!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="flex items-center gap-2">
              <Home className="size-4" />
              Listing Title *
            </Label>
            <Input
              id="title"
              placeholder="e.g., Cozy Room in 2BHK Apartment"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="size-4" />
              Location *
            </Label>
            <Input
              id="location"
              placeholder="Indiranagar, Bangalore"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Rent & Deposit */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <IndianRupee className="size-4" />
              Pricing *
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  placeholder="Monthly Rent (e.g., 12000)"
                  type="number"
                  value={formData.rent}
                  onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                />
                <p className="text-xs text-slate-500 mt-1">Monthly rent</p>
              </div>
              <div>
                <Input
                  placeholder="Security Deposit (e.g., 24000)"
                  type="number"
                  value={formData.deposit}
                  onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                />
                <p className="text-xs text-slate-500 mt-1">Security deposit</p>
              </div>
            </div>
          </div>

          {/* Room Type */}
          <div>
            <Label className="mb-2 block">Room Type *</Label>
            <div className="grid grid-cols-4 gap-2">
              {['Single', 'Shared', 'Studio', '1BHK'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, roomType: type.toLowerCase() })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.roomType === type.toLowerCase()
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <p className="text-xs font-medium">{type}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Furnishing */}
          <div>
            <Label className="mb-2 block">Furnishing Status *</Label>
            <div className="grid grid-cols-3 gap-2">
              {['Fully Furnished', 'Semi-Furnished', 'Unfurnished'].map((furn) => {
                const value = furn.toLowerCase().replace(' furnished', '').replace('ly', '');
                return (
                  <button
                    key={furn}
                    onClick={() => setFormData({ ...formData, furnishing: value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.furnishing === value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <p className="text-xs font-medium">{furn}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available From */}
          <div>
            <Label htmlFor="availableFrom" className="flex items-center gap-2">
              <Calendar className="size-4" />
              Available From *
            </Label>
            <Input
              id="availableFrom"
              placeholder="Feb 2026"
              value={formData.availableFrom}
              onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="flex items-center gap-2">
              <Sparkles className="size-4" />
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your room, neighborhood, and what makes it special! ✨"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 min-h-24"
            />
            <p className="text-xs text-slate-500 mt-1">
              Highlight key features, nearby amenities, and what makes your place awesome!
            </p>
          </div>

          {/* Amenities */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Wifi className="size-4" />
              Amenities & Facilities
            </Label>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((amenity) => (
                <Badge
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`cursor-pointer transition-all ${
                    selectedAmenities.includes(amenity)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tenant Preferences */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Users className="size-4" />
              Looking For (Tenant Preferences)
            </Label>
            <div className="flex flex-wrap gap-2">
              {preferenceOptions.map((pref) => (
                <Badge
                  key={pref}
                  onClick={() => togglePreference(pref)}
                  className={`cursor-pointer transition-all ${
                    selectedPreferences.includes(pref)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  {pref}
                </Badge>
              ))}
            </div>
          </div>

          {/* Room Photos */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <ImageIcon className="size-4" />
              Room Photos *
            </Label>
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center hover:border-purple-500 transition-colors cursor-pointer bg-purple-50/50">
              <ImageIcon className="size-8 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-slate-600">Click to upload or drag & drop</p>
              <p className="text-xs text-slate-500 mt-1">Add up to 5 photos (JPG, PNG up to 5MB each)</p>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              💡 Listings with photos get 10x more responses!
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4 space-y-3">
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12"
            >
              <Zap className="size-4 mr-2" />
              Post My Room
            </Button>
            <p className="text-xs text-center text-slate-500">
              Your listing will go live immediately after payment confirmation
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
