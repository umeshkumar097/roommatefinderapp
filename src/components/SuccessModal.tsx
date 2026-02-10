import { CheckCircle2, Sparkles, Home, Users } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'roommate' | 'room';
}

export function SuccessModal({ open, onOpenChange, type }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 text-center">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="size-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Success! 🎉
          </h2>
          <p className="text-slate-600 mb-6">
            Your {type === 'roommate' ? 'profile' : 'room listing'} has been posted successfully!
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 text-left">
            <Sparkles className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Your listing is now live!</p>
              <p className="text-xs text-slate-600">People can now view and contact you</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200 text-left">
            {type === 'roommate' ? (
              <Users className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Home className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold text-sm">Get ready for responses!</p>
              <p className="text-xs text-slate-600">We'll notify you when someone reaches out</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onOpenChange(false)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-11"
        >
          Awesome! Let's Go
        </Button>

        <p className="text-xs text-slate-500 mt-4">
          You can manage your listing from your dashboard
        </p>
      </DialogContent>
    </Dialog>
  );
}
