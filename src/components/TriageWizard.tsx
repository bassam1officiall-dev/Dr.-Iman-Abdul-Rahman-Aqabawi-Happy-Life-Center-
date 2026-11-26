"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { buildWhatsAppUrl } from "@/data/centerData";

const AUDIENCE_OPTIONS = [
  { id: "child", label: "طفل" },
  { id: "teen", label: "مراهق" },
  { id: "adult-couple", label: "بالغ أو زوجين" },
  { id: "mother", label: "أم تبحث عن توازن نفسي" },
  { id: "trainee", label: "خريجة للتدريب العملي" },
];

const FOCUS_OPTIONS = [
  { id: "adhd", label: "فرط حركة وتشتت انتباه (ADHD)" },
  { id: "behavior", label: "تعديل سلوك وتربية متوازنة" },
  { id: "learning", label: "صعوبات تعلم وتخاطب" },
  { id: "executive", label: "تحسين الوظائف التنفيذية" },
  { id: "family", label: "ضغط نفسي أو علاقة زوجية" },
  { id: "training", label: "التقديم على التدريب العملي" },
];

const LOCATION_OPTIONS = [
  { id: "badrashein", label: "فرع البدرشين (الجمعة · السبت · الثلاثاء)" },
  { id: "faisal", label: "فرع فيصل (الأربعاء)" },
  { id: "online", label: "جلسة أونلاين (بالحجز المسبق)" },
];

function getRecommendedTrack(audience: string, focus: string): {
  title: string;
  description: string;
} {
  if (audience === "خريجة للتدريب العملي" || focus === "التقديم على التدريب العملي") {
    return {
      title: "مسار التدريب العملي والتطبيقي للخريجات",
      description:
        "التحاق ببرنامج التدريب الإكلينيكي والتطبيقي بمركز الحياة السعيدة في أحد التخصصات السبعة المعتمدة تحت إشراف د. إيمان.",
    };
  }
  if (focus === "فرط حركة وتشتت انتباه (ADHD)") {
    return {
      title: "تقييم نفسي وسلوكي شامل + تشخيص تفريقي لـ ADHD",
      description:
        "جلسة تقييم دقيقة للتمييز بين أنماط ADHD والقلق أو صعوبات التعلم، مع وضع خطة تدخل سلوكي وتنفيذي واضحة للأسرة أو للبالغ.",
    };
  }
  if (focus === "تحسين الوظائف التنفيذية") {
    return {
      title: "برنامج تأهيل وتحسين الوظائف التنفيذية",
      description:
        "تقييم لمهارات التركيز، الذاكرة العاملة، التخطيط، وتأجيل الإشباع وبناء خطة تدريب عملية قابلة للتطبيق.",
    };
  }
  if (focus === "تعديل سلوك وتربية متوازنة") {
    return {
      title: "جلسة تعديل سلوك وإرشاد والدي متوازن",
      description:
        "تحليل وظيفة السلوك وفهم احتياج الطفل قبل الحكم، مع تدريب الوالدين على الحزم الهادئ والحدود الواضحة بدون قسوة.",
    };
  }
  if (focus === "صعوبات تعلم وتخاطب") {
    return {
      title: "تقييم صعوبات التعلم والتخاطب وتنمية المهارات",
      description:
        "اختبارات وملاحظة إكلينيكية لتحديد نقاط القوة والتحدي، وبناء خطة تأهيل فردية مناسبة لعمر الطفل.",
    };
  }
  return {
    title: "جلسة استشارات أسرية / زوجية ودعم نفسي (لايف كوتشينج)",
    description:
      "مساحة آمنة وسرية لاستعادة التوازن النفسي، فهم ديناميكية العلاقة، وتطبيق أدوات علم النفس الإيجابي.",
  };
}

