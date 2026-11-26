"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldAlert, Check } from "lucide-react";
import { CENTER_DATA } from "@/data/centerData";

export function SpecialtiesBento() {
  const [expandedId, setExpandedId] = useState<string | null>("adhd");

  return (
    <section
      id="specialties"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold text-[var(--brand-burgundy)]">
              التخصصات والبرامج العلاجية
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              مسارات إكلينيكية متكاملة للطفل والأسرة
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--text-secondary)]">
            كل برنامج يبدأ بفهم السياق الكامل للحالة وتحديد نقاط القوة قبل
            التدخل، بعيداً عن القوالب الجاهزة.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {CENTER_DATA.specialties.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const spanClass = item.featured ? "lg:col-span-2" : "lg:col-span-1";

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-colors sm:p-7 ${spanClass} ${
                  item.featured
                    ? "border-[var(--brand-burgundy)]/30 bg-[var(--bg-surface)]"
                    : "border-[var(--border-hairline)] bg-[var(--bg-surface)]"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          item.featured
                            ? "bg-[var(--brand-burgundy)]/10 text-[var(--brand-burgundy)]"
                            : "bg-[var(--bg-sand)] text-[var(--brand-sage)]"
                        }`}
                      >
                        {item.subtitle}
                      </span>
                      <h3 className="mt-3 font-editorial text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                        {item.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : item.id)
                      }
                      aria-expanded={isExpanded}
                      aria-label={
                        isExpanded ? "إخفاء التفاصيل" : "عرض التفاصيل"
                      }
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors hover:border-[var(--brand-sage)]"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                    {item.summary}
                  </p>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 border-t border-[var(--border-hairline)] pt-5">
                        <ul className="space-y-2.5">
                          {item.keyPoints.map((pt) => (
                            <li
                              key={pt}
                              className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                            >
                              <Check
                                className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-sage)]"
                                strokeWidth={1.75}
                              />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>

                        {item.clinicalNote && (
                          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[var(--brand-sage)]/20 bg-[var(--brand-sage-soft)] p-3.5 text-xs text-[var(--brand-sage)] sm:text-sm">
                            <ShieldAlert
                              className="mt-0.5 h-4 w-4 shrink-0"
                              strokeWidth={1.5}
                            />
                            <p>{item.clinicalNote}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
