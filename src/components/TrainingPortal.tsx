"use client";

import { useState } from "react";
import { GraduationCap, MessageCircle, Check } from "lucide-react";
import { buildWhatsAppUrl, CENTER_DATA } from "@/data/centerData";

export function TrainingPortal() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(
    CENTER_DATA.trainingSpecialties[0]
  );
  const [traineeStatus, setTraineeStatus] = useState<string>("متدربة جديدة");
  const [applicantName, setApplicantName] = useState<string>("");

  const message = [
    "السلام عليكم، أرغب في التقديم على برنامج التدريب العملي والتطبيقي في مركز الحياة السعيدة:",
    `• الاسم: ${applicantName.trim() || "غير مذكور"}`,
    `• التخصص: ${selectedSpecialty}`,
    `• الحالة: ${traineeStatus}`,
    "أرجو إرسال تفاصيل المواعيد والشروط المتاحة.",
  ].join("\n");

  const whatsappUrl = buildWhatsAppUrl(message);

  return (
    <section
      id="training"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Right Column (Info) */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-sage-soft)] px-3.5 py-1 text-xs font-semibold text-[var(--brand-sage)]">
            <GraduationCap className="h-4 w-4" strokeWidth={1.5} />
            <span>للفريق التخصصي والخريجات</span>
          </div>

          <h2 className="mt-4 font-editorial text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
            بوابة التدريب العملي والتطبيقي للخريجات
          </h2>

          <p className="mt-4 text-sm leading-[1.85] text-[var(--text-secondary)] sm:text-base">
            يعلن مركز الحياة السعيدة عن فتح باب التدريب العملي الميداني للخريجات
            والمتخصصات الراغبات في اكتساب خبرة إكلينيكية حقيقية في التعامل مع
            الحالات، تحت إشراف مباشر من د. إيمان عبد الرحمن عقباوي (مدرب معتمد
            TOT).
          </p>

          <div className="mt-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-sand)] p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              التخصصات الـ 7 المعتمدة للتدريب:
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CENTER_DATA.trainingSpecialties.map((spec) => (
                <li
                  key={spec}
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                >
                  <Check
                    className="h-4 w-4 shrink-0 text-[var(--brand-sage)]"
                    strokeWidth={1.75}
                  />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Left Column (Quick Application Builder) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-8">
            <h3 className="font-editorial text-2xl font-bold text-[var(--text-primary)]">
              نموذج التقديم السريع للتدريب العملي
            </h3>
            <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
              اختاري تخصصك وحالتك ليتم تجهيز رسالة التقديم مباشرة عبر واتساب.
            </p>

            {/* 1. Specialty Selector */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-[var(--text-primary)]">
                1. التخصص الأكاديمي
              </label>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {CENTER_DATA.trainingSpecialties.map((spec) => {
                  const selected = selectedSpecialty === spec;
                  return (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => setSelectedSpecialty(spec)}
                      className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm ${
                        selected
                          ? "border-[var(--brand-burgundy)] bg-[var(--brand-burgundy)] text-white"
                          : "border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[var(--brand-sage)]"
                      }`}
                    >
                      {spec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Status Selector */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-[var(--text-primary)]">
                2. الحالة التدريبية
              </label>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {["متدربة جديدة", "خريجة سابقة لاستكمال التطوير"].map(
                  (status) => {
                    const selected = traineeStatus === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setTraineeStatus(status)}
                        className={`rounded-xl border px-4 py-3 text-start text-sm font-medium transition-colors ${
                          selected
                            ? "border-[var(--brand-sage)] bg-[var(--brand-sage-soft)] text-[var(--brand-sage)]"
                            : "border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)]"
                        }`}
                      >
                        {status}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* 3. Name Input */}
            <div className="mt-6">
              <label
                htmlFor="trainee-name"
                className="block text-sm font-semibold text-[var(--text-primary)]"
              >
                3. الاسم الثلاثي
              </label>
              <input
                id="trainee-name"
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="اكتبي اسمك هنا (مثال: سارة محمود أحمد)"
                className="mt-2 w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-sage)] focus:outline-none"
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-5">
              <span className="text-xs text-[var(--text-muted)]">
                التواصل المباشر عبر رقم المركز:{" "}
                <span className="tabular-nums-ltr font-semibold text-[var(--text-primary)]">
                  {CENTER_DATA.doctor.whatsappRaw}
                </span>
              </span>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-burgundy)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-burgundy-hover)]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                <span>إرسال طلب التدريب عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
