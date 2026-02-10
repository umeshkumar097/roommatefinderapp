import { useState } from 'react';
import { User, MapPin, IndianRupee, Calendar, Briefcase, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface PostRoommateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function PostRoommateForm({ open, onOpenChange, onSuccess }: PostRoommateFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: '',
    location: '',
    minBudget: '',
    maxBudget: '',
    bio: '',
    moveInDate: '',
    gender: 'any',
  });

  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const preferenceOptions = [
    'Non-smoker',
    'Vegetarian',
    'Foodie',
    'Pet lover',
    'Early riser',
    'Night owl',
    'Fitness freak',
    'Clean',
    'Social',
    'Music lover',
    'Chill vibes',
  ];

  const handleSubmit = () => {
    // Simulate form submission
    setTimeout(() => {
      onSuccess();
      onOpenChange(false);
    }, 1000);
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
            Create Your Profile ✨
          </DialogTitle>
          <DialogDescription>
            Fill in your details to find the perfect roommate!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="size-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="occupation" className="flex items-center gap-2">
              <Briefcase className="size-4" />
              Occupation *
            </Label>
            <Input
              id="occupation"
              placeholder="Software Developer, Student, etc."
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="size-4" />
              Preferred Location *
            </Label>
            <Input
              id="location"
              placeholder="Koramangala, Bangalore"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Budget */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <IndianRupee className="size-4" />
              Budget Range (per month) *
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Min (e.g., 8000)"
                type="number"
                value={formData.minBudget}
                onChange={(e) => setFormData({ ...formData, minBudget: e.target.value })}
              />
              <Input
                placeholder="Max (e.g., 12000)"
                type="number"
                value={formData.maxBudget}
                onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <Label className="mb-2 block">Gender Preference</Label>
            <div className="grid grid-cols-3 gap-2">
              {['Male', 'Female', 'Any'].map((gender) => (
                <button
                  key={gender}
                  onClick={() => setFormData({ ...formData, gender: gender.toLowerCase() })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.gender === gender.toLowerCase()
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <p className="text-sm font-medium">{gender}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Move-in Date */}
          <div>
            <Label htmlFor="moveInDate" className="flex items-center gap-2">
              <Calendar className="size-4" />
              Move-in Date *
            </Label>
            <Input
              id="moveInDate"
              placeholder="Feb 2026"
              value={formData.moveInDate}
              onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
              className="mt-1"
            />
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio" className="flex items-center gap-2">
              <Sparkles className="size-4" />
              Bio / About You *
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself! Add your vibes, interests, and what you're looking for in a roommate 🎉"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="mt-1 min-h-24"
            />
            <p className="text-xs text-slate-500 mt-1">
              Pro tip: Add emojis and be yourself! Authentic profiles get more responses ✨
            </p>
          </div>

          {/* Preferences */}
          <div>
            <Label className="mb-2 block">Lifestyle & Preferences</Label>
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

          {/* Profile Photo */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <ImageIcon className="size-4" />
              Profile Photo (Optional)
            </Label>
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center hover:border-purple-500 transition-colors cursor-pointer bg-purple-50/50">
              <ImageIcon className="size-8 mx-auto mb-2 text-purple-400" />
              <p className="text-sm text-slate-600">Click to upload or drag & drop</p>
              <p className="text-xs text-slate-500 mt-1">JPG, PNG up to 5MB</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 space-y-3">
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12"
            >
              <Sparkles className="size-4 mr-2" />
              Post My Profile
            </Button>
            <p className="text-xs text-center text-slate-500">
              Your profile will go live immediately after payment confirmation
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
