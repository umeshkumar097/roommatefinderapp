import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface RoomFilterSidebarProps {
  filters: {
    minRent: number;
    maxRent: number;
    location: string;
    roomType: string;
    furnishing: string;
    amenities: string[];
  };
  setFilters: (filters: any) => void;
}

export function RoomFilterSidebar({ filters, setFilters }: RoomFilterSidebarProps) {
  const amenityOptions = [
    'WiFi',
    'AC',
    'Parking',
    'Gym',
    'Swimming pool',
    'Power Backup',
    'Security',
    'Elevator',
    'Water purifier',
    'Washing machine',
    'Kitchen',
    'Meals included',
  ];

  const toggleAmenity = (amenity: string) => {
    setFilters({
      ...filters,
      amenities: filters.amenities.includes(amenity)
        ? filters.amenities.filter((a) => a !== amenity)
        : [...filters.amenities, amenity],
    });
  };

  return (
    <Card className="sticky top-24 bg-white/80 backdrop-blur-sm border-2 border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <CardTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Filter Rooms
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="room-location">Location</Label>
          <Input
            id="room-location"
            placeholder="City, area, or landmark"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="border-purple-200 focus-visible:ring-purple-600"
          />
        </div>

        {/* Rent Range */}
        <div className="space-y-3">
          <Label>Monthly Rent: ₹{filters.minRent.toLocaleString('en-IN')} - ₹{filters.maxRent.toLocaleString('en-IN')}</Label>
          <Slider
            min={0}
            max={50000}
            step={1000}
            value={[filters.minRent, filters.maxRent]}
            onValueChange={(value: number[]) => {
              const [min, max] = value;
              setFilters({ ...filters, minRent: min, maxRent: max });
            }}
            className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-600 [&_[role=slider]]:to-pink-600"
          />
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minRent}
              onChange={(e) =>
                setFilters({ ...filters, minRent: Number(e.target.value) })
              }
              className="border-purple-200"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxRent}
              onChange={(e) =>
                setFilters({ ...filters, maxRent: Number(e.target.value) })
              }
              className="border-purple-200"
            />
          </div>
        </div>

        {/* Room Type */}
        <div className="space-y-3">
          <Label>Room Type</Label>
          <RadioGroup
            value={filters.roomType}
            onValueChange={(value) => setFilters({ ...filters, roomType: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="type-any" className="border-purple-600 text-purple-600" />
              <Label htmlFor="type-any" className="cursor-pointer">
                Any
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" className="border-purple-600 text-purple-600" />
              <Label htmlFor="single" className="cursor-pointer">
                Single Room
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="shared" id="shared" className="border-purple-600 text-purple-600" />
              <Label htmlFor="shared" className="cursor-pointer">
                Shared Room
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1bhk" id="1bhk" className="border-purple-600 text-purple-600" />
              <Label htmlFor="1bhk" className="cursor-pointer">
                1BHK
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2bhk" id="2bhk" className="border-purple-600 text-purple-600" />
              <Label htmlFor="2bhk" className="cursor-pointer">
                2BHK+
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="studio" id="studio" className="border-purple-600 text-purple-600" />
              <Label htmlFor="studio" className="cursor-pointer">
                Studio
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Furnishing */}
        <div className="space-y-3">
          <Label>Furnishing</Label>
          <RadioGroup
            value={filters.furnishing}
            onValueChange={(value) => setFilters({ ...filters, furnishing: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="furn-any" className="border-purple-600 text-purple-600" />
              <Label htmlFor="furn-any" className="cursor-pointer">
                Any
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fully" id="fully" className="border-purple-600 text-purple-600" />
              <Label htmlFor="fully" className="cursor-pointer">
                Fully Furnished
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="semi" id="semi" className="border-purple-600 text-purple-600" />
              <Label htmlFor="semi" className="cursor-pointer">
                Semi-Furnished
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unfurnished" id="unfurnished" className="border-purple-600 text-purple-600" />
              <Label htmlFor="unfurnished" className="cursor-pointer">
                Unfurnished
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <Label>Amenities</Label>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {amenityOptions.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={() => toggleAmenity(amenity)}
                  className="border-purple-600 data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer">
                  {amenity}
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
                minRent: 0,
                maxRent: 50000,
                location: '',
                roomType: 'any',
                furnishing: 'any',
                amenities: [],
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
