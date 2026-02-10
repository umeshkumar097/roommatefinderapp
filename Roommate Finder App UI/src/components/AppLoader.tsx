import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function AppLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          className="inline-block mb-6"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl"
          >
            <Sparkles className="size-16 text-white" />
          </motion.div>
        </motion.div>

        {/* App Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
        >
          RoomieVibes
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-slate-600 mb-6"
        >
          Getting the vibes ready... ✨
        </motion.p>

        {/* Loading Bar */}
        <div className="w-64 mx-auto bg-purple-100 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full"
          />
        </div>

        {/* Dots Animation */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
