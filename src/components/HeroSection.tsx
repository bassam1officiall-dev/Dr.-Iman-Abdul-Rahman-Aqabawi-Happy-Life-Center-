"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Compass,
  Wind,
  X,
  ShieldCheck,
  MapPin,
  Users,
} from "lucide-react";
import { CENTER_DATA } from "@/data/centerData";
import { navigateToBookingForm } from "@/lib/bookingNavigation";

const BREATH_PHASES = [
  { label: "شهيق هادئ", seconds: 4 },
  { label: "احتفاظ لطيف", seconds: 4 },
  { label: "زفير ببطء", seconds: 4 },
];

export function HeroSection() {
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (!breathingOpen) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setPhaseIndex((p) => (p + 1) % BREATH_PHASES.length);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [breathingOpen]);

  const currentPhase = BREATH_PHASES[phaseIndex];

  return (
    <section
      id="hero"
      className="relative border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-14 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Right Column (RTL Primary — 7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="mb-4 inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-1.5 text-xs font-medium text-[var(--brand-sage)] sm:text-sm">
            <span>{CENTER_DATA.doctor.centerNameAr}</span>
            <span className="text-[var(--brand-brass)]">·</span>
            <span>البدرشين · فيصل · أونلاين</span>
          </p>

          <h1 className="font-editorial text-2xl font-bold leading-[1.35] text-[var(--text-primary)] [text-wrap:balance] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.3]">
            الفهم الصحيح هو أول خطوة للتغيير — وليس الحكم أو الوصمة.
          </h1>

          <p className="mt-5 max-w-[65ch] text-[15px] leading-[1.85] text-[var(--text-secondary)] sm:text-base">
            مع{" "}
            <strong className="font-semibold text-[var(--text-primary)]">
              {CENTER_DATA.doctor.nameAr}
            </strong>
            ، دكتوراه في الصحة النفسية والتربية الخاصة والإرشاد الأسري، عضو هيئة
            تدريس منتدب بإحدى الجامعات الخاصة، واستشاري علاج{" "}
            <span dir="ltr" className="inline-block font-medium">
              ADHD
            </span>{" "}
            والعلاقات الأسرية وتعديل السلوك وتحسين الوظائف التنفيذية للأطفال
            والكبار.
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => navigateToBookingForm()}
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-[var(--brand-burgundy)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-burgundy-hover)] active:scale-[0.98] sm:text-base"
            >
              <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              <span>احجز جلستك الآن</span>
            </button>

            <button
              type="button"
              onClick={() => navigateToBookingForm()}
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--brand-sage)] hover:text-[var(--brand-sage)] active:scale-[0.98] sm:text-base"
            >
              <Compass
                className="h-5 w-5 shrink-0 text-[var(--brand-sage)]"
                strokeWidth={1.5}
              />
              <span>اختار نوع الجلسة المناسب (توجيه سريع)</span>
            </button>
          </div>

          {/* Verified Trust Strip */}
          <div className="mt-10 grid grid-cols-1 gap-4 border-t border-[var(--border-hairline)] pt-6 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <Users
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-brass)]"
                strokeWidth={1.5}
              />
              <span className="text-xs font-medium text-[var(--text-secondary)] sm:text-sm">
                {CENTER_DATA.doctor.followersTotal}
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-brass)]"
                strokeWidth={1.5}
              />
              <span className="text-xs font-medium text-[var(--text-secondary)] sm:text-sm">
                فرعان بالجيزة + جلسات أونلاين
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-brass)]"
                strokeWidth={1.5}
              />
              <span className="text-xs font-medium text-[var(--text-secondary)] sm:text-sm">
                تقييم وتشخيص تفريقي قبل أي خطة علاجية
              </span>
            </div>
          </div>
        </motion.div>

        {/* Left Column (RTL Visual — 5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          {/* Official Editorial Portrait Frame */}
          <div className="relative overflow-hidden rounded-2xl border border-[#E5DDD3] bg-[var(--bg-sand)] p-4 shadow-sm sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/4.5] max-h-[420px] w-full overflow-hidden rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] lg:aspect-[4/5] lg:max-h-none"
            >
              <img
                src="/images/dr-eman-hero.webp"
                alt="د. إيمان عبد الرحمن عقباوي - مديرة مركز الحياة السعيدة"
                width={1200}
                height={1207}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </motion.div>

            {/* Clinic Wall Note Card (positioned cleanly below portrait) */}
            <div className="mt-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[var(--brand-burgundy)]">
                    من جدار العيادة
                  </p>
                  <p className="mt-1 font-editorial text-base font-bold text-[var(--text-primary)]">
                    &laquo;قواعد الجلسة: مساحة آمنة للفهم بدون أحكام&raquo;
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPhaseIndex(0);
                    setCountdown(4);
                    setBreathingOpen((prev) => !prev);
                  }}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--brand-sage)]/30 bg-[var(--brand-sage-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-sage)] transition-colors hover:bg-[var(--brand-sage)] hover:text-white"
                >
                  <Wind className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span>تنفس ببطء</span>
                </button>
              </div>

              {/* Subtle Interactive Breathing Micro-Moment */}
              <AnimatePresence>
                {breathingOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 flex items-center justify-between rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-3.5">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            scale:
                              phaseIndex === 0
                                ? [0.85, 1.15]
                                : phaseIndex === 1
                                  ? 1.15
                                  : [1.15, 0.85],
                          }}
                          transition={{ duration: 4, ease: "easeInOut" }}
                          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--brand-sage)] bg-[var(--brand-sage-soft)] text-sm font-bold text-[var(--brand-sage)] tabular-nums-ltr"
                        >
                          {countdown}
                        </motion.div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">
                            {currentPhase.label}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">
                            تمرين تهدئة سريع قبل اختيار جلستك (4 - 4 - 4 ثوانٍ)
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBreathingOpen(false)}
                        aria-label="إغلاق تمرين التنفس"
                        className="rounded-md p-1 text-[var(--text-muted)] hover:bg-[var(--bg-sand)]"
                      >
                        <X className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
