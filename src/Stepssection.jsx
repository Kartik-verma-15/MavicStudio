
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  ImagePlus,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

const styles = [
  {
    name: "Cinematic",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    filter: "contrast(1.15) saturate(1.2) sepia(0.2)",
    canvasFilter: "contrast(1.15) saturate(1.2) sepia(0.2)",
  },
  {
    name: "Anime",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80",
    filter: "saturate(1.65) contrast(1.15) brightness(1.05)",
    canvasFilter: "saturate(1.65) contrast(1.15) brightness(1.05)",
  },
  {
    name: "Watercolor",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    filter: "saturate(0.75) brightness(1.12) contrast(0.85)",
    canvasFilter: "saturate(0.75) brightness(1.12) contrast(0.85)",
  },
  {
    name: "Retro Film",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    filter: "sepia(0.55) saturate(0.8) contrast(1.08)",
    canvasFilter: "sepia(0.55) saturate(0.8) contrast(1.08)",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function MountainArtwork() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 h-24 w-full sm:h-32"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 112 L70 70 L115 96 L180 42 L235 104 L290 76 L355 124 L420 82 L480 112 L555 54 L630 105 L710 70 L780 119 L850 58 L920 110 L990 77 L1055 125 L1125 65 L1185 99 L1260 38 L1320 91 L1380 61 L1440 94 V180 H0Z"
        fill="#172719"
      />
      <path
        d="M0 145 L95 119 L155 140 L245 105 L330 147 L425 121 L510 151 L600 117 L685 150 L785 120 L875 153 L965 116 L1050 148 L1140 111 L1230 145 L1330 112 L1440 141 V180 H0Z"
        fill="#0e1a10"
      />
      <path
        d="M0 153 Q180 137 320 158 T640 151 T960 157 T1280 149 T1440 153"
        stroke="#a4b86a"
        strokeOpacity=".5"
      />
    </svg>
  );
}

