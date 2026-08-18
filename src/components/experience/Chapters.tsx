import { motion } from "motion/react";
import { story } from "@/config/story";

export function Chapters() {
  return (
    <section className="relative z-10">
      {story.chapters.map((line, i) => (
        <div
          key={i}
          className="flex min-h-[85svh] items-center justify-center px-8 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(14px)", letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.02em" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display max-w-2xl text-balance text-3xl leading-[1.8] text-foreground sm:text-5xl"
          >
            {line}
          </motion.p>
        </div>
      ))}
    </section>
  );
}