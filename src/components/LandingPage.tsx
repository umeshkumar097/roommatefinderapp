import { Sparkles, Users, Home, Shield, Verified, TrendingUp, Heart, MessageCircle, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface LandingPageProps {
  onGetStarted: () => void;
  onBrowse?: () => void;
}

export function LandingPage({ onGetStarted, onBrowse }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-6 px-4 py-2">
              🚀 India's Most Vibing Roommate Finder!
            </Badge>
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Find Your Perfect<br />Roomie or Room! 🏠✨
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Connect with awesome people or find that dream room. No cap, it's that easy! Join thousands of Gen Z finding their vibe across India. 🔥
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6"
                onClick={onGetStarted}
              >
                <Sparkles className="mr-2" />
                Start Finding Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 hover:bg-purple-50 text-lg px-8 py-6"
                onClick={onBrowse}
              >
                Browse Listings
                <ArrowRight className="ml-2" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-500" />
                100% Free to Browse
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-500" />
                Verified Profiles
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-500" />
                Safe & Secure
              </div>
            </div>
          </div>

          {/* Hero Image/Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white size-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="size-6" />
                </div>
                <h3 className="mb-1 text-2xl">50K+</h3>
                <p className="text-slate-600">Active Users</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white size-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home className="size-6" />
                </div>
                <h3 className="mb-1 text-2xl">10K+</h3>
                <p className="text-slate-600">Rooms Listed</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white size-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="size-6" />
                </div>
                <h3 className="mb-1 text-2xl">25K+</h3>
                <p className="text-slate-600">Successful Matches</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose RoomieVibes? ✨
            </h2>
            <p className="text-lg text-slate-600">
              We've got everything you need to find your perfect match!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 size-12 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="size-6 text-purple-600" />
                </div>
                <h4 className="mb-2 text-purple-900">Verified Profiles</h4>
                <p className="text-slate-600">
                  All profiles are verified with ID proof. Safety first, always! 🔒
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 size-12 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="size-6 text-purple-600" />
                </div>
                <h4 className="mb-2 text-purple-900">Smart Filters</h4>
                <p className="text-slate-600">
                  Find exactly what you need with our detailed filtering options 🎯
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 size-12 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="size-6 text-purple-600" />
                </div>
                <h4 className="mb-2 text-purple-900">Easy Connect</h4>
                <p className="text-slate-600">
                  Chat, call, or video call directly from the app. Super smooth! 📱
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 size-12 rounded-xl flex items-center justify-center mb-4">
                  <Users className="size-6 text-purple-600" />
                </div>
                <h4 className="mb-2 text-purple-900">Gen Z Community</h4>
                <p className="text-slate-600">
                  Connect with like-minded people who match your vibe ✌️
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 size-12 rounded-xl flex items-center justify-center mb-4">
                  <Home className="size-6 text-purple-600" />
                </div>
                <h4 className="mb-2 text-purple-900">Dual Functionality</h4>
                <p className="text-slate-600">
                  Find roommates OR list your room. One app, double power! 💪
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 size-12 rounded-xl flex items-center justify-center mb-4">
                  <Verified className="size-6 text-purple-600" />
                </div>
                <h4 className="mb-2 text-purple-900">Trusted Platform</h4>
                <p className="text-slate-600">
                  Thousands of successful matches. Join the fam! 🎉
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              How It Works 🚀
            </h2>
            <p className="text-lg text-slate-600">
              Finding your perfect roommate or room is just 3 steps away!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-xl">
                1
              </div>
              <h4 className="mb-3 text-purple-900">Create Your Profile</h4>
              <p className="text-slate-600">
                Sign up in seconds and tell us what you're looking for. Be yourself! ✨
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-xl">
                2
              </div>
              <h4 className="mb-3 text-purple-900">Browse & Filter</h4>
              <p className="text-slate-600">
                Use smart filters to find exactly what matches your vibe 🎯
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white size-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-xl">
                3
              </div>
              <h4 className="mb-3 text-purple-900">Connect & Move In</h4>
              <p className="text-slate-600">
                Chat with potential roomies, schedule visits, and find your new home! 🏠
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              What Our Users Say 💬
            </h2>
            <p className="text-lg text-slate-600">
              Real stories from real people who found their perfect match!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-2 border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">
                  "Found my roommate in just 2 days! The verification process made me feel so safe. Love the vibe here! 💯"
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                  <div>
                    <p className="text-purple-900">Priya Sharma</p>
                    <p className="text-sm text-slate-500">Bangalore</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">
                  "Best roommate finder app! The filters helped me find someone with the exact vibe I was looking for 🎯"
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                  <div>
                    <p className="text-purple-900">Rahul Verma</p>
                    <p className="text-sm text-slate-500">Mumbai</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">
                  "Listed my room and got 10+ inquiries in a week! Super easy to use and the community is amazing 🔥"
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                  <div>
                    <p className="text-purple-900">Sneha Reddy</p>
                    <p className="text-sm text-slate-500">Delhi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 border-0 overflow-hidden">
            <CardContent className="p-8 sm:p-12 text-center text-white">
              <h2 className="mb-4 text-3xl sm:text-4xl">
                Ready to Find Your Vibe? 🚀
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of Gen Z finding their perfect roommates and rooms across India. It's free, it's fast, it's fun!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6"
                  onClick={onGetStarted}
                >
                  <Sparkles className="mr-2" />
                  Get Started Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                  onClick={onBrowse}
                >
                  Browse Listings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
}