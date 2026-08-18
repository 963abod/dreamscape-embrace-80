import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { story } from "@/config/story";

export function Timeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section className="relative z-10 px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2 }}
        className="font-display mb-16 text-center text-2xl text-rose-soft sm:text-3xl"
      >
        {story.timelineTitle}
      </motion.h2>

      <div ref={ref} className="relative mx-auto max-w-md pe-2 ps-10">
        <div className="absolute bottom-0 top-0 start-3 w-px bg-[oklch(0.4_0.08_20/0.35)]" />
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="timeline-progress absolute bottom-0 top-0 start-3 w-px"
        />

        <div className="flex flex-col gap-16">
          {story.timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span className="timeline-dot absolute -start-[1.79rem] top-2" />
              <p className="font-display text-xl text-foreground sm:text-2xl">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}