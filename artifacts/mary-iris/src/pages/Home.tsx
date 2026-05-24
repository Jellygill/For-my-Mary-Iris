import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const hearts = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 6.1) % 90}%`,
  delay: `${(i * 1.9) % 18}s`,
  duration: `${16 + (i * 2.3) % 12}s`,
  size: `${0.9 + (i * 0.17) % 1.8}rem`,
  opacity: 0.25 + (i * 0.04) % 0.45,
}));

const sparkles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${3 + (i * 5.4) % 94}%`,
  top: `${5 + (i * 7.3) % 88}%`,
  delay: `${(i * 0.9) % 7}s`,
  duration: `${2.5 + (i * 0.4) % 3}s`,
  size: `${6 + (i * 3) % 10}px`,
  color: i % 3 === 0 ? "hsl(330 90% 75%)" : i % 3 === 1 ? "hsl(345 85% 78%)" : "hsl(315 80% 80%)",
}));

const cardData = [
  {
    title: "When You Feel Tired",
    content: "Magpahinga ka hon. Not as a reward for finishing everything, but because you deserve rest just for being. Let this be your permission slip.",
    accent: "hsl(330 90% 72%)",
  },
  {
    title: "When Things Feel Heavy",
    content: "You do not have to figure it all out tonight. Some things are allowed to sit unresolved. Just breathe. I always got your back my Honey. I'll stay with you when things get heavy okay?",
    accent: "hsl(345 85% 75%)",
  },
  {
    title: "What I Want You to Remember",
    content: "You are deeply loved. Not for what you do, not for how strong you are but simply because you exist. Mamahalin kita kahit ano man ang mangyari. Nandito ako sa tabi mo always!",
    accent: "hsl(320 80% 74%)",
  },
  {
    title: "For My Honey",
    content: "On your hardest days, come back here for a little while. Read these words slowly, and remember that somewhere in this world is someone who thinks of you with so much care, softness, and love.\n\nKahit mabigat ang nararamdaman mo, kahit pagod na ang puso mo, you'll never be alone because I'm always here.",
    accent: "hsl(338 75% 76%)",
  },
];

