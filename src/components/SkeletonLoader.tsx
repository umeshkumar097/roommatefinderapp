import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function RoommateCardSkeleton() {
  return (
    <Card className="overflow-hidden border-purple-100 bg-white/80 backdrop-blur-sm">
      <div className="relative">
        <Skeleton className="h-64 w-full" />
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </Card>
  );
}

export function RoomCardSkeleton() {
  return (
    <Card className="overflow-hidden border-purple-100 bg-white/80 backdrop-blur-sm">
      <div className="relative">
        <Skeleton className="h-64 w-full" />
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-18 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 flex-1 rounded-lg" />
        </div>
      </div>
    </Card>
  );
}

export function LoadingGrid({ type = 'roommate', count = 6 }: { type?: 'roommate' | 'room'; count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        type === 'roommate' ? (
          <RoommateCardSkeleton key={index} />
        ) : (
          <RoomCardSkeleton key={index} />
        )
      ))}
    </div>
  );
}
