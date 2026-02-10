import { Lock, Sparkles, Users, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface AuthPromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
  action: 'chat' | 'call' | 'connect' | 'post';
}

export function AuthPromptModal({ open, onOpenChange, onLoginClick, action }: AuthPromptModalProps) {
  const actionMessages = {
    chat: {
      title: 'Sign in to Start Chatting 💬',
      description: 'Join RoomieVibes to connect with potential roommates and room owners!',
    },
    call: {
      title: 'Sign in to Make Calls 📞',
      description: 'Create your account to start calling and video chatting with matches!',
    },
    connect: {
      title: 'Sign in to Connect 🤝',
      description: 'Get access to contact information and start building connections!',
    },
    post: {
      title: 'Sign in to Post Your Ad 📝',
      description: 'Create your account to list your profile or room and get matches!',
    },
  };

  const currentAction = actionMessages[action];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl">
              <Lock className="size-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {currentAction.title}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {currentAction.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Benefits */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl border border-purple-200">
            <h4 className="text-purple-900 mb-3">✨ Why Join RoomieVibes?</h4>
            <ul className="space-y-2 text-sm text-purple-800">
              <li className="flex items-start gap-2">
                <Shield className="size-4 mt-0.5 flex-shrink-0 text-purple-600" />
                <span>Verified profiles for your safety</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="size-4 mt-0.5 flex-shrink-0 text-purple-600" />
                <span>Connect with 50K+ active users</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="size-4 mt-0.5 flex-shrink-0 text-purple-600" />
                <span>100% free to browse and connect</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
              onClick={onLoginClick}
            >
              <Sparkles className="mr-2" />
              Sign in / Sign up
            </Button>
            <Button 
              variant="outline"
              className="w-full border-purple-200 hover:bg-purple-50"
              onClick={() => onOpenChange(false)}
            >
              Maybe Later
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="text-center pt-2">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              🔒 Safe & Secure Platform
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
