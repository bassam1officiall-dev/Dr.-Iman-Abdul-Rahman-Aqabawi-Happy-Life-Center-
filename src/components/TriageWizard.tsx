"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  MessageCircle,
  RotateCcw,
  AlertCircle,
  Lock,
} from "lucide-react";
import { buildWhatsAppUrl, CENTER_DATA } from "@/data/centerData";
import {
  BOOKING_FOCUS_EVENT,
  BookingFocusDetail,
} from "@/lib/bookingNavigation";

const AUDIENCE_OPTIONS = [
  { id: "child", label: "طفل" },
  { id: "teen", label: "مراهق" },
  { id: "adult-couple", label: "بالغ أو زوجين" },
  { id: "mother", label: "أم تبحث عن توازن نفسي" },
  { id: "trainee", label: "خريجة للتدريب العملي" },
] as const;

const CLINICAL_FOCUS_OPTIONS = [
  { id: "adhd", label: "فرط حركة وتشتت انتباه (ADHD)" },
  { id: "behavior", label: "تعديل سلوك وتربية متوازنة" },
  { id: "learning", label: "صعوبات تعلم وتخاطب" },
  { id: "executive", label: "تحسين الوظائف التنفيذية" },
  { id: "family", label: "ضغط نفسي أو علاقة زوجية" },
] as const;

const BRANCH_OPTIONS = [
  {
    id: "badrashein",
    label: "فرع البدرشين",
    hours: "11:00 صباحاً – 6:00 مساءً",
    days: ["الجمعة", "السبت", "الثلاثاء"],
  },
  {
    id: "faisal",
    label: "فرع فيصل",
    hours: "12:00 ظهراً – 6:00 مساءً",
    days: ["الأربعاء"],
  },
  {
    id: "online",
    label: "جلسة أونلاين",
    hours: "مواعيد مرنة بالتنسيق",
    days: ["موعد صباحي (بالتنسيق)", "موعد مسائي (بالتنسيق)"],
  },
] as const;

