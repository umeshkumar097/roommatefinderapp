import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Users, Home, MessageCircle, Bell, Sparkles } from 'lucide-react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { RoommateCard } from './components/RoommateCard';
import { RoomCard } from './components/RoomCard';
import { FilterSidebar } from './components/FilterSidebar';
import { RoomFilterSidebar } from './components/RoomFilterSidebar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from './components/ui/sheet';
import { Badge } from './components/ui/badge';
import { AuthScreen } from './components/AuthScreen';
import { Footer } from './components/Footer';
import { AppLoader } from './components/AppLoader';
import { LoadingGrid } from './components/SkeletonLoader';
import { PricingModal } from './components/PricingModal';
import { PaymentModal } from './components/PaymentModal';
import { PostRoommateForm } from './components/PostRoommateForm';
import { PostRoomForm } from './components/PostRoomForm';
import { SuccessModal } from './components/SuccessModal';
import { LandingPage } from './components/LandingPage';
import { AuthPromptModal } from './components/AuthPromptModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [authPromptAction, setAuthPromptAction] = useState<'chat' | 'call' | 'connect' | 'post'>('connect');
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  
  // Post Ad Flow States
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [postType, setPostType] = useState<'roommate' | 'room'>('roommate');
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    duration: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('roommates');
  const [roommateFilters, setRoommateFilters] = useState({
    minBudget: 0,
    maxBudget: 50000,
    location: '',
    gender: 'any',
    moveInDate: '',
    preferences: [] as string[],
  });

  const [roomFilters, setRoomFilters] = useState({
    minRent: 0,
    maxRent: 50000,
    location: '',
    roomType: 'any',
    furnishing: 'any',
    amenities: [] as string[],
  });

  const roommates = [
    {
      id: 1,
      name: 'Priya Sharma',
      age: 23,
      occupation: 'Software Developer',
      location: 'Koramangala, Bangalore',
      budget: '₹8,000-12,000',
      image: 'https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzYzNDgyMTk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Tech girlie who loves café hopping & binge-watching K-dramas 🎬✨',
      preferences: ['Non-smoker', 'Foodie', 'Night owl', 'Pet lover'],
      moveInDate: 'Feb 2026',
      verified: true,
    },
    {
      id: 2,
      name: 'Rahul Verma',
      age: 25,
      occupation: 'Graphic Designer',
      location: 'Powai, Mumbai',
      budget: '₹10,000-15,000',
      image: 'https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzU0MjA2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Creative soul | Gym freak 💪 | Love gaming & cricket on weekends',
      preferences: ['Non-smoker', 'Fitness freak', 'Clean', 'Chill vibes'],
      moveInDate: 'Jan 2026',
      verified: true,
    },
    {
      id: 3,
      name: 'Ananya Joshi',
      age: 22,
      occupation: 'Marketing Intern',
      location: 'Hauz Khas, Delhi',
      budget: '₹7,000-10,000',
      image: 'https://images.unsplash.com/photo-1685538856139-a5ab24ea2325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjBjYXN1YWx8ZW58MXx8fHwxNzYzNDg0MDgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Party + Study = Perfect balance 🎉📚 Looking for a fun roomie!',
      preferences: ['Social butterfly', 'Foodie', 'Music lover', 'Spontaneous'],
      moveInDate: 'Mar 2026',
      verified: false,
    },
    {
      id: 4,
      name: 'Arjun Mehta',
      age: 26,
      occupation: 'Data Analyst',
      location: 'Whitefield, Bangalore',
      budget: '₹12,000-18,000',
      image: 'https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzYzNDgyMTk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'WFH warrior | Coffee addict ☕ | Love cooking & hosting dinners',
      preferences: ['Foodie', 'Clean', 'Social', 'Early riser'],
      moveInDate: 'Feb 2026',
      verified: true,
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      age: 24,
      occupation: 'Content Creator',
      location: 'Bandra, Mumbai',
      budget: '₹15,000-20,000',
      image: 'https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzU0MjA2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Digital creator 📸 | Aesthetic vibes only | Plant mom 🌿',
      preferences: ['Aesthetic', 'Clean', 'Pet friendly', 'Creative'],
      moveInDate: 'Jan 2026',
      verified: true,
    },
    {
      id: 6,
      name: 'Vikram Singh',
      age: 27,
      occupation: 'Product Manager',
      location: 'Cyber City, Gurgaon',
      budget: '₹18,000-25,000',
      image: 'https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzYzNDgyMTk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Startup hustle 💼 | Weekend traveler | Looking for like-minded peeps',
      preferences: ['Non-smoker', 'Professional', 'Clean', 'Organized'],
      moveInDate: 'Feb 2026',
      verified: true,
    },
  ];

  const rooms = [
    {
      id: 1,
      title: 'Cozy Room in 2BHK Apartment',
      owner: 'Neha Kumar',
      location: 'Indiranagar, Bangalore',
      rent: '₹12,000',
      deposit: '₹24,000',
      roomType: 'Single',
      furnishing: 'Fully Furnished',
      images: [
        'https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MzU0NTYxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Power Backup'],
      description: 'Spacious room with attached bathroom. Amazing vibes & great locality! 🏠✨',
      availableFrom: 'Feb 2026',
      preferences: ['Working professional', 'Non-smoker', 'Vegetarian preferred'],
      verified: true,
    },
    {
      id: 2,
      title: 'Aesthetic Studio Apartment',
      owner: 'Rohan Desai',
      location: 'Andheri West, Mumbai',
      rent: '₹18,000',
      deposit: '₹36,000',
      roomType: 'Studio',
      furnishing: 'Semi-Furnished',
      images: [
        'https://images.unsplash.com/photo-1605191353027-d21e534a419a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MzU2NDc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      amenities: ['WiFi', 'Kitchen', 'Laundry', 'Security', 'Metro nearby'],
      description: 'Perfect for singles! Modern design, close to metro & cafes ☕',
      availableFrom: 'Jan 2026',
      preferences: ['Any', 'LGBTQ+ friendly', 'Pet friendly'],
      verified: true,
    },
    {
      id: 3,
      title: 'Shared Room for Girls',
      owner: 'Kavya Iyer',
      location: 'Koramangala, Bangalore',
      rent: '₹8,500',
      deposit: '₹17,000',
      roomType: 'Shared',
      furnishing: 'Fully Furnished',
      images: [
        'https://images.unsplash.com/photo-1680919838857-d54e011093d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXBhcnRtZW50JTIwbGl2aW5nfGVufDF8fHx8MTc2MzU2NDc2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      amenities: ['WiFi', 'AC', 'Meals included', 'Washing machine', 'Water purifier'],
      description: 'Girls only! Homely environment, safe & secure. Food included 🍲',
      availableFrom: 'Mar 2026',
      preferences: ['Female only', 'Student/Working', 'Vegetarian'],
      verified: false,
    },
    {
      id: 4,
      title: 'Luxury 1BHK - Solo Living',
      owner: 'Aditya Malhotra',
      location: 'DLF Phase 2, Gurgaon',
      rent: '₹22,000',
      deposit: '₹44,000',
      roomType: '1BHK',
      furnishing: 'Fully Furnished',
      images: [
        'https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MzU0NTYxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      amenities: ['WiFi', 'AC', 'Parking', 'Gym', 'Swimming pool', 'Club house'],
      description: 'Premium apartment with all amenities. Perfect for professionals! 💼',
      availableFrom: 'Feb 2026',
      preferences: ['Working professional', 'Non-smoker', 'Bachelor'],
      verified: true,
    },
    {
      id: 5,
      title: 'Budget-Friendly PG Room',
      owner: 'Sunita Patel',
      location: 'Sector 62, Noida',
      rent: '₹7,500',
      deposit: '₹15,000',
      roomType: 'Shared',
      furnishing: 'Fully Furnished',
      images: [
        'https://images.unsplash.com/photo-1758523417133-41f21fb9f058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFyZWQlMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MzU2NDc2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      amenities: ['WiFi', 'Meals', 'Laundry', 'Power backup', 'Water purifier'],
      description: 'Affordable PG with homely food & friendly environment 🏡',
      availableFrom: 'Jan 2026',
      preferences: ['Male only', 'Student/Working', 'No drinking'],
      verified: true,
    },
    {
      id: 6,
      title: 'Modern 2BHK - 1 Room Available',
      owner: 'Isha Kapoor',
      location: 'Kondapur, Hyderabad',
      rent: '₹14,000',
      deposit: '₹28,000',
      roomType: 'Single',
      furnishing: 'Semi-Furnished',
      images: [
        'https://images.unsplash.com/photo-1605191353027-d21e534a419a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MzU2NDc2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      ],
      amenities: ['WiFi', 'AC', 'Parking', 'Security', 'Balcony'],
      description: 'Looking for a chill roommate! Currently 1 girl staying. Good vibes only ✨',
      availableFrom: 'Feb 2026',
      preferences: ['Female preferred', 'Working professional', 'Clean & organized'],
      verified: true,
    },
  ];

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate data loading when switching tabs
  const handleTabChange = (value: string) => {
    setIsDataLoading(true);
    setActiveTab(value);
    setTimeout(() => {
      setIsDataLoading(false);
    }, 800);
  };

  // Handle auth required actions
  const handleAuthRequired = (action: 'chat' | 'call' | 'connect' | 'post') => {
    if (!isAuthenticated) {
      setAuthPromptAction(action);
      setShowAuthPrompt(true);
    }
  };

  // Handle landing page get started
  const handleGetStarted = () => {
    setShowLandingPage(false);
    setShowAuthScreen(true);
  };

  // Handle browse without auth
  const handleBrowse = () => {
    setShowLandingPage(false);
  };

  // Post Ad Flow Handlers
  const handlePostAdClick = () => {
    if (!isAuthenticated) {
      handleAuthRequired('post');
      return;
    }
    // Determine post type based on active tab
    setPostType(activeTab === 'roommates' ? 'roommate' : 'room');
    setShowPricingModal(true);
  };

  const handleChatsClick = () => {
    if (!isAuthenticated) {
      handleAuthRequired('chat');
    }
  };

  const handlePlanSelect = (plan: 'basic' | 'premium' | 'vip') => {
    const planDetails = {
      basic: { name: 'Basic', price: '₹99', duration: '15 days' },
      premium: { name: 'Premium', price: '₹199', duration: '1 month' },
      vip: { name: 'VIP', price: '₹499', duration: '3 months' },
    };
    setSelectedPlan(planDetails[plan]);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPostForm(true);
  };

  const handlePostSuccess = () => {
    setShowSuccessModal(true);
  };

  // Show initial app loader
  if (isInitialLoading) {
    return <AppLoader />;
  }

  // Show landing page first
  if (showLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} onBrowse={handleBrowse} />;
  }

  // Show auth screen if explicitly requested
  if (showAuthScreen) {
    return (
      <>
        <AuthScreen onAuthComplete={() => {
          setIsAuthenticated(true);
          setShowAuthScreen(false);
        }} />
      </>
    );
  }

  // Show admin dashboard if explicitly requested
  if (showAdminDashboard) {
    return <AdminDashboard onBackToApp={() => setShowAdminDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                <Sparkles className="size-6 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                RoomieVibes
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-4">
              <Button variant="ghost" className="gap-2" onClick={handleChatsClick}>
                <MessageCircle className="size-4" />
                Chats
              </Button>
              <Button variant="ghost" className="gap-2">
                <Bell className="size-4" />
                Alerts
              </Button>
              <Button variant="outline" className="border-purple-200">Sign In</Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={handlePostAdClick}>
                Post Ad
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="mb-3">Find Your Perfect Room or Roomie! 🏠✨</h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Connect with awesome people or find that dream room. No cap, it's that easy! 🔥
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                Verified Profiles
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                Safe & Secure
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                100% Free
              </Badge>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2">
              <Search className="size-5 text-slate-400 ml-2" />
              <Input
                type="text"
                placeholder="Search by city, area, or locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 flex-1"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          {/* Tabs Header */}
          <div className="flex items-center justify-center">
            <TabsList className="bg-white/80 backdrop-blur-sm p-1 h-auto rounded-2xl shadow-lg border border-purple-100">
              <TabsTrigger 
                value="roommates" 
                className="gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                <Users className="size-5" />
                Find Roommates
              </TabsTrigger>
              <TabsTrigger 
                value="rooms"
                className="gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                <Home className="size-5" />
                Find Rooms
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Roommates Tab */}
          <TabsContent value="roommates" className="mt-0">
            <div className="flex gap-6">
              {/* Desktop Filter Sidebar */}
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <FilterSidebar filters={roommateFilters} setFilters={setRoommateFilters} />
              </aside>

              {/* Results */}
              <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Available Roommates
                    </h3>
                    <p className="text-slate-600">{roommates.length} vibes found 🎉</p>
                  </div>
                  
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden border-purple-200">
                        <SlidersHorizontal className="size-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Roommate Filters</SheetTitle>
                        <SheetDescription>
                          Filter roommates by budget, location, and preferences
                        </SheetDescription>
                      </SheetHeader>
                      <FilterSidebar filters={roommateFilters} setFilters={setRoommateFilters} />
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Roommate Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isDataLoading ? (
                    <LoadingGrid type="roommate" />
                  ) : (
                    roommates.map((roommate) => (
                      <RoommateCard key={roommate.id} roommate={roommate} />
                    ))
                  )}
                </div>
              </main>
            </div>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="mt-0">
            <div className="flex gap-6">
              {/* Desktop Filter Sidebar */}
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <RoomFilterSidebar filters={roomFilters} setFilters={setRoomFilters} />
              </aside>

              {/* Results */}
              <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Available Rooms
                    </h3>
                    <p className="text-slate-600">{rooms.length} spaces found 🏡</p>
                  </div>
                  
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden border-purple-200">
                        <SlidersHorizontal className="size-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Room Filters</SheetTitle>
                        <SheetDescription>
                          Filter rooms by rent, type, and amenities
                        </SheetDescription>
                      </SheetHeader>
                      <RoomFilterSidebar filters={roomFilters} setFilters={setRoomFilters} />
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Room Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isDataLoading ? (
                    <LoadingGrid type="room" />
                  ) : (
                    rooms.map((room) => (
                      <RoomCard key={room.id} room={room} />
                    ))
                  )}
                </div>
              </main>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <Footer onAdminClick={() => setShowAdminDashboard(true)} />

      {/* Post Ad Modals */}
      <PricingModal
        open={showPricingModal}
        onOpenChange={setShowPricingModal}
        onSelectPlan={handlePlanSelect}
        postType={postType}
      />

      {selectedPlan && (
        <PaymentModal
          open={showPaymentModal}
          onOpenChange={setShowPaymentModal}
          plan={selectedPlan}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {postType === 'roommate' ? (
        <PostRoommateForm
          open={showPostForm}
          onOpenChange={setShowPostForm}
          onSuccess={handlePostSuccess}
        />
      ) : (
        <PostRoomForm
          open={showPostForm}
          onOpenChange={setShowPostForm}
          onSuccess={handlePostSuccess}
        />
      )}

      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        type={postType}
      />

      {/* Auth Prompt Modal */}
      <AuthPromptModal
        open={showAuthPrompt}
        onOpenChange={setShowAuthPrompt}
        onLoginClick={() => {
          setShowAuthPrompt(false);
          setShowAuthScreen(true);
        }}
        action={authPromptAction}
      />
    </div>
  );
}