export default function StepsSection() {
  const inputRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  // Release the temporary browser URL when the photo changes.
  useEffect(() => {
    if (!photo) return;

    return () => URL.revokeObjectURL(photo);
  }, [photo]);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setDownloadError("Please choose an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setDownloadError("Please choose an image smaller than 10 MB.");
      return;
    }

    setDownloadError("");
    setPhoto(URL.createObjectURL(file));
    setPhotoName(file.name);
  };

  const downloadPreview = () => {
    if (!photo) {
      inputRef.current?.click();
      return;
    }

    setDownloadError("");

    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const maxDimension = 2000;
        const scale = Math.min(
          1,
          maxDimension / Math.max(image.width, image.height)
        );

        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");

        if (!context) {
          setDownloadError("Your browser could not prepare the image.");
          return;
        }

        context.filter = styles[selectedStyle].canvasFilter;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (!blob) {
            setDownloadError("Could not create the image. Please try again.");
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `styled-${styles[selectedStyle].name
            .toLowerCase()
            .replace(/\s+/g, "-")}.png`;
          link.click();

          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }, "image/png");
      } catch {
        setDownloadError("Could not export this image. Please try another.");
      }
    };

    image.onerror = () => {
      setDownloadError("Could not load the photo. Please upload it again.");
    };

    image.src = photo;
  };

  const currentStyle = styles[selectedStyle];

  return (
    <section
      id="steps"
      className="relative isolate overflow-hidden bg-[#f5f0df] px-5 pb-36 pt-20 text-[#172116] sm:px-8 sm:pb-44 sm:pt-28 lg:px-12"
    >
      {/* Paper grain */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.24'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-[1450px]">
        {/* Section label */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-10 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] sm:text-xs"
        >
          <span>03.</span>
          <span className="text-[#84905d]">/</span>
          <span className="text-[#78834f]">How it works</span>
        </motion.div>

        {/* Heading */}
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h2 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
              Three steps.
              <br />
              <span className="italic text-[#526638]">
                Endless outcomes.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#172116]/65 sm:text-base">
              Turn your photos into something extraordinary. Choose
              your style, make it yours, and take your new look
              anywhere.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: -8, x: 12 }}
            whileInView={{ opacity: 1, rotate: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden max-w-48 pb-2 font-serif text-lg italic leading-snug md:block"
          >
            Your photo.
            <br />
            New worlds.
            <svg
              className="ml-10 mt-2"
              width="88"
              height="46"
              viewBox="0 0 88 46"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 4 C65 -5 87 19 42 40 M42 40 L51 26 M42 40 L59 42"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Three steps */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-7 lg:gap-12">
          {/* STEP 1 */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0 }}
            className="relative flex flex-col"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="font-serif text-3xl text-[#647a3d]">01</span>
              <span className="h-px w-12 bg-[#647a3d]/50" />
            </div>

            <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">
              Upload your photo
            </h3>

            <p className="mt-3 min-h-12 max-w-xs text-sm leading-6 text-[#172116]/65">
              Choose a photo from your device or simply drag and drop.
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                handleFile(event.dataTransfer.files?.[0]);
              }}
              className={`group relative mt-6 flex min-h-[270px] flex-col justify-end overflow-hidden rounded-[24px] border p-3 text-left transition-all duration-300 sm:min-h-[300px] ${
                dragging
                  ? "border-[#a9d56b] bg-[#e3e9ca]"
                  : "border-[#c9ceb0] bg-[#e7e7d0]"
              }`}
            >
              <div className="absolute inset-4 overflow-hidden rounded-[18px] bg-[#172719]">
                {photo ? (
                  <img
                    src={photo}
                    alt="Your uploaded photo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center text-[#f5f0df]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10">
                      <ImagePlus size={25} strokeWidth={1.4} />
                    </div>
                    <span className="font-serif text-xl">
                      Your photo goes here
                    </span>
                    <span className="text-xs text-white/55">
                      JPG, PNG or WEBP · Max 10 MB
                    </span>
                  </div>
                )}

                <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#d8ff91] text-[#172116] shadow-lg transition-transform group-hover:scale-110">
                  <Upload size={18} />
                </div>

                {photo && (
                  <span className="absolute bottom-3 left-3 max-w-[75%] truncate rounded-full bg-black/45 px-3 py-2 text-xs text-white backdrop-blur-md">
                    {photoName}
                  </span>
                )}
              </div>

              <div className="relative z-10 flex items-center justify-between rounded-[16px] bg-[#172719] px-4 py-4 text-[#f5f0df]">
                <span className="flex items-center gap-2 text-sm">
                  <Upload size={15} />
                  {photo ? "Change photo" : "Upload photo"}
                </span>
                <ArrowDownRight size={17} />
              </div>
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                handleFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />

            <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[#172116]/45">
              Your image stays in this browser demo
            </p>

            {/* Connector */}
            <ArrowRight
              className="absolute -right-7 top-[56%] hidden text-[#526638] lg:block"
              size={23}
              strokeWidth={1.4}
            />
          </motion.div>

          {/* STEP 2 */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.12 }}
            className="relative flex flex-col"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="font-serif text-3xl text-[#647a3d]">02</span>
              <span className="h-px w-12 bg-[#647a3d]/50" />
            </div>

            <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">
              Choose your style
            </h3>

            <p className="mt-3 min-h-12 max-w-xs text-sm leading-6 text-[#172116]/65">
              Explore different visual worlds and choose the one
              that feels like you.
            </p>

            <div className="mt-6 flex flex-1 flex-col rounded-[24px] border border-[#d8d7c0] bg-[#ece9d6] p-3 sm:p-4">
              {/* Selected style preview */}
              <div className="relative min-h-[180px] flex-1 overflow-hidden rounded-[18px] bg-[#172719] sm:min-h-[210px]">
                <img
                  src={photo || currentStyle.image}
                  alt={`${currentStyle.name} preview`}
                  style={{ filter: photo ? currentStyle.filter : "none" }}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10180e]/85 via-transparent to-black/10" />

                <div className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  <Sparkles className="mr-1 inline" size={11} />
                  Style preview
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <p className="mb-1 text-[9px] uppercase tracking-[0.18em] text-white/60">
                      Selected aesthetic
                    </p>
                    <h4 className="font-serif text-2xl">
                      {currentStyle.name}
                    </h4>
                  </div>
                  <Check size={20} className="text-[#d8ff91]" />
                </div>
              </div>

              {/* Style selector */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {styles.map((style, index) => (
                  <button
                    key={style.name}
                    type="button"
                    onClick={() => setSelectedStyle(index)}
                    aria-pressed={selectedStyle === index}
                    className={`flex min-w-0 items-center gap-2 rounded-full border px-2 py-2 text-left text-xs transition-all sm:px-3 ${
                      selectedStyle === index
                        ? "border-[#526638] bg-[#172719] text-[#f5f0df]"
                        : "border-[#172116]/15 text-[#172116]/70 hover:border-[#526638]/60"
                    }`}
                  >
                    <img
                      src={style.image}
                      alt=""
                      className="h-7 w-7 shrink-0 rounded-full object-cover"
                    />
                    <span className="truncate">{style.name}</span>
                    {selectedStyle === index && (
                      <Check size={13} className="ml-auto shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <p className="mt-3 text-center text-[10px] text-[#172116]/45">
                Select a style to preview its look
              </p>
            </div>

            <ArrowRight
              className="absolute -right-7 top-[56%] hidden text-[#526638] lg:block"
              size={23}
              strokeWidth={1.4}
            />
          </motion.div>

          {/* STEP 3 */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.24 }}
            className="flex flex-col"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="font-serif text-3xl text-[#647a3d]">03</span>
              <span className="h-px w-12 bg-[#647a3d]/50" />
            </div>

            <h3 className="font-serif text-2xl tracking-tight sm:text-3xl">
              Make it yours
            </h3>

            <p className="mt-3 min-h-12 max-w-xs text-sm leading-6 text-[#172116]/65">
              Preview your new look, then save your image and share
              it with the world.
            </p>

            <div className="relative mt-6 flex min-h-[340px] flex-1 flex-col overflow-hidden rounded-[24px] border border-[#c9ceb0] bg-[#e7e7d0] p-3 sm:min-h-[390px]">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-[18px] bg-[#172719]">
                <img
                  src={photo || currentStyle.image}
                  alt={`Preview in ${currentStyle.name} style`}
                  style={{ filter: photo ? currentStyle.filter : "none" }}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-2 text-[10px] text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d8ff91]" />
                  {currentStyle.name}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/65">
                    Your new look
                  </p>
                  <h4 className="mt-1 font-serif text-2xl text-white sm:text-3xl">
                    Made by you.
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {photo ? "Your image is ready to preview" : "Your creation awaits"}
                  </p>
                  <p className="mt-1 text-xs text-[#172116]/50">
                    {photo ? "Download your filtered preview" : "Upload a photo to begin"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={downloadPreview}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d8ff91] text-[#172116] transition-transform hover:scale-105 active:scale-95"
                  aria-label="Download styled preview"
                  title="Download preview"
                >
                  <Download size={19} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {downloadError && (
          <div
            role="alert"
            className="mx-auto mt-5 flex max-w-lg items-center justify-between gap-4 rounded-xl border border-red-900/15 bg-red-50 px-4 py-3 text-sm text-red-900"
          >
            {downloadError}
            <button
              type="button"
              onClick={() => setDownloadError("")}
              aria-label="Dismiss error"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mt-16 flex flex-col items-center text-center sm:mt-20"
        >
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="group flex items-center gap-5 rounded-full bg-[#172719] px-7 py-4 text-sm text-[#f5f0df] transition-all duration-300 hover:bg-[#2b4229] sm:px-9"
          >
            Try it now
            <ArrowDownRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
            />
          </button>

          <p className="mt-5 text-[9px] uppercase tracking-[0.18em] text-[#172116]/55 sm:text-[10px]">
            Upload · Choose · Create
          </p>
        </motion.div>
      </div>

      {/* Decorative mountain footer */}
      <MountainArtwork />
    </section>
  );
}
