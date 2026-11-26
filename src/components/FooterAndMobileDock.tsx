"use client";

import { MessageCircle, Compass } from "lucide-react";
import { buildWhatsAppUrl, CENTER_DATA } from "@/data/centerData";

export function FooterAndMobileDock() {
  const directWhatsAppUrl = buildWhatsAppUrl(
    "السلام عليكم، أود حجز جلسة في مركز الحياة السعيدة مع د. إيمان عبد الرحمن عقباوي."
  );

  return (
    <>
      <footer className="bg-[var(--bg-ink-dark)] pb-24 pt-12 text-[#FAF7F2] md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-[#FAF7F2]/15 pb-8 md:flex-row md:items-center">
            <div>
              <p className="font-editorial text-xl font-bold">
                {CENTER_DATA.doctor.nameAr}
              </p>
              <p className="mt-1 text-xs text-[#E5DDD3]/80 sm:text-sm">
                {CENTER_DATA.doctor.centerNameAr} ({CENTER_DATA.doctor.centerNameEn})
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-[#E5DDD3] sm:text-sm">
              <a href="#specialties" className="hover:text-white">
                التخصصات
              </a>
              <a href="#triage" className="hover:text-white">
                من أين أبدأ؟
              </a>
              <a href="#knowledge" className="hover:text-white">
                مكتبة الوعي
              </a>
              <a href="#training" className="hover:text-white">
                التدريب العملي
              </a>
              <a href="#branches" className="hover:text-white">
                الفروع والحجز
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-[#E5DDD3]/70 sm:flex-row sm:items-center">
            <p>
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()} مركز الحياة
              السعيدة — البدرشين · فيصل · الجيزة.
            </p>
            <p>
              تنويه مهني: المعلومات المنشورة للتوعية ولا تغني عن التقييم
              الإكلينيكي المباشر داخل الجلسة.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile-First Thumb-Zone Action Bar (< 768px) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)]/95 px-3 py-2 backdrop-blur-md md:hidden">
        <div className="mx-auto grid h-12 max-w-md grid-cols-2 gap-2.5">
          <a
            href="#triage"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-xs font-semibold text-[var(--text-primary)]"
          >
            <Compass
              className="h-4 w-4 text-[var(--brand-sage)]"
              strokeWidth={1.5}
            />
            <span>ابدأ التوجيه السريع</span>
          </a>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--brand-burgundy)] text-xs font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            <span>احجز واتساب الآن</span>
          </a>
        </div>
      </div>
    </>
  );
}
