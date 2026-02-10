import { useState } from 'react';
import { Sparkles, Mail, Lock, User, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

interface AuthScreenProps {
  onAuthComplete: () => void;
}

type AuthMode = 'login' | 'register';

export function AuthScreen({ onAuthComplete }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    onAuthComplete();
  };

  const handleGuestLogin = () => {
    // Guest login bypasses authentication
    onAuthComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-2xl">
              <Sparkles className="size-8 text-white" />
            </div>
          </div>
          <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            RoomieVibes
          </h1>
          <p className="text-slate-600">
            {mode === 'login' 
              ? 'Welcome back! Ready to vibe? ✨' 
              : 'Join the coolest roomie community! 🎉'}
          </p>
        </div>

        {/* Auth Card */}
        <Card className="p-6 bg-white/80 backdrop-blur-md border-purple-100 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Register Only Fields */}
            {mode === 'register' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your awesome name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 border-purple-200 focus-visible:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 border-purple-200 focus-visible:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                      id="city"
                      type="text"
                      placeholder="Bangalore, Mumbai, Delhi..."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="pl-10 border-purple-200 focus-visible:ring-purple-500"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Common Fields */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 border-purple-200 focus-visible:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 border-purple-200 focus-visible:ring-purple-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Password (Login only) */}
            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-purple-600 hover:text-purple-700">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {mode === 'login' ? "Let's Vibe! 🚀" : "Join the Fam! 🎊"}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <Separator className="bg-purple-100" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-slate-500">
                or
              </span>
            </div>

            {/* Guest Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-purple-200 hover:bg-purple-50"
              onClick={handleGuestLogin}
            >
              Continue as Guest 👻
            </Button>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-purple-200 hover:bg-purple-50"
                onClick={handleGuestLogin}
              >
                <svg className="size-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-purple-200 hover:bg-purple-50"
                onClick={handleGuestLogin}
              >
                <svg className="size-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-purple-600 hover:text-purple-700"
              >
                {mode === 'login' ? 'Sign up here! 🎯' : 'Login here! 👋'}
              </button>
            </p>
          </div>

          {/* Privacy Notice */}
          {mode === 'register' && (
            <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-xs text-slate-600">
                By signing up, you agree to our Terms & Conditions. We keep your data safe & secure. No cap! 🔒
              </p>
            </div>
          )}
        </Card>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <span>🔒</span>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <span>✅</span>
              <span>Verified</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🎉</span>
              <span>10k+ Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
