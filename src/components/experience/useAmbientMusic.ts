import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Plays story.musicUrl when provided, otherwise synthesises a soft ambient pad.
 * Never autoplays: start() must be called from a user gesture.
 */
export function useAmbientMusic(url: string) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);

  const buildPad = useCallback(() => {
    if (ctxRef.current) return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    const freqs = [138.59, 174.61, 207.65, 277.18];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.05 / (i + 1);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.03;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.03;
      lfo.connect(lfoGain).connect(g.gain);
      osc.connect(g).connect(master);
      osc.start();
      lfo.start();
      nodesRef.current.push(osc, lfo);
    });
    ctxRef.current = ctx;
    gainRef.current = master;
  }, []);

  const fade = useCallback((to: number) => {
    const ctx = ctxRef.current;
    const g = gainRef.current;
    if (!ctx || !g) return;
    g.gain.cancelScheduledValues(ctx.currentTime);
    g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
    g.gain.linearRampToValueAtTime(to, ctx.currentTime + 2);
  }, []);

  const start = useCallback(() => {
    if (url) {
      const el = audioRef.current ?? new Audio(url);
      el.loop = true;
      el.volume = 0.4;
      audioRef.current = el;
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      setReady(true);
      return;
    }
    buildPad();
    void ctxRef.current?.resume();
    fade(0.6);
    setReady(true);
    setPlaying(true);
  }, [url, buildPad, fade]);

  const toggle = useCallback(() => {
    if (!ready) {
      start();
      return;
    }
    if (url) {
      const el = audioRef.current;
      if (!el) return;
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        void el.play();
        setPlaying(true);
      }
      return;
    }
    if (playing) {
      fade(0);
      setPlaying(false);
    } else {
      void ctxRef.current?.resume();
      fade(0.6);
      setPlaying(true);
    }
  }, [ready, playing, url, start, fade]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      nodesRef.current.forEach((n) => n.stop());
      void ctxRef.current?.close();
    },
    [],
  );

  return { playing, start, toggle };
}