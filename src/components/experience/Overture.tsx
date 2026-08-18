import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { GlowHeart } from "./GlowHeart";
import { story } from "@/config/story";

const chars = [story.date.day[0], story.date.day[1], "/", story.date.month[0], story.date.month[1]];

export function Overture({ onStart }: { onStart: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 2600),
      setTimeout(() => setPhase(3), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 2 }}
      >
        <GlowHeart size={200} />
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-2 sm:gap-3" dir="ltr">
        {chars.map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: "blur(18px)", scale: 1.25 }}
            animate={
              phase >= 1
                ? { opacity: c === "/" ? 0.5 : 1, filter: "blur(0px)", scale: 1 }
                : {}
            }
            transition={{ duration: 1.2, delay: 0.35 * i, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-glow text-5xl tracking-[0.18em] text-foreground sm:text-7xl"
          >
            {c}
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6 }}
            className="mt-6 max-w-xs text-balance text-base leading-loose text-rose-soft sm:text-lg"
          >
            {story.intro.line}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 3 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onStart}
            className="ember-button mt-12"
          >
            <span className="relative z-10">{story.intro.cta}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}