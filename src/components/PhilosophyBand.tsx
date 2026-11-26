"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";
import { CENTER_DATA } from "@/data/centerData";

export function PhilosophyBand() {
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <section
      aria-label="فلسفة المركز"
      className="relative overflow-hidden border-b border-[var(--border-hairline)] bg-[var(--bg-ink-dark)] py-20 text-[#FAF7F2] sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-wider text-[var(--brand-brass)]">
            فلسفة مركز الحياة السعيدة
          </p>

          <blockquote className="mt-6 font-editorial text-2xl font-bold leading-[1.6] text-[#FAF7F2] sm:text-3xl lg:text-4xl">
            &laquo;{CENTER_DATA.doctor.signatureQuote}&raquo;
          </blockquote>

          <div className="mx-auto my-8 h-px w-24 bg-[var(--brand-brass)]/60" />

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#E5DDD3] sm:text-lg">
            {CENTER_DATA.doctor.philosophySupporting}
          </p>

          <p className="mt-3 text-sm font-medium text-[var(--brand-brass)]">
            — {CENTER_DATA.doctor.nameAr}
          </p>
        </motion.div>

        {/* Interactive Toggleable Clinic Rules Card */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#FAF7F2]/15 bg-[#FAF7F2]/5 p-5 sm:p-6">
          <button
            type="button"
            onClick={() => setRulesOpen((prev) => !prev)}
            aria-expanded={rulesOpen}
            className="flex w-full items-center justify-between gap-4 text-start"
          >
            <div className="flex items-center gap-3">
              <BookOpen
                className="h-5 w-5 shrink-0 text-[var(--brand-brass)]"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="text-base font-semibold text-[#FAF7F2] sm:text-lg">
                  قواعد الجلسة في مركز الحياة السعيدة
                </h3>
                <p className="text-xs text-[#E5DDD3]/80 sm:text-sm">
                  اضغط للاطلاع على ميثاق التعامل والخصوصية داخل الجلسات
                </p>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[var(--brand-brass)] transition-transform duration-300 ${
                rulesOpen ? "rotate-180" : ""
              }`}
              strokeWidth={1.5}
            />
          </button>

          <AnimatePresence initial={false}>
            {rulesOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[#FAF7F2]/15 pt-5 sm:grid-cols-2">
                  {CENTER_DATA.sessionRules.map((rule) => (
                    <div
                      key={rule.title}
                      className="rounded-xl border border-[#FAF7F2]/10 bg-[#1B2421]/60 p-4"
                    >
                      <h4 className="text-sm font-semibold text-[var(--brand-brass)]">
                        {rule.title}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#E5DDD3] sm:text-sm">
                        {rule.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