export default function Home() {
  const [messageRevealed, setMessageRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-background text-foreground selection:bg-primary/30">

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-50"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, hsl(330 90% 72%), hsl(345 85% 75%), hsl(330 90% 72%))",
          boxShadow: "0 0 8px hsl(328 85% 72% / 0.8)",
        }}
      />

      {/* Background: fixed glowing orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="glowing-orb w-[700px] h-[700px] top-[-250px] left-[-200px]"
          style={{
            background: "radial-gradient(circle, hsla(330, 90%, 65%, 0.22) 0%, hsla(345, 80%, 55%, 0.1) 50%, transparent 70%)",
            animationDuration: "10s",
          }}
        />
        <div
          className="glowing-orb w-[900px] h-[900px] bottom-[-350px] right-[-300px]"
          style={{
            background: "radial-gradient(circle, hsla(320, 80%, 60%, 0.2) 0%, hsla(338, 75%, 50%, 0.09) 50%, transparent 70%)",
            animationDuration: "14s",
            animationDelay: "3s",
          }}
        />
        <div
          className="glowing-orb w-[500px] h-[500px] top-[40%] left-[30%]"
          style={{
            background: "radial-gradient(circle, hsla(340, 85%, 70%, 0.1) 0%, transparent 70%)",
            animationDuration: "18s",
            animationDelay: "7s",
          }}
        />
      </div>

      {/* Background: sparkles */}
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

      {/* Background: floating hearts */}
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
                color: h.id % 2 === 0
                  ? `hsla(328, 85%, 72%, ${h.opacity})`
                  : `hsla(345, 85%, 75%, ${h.opacity})`,
              }}
            >
              ♥
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center gap-36">

        {/* Section 1: Hero */}
        <section className="text-center space-y-8 pt-12 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="shimmer-title font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight"
            style={{
              background: "linear-gradient(135deg, hsl(330 90% 78%), hsl(345 85% 82%), hsl(320 80% 78%), hsl(338 90% 83%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            For my Mary Iris{" "}
            <motion.span
              className="inline-block align-middle font-sans"
              style={{ fontSize: "0.75em", WebkitTextFillColor: "hsl(328 85% 72%)" }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ♥
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl font-light font-serif italic"
            style={{ color: "hsl(340 40% 87%)" }}
          >
            Honey, you don't have to carry everything alone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            className="mx-auto w-24 h-px"
            style={{ background: "linear-gradient(90deg, transparent, hsl(330 90% 72%), hsl(345 85% 75%), transparent)" }}
          />
        </section>

        {/* Section 2: Letter */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl w-full relative"
        >
          <div
            className="absolute -inset-8 rounded-3xl opacity-30 blur-2xl"
            style={{ background: "radial-gradient(ellipse, hsl(330 70% 30%) 0%, transparent 70%)" }}
          />
          <div className="relative rounded-3xl p-10 md:p-14 border"
            style={{
              background: "linear-gradient(135deg, hsla(335, 40%, 11%, 0.88), hsla(325, 35%, 10%, 0.78))",
              backdropFilter: "blur(20px)",
              borderColor: "hsla(330, 70%, 65%, 0.2)",
              boxShadow: "0 0 40px hsla(330, 75%, 55%, 0.14), inset 0 1px 0 hsla(330, 90%, 72%, 0.06)",
            }}
          >
            <h2
              className="font-serif text-3xl mb-10 text-center"
              style={{ color: "hsl(328 85% 75%)" }}
            >
              A letter for you
            </h2>
            <div className="font-serif text-xl md:text-2xl leading-loose space-y-7 font-light" style={{ color: "hsl(320 25% 90%)" }}>
              <p>My dearest Mary Iris, I know how heavy things feel right now. You have been carrying so much and you have been doing it quietly, with grace, even when it costs you.</p>
              <p>But honey, you do not have to be strong all the time. You are allowed to fall apart a little. You are allowed to feel tired. You are allowed to admit that things feel overwhelming sometimes. You are allowed to say this is too much because you are just human after all, and that is okay.</p>
              <p>Please remember this always, hon:</p>
              <p className="font-medium" style={{ color: "hsl(330 90% 78%)" }}>You are never a burden. Not to me. Not ever.</p>
              <p>No matter what kind of day you're having, I want you to know that I see you. Not just the smiling version of you, not just the version that tries to say it's alright when it's not, but all of you. The tired you. The overwhelmed you. The quiet you that just needs someone to stay.</p>
              <p>Take all the time you need to breathe, to rest, and to heal. I'll still be here, even on the days where all you can do is simply get through the day.</p>
              <p className="italic font-medium" style={{ color: "hsl(340 60% 88%)" }}>I love you so much, my Honey, my Mary Iris.</p>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Cards */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardData.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="card-glow group rounded-3xl p-8 border cursor-default transition-colors duration-500"
              style={{
                background: "linear-gradient(135deg, hsla(335, 40%, 12%, 0.9), hsla(325, 30%, 10%, 0.85))",
                backdropFilter: "blur(16px)",
                borderColor: `${card.accent}33`,
              }}
            >
              <motion.div
                className="w-8 h-px mb-6"
                style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.18 + 0.4 }}
              />
              <h3
                className="font-serif text-2xl mb-4 group-hover:brightness-125 transition-all duration-300"
                style={{ color: card.accent }}
              >
                {card.title}
              </h3>
              <div className="font-sans text-lg font-light leading-relaxed space-y-3" style={{ color: "hsl(340 20% 84%)" }}>
                {card.content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Section 4: Hidden Message */}
        <section className="w-full flex flex-row items-center justify-center gap-8 flex-wrap" data-testid="section-hidden-message">
          <AnimatePresence>
            {!messageRevealed && (
              <motion.button
                key="reveal-button"
                data-testid="button-reveal-message"
                onClick={() => setMessageRevealed(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="relative shrink-0 px-10 py-5 rounded-full font-serif text-xl cursor-pointer overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsla(330, 85%, 60%, 0.15), hsla(345, 80%, 60%, 0.12))",
                  border: "1px solid hsla(330, 90%, 72%, 0.35)",
                  color: "hsl(330 90% 80%)",
                  boxShadow: "0 0 30px hsla(330, 90%, 60%, 0.18), 0 0 60px hsla(345, 85%, 60%, 0.1)",
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0"
                  whileHover={{ opacity: 1 }}
                  style={{ background: "linear-gradient(135deg, hsla(330, 90%, 72%, 0.1), hsla(345, 85%, 75%, 0.1))" }}
                />
                <span className="relative z-10">Click me</span>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {messageRevealed && (
              <motion.div
                key="revealed-message"
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, scale: 0.95 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-lg text-left rounded-3xl p-8 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsla(335, 50%, 12%, 0.92), hsla(325, 45%, 11%, 0.88))",
                  backdropFilter: "blur(20px)",
                  border: "1px solid hsla(330, 90%, 72%, 0.25)",
                  boxShadow: "0 0 50px hsla(330, 90%, 60%, 0.22), 0 0 100px hsla(345, 85%, 60%, 0.12)",
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ background: "conic-gradient(from 0deg, transparent, hsla(330, 90%, 72%, 0.18), transparent, hsla(345, 85%, 75%, 0.12), transparent)" }}
                />
                <div className="relative z-10 font-serif text-xl leading-relaxed space-y-4 text-justify" style={{ color: "hsl(328 60% 88%)" }}>
                  <p>I don't think you realize how much comfort you bring to people just by being yourself, honey. Parang ang gaan lang ng pakiramdam whenever you're around. You have this softness in you that makes things feel a little less heavy.</p>
                  <p>I just hope na today, kahit papaano, maramdaman mo rin how loved and appreciated you really are.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 5: Final Quote */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl py-16 relative w-full"
        >
          <div
            className="quote-glow absolute inset-0 rounded-[3rem]"
            style={{ background: "linear-gradient(135deg, hsla(335, 55%, 14%, 0.65), hsla(325, 45%, 12%, 0.55))", backdropFilter: "blur(10px)", border: "1px solid hsla(330, 75%, 65%, 0.18)" }}
          />
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-5xl"
            animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "hsl(328 85% 72%)", filter: "drop-shadow(0 0 12px hsl(328 85% 72% / 0.6))" }}
          >
            ♥
          </motion.div>
          <h2
            className="relative z-10 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight font-light italic pt-8 px-8"
            style={{ color: "hsl(340 35% 94%)" }}
          >
            Like a lily reaching quietly toward the light, my soul finds its peace in you. It&apos;s soft, gentle, and beautiful in ways words could never fully hold.
          </h2>
          <motion.div
            className="relative z-10 mt-8 mx-auto w-32 h-px"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{ background: "linear-gradient(90deg, transparent, hsl(330 90% 72%), hsl(345 85% 76%), transparent)" }}
          />
        </motion.section>


      </div>
    </div>
  );
}
