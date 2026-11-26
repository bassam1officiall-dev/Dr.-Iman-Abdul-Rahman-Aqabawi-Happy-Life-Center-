"use client";

import { MessageCircle, MapPin } from "lucide-react";
import { CENTER_DATA } from "@/data/centerData";
import { navigateToBookingForm } from "@/lib/bookingNavigation";

export function FooterAndMobileDock() {
  return (
    <>
      <footer className="bg-[var(--bg-ink-dark)] pb-28 pt-12 text-[#FAF7F2] md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-[#FAF7F2]/15 pb-8 md:flex-row md:items-center">
            <div>
              <p className="font-editorial text-xl font-bold">
                {CENTER_DATA.doctor.nameAr}
              </p>
              <p className="mt-1 text-xs text-[#E5DDD3]/80 sm:text-sm">
                {CENTER_DATA.doctor.centerNameAr} —{" "}
                <span dir="ltr" className="inline-block">
                  {CENTER_DATA.doctor.centerNameEn}
                </span>
              </p>
              <p className="mt-1 text-xs text-[#E5DDD3]/65">
                دكتوراه في الصحة النفسية والتربية الخاصة والإرشاد الأسري · عضو
                هيئة تدريس منتدب بإحدى الجامعات الخاصة
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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5DDD3] bg-[var(--bg-surface)]/95 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigateToBookingForm()}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--brand-burgundy)] px-3 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span>احجز جلستك الآن</span>
          </button>

          <a
            href="#branches"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 text-sm font-semibold text-[var(--text-primary)] transition-transform active:scale-[0.98]"
          >
            <MapPin
              className="h-4 w-4 shrink-0 text-[var(--brand-sage)]"
              strokeWidth={1.5}
            />
            <span>الفروع والمواعيد</span>
          </a>
        </div>
      </div>
    </>
  );
}
