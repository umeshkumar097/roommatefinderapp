"use client";

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Users, Home as HomeIcon, MessageCircle, Bell, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoommateCard } from '@/components/RoommateCard';
import { RoomCard } from '@/components/RoomCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { RoomFilterSidebar } from '@/components/RoomFilterSidebar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { AuthScreen } from '@/components/AuthScreen';
import { Footer } from '@/components/Footer';
import { AppLoader } from '@/components/AppLoader';
import { LoadingGrid } from '@/components/SkeletonLoader';
import { PricingModal } from '@/components/PricingModal';
import { PaymentModal } from '@/components/PaymentModal';
import { PostRoommateForm } from '@/components/PostRoommateForm';
import { PostRoomForm } from '@/components/PostRoomForm';
import { SuccessModal } from '@/components/SuccessModal';
import { LandingPage } from '@/components/LandingPage';
import { AuthPromptModal } from '@/components/AuthPromptModal';
import { useAuth } from '@/context/AuthContext'; // Integration with real auth

export default function Home() {
  const { user, isLoading: authLoading } = useAuth();
  const isAuthenticated = !!user;

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
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

  // Data States
  const [roommates, setRoommates] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsDataLoading(true);

        // Build Query Params based on Active Tab
        const roommateParams = new URLSearchParams({
          limit: '10',
          location: roommateFilters.location,
          minBudget: roommateFilters.minBudget.toString(),
          maxBudget: roommateFilters.maxBudget.toString(),
        });

        const roomParams = new URLSearchParams({
          limit: '10',
          location: roomFilters.location,
          minPrice: roomFilters.minRent.toString(),
          maxPrice: roomFilters.maxRent.toString(),
        });

        if (activeTab === 'roommates') {
          const res = await fetch(`/api/roommates?${roommateParams.toString()}`);
          if (res.ok) {
            const data = await res.json();
            setRoommates(data.roommates || []);
          }
        } else {
          const res = await fetch(`/api/listings?${roomParams.toString()}`);
          if (res.ok) {
            const data = await res.json();
            const listings = data.listings || [];
            const formattedRooms = listings.map((l: any) => ({
              id: l.id,
              title: l.title,
              owner: l.user?.name || 'Unknown',
              location: l.location,
              rent: `₹${l.price}`,
              deposit: l.deposit ? `₹${l.deposit}` : undefined,
              roomType: l.roomType || 'Private Room',
              furnishing: l.furnishingStatus || 'Unfurnished',
              images: l.images && l.images.length > 0 ? l.images : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'],
              amenities: l.amenities || [],
              description: l.description,
              availableFrom: l.availableDate ? new Date(l.availableDate).toLocaleDateString() : 'Now',
              preferences: l.preferences || [],
              verified: true
            }));
            setRooms(formattedRooms);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsDataLoading(false);
        setIsInitialLoading(false);
      }
    };

    // Debounce fetching to avoid too many requests while sliding
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [activeTab, roommateFilters, roomFilters]);


  // Sync with auth state
  useEffect(() => {
    if (isAuthenticated) {
      setShowLandingPage(false);
    }
  }, [isAuthenticated]);

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

  // Show landing page first (only if not authenticated)
  if (showLandingPage && !isAuthenticated) {
    return <LandingPage onGetStarted={handleGetStarted} onBrowse={handleBrowse} />;
  }

  // Show auth screen if explicitly requested
  if (showAuthScreen && !isAuthenticated) {
    return (
      <>
        <AuthScreen onAuthComplete={() => {
          // In a real app, this would be handled by AuthContext updates
          // For now, we rely on the backend/context login
          // Maybe redirect to /login or trigger the context login
          window.location.href = '/login';
        }} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <Header />

      {/* Hero Section (only when searching?) - No, the UI has it always on top */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="mb-3 text-3xl font-bold">Find Your Perfect Room or Roomie! 🏠✨</h2>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Connect with awesome people or find that dream room. No cap, it's that easy! 🔥
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
                Verified Profiles
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
                Safe & Secure
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
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
                className="border-0 focus-visible:ring-0 flex-1 shadow-none"
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
                <HomeIcon className="size-5" />
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
                    <h3 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-xl">
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
                    <h3 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-xl">
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
      <Footer />

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
