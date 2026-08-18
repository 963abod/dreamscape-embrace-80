import { motion } from "motion/react";

export function GlowHeart({ size = 180, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="heart-halo" />
      <motion.div
        className="heart-float"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: size * 0.62, height: size * 0.62 }}
      >
        <div className="heart-beat h-full w-full">
          <div className="heart-shape h-full w-full">
            <span className="heart-gloss" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}