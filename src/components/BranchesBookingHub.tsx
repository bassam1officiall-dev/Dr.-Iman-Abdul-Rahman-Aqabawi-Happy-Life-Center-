"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  CalendarDays,
} from "lucide-react";
import { buildWhatsAppUrl, CENTER_DATA } from "@/data/centerData";
import { getBranchLiveStatus } from "@/lib/cairoTime";

export function BranchesBookingHub() {
  const [selectedId, setSelectedId] = useState<
    "badrashein" | "faisal" | "online"
  >("badrashein");
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const activeBranch =
    CENTER_DATA.branches.find((b) => b.id === selectedId) ??
    CENTER_DATA.branches[0];
  const liveStatus = getBranchLiveStatus(activeBranch, now);

  const branchWhatsAppUrl = buildWhatsAppUrl(
    `السلام عليكم، أود حجز موعد في (${activeBranch.name}) بمركز الحياة السعيدة مع د. إيمان عبد الرحمن عقباوي.`
  );

  return (
    <section
      id="branches"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-14 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold text-[var(--brand-burgundy)]">
              الفروع والمواعيد والحجز
            </p>
            <h2 className="mt-2 font-editorial text-2xl font-bold leading-[1.35] text-[var(--text-primary)] [text-wrap:balance] sm:text-3xl">
              تواصلي معنا في البدرشين أو فيصل أو أونلاين
            </h2>
          </div>
          <p className="text-[15px] text-[var(--text-muted)] sm:text-sm">
            تُحدث حالة العمل تلقائياً حسب توقيت القاهرة المحلي.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Branch Switcher + Details (8 cols) */}
          <div className="lg:col-span-8">
            {/* Switcher Tabs with layoutId */}
            <div
              role="tablist"
              aria-label="فروع مركز الحياة السعيدة"
              className="no-scrollbar mb-6 flex snap-x gap-2 overflow-x-auto rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-sand)] p-1.5 sm:grid sm:grid-cols-3 sm:overflow-visible"
            >
              {CENTER_DATA.branches.map((branch) => {
                const isActive = branch.id === selectedId;
                return (
                  <button
                    key={branch.id}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setSelectedId(branch.id)}
                    className={`relative min-h-[44px] shrink-0 snap-start rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                      isActive
                        ? "text-white"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="branchSwitcherPill"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                        className="absolute inset-0 rounded-xl bg-[var(--brand-sage)]"
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">
                      {branch.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Branch Card */}
            <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-5">
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-[var(--text-primary)]">
                    {activeBranch.name} — {activeBranch.city}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {liveStatus.detailText}
                  </p>
                </div>

                {/* Live Cairo Status Pill */}
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                    liveStatus.isOpen
                      ? "bg-[var(--brand-sage-soft)] text-[var(--brand-sage)]"
                      : "bg-[var(--bg-sand)] text-[var(--brand-burgundy)]"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      liveStatus.isOpen
                        ? "bg-[var(--brand-sage)]"
                        : "bg-[var(--brand-burgundy)]"
                    }`}
                  />
                  <span>{liveStatus.badgeText}</span>
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-brass)]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)]">
                      أيام العمل
                    </p>
                    <p className="text-sm font-medium text-[var(--text-primary)] sm:text-base">
                      {activeBranch.daysAr}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-brass)]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)]">
                      ساعات الاستقبال
                    </p>
                    <p className="text-sm font-medium text-[var(--text-primary)] sm:text-base">
                      {activeBranch.hoursAr}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-brass)]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-muted)]">
                      العنوان
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--text-primary)] sm:text-base">
                      {activeBranch.address}
                    </p>
                    {activeBranch.directionsNote && (
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {activeBranch.directionsNote}
                      </p>
                    )}
                    {activeBranch.mapUrl && (
                      <p className="mt-2 text-xs font-medium text-[var(--brand-brass)]">
                        {activeBranch.mapUrl}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-7 border-t border-[var(--border-hairline)] pt-5">
                <a
                  href={branchWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[var(--brand-burgundy)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-burgundy-hover)] active:scale-[0.98]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <span>حجز موعد في {activeBranch.name}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Unified Direct Contact Box (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-sand)] p-6 sm:p-7">
              <div>
                <p className="text-xs font-semibold text-[var(--brand-burgundy)]">
                  التواصل الرسمي المباشر
                </p>
                <h3 className="mt-2 font-editorial text-2xl font-bold text-[var(--text-primary)]">
                  الحجز والاستفسارات
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  جميع الحجوزات وتأكيد المواعيد تتم عبر رقم الواتساب الرسمي
                  الموحد للفرعين والجلسات الأونلاين.
                </p>

                <div className="mt-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
                  <p className="text-xs text-[var(--text-muted)]">
                    رقم الواتساب والاتصال الموحد
                  </p>
                  <p className="mt-1 text-xl font-bold text-[var(--brand-burgundy)] tabular-nums-ltr">
                    {CENTER_DATA.doctor.whatsappRaw}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    الصفحات الرسمية على فيسبوك ({CENTER_DATA.doctor.followersTotal}):
                  </p>
                  {CENTER_DATA.doctor.facebookPages.map((page) => (
                    <a
                      key={page.url}
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--brand-sage)]"
                    >
                      <div>
                        <span className="block">{page.shortLabel}</span>
                        <span className="text-xs text-[var(--brand-sage)]">
                          {page.followers}
                        </span>
                      </div>
                      <ExternalLink
                        className="h-4 w-4 shrink-0 text-[var(--text-muted)]"
                        strokeWidth={1.5}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
