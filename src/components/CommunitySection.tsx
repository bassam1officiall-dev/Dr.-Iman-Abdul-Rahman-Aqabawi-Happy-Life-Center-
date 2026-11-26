"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trees,
  HeartHandshake,
  Check,
  ShieldCheck,
  ExternalLink,
  X,
} from "lucide-react";
import { buildWhatsAppUrl, CENTER_DATA } from "@/data/centerData";

export function CommunitySection() {
  const [initiativeModalOpen, setInitiativeModalOpen] = useState(false);

  const tripInquiryUrl = buildWhatsAppUrl(
    "السلام عليكم، أود الاستفسار عن مواعيد وتفاصيل الرحلات التربوية الترفيهية القادمة للأطفال في مركز الحياة السعيدة."
  );

  return (
    <section
      aria-label="الأنشطة التربوية والمبادرات المجتمعية"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-sand)] py-14 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold text-[var(--brand-sage)]">
            خارج جدران الجلسة
          </p>
          <h2 className="mt-2 font-editorial text-2xl font-bold leading-[1.35] text-[var(--text-primary)] [text-wrap:balance] sm:text-3xl">
            الأنشطة التربوية والمبادرات المجتمعية
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Card 1: Educational Trips */}
          <article className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2.5 text-[var(--brand-sage)]">
                <Trees className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-xs font-semibold">
                  {CENTER_DATA.educationalTrip.exampleTitle}
                </span>
              </div>

              <h3 className="mt-3 font-editorial text-2xl font-bold text-[var(--text-primary)]">
                {CENTER_DATA.educationalTrip.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {CENTER_DATA.educationalTrip.description}
              </p>

              <ul className="mt-5 space-y-2.5">
                {CENTER_DATA.educationalTrip.goals.map((goal) => (
                  <li
                    key={goal}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-sage)]"
                      strokeWidth={1.75}
                    />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 border-t border-[var(--border-hairline)] pt-5">
              <a
                href={tripInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-burgundy)] hover:text-[var(--brand-burgundy-hover)]"
              >
                <span>الاستفسار عن الرحلة القادمة عبر واتساب</span>
                <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </article>

          {/* Card 2: Free Community Initiative */}
          <article className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2.5 text-[var(--brand-brass)]">
                <HeartHandshake className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-xs font-semibold">
                  مبادرة تطوعية مجانية بالكامل
                </span>
              </div>

              <h3 className="mt-3 font-editorial text-2xl font-bold text-[var(--text-primary)]">
                {CENTER_DATA.communityInitiative.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {CENTER_DATA.communityInitiative.summary}
              </p>

              <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[var(--brand-sage)]/20 bg-[var(--brand-sage-soft)] p-4 text-xs leading-relaxed text-[var(--brand-sage)] sm:text-sm">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0"
                  strokeWidth={1.5}
                />
                <p>{CENTER_DATA.communityInitiative.disclaimer}</p>
              </div>
            </div>

            <div className="mt-7 border-t border-[var(--border-hairline)] pt-5">
              <button
                type="button"
                onClick={() => setInitiativeModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--brand-sage)] hover:text-[var(--brand-sage)]"
              >
                <span>اقرأ شروط المبادرة والانضمام</span>
              </button>
            </div>
          </article>
        </div>
      </div>

      {/* Community Initiative Modal */}
      <AnimatePresence>
        {initiativeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
            onClick={() => setInitiativeModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 shadow-xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
                <div>
                  <span className="text-xs font-semibold text-[var(--brand-brass)]">
                    شروط وضوابط المبادرة المجتمعية
                  </span>
                  <h3 className="mt-1 font-editorial text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                    {CENTER_DATA.communityInitiative.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInitiativeModalOpen(false)}
                  aria-label="إغلاق النافذة"
                  className="rounded-lg border border-[var(--border-hairline)] p-2 text-[var(--text-muted)] hover:bg-[var(--bg-sand)]"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <p className="mt-4 text-sm font-medium text-[var(--brand-sage)]">
                {CENTER_DATA.communityInitiative.disclaimer}
              </p>

              <ul className="mt-4 space-y-2.5">
                {CENTER_DATA.communityInitiative.rules.map((rule) => (
                  <li
                    key={rule}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-sage)]"
                      strokeWidth={1.75}
                    />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-[var(--border-hairline)] pt-5">
                <button
                  type="button"
                  onClick={() => setInitiativeModalOpen(false)}
                  className="rounded-lg border border-[var(--border-hairline)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-sand)]"
                >
                  إغلاق
                </button>
                <a
                  href={CENTER_DATA.communityInitiative.whatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-sage)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
                >
                  <span>الانتقال إلى جروب المبادرة على واتساب</span>
                  <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
