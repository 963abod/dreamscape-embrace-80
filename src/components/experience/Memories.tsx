import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { story } from "@/config/story";

const drift: { rotate: number; x: string; delay: number }[] = [
  { rotate: -4, x: "-6%", delay: 0 },
  { rotate: 3, x: "8%", delay: 0.1 },
  { rotate: 5, x: "-4%", delay: 0.2 },
  { rotate: -3, x: "6%", delay: 0.15 },
];

export function Memories() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative z-10 px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2 }}
        className="font-display mb-16 text-center text-2xl text-rose-soft sm:text-3xl"
      >
        {story.memoriesTitle}
      </motion.h2>

      <div className="mx-auto flex max-w-4xl flex-col gap-24 sm:gap-28">
        {story.memories.map((m, i) => {
          const d = drift[i % drift.length] ?? { rotate: 0, x: "0%", delay: 0 };
          return (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.86, filter: "blur(16px)", rotate: d.rotate * 2 }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", rotate: d.rotate }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.4, delay: d.delay, ease: [0.22, 1, 0.36, 1] }}
              className="memory-float mx-auto w-[78%] max-w-sm"
              style={{ marginInlineStart: d.x }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="memory-frame block w-full"
                aria-label={m.caption}
              >
                <img
                  src={m.src}
                  alt={m.caption}
                  loading="lazy"
                  width={m.w}
                  height={m.h}
                  className="h-full w-full object-cover"
                />
              </button>
              <figcaption className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
                {m.caption}
              </figcaption>
            </motion.figure>
          );
        })}
      </div>

      <AnimatePresence>
        {open !== null && story.memories[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[oklch(0.06_0.02_20/0.9)] p-6 backdrop-blur-xl"
          >
            <motion.figure
              initial={{ scale: 0.9, opacity: 0, filter: "blur(12px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[85svh] w-full max-w-md"
            >
              <img
                src={story.memories[open]!.src}
                alt={story.memories[open]!.caption}
                className="memory-frame max-h-[70svh] w-full object-contain"
              />
              <figcaption className="mt-4 text-center text-sm text-rose-soft">
                {story.memories[open]!.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}