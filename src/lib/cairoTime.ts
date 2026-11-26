import { BranchInfo } from "@/data/centerData";

export interface CairoBranchStatus {
  isOpen: boolean;
  badgeText: string;
  detailText: string;
}

const ARABIC_DAYS: Record<number, string> = {
  0: "الأحد",
  1: "الإثنين",
  2: "الثلاثاء",
  3: "الأربعاء",
  4: "الخميس",
  5: "الجمعة",
  6: "السبت",
};

const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function getCairoNowParts(date: Date = new Date()): {
  dayIndex: number;
  hour: number;
  minute: number;
} {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Cairo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const weekdayStr = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hourStr = parts.find((p) => p.type === "hour")?.value ?? "0";
  const minuteStr = parts.find((p) => p.type === "minute")?.value ?? "0";

  const parsedHour = Number.parseInt(hourStr, 10);
  return {
    dayIndex: WEEKDAY_MAP[weekdayStr] ?? 0,
    hour: parsedHour === 24 ? 0 : parsedHour,
    minute: Number.parseInt(minuteStr, 10) || 0,
  };
}

function formatArabicHour(hour24: number): string {
  if (hour24 === 12) return "12 ظهراً";
  if (hour24 > 12) return `${hour24 - 12} مساءً`;
  return `${hour24} صباحاً`;
}

export function getBranchLiveStatus(
  branch: BranchInfo,
  now: Date = new Date()
): CairoBranchStatus {
  if (branch.id === "online") {
    return {
      isOpen: true,
      badgeText: "متاح للحجز المسبق",
      detailText: "تنسيق مرن للمواعيد عبر واتساب بتوقيت القاهرة",
    };
  }

  const { dayIndex, hour, minute } = getCairoNowParts(now);
  const currentMinutes = hour * 60 + minute;
  const openMinutes = branch.openHour * 60;
  const closeMinutes = branch.closeHour * 60;

  const isTodayOpenDay = branch.openDays.includes(dayIndex);

  if (
    isTodayOpenDay &&
    currentMinutes >= openMinutes &&
    currentMinutes < closeMinutes
  ) {
    return {
      isOpen: true,
      badgeText: `مفتوح الآن حتى ${formatArabicHour(branch.closeHour)}`,
      detailText: "توقيت القاهرة الحالي داخل ساعات العمل",
    };
  }

  if (isTodayOpenDay && currentMinutes < openMinutes) {
    return {
      isOpen: false,
      badgeText: `يفتح اليوم ${formatArabicHour(branch.openHour)}`,
      detailText: `ساعات العمل اليوم: ${branch.hoursAr}`,
    };
  }

  // Find next open day
  for (let offset = 1; offset <= 7; offset++) {
    const candidateDay = (dayIndex + offset) % 7;
    if (branch.openDays.includes(candidateDay)) {
      const dayLabel = offset === 1 ? "غداً" : ARABIC_DAYS[candidateDay];
      return {
        isOpen: false,
        badgeText: `أقرب ميعاد متاح: ${dayLabel} ${formatArabicHour(branch.openHour)}`,
        detailText: `أيام العمل: ${branch.daysAr}`,
      };
    }
  }

  return {
    isOpen: false,
    badgeText: `المواعيد: ${branch.daysAr}`,
    detailText: branch.hoursAr,
  };
}
