
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ImagePlus,
  Sparkles,
  Upload,
} from "lucide-react";

const styles = [
  {
    name: "Cinematic",
    category: "01 / FILM",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    color: "#f2a65a",
    description: "Your life, directed like a movie.",
  },
  {
    name: "Anime",
    category: "02 / ANIMATION",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=85",
    color: "#b4a0ff",
    description: "Step inside your own anime world.",
  },
  {
    name: "3D Avatar",
    category: "03 / 3D ART",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=900&q=85",
    color: "#ffadbd",
    description: "Become your favourite 3D character.",
  },
  {
    name: "Retro Film",
    category: "04 / ANALOG",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    color: "#d5ba82",
    description: "A little nostalgia in every frame.",
  },
  {
    name: "Watercolor",
    category: "05 / ART",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    color: "#a6d8cf",
    description: "Turn a portrait into a painting.",
  },
  {
    name: "Cyberpunk",
    category: "06 / FUTURE",
    image:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=900&q=85",
    color: "#80e8ff",
    description: "Enter a neon-lit future.",
  },
  {
    name: "Editorial",
    category: "07 / FASHION",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
    color: "#e6d6c1",
    description: "Your own high-fashion cover.",
  },
];

function StyleCard({ style, offset, onClick, compact }) {
  const distance = Math.abs(offset);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Preview ${style.name} style`}
      initial={false}
      animate={{
        x: offset * (compact ? 112 : 218),
        y: distance * (compact ? 13 : 20),
        rotate: offset * (compact ? -5 : -7),
        scale: Math.max(0.66, 1 - distance * 0.075),
        opacity: Math.max(0.22, 1 - distance * 0.2),
      }}
      transition={{
        type: "spring",
        stiffness: 115,
        damping: 19,
        mass: 0.8,
      }}
      whileHover={{
        y: distance * (compact ? 13 : 20) - 10,
        scale: Math.max(0.7, 1 - distance * 0.075) + 0.035,
      }}
      className="absolute left-1/2 top-1/2 w-[132px] sm:w-[176px] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ffad]"
      style={{
        zIndex: 20 - distance,
        marginLeft: compact ? -56 : -74,
        marginTop: compact ? -84 : -108,
        pointerEvents: distance > 2 ? "none" : "auto",
      }}
    >
      <div className="overflow-hidden rounded-[20px] border border-[#f5f0d7]/70 bg-[#f5f0d7] p-[6px] shadow-[0_12px_35px_rgba(0,0,0,0.2)] sm:rounded-[25px] sm:p-[7px]">
        <div className="relative aspect-[0.82] overflow-hidden rounded-[15px] bg-[#d8d2bc] sm:rounded-[19px]">
          <img
            src={style.image}
            alt={style.name}
            draggable="false"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3">
            <span className="block text-[8px] font-medium uppercase tracking-[0.16em] text-white/65 sm:text-[9px]">
              {style.category}
            </span>
            <span className="mt-1 block text-[12px] font-semibold tracking-tight text-white sm:text-[15px]">
              {style.name}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function Herosection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isCompact, setIsCompact] = useState(false);

  const currentStyle = styles[active];

  useEffect(() => {
    const updateSize = () => setIsCompact(window.innerWidth < 640);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % styles.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [paused]);

  function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const nextPhoto = URL.createObjectURL(file);
    setUploadedPhoto((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return nextPhoto;
    });
  }

  useEffect(() => {
    return () => {
      if (uploadedPhoto) URL.revokeObjectURL(uploadedPhoto);
    };
  }, [uploadedPhoto]);

  function selectStyle(index) {
    setActive((index + styles.length) % styles.length);
  }

  return (
    <main className="min-h-screen bg-[#f4efd9] p-2 sm:p-4 md:p-5">
      <section
        className="relative min-h-[760px] overflow-hidden rounded-[22px] bg-[#111b0e] text-[#f6f0d9] sm:min-h-[850px] sm:rounded-[30px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(125,145,74,0.27),transparent_48%),radial-gradient(ellipse_at_5%_90%,rgba(106,130,59,0.13),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(#fff_0.65px,transparent_0.65px)] [background-size:5px_5px]" />

        {/* Header */}
        <header className="relative z-30 flex items-center justify-between px-5 py-6 sm:px-9 sm:py-8 lg:px-12">
          <a href="#" className="flex items-center gap-1 text-sm font-semibold tracking-[0.2em]">
            
            Mavic<span className="text-[#d5ff9d]">.Studio</span>
          </a>

          <a
            href="#styles"
            className="flex items-center gap-2 text-xs text-white/70 transition hover:text-white sm:text-sm"
          >
            Explore styles <ArrowUpRight size={16} />
          </a>

          <a
            href="/auth"
            className="flex items-center gap-2 text-xs text-white/70 transition hover:text-white sm:text-sm"
          >
            Sign in <ArrowUpRight size={16} />
          </a>
        </header>

        {/* Hero heading */}
        <div className="relative z-10 mx-auto mt-8 max-w-3xl px-5 text-center sm:mt-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/65 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d5ff9d] shadow-[0_0_12px_#d5ff9d]" />
            Your photo. A whole new world.
          </div>

          <h1 className="font-serif text-[42px] leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[88px]">
            One photo.
            <br />
            <span className="italic text-[#d5ff9d]">Infinite worlds.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/55 sm:text-base">
            Turn ordinary photos into extraordinary AI-inspired styles.
            Find your look, find your world.
          </p>
        </div>

        {/* Style wheel */}
        <div
          id="styles"
          className="relative mx-auto mt-8 h-[330px] w-full max-w-[1100px] sm:mt-10 sm:h-[410px]"
        >
          {/* Elliptical orbit lines */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[170px] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#e5edb0]/15 sm:h-[255px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[125px] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#e5edb0]/10 sm:h-[195px]" />

          {/* Orbiting cards */}
          {styles.map((style, index) => {
            let offset = index - active;

            if (offset > styles.length / 2) offset -= styles.length;
            if (offset < -styles.length / 2) offset += styles.length;

            if (offset === 0 || Math.abs(offset) > 3) return null;

            return (
              <StyleCard
                key={style.name}
                style={style}
                offset={offset}
                compact={isCompact}
                onClick={() => selectStyle(index)}
              />
            );
          })}

          {/* Central glass preview */}
          <div className="absolute left-1/2 top-1/2 z-30 w-[172px] -translate-x-1/2 -translate-y-1/2 sm:w-[224px]">
            <div className="relative rounded-[25px] border border-white/60 bg-white/10 p-[5px] shadow-[0_0_55px_rgba(213,255,157,0.12)] backdrop-blur-xl sm:rounded-[30px] sm:p-[6px]">
              <div className="relative aspect-[0.78] overflow-hidden rounded-[21px] bg-[#26321d] sm:rounded-[25px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${active}-${uploadedPhoto || "demo"}`}
                    src={uploadedPhoto || currentStyle.image}
                    alt={`${currentStyle.name} preview`}
                    initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                    transition={{ duration: 0.55 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10180e]/90 via-transparent to-black/10" />

                <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                  <motion.div
                    key={currentStyle.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-white/20 bg-black/30 p-2.5 backdrop-blur-xl sm:p-3"
                  >
                    <div className="flex items-center gap-1.5 text-[8px] uppercase tracking-[0.17em] text-white/65 sm:text-[9px]">
                      <Sparkles size={11} className="text-[#d5ff9d]" />
                      Now exploring
                    </div>
                    <p className="mt-1 text-sm font-semibold sm:text-base">
                      {currentStyle.name}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[35px] bg-[#b7d78b]/10 blur-2xl" />
          </div>
        </div>

        {/* Active style and upload CTA */}
        <div className="relative z-30 mx-auto mt-1 max-w-lg px-5 text-center sm:mt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStyle.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#d5ff9d]/65">
                {currentStyle.category}
              </p>
              <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
                {currentStyle.name}
              </h2>
              <p className="mt-2 text-sm text-white/50">
                {currentStyle.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <label className="mx-auto mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#d5ff9d] px-6 py-3.5 text-sm font-semibold text-[#172010] shadow-[0_0_28px_rgba(213,255,157,0.12)] transition hover:-translate-y-0.5 hover:bg-[#e4ffbd] sm:px-7">
            {uploadedPhoto ? <Check size={17} /> : <ImagePlus size={17} />}
            {uploadedPhoto ? "Photo selected" : "Try your own photo"}
            <ArrowUpRight size={17} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>

          {uploadedPhoto && (
            <button
              onClick={() => {
                URL.revokeObjectURL(uploadedPhoto);
                setUploadedPhoto(null);
              }}
              className="ml-3 text-xs text-white/55 underline underline-offset-4 hover:text-white"
            >
              Reset demo
            </button>
          )}
        </div>

        {/* Bottom controls */}
        <footer className="relative z-30 mt-10 flex items-center justify-between border-t border-white/10 px-5 py-5 text-[10px] uppercase tracking-[0.14em] text-white/40 sm:mt-12 sm:px-9 sm:py-6 lg:px-12">
          <span>Made for your imagination</span>

          <div className="flex items-center gap-3">
            <span>
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(styles.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => selectStyle(active + 1)}
              aria-label="Next style"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#d5ff9d] hover:text-[#d5ff9d]"
            >
              <ArrowDown size={14} />
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
