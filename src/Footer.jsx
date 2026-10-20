
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  
  
  Mail,
  Sparkles,
} from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Style gallery", href: "#explore" },
    { label: "How it works", href: "#steps" },
    { label: "Create your photo", href: "#upload" },
  ],
  Information: [
    { label: "About", href: "#about" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of use", href: "/terms" },
  ],
};

export default function Footer() {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById("upload");

    if (uploadSection) {
      uploadSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      document
        .getElementById("explore")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden bg-[#101b12] px-5 pb-6 pt-16 text-[#f5f0df] sm:px-8 sm:pt-24 lg:px-12"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#9ab95a]/10 blur-[100px]"
      />

      <div className="mx-auto max-w-[1450px]">
        {/* Brand row */}
        <div className="flex items-center justify-between border-b border-white/15 pb-6">
          <a href="#" className="group flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8ff91] text-[#101b12]">
              <Sparkles size={17} />
            </span>

            <span className="text-sm font-semibold tracking-[0.08em]">
              Mavic<span className="text-[#d8ff91]">.Studio</span>
            </span>
          </a>

          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/45 sm:block">
            Creative AI / Made for imagination
          </span>

          <a
            href="#explore"
            className="flex items-center gap-2 text-xs text-white/65 transition-colors hover:text-[#d8ff91]"
          >
            Explore styles
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Main CTA */}
        <div className="relative grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#c5d6a4]"
            >
              <span className="h-2 w-2 rounded-full bg-[#d8ff91]" />
              Your next chapter starts here
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[92px]"
            >
              Your photo.
              <br />
              <span className="italic text-[#d8ff91]">
                Another universe.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-start gap-5 lg:items-end lg:pb-2"
          >
            <p className="max-w-sm text-sm leading-7 text-white/55 lg:text-right">
              One ordinary photo. A thousand possible worlds.
              Find your style and create something that feels
              entirely your own.
            </p>

            <button
              type="button"
              onClick={scrollToUpload}
              className="group flex items-center gap-5 rounded-full bg-[#d8ff91] px-6 py-4 text-sm font-medium text-[#101b12] transition-all duration-300 hover:bg-[#e5ffb9] hover:shadow-[0_0_35px_rgba(216,255,145,0.15)]"
            >
              Create your own
              <ArrowDownRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </button>
          </motion.div>
        </div>

        {/* Large decorative word */}
        <div
          aria-hidden="true"
          className="overflow-hidden border-b border-white/15 pb-8"
        >
          <p className="select-none whitespace-nowrap font-serif text-[18vw] leading-[0.8] tracking-[-0.09em] text-white/[0.045]">
            IMAGINE MORE
          </p>
        </div>

        {/* Footer navigation */}
        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:gap-16 lg:py-14">
          <div className="max-w-xs">
            <a
              href="#"
              className="font-serif text-3xl tracking-tight"
            >
              Mavic<span className="text-[#d8ff91]">.</span>
            </a>

            <p className="mt-4 text-sm leading-6 text-white/45">
              A new way to see yourself. Transform your imagination
              into visuals, one photo at a time.
            </p>

            <div className="mt-6 flex items-center gap-3">
              

              

              <a
                href="mailto:hello@example.com"
                aria-label="Email us"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#d8ff91] hover:bg-[#d8ff91] hover:text-[#101b12]"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#d8ff91]">
                {heading}
              </h3>

              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col gap-4 border-t border-white/15 py-6 text-[10px] uppercase tracking-[0.12em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mavic.Studio</p>

          <p className="flex items-center gap-2">
            Crafted for your imagination
            <span className="text-[#d8ff91]">✳</span>
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 transition-colors hover:text-[#d8ff91]"
          >
            Back to top
            <ArrowRight size={13} className="-rotate-90" />
          </a>
        </div>
      </div>
    </footer>
  );
}
