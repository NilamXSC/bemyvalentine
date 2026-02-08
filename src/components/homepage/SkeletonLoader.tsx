import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const SkeletonLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto p-4 space-y-8"
    >
      {/* Hero skeleton */}
      <div className="space-y-4 text-center">
        <Skeleton className="h-12 w-3/4 mx-auto bg-rose-200/40" />
        <Skeleton className="h-6 w-1/2 mx-auto bg-rose-200/40" />
      </div>

      {/* Bento grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Skeleton className="h-32 rounded-xl bg-rose-200/40" />
        <Skeleton className="h-32 rounded-xl bg-pink-200/40" />
        <Skeleton className="h-32 rounded-xl bg-amber-200/40" />
        <Skeleton className="h-32 rounded-xl bg-violet-200/40" />
      </div>

      {/* Carousel skeleton */}
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-64 flex-shrink-0 rounded-xl bg-rose-200/40" />
        ))}
      </div>

      {/* Features skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-16 w-full rounded-xl bg-rose-200/40" />
        <Skeleton className="h-16 w-full rounded-xl bg-pink-200/40" />
        <Skeleton className="h-16 w-full rounded-xl bg-amber-200/40" />
      </div>
    </motion.div>
  );
};

export default SkeletonLoader;