export function TriageWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [audience, setAudience] = useState<string>("طفل");
  const [focus, setFocus] = useState<string>("فرط حركة وتشتت انتباه (ADHD)");
  const [location, setLocation] = useState<string>(
    "فرع البدرشين (الجمعة · السبت · الثلاثاء)"
  );

  const recommendation = getRecommendedTrack(audience, focus);

  const whatsappMessage = [
    "السلام عليكم، استخدمت أداة التوجيه السريع في موقع مركز الحياة السعيدة:",
    `• الفئة: ${audience}`,
    `• النقطة الأساسية: ${focus}`,
    `• المكان المفضل: ${location}`,
    `• المسار المقترح: ${recommendation.title}`,
    "أرغب في معرفة أقرب ميعاد متاح للحجز.",
  ].join("\n");

  const bookingUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <section
      id="triage"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-14 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold text-[var(--brand-burgundy)]">
            أداة التوجيه السريع
          </p>
          <h2 className="mt-2 font-editorial text-2xl font-bold leading-[1.35] text-[var(--text-primary)] [text-wrap:balance] sm:text-3xl">
            من أين أبدأ؟
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-[1.85] text-[var(--text-secondary)] sm:text-base">
            ثلاث خطوات بسيطة تساعدك على تحديد المسار الأنسب لاحتياجك قبل
            التواصل معنا عبر واتساب.
          </p>
        </div>

        {/* Consultation Intake Card */}
        <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-10">
          {/* Stepper Indicator */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-5">
            <div className="no-scrollbar flex snap-x items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
              {[
                { num: 1, title: "لمين الاستشارة؟" },
                { num: 2, title: "النقطة الأساسية" },
                { num: 3, title: "المكان المفضل" },
              ].map((item) => {
                const isActive = step === item.num;
                const isDone = step > item.num;
                return (
                  <button
                    key={item.num}
                    type="button"
                    onClick={() => setStep(item.num as 1 | 2 | 3)}
                    className={`relative min-h-[44px] shrink-0 snap-start flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                      isActive
                        ? "text-white"
                        : isDone
                        ? "bg-[var(--brand-sage-soft)] text-[var(--brand-sage)]"
                        : "bg-[var(--bg-sand)] text-[var(--text-muted)]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="triageStepPill"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                        className="absolute inset-0 rounded-full bg-[var(--brand-sage)]"
                      />
                    )}
                    <span className="relative z-10 tabular-nums-ltr">
                      {item.num}.
                    </span>
                    <span className="relative z-10">{item.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[var(--brand-brass)]">
                خطوة {step <= 3 ? step : 3} من 3
              </span>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--brand-burgundy)]"
                >
                  <RotateCcw className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  <span>إعادة</span>
                </button>
              )}
            </div>
          </div>

          <div className="min-h-[240px]">

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                  1. لمين الاستشارة أو البرنامج؟
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {AUDIENCE_OPTIONS.map((opt) => {
                    const selected = audience === opt.label;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setAudience(opt.label);
                          setStep(2);
                        }}
                        className={`flex items-center justify-between rounded-xl border p-4 text-start text-sm font-medium transition-all sm:text-base ${
                          selected
                            ? "border-[var(--brand-burgundy)] bg-[var(--brand-burgundy)]/5 text-[var(--brand-burgundy)]"
                            : "border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[var(--brand-sage)]"
                        }`}
                      >
                        <span>{opt.label}</span>
                        <ArrowLeft
                          className="h-4 w-4 shrink-0 opacity-60"
                          strokeWidth={1.5}
                        />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                  2. إيه أكتر نقطة شاغلة بالك دلوقتي؟
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {FOCUS_OPTIONS.map((opt) => {
                    const selected = focus === opt.label;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setFocus(opt.label);
                          setStep(3);
                        }}
                        className={`flex items-center justify-between rounded-xl border p-4 text-start text-sm font-medium transition-all sm:text-base ${
                          selected
                            ? "border-[var(--brand-burgundy)] bg-[var(--brand-burgundy)]/5 text-[var(--brand-burgundy)]"
                            : "border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[var(--brand-sage)]"
                        }`}
                      >
                        <span>{opt.label}</span>
                        <ArrowLeft
                          className="h-4 w-4 shrink-0 opacity-60"
                          strokeWidth={1.5}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    <span>الخطوة السابقة</span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                  3. المكان المفضل للجلسة:
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {LOCATION_OPTIONS.map((opt) => {
                    const selected = location === opt.label;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setLocation(opt.label);
                          setStep(4);
                        }}
                        className={`flex items-center justify-between rounded-xl border p-4 text-start text-sm font-medium transition-all sm:text-base ${
                          selected
                            ? "border-[var(--brand-burgundy)] bg-[var(--brand-burgundy)]/5 text-[var(--brand-burgundy)]"
                            : "border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[var(--brand-sage)]"
                        }`}
                      >
                        <span>{opt.label}</span>
                        <ArrowLeft
                          className="h-4 w-4 shrink-0 opacity-60"
                          strokeWidth={1.5}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    <span>الخطوة السابقة</span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="rounded-xl border border-[var(--brand-sage)]/25 bg-[var(--brand-sage-soft)] p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-sage)]"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-xs font-semibold text-[var(--brand-sage)]">
                        المسار المبدئي المقترح لك
                      </p>
                      <h3 className="mt-1 font-editorial text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                        {recommendation.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                        {recommendation.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--brand-sage)]/15 pt-4 text-xs text-[var(--text-secondary)]">
                    <span className="rounded-md bg-[var(--bg-surface)] px-2.5 py-1">
                      الفئة: {audience}
                    </span>
                    <span className="rounded-md bg-[var(--bg-surface)] px-2.5 py-1">
                      التركيز: {focus}
                    </span>
                    <span className="rounded-md bg-[var(--bg-surface)] px-2.5 py-1">
                      المكان: {location}
                    </span>
                  </div>
                </div>

                {/* Ethical Disclaimer */}
                <div className="flex items-start gap-2.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-3.5 text-xs text-[var(--text-secondary)] sm:text-sm">
                  <Info
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-brass)]"
                    strokeWidth={1.5}
                  />
                  <p>
                    هذه الأداة للتوجيه المبدئي فقط وليست تشخيصاً طبياً —
                    التشخيص الدقيق يتم داخل الجلسة التقييمية.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    <span>تعديل الاختيارات</span>
                  </button>

                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-[var(--brand-burgundy)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-burgundy-hover)] active:scale-[0.98] sm:text-base"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                    <span>إرسال التفاصيل وحجز الموعد عبر واتساب</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
