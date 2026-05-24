import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ─── static data ─────────────────────────────────────────────────── */

const hearts = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${3 + (i * 4.1) % 94}%`,
  delay: `${(i * 1.4) % 20}s`,
  duration: `${14 + (i * 2.1) % 14}s`,
  size: `${0.8 + (i * 0.18) % 2.2}rem`,
  opacity: 0.18 + (i * 0.04) % 0.52,
  drift: (i % 2 === 0 ? 1 : -1) * (15 + (i * 7) % 35),
}));

const sparkles = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: `${2 + (i * 3.9) % 96}%`,
  top: `${3 + (i * 5.8) % 94}%`,
  delay: `${(i * 0.7) % 8}s`,
  duration: `${2 + (i * 0.45) % 3.5}s`,
  size: `${4 + (i * 4) % 12}px`,
  color:
    i % 4 === 0
      ? "hsl(330 90% 78%)"
      : i % 4 === 1
      ? "hsl(348 85% 80%)"
      : i % 4 === 2
      ? "hsl(310 80% 82%)"
      : "hsl(355 90% 84%)",
}));

// burst petals shown only during the intro flash
const burstPetals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  angle: (i / 18) * 360,
  distance: 80 + (i * 17) % 120,
  size: 6 + (i * 3) % 10,
  delay: i * 0.04,
}));

const cardData = [
  {
    title: "When You Feel Tired",
    content:
      "Magpahinga ka hon. Not as a reward for finishing everything, but because you deserve rest just for being. Let this be your permission slip.",
    accent: "hsl(330 90% 72%)",
  },
  {
    title: "When Things Feel Heavy",
    content:
      "You do not have to figure it all out tonight. Some things are allowed to sit unresolved. Just breathe. I always got your back my Honey. I'll stay with you when things get heavy okay?",
    accent: "hsl(345 85% 75%)",
  },
  {
    title: "What I Want You to Remember",
    content:
      "You are deeply loved. Not for what you do, not for how strong you are but simply because you exist. Mamahalin kita kahit ano man ang mangyari. Nandito ako sa tabi mo always!",
    accent: "hsl(320 80% 74%)",
  },
  {
    title: "For My Honey",
    content:
      "On your hardest days, come back here for a little while. Read these words slowly, and remember that somewhere in this world is someone who thinks of you with so much care, softness, and love.\n\nKahit mabigat ang nararamdaman mo, kahit pagod na ang puso mo, you'll never be alone because I'm always here.",
    accent: "hsl(338 75% 76%)",
  },
];

/* ─── helpers ─────────────────────────────────────────────────────── */

/** stagger children with a spring */
const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 48, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── cinematic intro overlay ─────────────────────────────────────── */

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "burst" | "out">("in");

  useEffect(() => {
    // after fade-in settle → burst
    const t1 = setTimeout(() => setPhase("burst"), 900);
    // after burst → fade out overlay
    const t2 = setTimeout(() => setPhase("out"), 1800);
    // signal done
    const t3 = setTimeout(() => onDone(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "out" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse at center, hsla(335,55%,9%,0.98) 0%, hsla(325,40%,6%,0.99) 100%)",
          }}
        >
          {/* heart icon centre */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "in"
                ? { scale: 1, opacity: 1 }
                : phase === "burst"
                ? { scale: [1, 1.6, 0.1], opacity: [1, 1, 0] }
                : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-8xl select-none"
              style={{
                color: "hsl(330 90% 72%)",
                filter: "drop-shadow(0 0 30px hsla(330,90%,72%,0.9)) drop-shadow(0 0 60px hsla(330,90%,72%,0.5))",
              }}
            >
              ♥
            </span>

            {/* burst petals */}
            {phase === "burst" &&
              burstPetals.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                    y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
                  style={{
                    width: p.size,
                    height: p.size,
                    background:
                      p.id % 3 === 0
                        ? "hsl(330 90% 75%)"
                        : p.id % 3 === 1
                        ? "hsl(348 85% 78%)"
                        : "hsl(310 80% 80%)",
                    boxShadow: `0 0 ${p.size}px currentColor`,
                  }}
                />
              ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── main component ──────────────────────────────────────────────── */

export default function Home() {
  const [messageRevealed, setMessageRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setMounted(true);

    // Create and configure loop background music
    const baseUrl = import.meta.env.BASE_URL || "/";
    const audioPath = baseUrl.endsWith("/") ? `${baseUrl}magnolia.mp3` : `${baseUrl}/magnolia.mp3`;
    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const startAudio = () => {
      audio.play().then(() => {
        removeInteractionListeners();
      }).catch(() => {
        // Blocked initially by browser autoplay, waits for scroll/click/touch
      });
    };

    const handleInteraction = () => {
      startAudio();
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    // Add listeners to play audio on any user gesture
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("scroll", handleInteraction);

    // Attempt immediate play
    startAudio();

    return () => {
      removeInteractionListeners();
      audio.pause();
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-background text-foreground selection:bg-primary/30">

      {/* ── cinematic intro ── */}
      <IntroOverlay onDone={() => setIntroDone(true)} />

      {/* ── scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-50"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, hsl(330 90% 72%), hsl(345 85% 75%), hsl(330 90% 72%))",
          boxShadow: "0 0 10px hsl(328 85% 72% / 0.9)",
        }}
      />

      {/* ── background glowing orbs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="glowing-orb w-[750px] h-[750px] top-[-280px] left-[-220px]"
          style={{
            background:
              "radial-gradient(circle, hsla(330,90%,65%,0.24) 0%, hsla(345,80%,55%,0.11) 50%, transparent 70%)",
            animationDuration: "10s",
          }}
        />
        <div
          className="glowing-orb w-[950px] h-[950px] bottom-[-380px] right-[-320px]"
          style={{
            background:
              "radial-gradient(circle, hsla(320,80%,60%,0.21) 0%, hsla(338,75%,50%,0.1) 50%, transparent 70%)",
            animationDuration: "14s",
            animationDelay: "3s",
          }}
        />
        <div
          className="glowing-orb w-[550px] h-[550px] top-[40%] left-[28%]"
          style={{
            background: "radial-gradient(circle, hsla(340,85%,70%,0.11) 0%, transparent 70%)",
            animationDuration: "18s",
            animationDelay: "7s",
          }}
        />
        {/* extra mid-page orb */}
        <div
          className="glowing-orb w-[400px] h-[400px] top-[65%] left-[10%]"
          style={{
            background: "radial-gradient(circle, hsla(315,75%,65%,0.13) 0%, transparent 70%)",
            animationDuration: "12s",
            animationDelay: "5s",
          }}
        />
      </div>

      {/* ── sparkles ── */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
                animationDuration: s.duration,
                background: s.color,
                borderRadius: "50%",
                boxShadow: `0 0 ${s.size} ${s.color}`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── floating hearts ── */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {hearts.map((h) => (
            <div
              key={h.id}
              className="floating-heart"
              style={{
                left: h.left,
                animationDelay: h.delay,
                animationDuration: h.duration,
                fontSize: h.size,
                color:
                  h.id % 2 === 0
                    ? `hsla(328,85%,72%,${h.opacity})`
                    : `hsla(345,85%,75%,${h.opacity})`,
                // CSS custom property used by @keyframes drift variant
                "--drift" : `${h.drift}px`,
              } as React.CSSProperties}
            >
              ♥
            </div>
          ))}
        </div>
      )}

      {/* ══════════ page content ══════════ */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center gap-36">

        {/* ── Section 1: Hero ── */}
        <motion.section
          className="text-center space-y-8 pt-12 w-full"
          variants={staggerContainer}
          initial="hidden"
          animate={introDone ? "show" : "hidden"}
        >
          {/* glow ring behind title */}
          <motion.div
            className="absolute -translate-x-1/2 left-1/2 w-[420px] h-[120px] rounded-full opacity-0 blur-3xl pointer-events-none"
            animate={introDone ? { opacity: [0, 0.35, 0.2] } : {}}
            transition={{ duration: 2.5, times: [0, 0.4, 1], delay: 0.2 }}
            style={{ background: "hsla(330,90%,65%,1)" }}
          />

          <motion.h1
            variants={fadeUp}
            className="shimmer-title font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight relative"
            style={{
              background:
                "linear-gradient(135deg, hsl(330 90% 78%), hsl(345 85% 82%), hsl(320 80% 78%), hsl(338 90% 83%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            For my Mary Iris{" "}
            <motion.span
              className="inline-block align-middle font-sans"
              style={{ fontSize: "0.75em", WebkitTextFillColor: "hsl(328 85% 72%)" }}
              animate={{ scale: [1, 1.22, 1], rotate: [0, 6, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ♥
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl font-light font-serif italic"
            style={{ color: "hsl(340 40% 87%)" }}
          >
            Honey, you don't have to carry everything alone.
          </motion.p>

          {/* animated divider */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              show: {
                opacity: 1,
                scaleX: 1,
                transition: { duration: 1.2, ease: "easeOut", delay: 0.1 },
              },
            }}
            className="mx-auto w-32 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(330 90% 72%), hsl(345 85% 75%), transparent)",
            }}
          />

          {/* scroll indicator */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-2 pt-4"
            style={{ color: "hsl(330 60% 72%)" }}
          >
            <span className="font-serif text-sm italic tracking-widest opacity-70">scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ── Section 2: Letter ── */}
        <motion.section
          initial={{ opacity: 0, y: 70, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl w-full relative"
        >
          <div
            className="absolute -inset-8 rounded-3xl opacity-30 blur-2xl"
            style={{
              background: "radial-gradient(ellipse, hsl(330 70% 30%) 0%, transparent 70%)",
            }}
          />
          <motion.div
            className="relative rounded-3xl p-10 md:p-14 border"
            style={{
              background:
                "linear-gradient(135deg, hsla(335,40%,11%,0.88), hsla(325,35%,10%,0.78))",
              backdropFilter: "blur(22px)",
              borderColor: "hsla(330,70%,65%,0.22)",
              boxShadow:
                "0 0 40px hsla(330,75%,55%,0.15), inset 0 1px 0 hsla(330,90%,72%,0.07)",
            }}
            whileHover={{
              boxShadow: "0 0 60px hsla(330,80%,60%,0.26), inset 0 1px 0 hsla(330,90%,72%,0.1)",
            }}
            transition={{ duration: 0.5 }}
          >
            {/* rotating shimmer ring inside card */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-10 pointer-events-none overflow-hidden"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, hsla(330,90%,72%,0.4), transparent, hsla(348,85%,75%,0.3), transparent)",
              }}
            />

            <h2
              className="font-serif text-3xl mb-10 text-center relative z-10"
              style={{ color: "hsl(328 85% 75%)" }}
            >
              A letter for you
            </h2>

            <motion.div
              className="font-serif text-xl md:text-2xl leading-loose space-y-7 font-light relative z-10"
              style={{ color: "hsl(320 25% 90%)" }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {[
                "My dearest Mary Iris, I know how heavy things feel right now. You have been carrying so much and you have been doing it quietly, with grace, even when it costs you.",
                "But honey, you do not have to be strong all the time. You are allowed to fall apart a little. You are allowed to feel tired. You are allowed to admit that things feel overwhelming sometimes. You are allowed to say this is too much because you are just human after all, and that is okay.",
                "Please remember this always, hon:",
                null, // accent paragraph
                "No matter what kind of day you're having, I want you to know that I see you. Not just the smiling version of you, not just the version that tries to say it's alright when it's not, but all of you. The tired you. The overwhelmed you. The quiet you that just needs someone to stay.",
                "Take all the time you need to breathe, to rest, and to heal. I'll still be here, even on the days where all you can do is simply get through the day.",
                null, // italic paragraph
              ].map((para, i) => {
                if (i === 3)
                  return (
                    <motion.p key={i} variants={fadeUp} className="font-medium" style={{ color: "hsl(330 90% 78%)" }}>
                      You are never a burden. Not to me. Not ever.
                    </motion.p>
                  );
                if (i === 6)
                  return (
                    <motion.p key={i} variants={fadeUp} className="italic font-medium" style={{ color: "hsl(340 60% 88%)" }}>
                      I love you so much, my Honey, my Mary Iris.
                    </motion.p>
                  );
                return (
                  <motion.p key={i} variants={fadeUp}>
                    {para}
                  </motion.p>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ── Section 3: Cards ── */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardData.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: 4 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: idx * 0.16, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.025, rotateX: -1 }}
              className="card-glow group rounded-3xl p-8 border cursor-default transition-colors duration-500 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, hsla(335,40%,12%,0.9), hsla(325,30%,10%,0.85))",
                backdropFilter: "blur(16px)",
                borderColor: `${card.accent}33`,
                perspective: "800px",
              }}
            >
              {/* card inner glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${card.accent}18, transparent 70%)`,
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              <motion.div
                className="w-10 h-px mb-6 relative z-10"
                style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: idx * 0.16 + 0.45 }}
              />
              <h3
                className="font-serif text-2xl mb-4 group-hover:brightness-125 transition-all duration-300 relative z-10"
                style={{ color: card.accent }}
              >
                {card.title}
              </h3>
              <div
                className="font-sans text-lg font-light leading-relaxed space-y-3 relative z-10"
                style={{ color: "hsl(340 20% 84%)" }}
              >
                {card.content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </section>

        {/* ── Section 4: Hidden Message ── */}
        <section
          className="w-full flex flex-row items-center justify-center gap-8 flex-wrap"
          data-testid="section-hidden-message"
        >
          <AnimatePresence mode="wait">
            {!messageRevealed ? (
              <motion.button
                key="reveal-button"
                data-testid="button-reveal-message"
                onClick={() => setMessageRevealed(true)}
                initial={{ opacity: 0, y: 24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.82, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                className="relative shrink-0 px-10 py-5 rounded-full font-serif text-xl cursor-pointer overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, hsla(330,85%,60%,0.16), hsla(345,80%,60%,0.13))",
                  border: "1px solid hsla(330,90%,72%,0.38)",
                  color: "hsl(330 90% 80%)",
                  boxShadow:
                    "0 0 32px hsla(330,90%,60%,0.2), 0 0 64px hsla(345,85%,60%,0.12)",
                }}
              >
                {/* shimmer sweep */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsla(330,90%,80%,0.15), transparent)",
                  }}
                />
                {/* hover overlay */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0"
                  whileHover={{ opacity: 1 }}
                  style={{
                    background:
                      "linear-gradient(135deg, hsla(330,90%,72%,0.12), hsla(345,85%,75%,0.12))",
                  }}
                />
                <span className="relative z-10">Click Me ;)</span>
              </motion.button>
            ) : (
              <motion.div
                key="revealed-message"
                initial={{ opacity: 0, y: 30, scale: 0.93, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-lg text-left rounded-3xl p-8 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, hsla(335,50%,12%,0.93), hsla(325,45%,11%,0.89))",
                  backdropFilter: "blur(22px)",
                  border: "1px solid hsla(330,90%,72%,0.27)",
                  boxShadow:
                    "0 0 50px hsla(330,90%,60%,0.24), 0 0 100px hsla(345,85%,60%,0.13)",
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, hsla(330,90%,72%,0.2), transparent, hsla(345,85%,75%,0.14), transparent)",
                  }}
                />
                <p
                  className="relative z-10 font-serif text-2xl md:text-3xl leading-relaxed italic text-center"
                  style={{ color: "hsl(328 60% 88%)" }}
                >
                  "Like a lily reaching quietly toward the light, my soul finds its peace in you. It's soft, gentle, and beautiful in ways words could never fully hold."
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
}
