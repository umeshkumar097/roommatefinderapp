import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import { useCurrency } from '@/context/CurrencyContext';

interface FilterSidebarProps {
  filters: {
    minBudget: number;
    maxBudget: number;
    location: string;
    gender: string;
    moveInDate: string;
    preferences: string[];
  };
  setFilters: (filters: any) => void;
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const { symbol, currency } = useCurrency();
  const maxBudgetLimit = currency === 'INR' ? 50000 : 2000;
  const step = currency === 'INR' ? 1000 : 50;

  const preferenceOptions = [
    'Non-smoker',
    'Pet lover',
    'LGBTQ+ friendly',
    'Quiet',
    'Social butterfly',
    'Fitness freak',
    'Early riser',
    'Night owl',
    'Foodie',
    'Clean freak',
    'Chill vibes',
    'Music lover',
  ];

  const togglePreference = (pref: string) => {
    setFilters({
      ...filters,
      preferences: filters.preferences.includes(pref)
        ? filters.preferences.filter((p) => p !== pref)
        : [...filters.preferences, pref],
    });
  };

  return (
    <Card className="sticky top-24 bg-white/80 backdrop-blur-sm border-2 border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <CardTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Filter Roommates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, area, or locality"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="border-purple-200 focus-visible:ring-purple-600"
          />
        </div>

        {/* Budget Range */}
        <div className="space-y-3">
          <Label>Monthly Budget: {symbol}{filters.minBudget.toLocaleString()} - {symbol}{filters.maxBudget.toLocaleString()}</Label>
          <Slider
            min={0}
            max={maxBudgetLimit}
            step={step}
            value={[filters.minBudget, filters.maxBudget]}
            onValueChange={(value: number[]) => {
              const [min, max] = value;
              setFilters({ ...filters, minBudget: min, maxBudget: max });
            }}
            className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-600 [&_[role=slider]]:to-pink-600"
          />
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minBudget}
              onChange={(e) =>
                setFilters({ ...filters, minBudget: Number(e.target.value) })
              }
              className="border-purple-200"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxBudget}
              onChange={(e) =>
                setFilters({ ...filters, maxBudget: Number(e.target.value) })
              }
              className="border-purple-200"
            />
          </div>
        </div>

        {/* Move-in Date */}
        <div className="space-y-2">
          <Label htmlFor="moveInDate">Move-in Date</Label>
          <Input
            id="moveInDate"
            type="date"
            value={filters.moveInDate}
            onChange={(e) => setFilters({ ...filters, moveInDate: e.target.value })}
            className="border-purple-200"
          />
        </div>

        {/* Gender Preference */}
        <div className="space-y-3">
          <Label>Gender Preference</Label>
          <RadioGroup
            value={filters.gender}
            onValueChange={(value) => setFilters({ ...filters, gender: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="any" className="border-purple-600 text-purple-600" />
              <Label htmlFor="any" className="cursor-pointer">
                Any
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" className="border-purple-600 text-purple-600" />
              <Label htmlFor="male" className="cursor-pointer">
                Male
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" className="border-purple-600 text-purple-600" />
              <Label htmlFor="female" className="cursor-pointer">
                Female
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" className="border-purple-600 text-purple-600" />
              <Label htmlFor="other" className="cursor-pointer">
                Non-binary
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Lifestyle Preferences */}
        <div className="space-y-3">
          <Label>Vibes & Preferences</Label>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {preferenceOptions.map((pref) => (
              <div key={pref} className="flex items-center space-x-2">
                <Checkbox
                  id={pref}
                  checked={filters.preferences.includes(pref)}
                  onCheckedChange={() => togglePreference(pref)}
                  className="border-purple-600 data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor={pref} className="cursor-pointer">
                  {pref}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4 border-t border-purple-100">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="w-full border-purple-200 hover:bg-purple-50"
            onClick={() =>
              setFilters({
                minBudget: 0,
                maxBudget: 50000,
                location: '',
                gender: 'any',
                moveInDate: '',
                preferences: [],
              })
            }
          >
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}