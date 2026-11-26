"use client";

import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { CENTER_DATA } from "@/data/centerData";
import { navigateToBookingForm } from "@/lib/bookingNavigation";

const NAV_LINKS = [
  { href: "#hero", label: "الرئيسية" },
  { href: "#specialties", label: "التخصصات" },
  { href: "#triage", label: "من أين أبدأ؟" },
  { href: "#knowledge", label: "مكتبة الوعي" },
  { href: "#training", label: "التدريب العملي" },
  { href: "#branches", label: "الفروع والحجز" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5DDD3] bg-[var(--bg-canvas)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <a
          href="#hero"
          className="flex min-w-0 flex-col text-start focus:outline-none"
        >
          <span className="truncate whitespace-nowrap font-editorial text-[15px] font-bold text-[var(--text-primary)] sm:text-xl">
            {CENTER_DATA.doctor.nameAr}
          </span>
          <span className="truncate text-[11px] font-medium text-[var(--brand-sage)] sm:text-xs">
            مركز الحياة السعيدة · البدرشين · فيصل
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden items-center gap-6 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-burgundy)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA + Mobile Menu Button */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => navigateToBookingForm()}
            className="hidden min-h-[44px] items-center gap-2 rounded-xl bg-[var(--brand-burgundy)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-burgundy-hover)] active:scale-[0.98] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span>احجز جلستك الآن</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] active:scale-[0.98] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-4 lg:hidden">
          <nav aria-label="قائمة الجوال" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-sand)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
