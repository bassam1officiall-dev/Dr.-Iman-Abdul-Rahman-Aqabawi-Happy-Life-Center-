"use client";

import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, CENTER_DATA } from "@/data/centerData";

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

  const directBookingUrl = buildWhatsAppUrl(
    "السلام عليكم، أود الاستفسار عن حجز جلسة في مركز الحياة السعيدة مع د. إيمان عبد الرحمن عقباوي."
  );

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <a
          href="#hero"
          className="flex flex-col text-start focus:outline-none"
        >
          <span className="font-editorial text-lg font-bold text-[var(--text-primary)] sm:text-xl">
            {CENTER_DATA.doctor.nameAr}
          </span>
          <span className="text-xs font-medium text-[var(--brand-sage)]">
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
        <div className="flex items-center gap-3">
          <a
            href={directBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg bg-[var(--brand-burgundy)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-burgundy-hover)] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            <span>احجز عبر واتساب</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] lg:hidden"
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
