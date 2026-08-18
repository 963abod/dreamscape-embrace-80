import { motion } from "motion/react";
import { GlowHeart } from "./GlowHeart";
import { story } from "@/config/story";

const reveal = {
  initial: { opacity: 0, y: 20, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Finale() {
  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-8 px-8 py-24 text-center">
      <GlowHeart size={200} />

      <motion.div
        {...reveal}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="font-display text-glow text-4xl tracking-[0.15em] text-foreground sm:text-6xl"
        dir="ltr"
      >
        {story.date.day} / {story.date.month}
      </motion.div>

      <motion.p
        {...reveal}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.6, delay: 0.9 }}
        className="text-lg text-rose-soft"
      >
        {story.finale.pre}
      </motion.p>

      <motion.p
        {...reveal}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2.2, delay: 1.6 }}
        className="max-w-md text-balance text-base leading-[2.1] text-foreground/90 sm:text-xl"
      >
        {story.finale.message}
      </motion.p>

      <motion.p
        {...reveal}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2, delay: 2.6 }}
        className="font-display mt-6 max-w-sm text-balance text-lg leading-loose text-rose-soft sm:text-2xl"
      >
        {story.finale.closing}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, delay: 3.2 }}
        className="pt-6"
      >
        <GlowHeart size={90} />
      </motion.div>
    </section>
  );
}