
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";

const styles = [
  {
    id: "01",
    name: "Cinematic",
    description: "Every frame tells a story.",
    category: "FILM & PHOTOGRAPHY",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85",
    color: "#d9a46a",
  },
  {
    id: "02",
    name: "Anime",
    description: "Step into another universe.",
    category: "ILLUSTRATION",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=85",
    color: "#b5c4a0",
  },
  {
    id: "03",
    name: "Retro Film",
    description: "A little nostalgia in every frame.",
    category: "ANALOG & VINTAGE",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85",
    color: "#c8a47d",
  },
  {
    id: "04",
    name: "Watercolor",
    description: "Turn moments into art.",
    category: "ART & PAINTING",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85",
    color: "#b5c5ad",
  },
];

export default function ExploreWorlds({ onSelectStyle }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="explore"
      className="relative overflow-hidden bg-[#f5f0df] px-5 py-20 text-[#172116] sm:px-8 sm:py-28 lg:px-12"
    >
      {/* Subtle paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-[1500px]">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center justify-between border-b border-[#172116]/15 pb-5"
        >
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] sm:text-xs">
            <span>02</span>
            <span className="text-[#172116]/35">/</span>
            <span className="text-[#64764d]">Explore the worlds</span>
          </div>

          <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#172116]/60 sm:flex">
            AI style gallery <ArrowRight size={13} />
          </span>
        </motion.div>

        {/* Heading and introduction */}
        <div className="mb-12 grid items-end gap-7 lg:mb-16 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em]">
              <span className="h-2 w-2 rounded-full bg-[#9bb85a]" />
              Find your aesthetic
            </div>

            <h2 className="max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[88px]">
              Find your
              <br />
              <span className="italic text-[#64764d]">
                visual language.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-start justify-between gap-6 lg:items-end"
          >
            <p className="max-w-md text-sm leading-7 text-[#172116]/65 sm:text-base lg:text-right">
              From cinematic portraits to dreamlike illustrations,
              discover a world of AI-powered styles made to bring
              your imagination to life.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("upload")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-5 rounded-full border border-[#172116]/35 px-6 py-3 text-xs font-medium transition-all duration-300 hover:border-[#172116] hover:bg-[#172116] hover:text-[#f5f0df]"
            >
              Explore all styles
              <ArrowDownRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </button>
          </motion.div>
        </div>

        {/* Style cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {styles.map((style, index) => (
            <motion.button
              key={style.id}
              type="button"
              onMouseEnter={() => setHovered(style.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(style.id)}
              onBlur={() => setHovered(null)}
              onClick={() => onSelectStyle?.(style)}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -7 }}
              className="group min-w-0 text-left"
            >
              {/* Image frame */}
              <div className="relative aspect-[0.92/1] overflow-hidden rounded-[18px] bg-[#d9d7c8] p-1.5">
                <div className="relative h-full w-full overflow-hidden rounded-[13px]">
                  <motion.img
                    src={style.image}
                    alt={`${style.name} AI art style preview`}
                    loading="lazy"
                    animate={{
                      scale: hovered === style.id ? 1.07 : 1,
                    }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#10180e]/75 via-transparent to-black/5" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-white backdrop-blur-md">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: style.color }}
                    />
                    {style.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className="text-xs text-white/80">
                      STYLE / {style.id}
                    </span>

                    <motion.span
                      animate={{
                        rotate: hovered === style.id ? 45 : 0,
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-white/10 text-white backdrop-blur-md"
                    >
                      <ArrowRight size={17} />
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Card details */}
              <div className="flex items-start justify-between gap-3 px-1 pt-5">
                <div>
                  <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">
                    {style.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#172116]/60 sm:text-sm">
                    {style.description}
                  </p>
                </div>

                <span className="pt-2 text-[10px] tracking-widest text-[#64764d]">
                  {style.id}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex items-center justify-between border-t border-[#172116]/15 pt-5"
        >
          <span className="text-[9px] uppercase tracking-[0.16em] text-[#172116]/45 sm:text-[10px]">
            Made for your imagination
          </span>

          <span className="text-[9px] uppercase tracking-[0.16em] text-[#172116]/45 sm:text-[10px]">
            04 styles / infinite possibilities
          </span>
        </motion.div>
      </div>
    </section>
  );
}
