import { useState } from 'react';
import { MessageCircle, Send, Smile, Paperclip, Phone, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName: string;
  recipientType: 'roommate' | 'owner';
}

export function ContactModal({ open, onOpenChange, recipientName, recipientType }: ContactModalProps) {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const quickMessages = [
    "Hi! I'm interested in this listing 👋",
    "Can we schedule a visit? 🏠",
    "Is this still available? 🔍",
    "What's the move-in process? 📋",
  ];

  const handleSendMessage = () => {
    if (message.trim() && name.trim()) {
      // Handle sending message
      console.log('Sending message:', { message, name, phone, email });
      setMessage('');
      // You can add success toast here
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
            <MessageCircle className="size-6 text-purple-600" />
            Contact {recipientName}
          </DialogTitle>
          <DialogDescription>
            Send a message to connect with the {recipientType}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50">
              <Phone className="size-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50">
              <Video className="size-4 mr-2" />
              Video Call
            </Button>
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border border-purple-200">
            <p className="text-sm text-purple-900">
              🔒 <strong>Safety First!</strong> Never share personal financial details or make advance payments without verification.
            </p>
          </div>

          {/* Your Details */}
          <div className="space-y-4">
            <h4 className="text-purple-600">Your Details</h4>
            
            <div className="space-y-2">
              <Label htmlFor="contact-name">Your Name *</Label>
              <Input
                id="contact-name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-purple-200 focus-visible:ring-purple-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input
                  id="contact-phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-purple-200 focus-visible:ring-purple-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email (Optional)</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-purple-200 focus-visible:ring-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Quick Message Templates */}
          <div className="space-y-3">
            <Label>Quick Messages (Click to use)</Label>
            <div className="flex flex-wrap gap-2">
              {quickMessages.map((msg, index) => (
                <Badge
                  key={index}
                  className="cursor-pointer bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-colors px-3 py-2"
                  onClick={() => setMessage(msg)}
                >
                  {msg}
                </Badge>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message">Your Message *</Label>
            <Textarea
              id="message"
              placeholder="Write your message here... Be polite and clear! ✨"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="border-purple-200 focus-visible:ring-purple-600 resize-none"
            />
            <p className="text-sm text-slate-500">{message.length} characters</p>
          </div>

          {/* Message Features */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-slate-500">
              <Smile className="size-4 mr-2" />
              Emoji
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-500">
              <Paperclip className="size-4 mr-2" />
              Attach
            </Button>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
            <h5 className="mb-2 text-blue-900">💡 Pro Tips</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Be specific about your requirements</li>
              <li>✓ Mention your move-in date</li>
              <li>✓ Ask about any concerns upfront</li>
              <li>✓ Always verify before making payments</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={handleSendMessage}
              disabled={!message.trim() || !name.trim()}
            >
              <Send className="size-4 mr-2" />
              Send Message
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-200 hover:bg-purple-50"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
