import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";

/**
 * ALL customizable content lives here.
 * Change names, date, texts, photos, captions and music in this single file.
 */
export const story = {
  date: { day: "25", month: "08" },
  intro: {
    line: "من هون بدأت الحكاية...",
    cta: "ابدأ الحكاية",
  },
  chapters: [
    "٢٥ آب...",
    "اليوم اللي تعرفنا فيه.",
    "وقتها ما كنت بعرف...",
    "...إنو هاليوم رح يصير ذكرى ما بننساها.",
  ],
  memoriesTitle: "ذكريات عم تعوم بالفضا",
  memories: [
    { src: memory1, caption: "أول مرة وقفنا قبال بعض", w: 768, h: 1024 },
    { src: memory2, caption: "إيد بإيد، وما عاد في خوف", w: 1024, h: 768 },
    { src: memory3, caption: "ليلة المطر والضوّ الأحمر", w: 768, h: 1024 },
    { src: memory4, caption: "أصغر تفصيل صار أحلى شي", w: 1024, h: 1024 },
  ],
  timelineTitle: "خط الحكاية",
  timeline: [
    { label: "٢٥ / ٠٨", text: "بداية كل شي" },
    { label: "أول لقاء", text: "نظرة صارت عادة" },
    { label: "أول حديث", text: "حكينا لَحتى نسينا الوقت" },
    { label: "أول ذكرى", text: "صورة صغيرة، قلب كبير" },
    { label: "لحظة خاصة", text: "اللحظة اللي عرفت فيها" },
    { label: "اليوم", text: "وما زالت الحكاية" },
  ],
  finale: {
    pre: "من يوم تعارفنا...",
    message:
      "من يومها وأنا بشوف الدني أحلى، لأنك صرتي جزء من كل تفصيل فيها. شكراً لأنك إجيتي بالوقت الصح، وضليتي.",
    closing: "وكل سنة وإنتِ أجمل جزء من حكايتي ❤️",
  },
  /** Optional: put a direct .mp3 URL here. If empty, a soft ambient pad is generated. */
  musicUrl: "",
};