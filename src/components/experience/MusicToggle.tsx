import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.6 }}
      whileTap={{ scale: 0.92 }}
      aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      className="music-toggle fixed bottom-5 end-5 z-50"
    >
      {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </motion.button>
  );
}