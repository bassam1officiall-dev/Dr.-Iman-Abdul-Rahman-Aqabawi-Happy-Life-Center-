"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { CENTER_DATA } from "@/data/centerData";

export function CredentialsStrip() {
  return (
    <section
      aria-label="الاعتمادات والمنهج العلمي"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-sand)] py-14 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold text-[var(--brand-brass)]">
              الاعتمادات والمنهج العلمي
            </p>
            <h2 className="mt-1 font-editorial text-2xl font-bold leading-[1.35] text-[var(--text-primary)] [text-wrap:balance] sm:text-3xl">
              تأهيل أكاديمي وممارسة إكلينيكية منضبطة
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-[1.85] text-[var(--text-secondary)] sm:text-sm">
            <span dir="ltr" className="inline-block font-medium">
              {CENTER_DATA.doctor.centerNameEn}
            </span>{" "}
            — التزام مهني بالتشخيص التفريقي والتكامل مع التخصصات الطبية عند
            الحاجة.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--border-hairline)] md:grid-cols-2 lg:grid-cols-4">
          {CENTER_DATA.doctor.credentials.map((cred, idx) => (
            <motion.div
              key={cred.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex h-full items-start gap-3.5 bg-[var(--bg-surface)] p-5"
            >
              <Award
                className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-brass)]"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                  {cred.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                  {cred.detail}
                  {cred.ltrSuffix && (
                    <span dir="ltr" className="inline-block font-medium">
                      {cred.ltrSuffix}
                    </span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
