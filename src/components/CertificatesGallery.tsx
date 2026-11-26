"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  FileBadge2,
} from "lucide-react";
import {
  CERTIFICATE_CATEGORIES,
  CERTIFICATES_DATA,
  CertificateItem,
} from "@/data/certificatesData";

export function CertificatesGallery() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CERTIFICATE_CATEGORIES)[number]>("الكل");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<CertificateItem | null>(
    null
  );
  const [isZoomed, setIsZoomed] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);

  const filteredCertificates =
    activeCategory === "الكل"
      ? CERTIFICATES_DATA
      : CERTIFICATES_DATA.filter((c) => c.category === activeCategory);

  const totalCount = filteredCertificates.length;

  const handleCategoryChange = (
    cat: (typeof CERTIFICATE_CATEGORIES)[number]
  ) => {
    setActiveCategory(cat);
    setActiveIndex(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollToCard = useCallback(
    (index: number) => {
      const container = trackRef.current;
      if (!container) return;
      const cards = container.querySelectorAll<HTMLElement>("[data-cert-card]");
      const clamped = Math.max(0, Math.min(index, cards.length - 1));
      const target = cards[clamped];
      if (!target) return;
      target.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
      setActiveIndex(clamped);
    },
    []
  );

  // Sync activeIndex when user swipes/scrolls manually
  const handleScroll = () => {
    const container = trackRef.current;
    if (!container) return;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-cert-card]")
    );
    if (!cards.length) return;
    const containerRect = container.getBoundingClientRect();
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      // In RTL, measure distance from right edge (start edge)
      const dist = Math.abs(rect.right - containerRect.right);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });
    setActiveIndex(bestIdx);
  };

  // Lightbox navigation & keyboard controls
  const lightboxIndex = lightboxItem
    ? filteredCertificates.findIndex((c) => c.id === lightboxItem.id)
    : -1;

  const goLightboxPrev = useCallback(() => {
    if (lightboxIndex < 0) return;
    const prevIdx =
      (lightboxIndex - 1 + filteredCertificates.length) %
      filteredCertificates.length;
    setIsZoomed(false);
    setLightboxItem(filteredCertificates[prevIdx]);
  }, [lightboxIndex, filteredCertificates]);

  const goLightboxNext = useCallback(() => {
    if (lightboxIndex < 0) return;
    const nextIdx = (lightboxIndex + 1) % filteredCertificates.length;
    setIsZoomed(false);
    setLightboxItem(filteredCertificates[nextIdx]);
  }, [lightboxIndex, filteredCertificates]);

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxItem(null);
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        // In RTL, left arrow moves forward to next card
        goLightboxNext();
      } else if (e.key === "ArrowRight") {
        // In RTL, right arrow moves back to previous card
        goLightboxPrev();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxItem, goLightboxNext, goLightboxPrev]);

  const handleTrackKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToCard(activeIndex + 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToCard(activeIndex - 1);
    }
  };

  const formattedCurrent = String(
    Math.min(activeIndex + 1, Math.max(1, totalCount))
  ).padStart(2, "0");
  const formattedTotal = String(totalCount).padStart(2, "0");

  return (
    <section
      id="certificates"
      aria-label="ركن الشهادات والاعتمادات"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--brand-burgundy)]">
              <FileBadge2 className="h-4 w-4" strokeWidth={1.5} />
              <span>التوثيق الأكاديمي والاعتمادات الرسمية</span>
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              ركن الشهادات والاعتمادات
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
            أرشيف موثق للدرجات الجامعية، الدبلومات المهنية، والاعتمادات الدولية
            لدى د. إيمان عبد الرحمن عقباوي — اضغط على أي شهادة للمعاينة بالحجم
            الكامل.
          </p>
        </div>

        {/* Category Filter Pills + Live Count */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[var(--border-hairline)] pb-4 lg:flex-row lg:items-center">
          <div
            role="tablist"
            aria-label="تصنيف الشهادات"
            className="flex flex-wrap items-center gap-2"
          >
            {CERTIFICATE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                    isActive
                      ? "text-white"
                      : "border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--brand-sage)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="certFilterPill"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full bg-[var(--brand-sage)]"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <span className="text-xs font-medium text-[var(--text-muted)] sm:text-sm">
              عدد الشهادات المعروضة:{" "}
              <strong className="font-semibold text-[var(--text-primary)] tabular-nums-ltr">
                {totalCount}
              </strong>
            </span>

            {/* Progress & Arrows */}
            <div className="flex items-center gap-2">
              <span className="ml-2 text-xs font-semibold text-[var(--brand-brass)] tabular-nums-ltr">
                {formattedCurrent} / {formattedTotal}
              </span>
              <button
                type="button"
                onClick={() => scrollToCard(activeIndex - 1)}
                disabled={activeIndex <= 0}
                aria-label="الشهادة السابقة"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--brand-burgundy)] hover:text-[var(--brand-burgundy)] disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => scrollToCard(activeIndex + 1)}
                disabled={activeIndex >= totalCount - 1}
                aria-label="الشهادة التالية"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--brand-burgundy)] hover:text-[var(--brand-burgundy)] disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* RTL Snap Carousel */}
        <div
          ref={trackRef}
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleTrackKeyDown}
          aria-label="معرض الشهادات"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 focus:outline-none sm:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filteredCertificates.map((cert) => (
            <article
              key={cert.id}
              data-cert-card
              className="group flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-[#E5DDD3] bg-[#FFFFFF] p-4 transition-shadow hover:shadow-md sm:w-[68%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              {/* Museum-Grade Frame */}
              <button
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  setLightboxItem(cert);
                }}
                aria-label={`عرض ${cert.title} بالحجم الكامل`}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#E5DDD3] bg-[#F5EFE6] p-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand-sage)]"
              >
                <img
                  src={cert.thumbSrc}
                  alt={`${cert.title} — ${cert.issuer}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-md border border-[#E5DDD3] bg-[#FFFFFF]/95 px-2.5 py-1 text-[11px] font-semibold text-[#1C1A19] opacity-90 shadow-xs transition-opacity group-hover:opacity-100">
                  <Maximize2 className="h-3 w-3 text-[#6D2434]" strokeWidth={1.5} />
                  <span>تكبير</span>
                </span>
              </button>

              {/* Metadata below frame */}
              <div className="mt-4 flex flex-1 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#F1EAE0] px-2.5 py-0.5 text-[11px] font-semibold text-[#1E433C]">
                    {cert.issuer} ·{" "}
                    <span className="mr-1 tabular-nums-ltr">{cert.year}</span>
                  </span>
                </div>

                <h3 className="mt-2.5 line-clamp-1 font-editorial text-lg font-bold text-[#1C1A19]">
                  {cert.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#524D48] sm:text-sm">
                  {cert.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setLightboxItem(null);
              setIsZoomed(false);
            }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#1B2421]/92 p-3 backdrop-blur-xs sm:p-6"
          >
            {/* Top Toolbar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 text-[#FAF7F2]"
            >
              <div className="flex items-center gap-2 text-xs text-[#E5DDD3] sm:text-sm">
                <span className="tabular-nums-ltr font-semibold text-[#A67C46]">
                  {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                  {formattedTotal}
                </span>
                <span>·</span>
                <span className="hidden sm:inline">{lightboxItem.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  aria-label={isZoomed ? "تصغير الشهادة" : "تكبير الشهادة"}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#FAF7F2]/20 bg-[#FAF7F2]/10 px-3 py-1.5 text-xs font-medium text-[#FAF7F2] transition-colors hover:bg-[#FAF7F2]/20"
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="h-4 w-4" strokeWidth={1.5} />
                      <span>تصغير</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="h-4 w-4" strokeWidth={1.5} />
                      <span>تكبير</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLightboxItem(null);
                    setIsZoomed(false);
                  }}
                  aria-label="إغلاق المعاينة"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#FAF7F2]/20 bg-[#FAF7F2]/10 text-[#FAF7F2] transition-colors hover:bg-[#6D2434]"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Center Image + Prev/Next */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto my-3 flex w-full max-w-6xl flex-1 items-center justify-center overflow-hidden"
            >
              <button
                type="button"
                onClick={goLightboxPrev}
                aria-label="الشهادة السابقة"
                className="absolute right-1 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF7F2]/25 bg-[#1B2421]/80 text-[#FAF7F2] transition-colors hover:bg-[#6D2434] sm:right-3"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>

              <div
                onClick={() => setIsZoomed((z) => !z)}
                className={`flex max-h-[68vh] w-full items-center justify-center overflow-auto rounded-xl border border-[#FAF7F2]/15 bg-[#F5EFE6] p-3 sm:p-5 ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
              >
                <img
                  src={lightboxItem.fullSrc}
                  alt={lightboxItem.title}
                  className={`max-h-[62vh] w-auto object-contain transition-transform duration-300 ${
                    isZoomed ? "scale-150 sm:scale-[1.75]" : "scale-100"
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={goLightboxNext}
                aria-label="الشهادة التالية"
                className="absolute left-1 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF7F2]/25 bg-[#1B2421]/80 text-[#FAF7F2] transition-colors hover:bg-[#6D2434] sm:left-3"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto w-full max-w-4xl rounded-xl border border-[#FAF7F2]/15 bg-[#FAF7F2]/5 px-4 py-3 text-center text-[#FAF7F2]"
            >
              <p className="text-xs font-semibold text-[#A67C46]">
                {lightboxItem.issuer} ·{" "}
                <span className="tabular-nums-ltr">{lightboxItem.year}</span>
              </p>
              <h3 className="mt-1 font-editorial text-lg font-bold sm:text-xl">
                {lightboxItem.title}
              </h3>
              <p className="mt-1 text-xs text-[#E5DDD3] sm:text-sm">
                {lightboxItem.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
