"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  BookOpenText,
  ExternalLink,
  X,
  Eye,
  Share2,
} from "lucide-react";
import { CENTER_DATA, KnowledgeItem } from "@/data/centerData";

const CATEGORIES = [
  "الكل",
  "ADHD الأطفال",
  "ADHD الكبار والأزواج",
  "دعم الأمهات",
  "علم النفس الإيجابي",
  "ريلز مميزة",
] as const;

type FilterCategory = (typeof CATEGORIES)[number];

export function KnowledgeHub() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("الكل");
  const [selectedArticle, setSelectedArticle] =
    useState<KnowledgeItem | null>(null);

  const filteredItems = CENTER_DATA.knowledgeHub.filter((item) => {
    if (activeCategory === "الكل") return true;
    if (activeCategory === "ريلز مميزة") return item.type === "reel";
    return item.category === activeCategory;
  });

  return (
    <section
      id="knowledge"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-sand)] py-14 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold text-[var(--brand-burgundy)]">
              مكتبة الفهم والتوعية
            </p>
            <h2 className="mt-2 font-editorial text-2xl font-bold leading-[1.35] text-[var(--text-primary)] [text-wrap:balance] sm:text-3xl">
              محتوى علمي مبسط من صفحات المركز
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-[1.85] text-[var(--text-secondary)] sm:text-base">
            مقتطفات وريلز حقيقية تساعد الأمهات والأزواج على فهم{" "}
            <span dir="ltr" className="inline-block font-medium">
              ADHD
            </span>
            ، الوظائف التنفيذية، وعلم النفس الإيجابي بوعي.
          </p>
        </div>

        {/* Category Filter Tabs with layoutId underline */}
        <div
          role="tablist"
          aria-label="تصنيفات مكتبة الوعي"
          className="no-scrollbar mb-10 flex snap-x items-center gap-2 overflow-x-auto border-b border-[var(--border-hairline)] pb-1 md:flex-wrap md:overflow-visible md:pb-3"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative min-h-[44px] shrink-0 snap-start px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  isActive
                    ? "text-[var(--brand-burgundy)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span>{cat}</span>
                {isActive && (
                  <motion.span
                    layoutId="knowledgeTabUnderline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-x-1 bottom-0 h-0.5 bg-[var(--brand-burgundy)] md:-bottom-3"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const isReel = item.type === "reel";
            return (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex flex-col justify-between rounded-2xl border bg-[var(--bg-surface)] p-6 transition-shadow hover:shadow-md ${
                  item.isFeaturedReel
                    ? "border-[var(--brand-burgundy)]/40 md:col-span-2 lg:col-span-1"
                    : "border-[var(--border-hairline)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-sand)] px-3 py-1 text-xs font-semibold text-[var(--brand-sage)]">
                      {isReel ? (
                        <Play className="h-3.5 w-3.5" strokeWidth={1.5} />
                      ) : (
                        <BookOpenText
                          className="h-3.5 w-3.5"
                          strokeWidth={1.5}
                        />
                      )}
                      <span>{item.category}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-muted)]">
                      {isReel ? (
                        <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                      ) : (
                        <Share2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      )}
                      <span className="tabular-nums-ltr">
                        {item.metricLabel}
                      </span>
                    </span>
                  </div>

                  <h3 className="mt-4 font-editorial text-xl font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-[var(--border-hairline)] pt-4">
                  {isReel && item.externalUrl ? (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-burgundy)] hover:text-[var(--brand-burgundy-hover)]"
                    >
                      <span>مشاهدة الريل على فيسبوك</span>
                      <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(item)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-sage)] hover:text-[var(--brand-burgundy)]"
                    >
                      <span>قراءة المقال كاملاً</span>
                      <BookOpenText className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Expandable Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 shadow-xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
                <div>
                  <span className="text-xs font-semibold text-[var(--brand-sage)]">
                    {selectedArticle.category}
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl font-bold text-[var(--text-primary)]">
                    {selectedArticle.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  aria-label="إغلاق المقال"
                  className="rounded-lg border border-[var(--border-hairline)] p-2 text-[var(--text-muted)] hover:bg-[var(--bg-sand)]"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-base leading-[1.85] text-[var(--text-secondary)]">
                {selectedArticle.fullContent?.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-6 border-t border-[var(--border-hairline)] pt-4 text-xs text-[var(--text-muted)]">
                بقلم {CENTER_DATA.doctor.nameAr} — {CENTER_DATA.doctor.centerNameAr}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
