import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { Atmosphere } from "@/components/experience/Atmosphere";
import { Overture } from "@/components/experience/Overture";
import { Chapters } from "@/components/experience/Chapters";
import { Memories } from "@/components/experience/Memories";
import { Timeline } from "@/components/experience/Timeline";
import { Finale } from "@/components/experience/Finale";
import { MusicToggle } from "@/components/experience/MusicToggle";
import { useAmbientMusic } from "@/components/experience/useAmbientMusic";
import { story } from "@/config/story";

const title = "٢٥ / ٠٨ — حكايتنا";
const description = "تجربة تفاعلية سينمائية قصيرة عن يوم بدأت فيه الحكاية.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);
  const { playing, start, toggle } = useAmbientMusic(story.musicUrl);

  const onStart = useCallback(() => {
    start();
    setEntered(true);
  }, [start]);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    if (entered) {
      window.scrollTo({ top: 0 });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  return (
    <main className="relative min-h-[100svh] w-full overflow-x-hidden">
      <Atmosphere />

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="overture"
            exit={{ opacity: 0, scale: 1.35, filter: "blur(26px)" }}
            transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <Overture onStart={onStart} />
          </motion.div>
        ) : (
          <motion.div
            key="story"
            initial={{ opacity: 0, scale: 1.08, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Chapters />
            <Memories />
            <Timeline />
            <Finale />
          </motion.div>
        )}
      </AnimatePresence>

      {entered && <MusicToggle playing={playing} onToggle={toggle} />}
    </main>
  );
}