function getRecommendedTrack(audience: string, focus: string): {
  title: string;
  description: string;
} {
  if (audience === "خريجة للتدريب العملي") {
    return {
      title: `مسار التدريب العملي والتطبيقي — ${focus}`,
      description:
        "التحاق ببرنامج التدريب الإكلينيكي والتطبيقي بمركز الحياة السعيدة تحت إشراف د. إيمان عبد الرحمن عقباوي.",
    };
  }
  if (focus.includes("ADHD")) {
    return {
      title: "تقييم نفسي وسلوكي شامل + تشخيص تفريقي لـ ADHD",
      description:
        "جلسة تقييم دقيقة للتمييز بين أنماط فرط الحركة وتشتت الانتباه والقلق أو صعوبات التعلم، مع خطة تدخل سلوكي وتنفيذي.",
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
    title: "جلسة استشارات أسرية / زوجية ودعم نفسي",
    description:
      "مساحة آمنة وسرية لاستعادة التوازن النفسي، فهم ديناميكية العلاقة، وتطبيق أدوات علم النفس الإيجابي.",
  };
}

export function TriageWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [audience, setAudience] = useState<string>("");
  const [focus, setFocus] = useState<string>("");
  const [branchId, setBranchId] = useState<string>("");
  const [preferredDay, setPreferredDay] = useState<string>("");

  // Step 4 intake fields
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [touched, setTouched] = useState<{
    fullName: boolean;
    age: boolean;
    phone: boolean;
  }>({
    fullName: false,
    age: false,
    phone: false,
  });
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const handleFocusBooking = (event: Event) => {
      const custom = event as CustomEvent<BookingFocusDetail>;
      const detail = custom.detail ?? {};

      if (detail.branchId) {
        setBranchId(detail.branchId);
        const branchObj = BRANCH_OPTIONS.find((b) => b.id === detail.branchId);
        setPreferredDay(
          branchObj && branchObj.days.length === 1 ? branchObj.days[0] : ""
        );
      }

      if (detail.audience) {
        setAudience(detail.audience);
        if (detail.focus) {
          setFocus(detail.focus);
        }
      }

      setStep(1);
      setIsHighlighted(true);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsHighlighted(false), 1200);
    };

    window.addEventListener(BOOKING_FOCUS_EVENT, handleFocusBooking);
    return () => {
      window.removeEventListener(BOOKING_FOCUS_EVENT, handleFocusBooking);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const isTrainee = audience === "خريجة للتدريب العملي";
  const focusOptions = isTrainee
    ? CENTER_DATA.trainingSpecialties.map((s) => ({ id: s, label: s }))
    : CLINICAL_FOCUS_OPTIONS;

  const selectedBranch = BRANCH_OPTIONS.find((b) => b.id === branchId);

  // Step completion checks
  const isStep1Complete = Boolean(audience);
  const isStep2Complete = Boolean(focus);
  const isStep3Complete = Boolean(branchId && preferredDay);

  const maxUnlockedStep: 1 | 2 | 3 | 4 = !isStep1Complete
    ? 1
    : !isStep2Complete
    ? 2
    : !isStep3Complete
    ? 3
    : 4;

  // Step 4 field validations
  const trimmedName = fullName.trim();
  const isNameValid = trimmedName.length >= 3;

  const parsedAge = Number(age);
  const isAgeValid =
    age.trim() !== "" &&
    Number.isInteger(parsedAge) &&
    parsedAge >= 1 &&
    parsedAge <= 100;

  const cleanPhone = phone.replace(/\s+/g, "");
  const isPhoneValid = /^01\d{9}$/.test(cleanPhone);

  const isAllValid =
    isStep1Complete &&
    isStep2Complete &&
    isStep3Complete &&
    isNameValid &&
    isAgeValid &&
    isPhoneValid;

  const missingItems: string[] = [];
  if (!isNameValid) missingItems.push("الاسم بالكامل (3 أحرف على الأقل)");
  if (!isAgeValid) missingItems.push("السن الصحيح");
  if (!isPhoneValid) missingItems.push("رقم هاتف مصري صحيح (11 رقم يبدأ بـ 01)");

  const ageLabel =
    audience === "طفل"
      ? "سن الطفل"
      : audience === "مراهق"
      ? "سن المراهق"
      : "السن";

  const recommendation = getRecommendedTrack(audience, focus);

  const whatsappLines = [
    "السلام عليكم، أرغب في حجز جلسة في مركز الحياة السعيدة (د. إيمان عقباوي):",
    `- الاسم: ${trimmedName}`,
    `- السن: ${parsedAge} سنة`,
    `- رقم التواصل: ${cleanPhone}`,
    `- الاستشارة لـ: ${audience}`,
    `- التخصص / النقطة الأساسية: ${focus}`,
    `- المكان المفضل: ${selectedBranch?.label ?? ""}`,
    `- اليوم / الموعد المفضل: ${preferredDay}`,
  ];
  if (notes.trim()) {
    whatsappLines.push(`- ملاحظات إضافية: ${notes.trim()}`);
  }
  const bookingUrl = buildWhatsAppUrl(whatsappLines.join("\n"));

  const handleReset = () => {
    setStep(1);
    setAudience("");
    setFocus("");
    setBranchId("");
    setPreferredDay("");
    setFullName("");
    setAge("");
    setPhone("");
    setNotes("");
    setTouched({ fullName: false, age: false, phone: false });
  };

  return (
    <section
      id="triage"
      className="scroll-mt-24 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-14 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold text-[var(--brand-burgundy)]">
            أداة التوجيه والحجز المبدئي
          </p>
          <h2 className="mt-2 font-editorial text-2xl font-bold leading-[1.35] text-[var(--text-primary)] [text-wrap:balance] sm:text-3xl">
            من أين أبدأ؟
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-[1.85] text-[var(--text-secondary)] sm:text-base">
            أربع خطوات منظمة لتحديد المسار الأنسب واستكمال بيانات الحجز قبل
            الإرسال عبر واتساب.
          </p>
        </div>

        {/* Consultation Intake Card */}
        <div
          className={`rounded-2xl border bg-[var(--bg-surface)] p-5 shadow-sm transition-all duration-500 sm:p-10 ${
            isHighlighted
              ? "border-[var(--brand-burgundy)] ring-2 ring-[var(--brand-burgundy)]/40 ring-offset-4 ring-offset-[var(--bg-canvas)]"
              : "border-[var(--border-hairline)]"
          }`}
        >
          {/* Stepper Indicator */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-5">
            <div className="no-scrollbar flex snap-x items-center gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">
              {[
                { num: 1 as const, title: "لمين الاستشارة؟" },
                { num: 2 as const, title: "النقطة الأساسية" },
                { num: 3 as const, title: "المكان والموعد" },
                { num: 4 as const, title: "بياناتك والتأكيد" },
              ].map((item) => {
                const isActive = step === item.num;
                const isUnlocked = item.num <= maxUnlockedStep;
                const isDone = item.num < step;

                return (
                  <button
                    key={item.num}
                    type="button"
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (isUnlocked) setStep(item.num);
                    }}
                    className={`relative flex min-h-[44px] shrink-0 snap-start items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                      !isUnlocked
                        ? "cursor-not-allowed bg-[var(--bg-sand)]/60 text-[var(--text-muted)]/60"
                        : isActive
                        ? "text-white"
                        : isDone
                        ? "bg-[var(--brand-sage-soft)] text-[var(--brand-sage)] hover:opacity-90"
                        : "bg-[var(--bg-sand)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
                    {!isUnlocked && (
                      <Lock
                        className="relative z-10 h-3 w-3 shrink-0"
                        strokeWidth={1.5}
                      />
                    )}
                    <span className="relative z-10 tabular-nums-ltr">
                      {item.num}.
                    </span>
                    <span className="relative z-10 whitespace-nowrap">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[var(--brand-brass)]">
                خطوة {step} من 4
              </span>
              {(isStep1Complete || step > 1) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--brand-burgundy)]"
                >
                  <RotateCcw className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  <span>إعادة</span>
                </button>
              )}
            </div>
          </div>

          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
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
                            if (audience !== opt.label) {
                              setFocus("");
                            }
                            setAudience(opt.label);
                          }}
                          className={`flex min-h-[48px] items-center justify-between rounded-xl border p-4 text-start text-sm font-medium transition-all active:scale-[0.99] sm:text-base ${
                            selected
                              ? "border-[var(--brand-burgundy)] bg-[var(--brand-burgundy)]/5 text-[var(--brand-burgundy)]"
                              : "border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[var(--brand-sage)]"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {selected && (
                            <CheckCircle2
                              className="h-4 w-4 shrink-0 text-[var(--brand-burgundy)]"
                              strokeWidth={1.75}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex justify-end">
                    <button
                      type="button"
                      disabled={!isStep1Complete}
                      onClick={() => setStep(2)}
                      className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[var(--brand-burgundy)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-burgundy-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <span>التالي</span>
                      <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                    {isTrainee
                      ? "2. اختاري تخصص التدريب العملي المطلوب:"
                      : "2. إيه أكتر نقطة شاغلة بالك دلوقتي؟"}
                  </h3>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {focusOptions.map((opt) => {
                      const selected = focus === opt.label;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFocus(opt.label)}
                          className={`flex min-h-[48px] items-center justify-between rounded-xl border p-4 text-start text-sm font-medium transition-all active:scale-[0.99] sm:text-base ${
                            selected
                              ? "border-[var(--brand-burgundy)] bg-[var(--brand-burgundy)]/5 text-[var(--brand-burgundy)]"
                              : "border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[var(--brand-sage)]"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {selected && (
                            <CheckCircle2
                              className="h-4 w-4 shrink-0 text-[var(--brand-burgundy)]"
                              strokeWidth={1.75}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-7 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex min-h-[48px] items-center gap-1.5 rounded-xl border border-[var(--border-hairline)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--brand-sage)] hover:text-[var(--text-primary)]"
                    >
                      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                      <span>السابق</span>
                    </button>

                    <button
                      type="button"
                      disabled={!isStep2Complete}
                      onClick={() => setStep(3)}
                      className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[var(--brand-burgundy)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-burgundy-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <span>التالي</span>
                      <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                    3. اختاري المكان واليوم المفضل للجلسة:
                  </h3>

                  {/* Branch selection */}
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {BRANCH_OPTIONS.map((b) => {
                      const selected = branchId === b.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setBranchId(b.id);
                            setPreferredDay(
                              b.days.length === 1 ? b.days[0] : ""
                            );
                          }}
                          className={`flex min-h-[64px] flex-col items-start justify-center rounded-xl border p-4 text-start transition-all active:scale-[0.99] ${
                            selected
                              ? "border-[var(--brand-burgundy)] bg-[var(--brand-burgundy)]/5 text-[var(--brand-burgundy)]"
                              : "border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[var(--brand-sage)]"
                          }`}
                        >
                          <span className="text-sm font-semibold sm:text-base">
                            {b.label}
                          </span>
                          <span className="mt-1 text-xs text-[var(--text-muted)]">
                            {b.hours}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Preferred Day */}
                  {selectedBranch && (
                    <div className="mt-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-4 sm:p-5">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        اليوم / الموعد المفضل في ({selectedBranch.label}):
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {selectedBranch.days.map((day) => {
                          const selected = preferredDay === day;
                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() => setPreferredDay(day)}
                              className={`min-h-[44px] rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                                selected
                                  ? "border-[var(--brand-sage)] bg-[var(--brand-sage)] text-white"
                                  : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--brand-sage)]"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="mt-7 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex min-h-[48px] items-center gap-1.5 rounded-xl border border-[var(--border-hairline)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--brand-sage)] hover:text-[var(--text-primary)]"
                    >
                      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                      <span>السابق</span>
                    </button>

                    <button
                      type="button"
                      disabled={!isStep3Complete}
                      onClick={() => setStep(4)}
                      className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[var(--brand-burgundy)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-burgundy-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <span>التالي</span>
                      <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: INTAKE FIELDS + SUMMARY + STRICT WHATSAPP CTA */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                      4. بيانات التواصل وتأكيد الحجز
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
                      يرجى استكمال الحقول الإلزامية التالية لتفعيل زر الإرسال عبر
                      واتساب.
                    </p>
                  </div>

                  {/* Intake Fields */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-name"
                        className="block text-sm font-semibold text-[var(--text-primary)]"
                      >
                        الاسم بالكامل <span className="text-[var(--brand-burgundy)]">*</span>
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, fullName: true }))
                        }
                        placeholder="اسم ولي الأمر أو صاحب الاستشارة"
                        className="mt-1.5 w-full min-h-[48px] rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-sage)] focus:outline-none"
                      />
                      {touched.fullName && !isNameValid && (
                        <p className="mt-1 text-xs text-[var(--brand-burgundy)]">
                          يرجى إدخال الاسم بالكامل (3 أحرف على الأقل).
                        </p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label
                        htmlFor="booking-age"
                        className="block text-sm font-semibold text-[var(--text-primary)]"
                      >
                        {ageLabel} <span className="text-[var(--brand-burgundy)]">*</span>
                      </label>
                      <input
                        id="booking-age"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={100}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, age: true }))}
                        placeholder="مثال: 8"
                        dir="ltr"
                        className="mt-1.5 w-full min-h-[48px] rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] px-4 py-3 text-right text-sm text-[var(--text-primary)] placeholder:text-right placeholder:text-[var(--text-muted)] focus:border-[var(--brand-sage)] focus:outline-none"
                      />
                      {touched.age && !isAgeValid && (
                        <p className="mt-1 text-xs text-[var(--brand-burgundy)]">
                          يرجى إدخال سن صحيح بالسنوات (من 1 إلى 100).
                        </p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-sm font-semibold text-[var(--text-primary)]"
                      >
                        رقم الهاتف / واتساب{" "}
                        <span className="text-[var(--brand-burgundy)]">*</span>
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={11}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, phone: true }))
                        }
                        placeholder="010XXXXXXXX"
                        dir="ltr"
                        className="mt-1.5 w-full min-h-[48px] rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] px-4 py-3 text-left text-sm text-[var(--text-primary)] tabular-nums-ltr placeholder:text-[var(--text-muted)] focus:border-[var(--brand-sage)] focus:outline-none"
                      />
                      {touched.phone && !isPhoneValid && (
                        <p className="mt-1 text-xs text-[var(--brand-burgundy)]">
                          يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً يبدأ بـ{" "}
                          <span dir="ltr" className="inline-block">
                            01
                          </span>
                          .
                        </p>
                      )}
                    </div>

                    {/* Optional Notes */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-notes"
                        className="block text-sm font-semibold text-[var(--text-primary)]"
                      >
                        ملاحظة مختصرة عن الحالة أو السؤال (اختياري)
                      </label>
                      <textarea
                        id="booking-notes"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="أي تفصيلة إضافية تحب مشاركتها قبل الجلسة..."
                        className="mt-1.5 w-full rounded-xl border border-[#E5DDD3] bg-[#FAF7F2] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-sage)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="rounded-2xl border border-[var(--brand-sage)]/25 bg-[var(--brand-sage-soft)] p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-sage)]"
                        strokeWidth={1.5}
                      />
                      <div>
                        <p className="text-xs font-semibold text-[var(--brand-sage)]">
                          ملخص الحجز والمسار المبدئي المقترح
                        </p>
                        <h4 className="mt-1 font-editorial text-xl font-bold text-[var(--text-primary)]">
                          {recommendation.title}
                        </h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                          {recommendation.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 border-t border-[var(--brand-sage)]/15 pt-4 text-xs text-[var(--text-secondary)] sm:grid-cols-2">
                      <div>
                        <span className="font-semibold text-[var(--text-primary)]">
                          الفئة:
                        </span>{" "}
                        {audience}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--text-primary)]">
                          التخصص / النقطة:
                        </span>{" "}
                        {focus}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--text-primary)]">
                          المكان والموعد:
                        </span>{" "}
                        {selectedBranch?.label} — {preferredDay}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--text-primary)]">
                          البيانات:
                        </span>{" "}
                        {trimmedName || "—"} ·{" "}
                        {isAgeValid ? `${parsedAge} سنة` : "—"} ·{" "}
                        <span dir="ltr" className="inline-block">
                          {cleanPhone || "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ethical Disclaimer */}
                  <div className="flex items-start gap-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-3.5 text-xs text-[var(--text-secondary)] sm:text-sm">
                    <Info
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-brass)]"
                      strokeWidth={1.5}
                    />
                    <p>
                      هذه الأداة لتوجيهك لنوع الجلسة المناسب وليست تشخيصاً طبياً
                      — التشخيص الدقيق يتم داخل الجلسة التقييمية.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex min-h-[48px] items-center gap-1.5 rounded-xl border border-[var(--border-hairline)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--brand-sage)] hover:text-[var(--text-primary)]"
                      >
                        <ArrowRight
                          className="h-4 w-4 shrink-0"
                          strokeWidth={1.5}
                        />
                        <span>السابق</span>
                      </button>

                      {isAllValid ? (
                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-[var(--brand-burgundy)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-burgundy-hover)] active:scale-[0.98] sm:text-base"
                        >
                          <MessageCircle
                            className="h-5 w-5 shrink-0"
                            strokeWidth={1.5}
                          />
                          <span>إرسال تفاصيل الحجز عبر واتساب</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="inline-flex min-h-[48px] cursor-not-allowed items-center gap-2.5 rounded-xl bg-[var(--brand-burgundy)]/45 px-6 py-3 text-sm font-semibold text-white sm:text-base"
                        >
                          <Lock className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                          <span>إرسال تفاصيل الحجز عبر واتساب</span>
                        </button>
                      )}
                    </div>

                    {!isAllValid && (
                      <div className="flex items-start gap-2 rounded-xl border border-[var(--brand-burgundy)]/20 bg-[var(--brand-burgundy)]/5 px-4 py-2.5 text-xs text-[var(--brand-burgundy)] sm:text-sm">
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0"
                          strokeWidth={1.5}
                        />
                        <p>
                          يرجى استكمال الحقول التالية لتفعيل زر الحجز:{" "}
                          <span className="font-semibold">
                            {missingItems.join("، ")}
                          </span>
                          .
                        </p>
                      </div>
                    )}
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
