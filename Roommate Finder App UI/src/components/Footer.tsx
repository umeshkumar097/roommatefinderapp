import { Sparkles, Heart, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';

interface FooterProps {
  onAdminClick?: () => void;
}

export function Footer({ onAdminClick }: FooterProps = {}) {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <Sparkles className="size-6" />
              </div>
              <h3 className="text-white">RoomieVibes</h3>
            </div>
            <p className="text-purple-200 mb-4">
              Find your perfect roomie or room. Making living together lit since 2024! 🏠✨
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/10 hover:bg-white/20 text-white rounded-full"
              >
                <Instagram className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/10 hover:bg-white/20 text-white rounded-full"
              >
                <Twitter className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/10 hover:bg-white/20 text-white rounded-full"
              >
                <Mail className="size-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Find Roommates
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Find Rooms
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Post Your Ad
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Report Issue
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-white">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-purple-200">
                <Mail className="size-4" />
                <span>hello@roomievibes.com</span>
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <Phone className="size-4" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
              <p className="text-sm text-purple-100">
                Download our app soon! 📱
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-purple-200 text-sm">
              © 2024 RoomieVibes. All rights reserved. Made with{' '}
              <Heart className="inline-block size-4 fill-pink-400 text-pink-400" /> for Gen Z
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                Cookie Policy
              </a>
              {onAdminClick && (
                <button 
                  onClick={onAdminClick}
                  className="text-purple-200 hover:text-white transition-colors cursor-pointer"
                >
                  Admin Panel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}