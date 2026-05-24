import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [messageRevealed, setMessageRevealed] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="glowing-orb w-[600px] h-[600px] top-[-200px] left-[-200px]" />
        <div className="glowing-orb w-[800px] h-[800px] bottom-[-300px] right-[-300px]" style={{ animationDelay: "2s" }} />
        
        {/* Floating Hearts */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="floating-heart font-sans select-none"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              fontSize: `${1 + Math.random() * 2}rem`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center gap-32">
        
        {/* Section 1: Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center space-y-6 pt-12 w-full"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-primary/90">
            For my Mary Iris <span className="inline-block text-4xl md:text-6xl align-middle text-primary/70 ml-2 font-sans">♥</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-foreground/80 font-serif italic">
            Honey, you don't have to carry everything alone.
          </p>
        </motion.section>

        {/* Section 2: Letter */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl w-full"
        >
          <h2 className="font-serif text-3xl mb-8 text-center text-primary/80">A letter for you</h2>
          <div className="font-serif text-xl md:text-2xl leading-loose space-y-8 text-foreground/90 font-light">
            <p>
              My dearest Mary Iris, I know how heavy things feel right now. Family can be the most beautiful thing in the world, and also the most exhausting. You have been carrying so much — and you have been doing it quietly, with grace, even when it costs you.
            </p>
            <p>
              But honey, you do not have to be strong all the time. You are allowed to fall apart a little. You are allowed to feel tired. You are allowed to say this is too much — because it is, and that is okay.
            </p>
            <p>
              You are not a burden. Not to me. Not ever.
            </p>
            <p>
              No matter what today looks like, I want you to know that I see you. Not just the smiling version, not just the version that holds everything together — but all of you. The tired you. The overwhelmed you. The you that just needs someone to sit with her in the quiet.
            </p>
            <p>
              I am here for that. Always.
            </p>
          </div>
        </motion.section>

        {/* Section 3: Emotional Cards */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "When You Feel Tired",
              content: "Rest. Not as a reward for finishing everything, but because you deserve rest just for being. Let this be your permission slip."
            },
            {
              title: "When Things Feel Heavy",
              content: "You do not have to figure it all out tonight. Some things are allowed to sit unresolved. Just breathe. I have got you."
            },
            {
              title: "What I Want You to Remember",
              content: "You are deeply loved. Not for what you do, not for how strong you are — but simply because you exist, and you are mine to love."
            },
            {
              title: "For My Honey",
              content: "On your hardest days, come back here. Read this. And remember there is someone out there who thinks about you with so much gentleness it almost hurts."
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group rounded-2xl p-8 bg-white/[0.02] backdrop-blur-xl border border-primary/20 shadow-[0_0_15px_rgba(235,110,135,0.05)] hover:shadow-[0_0_25px_rgba(235,110,135,0.15)] hover:-translate-y-1 transition-all duration-500 ease-out"
            >
              <h3 className="font-serif text-2xl text-primary/90 mb-4">{card.title}</h3>
              <p className="font-sans text-lg font-light leading-relaxed text-foreground/80">
                {card.content}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Section 4: Hidden Message */}
        <section className="w-full flex flex-col items-center justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            {!messageRevealed ? (
              <motion.button
                key="reveal-button"
                data-testid="button-reveal-message"
                onClick={() => setMessageRevealed(true)}
                exit={{ opacity: 0, scale: 0.9 }}
                className="px-8 py-4 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all duration-300 font-serif text-xl shadow-[0_0_20px_rgba(235,110,135,0.1)] hover:shadow-[0_0_30px_rgba(235,110,135,0.2)] cursor-pointer"
              >
                A little something just for you
              </motion.button>
            ) : (
              <motion.div
                key="revealed-message"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-xl text-center rounded-3xl p-10 bg-primary/5 backdrop-blur-md border border-primary/30 shadow-[0_0_40px_rgba(235,110,135,0.2)]"
              >
                <p className="font-serif text-2xl md:text-3xl leading-relaxed text-primary/90 italic">
                  "You are the kind of person who makes the world softer just by being in it. I hope you know that. I hope you feel it today, even a little."
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 5: Final Quote */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center max-w-3xl py-12 relative"
        >
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full z-0" />
          <h2 className="relative z-10 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground/90 font-light italic">
            "No matter how exhausting life becomes, Honey, I will still be here — loving you quietly through all of it."
          </h2>
        </motion.section>

        {/* Section 6: Footer */}
        <footer className="pt-20 pb-8 text-center w-full">
          <p className="font-serif italic text-primary/60 text-lg">
            Made with love, for you.
          </p>
        </footer>

      </div>
    </div>
  );
}
