export type CertificateCategory =
  | "الدرجات الأكاديمية"
  | "الإرشاد الأسري والزواجي"
  | "علم النفس الإيجابي والكوتشينج"
  | "التخاطب والتربية الخاصة"
  | "التدريب TOT والتطوير";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: CertificateCategory;
  description: string;
  thumbSrc: string;
  fullSrc: string;
}

export const CERTIFICATE_CATEGORIES: Array<"الكل" | CertificateCategory> = [
  "الكل",
  "الدرجات الأكاديمية",
  "الإرشاد الأسري والزواجي",
  "علم النفس الإيجابي والكوتشينج",
  "التخاطب والتربية الخاصة",
  "التدريب TOT والتطوير",
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-10",
    title: "درجة دكتوراه الفلسفة في التربية — تخصص الصحة النفسية",
    issuer: "كلية التربية — جامعة حلوان",
    year: "2026",
    category: "الدرجات الأكاديمية",
    description:
      "رسالة الدكتوراه في الرشاقة المعرفية والحيوية النفسية وشغف العمل بتقدير ممتاز.",
    thumbSrc: "/certificates/cert-10-thumb.webp",
    fullSrc: "/certificates/cert-10-full.webp",
  },
  {
    id: "cert-09",
    title: "درجة الماجستير في التربية — تخصص الصحة النفسية",
    issuer: "كلية التربية — جامعة حلوان",
    year: "2023",
    category: "الدرجات الأكاديمية",
    description:
      "رسالة الماجستير في النهوض الأكاديمي ومواجهة الضغوط النفسية بتقدير ممتاز.",
    thumbSrc: "/certificates/cert-09-thumb.webp",
    fullSrc: "/certificates/cert-09-full.webp",
  },
  {
    id: "cert-18",
    title: "الماجستير المصغر المهني في الإرشاد الأسري والزواجي",
    issuer: "كلية تكساس الدولية (Texas International College USA)",
    year: "2023",
    category: "الإرشاد الأسري والزواجي",
    description:
      "برنامج تخصصي لمدة 6 أشهر في الإرشاد الأسري والزواجي بتقدير ممتاز ونسبة 92%.",
    thumbSrc: "/certificates/cert-18-thumb.webp",
    fullSrc: "/certificates/cert-18-full.webp",
  },
  {
    id: "cert-19",
    title: "السجل الأكاديمي الرسمي — الماجستير المصغر بالإرشاد الأسري",
    issuer: "كلية تكساس الدولية (Texas International College USA)",
    year: "2023",
    category: "الإرشاد الأسري والزواجي",
    description:
      "كشف المقررات المعتمدة في الإرشاد الأسري المتقدم، ما قبل الزواج، ومعايير التشخيص.",
    thumbSrc: "/certificates/cert-19-thumb.webp",
    fullSrc: "/certificates/cert-19-full.webp",
  },
  {
    id: "cert-14",
    title: "ممارس معتمد في علم النفس الإيجابي",
    issuer: "البورد الأمريكي (American Board)",
    year: "2022",
    category: "علم النفس الإيجابي والكوتشينج",
    description:
      "برنامج تدريبي شامل في تطبيقات علم النفس الإيجابي وبناء المرونة النفسية.",
    thumbSrc: "/certificates/cert-14-thumb.webp",
    fullSrc: "/certificates/cert-14-full.webp",
  },
  {
    id: "cert-16",
    title: "لايف كوتش معتمد في العلاقات الأسرية والاجتماعية",
    issuer: "البورد الأمريكي (American Board)",
    year: "2022",
    category: "علم النفس الإيجابي والكوتشينج",
    description:
      "تأهيل مهني شامل في كوتشينج العلاقات وبناء التواصل الصحي المتوازن.",
    thumbSrc: "/certificates/cert-16-thumb.webp",
    fullSrc: "/certificates/cert-16-full.webp",
  },
  {
    id: "cert-15",
    title: "ممارس علم النفس الإيجابي (ICF CCE)",
    issuer: "مدرسة ويزدوم للكوتشينج (Wisdom Coaching School)",
    year: "2022",
    category: "علم النفس الإيجابي والكوتشينج",
    description:
      "شهادة إتمام معتمدة من الاتحاد الدولي للكوتشينج في تقنيات علم النفس الإيجابي.",
    thumbSrc: "/certificates/cert-15-thumb.webp",
    fullSrc: "/certificates/cert-15-full.webp",
  },
  {
    id: "cert-17",
    title: "كوتشينج العلاقات والجماعات (ICF CCE)",
    issuer: "مدرسة ويزدوم للكوتشينج (Wisdom Coaching School)",
    year: "2022",
    category: "علم النفس الإيجابي والكوتشينج",
    description:
      "20 ساعة تعليمية معتمدة في مهارات وفنون كوتشينج العلاقات والمجموعات.",
    thumbSrc: "/certificates/cert-17-thumb.webp",
    fullSrc: "/certificates/cert-17-full.webp",
  },
  {
    id: "cert-12",
    title: "الدبلوم المهني في علاج التخاطب (Speech Therapist)",
    issuer: "البورد الألماني للاستشارات والتدريب",
    year: "2022",
    category: "التخاطب والتربية الخاصة",
    description:
      "دبلوم مهني دولي في تشخيص وعلاج اضطرابات النطق والكلام لمدة 60 ساعة.",
    thumbSrc: "/certificates/cert-12-thumb.webp",
    fullSrc: "/certificates/cert-12-full.webp",
  },
  {
    id: "cert-05",
    title: "الدبلوم المهني في إعداد أخصائي التخاطب",
    issuer: "فريق رواد مصر 2030 (التضامن) والبورد الألماني",
    year: "2022",
    category: "التخاطب والتربية الخاصة",
    description:
      "تأهيل عملي ونظري في التخاطب وتنمية المهارات لمدة 60 ساعة بتقدير امتياز.",
    thumbSrc: "/certificates/cert-05-thumb.webp",
    fullSrc: "/certificates/cert-05-full.webp",
  },
  {
    id: "cert-13",
    title: "الدبلوم المهني في تدريب المدربين (TOT)",
    issuer: "الجامعة الأمريكية للعلوم — ولاية أوريغون",
    year: "2022",
    category: "التدريب TOT والتطوير",
    description:
      "اعتماد دولي في تصميم الحقائب التدريبية وتقديم التدريب الاحترافي بتقدير جيد جداً.",
    thumbSrc: "/certificates/cert-13-thumb.webp",
    fullSrc: "/certificates/cert-13-full.webp",
  },
  {
    id: "cert-04",
    title: "الدبلومة المهنية لإعداد المدربين (TOT)",
    issuer: "مركز التعليم الافتراضي والجامعة الأمريكية للعلوم",
    year: "2022",
    category: "التدريب TOT والتطوير",
    description:
      "برنامج احترافي معتمد لإعداد وتأهيل المدربين بنظام 24 ساعة معتمدة.",
    thumbSrc: "/certificates/cert-04-thumb.webp",
    fullSrc: "/certificates/cert-04-full.webp",
  },
  {
    id: "cert-01",
    title: "دبلومة المقبلين على الزواج (120 ساعة تدريبية)",
    issuer: "مؤسسة ذاتك ومكتبة مصر العامة",
    year: "2023",
    category: "الإرشاد الأسري والزواجي",
    description:
      "إعداد وتأهيل المقبلين على الزواج وبناء أسرة مستقرة بتقدير امتياز.",
    thumbSrc: "/certificates/cert-01-thumb.webp",
    fullSrc: "/certificates/cert-01-full.webp",
  },
  {
    id: "cert-07",
    title: "دبلومة العلاجات النفسية (80 ساعة تدريبية)",
    issuer: "مؤسسة ذاتك — وزارة التضامن الاجتماعي",
    year: "2023",
    category: "الدرجات الأكاديمية",
    description:
      "تدريب متخصص في المدارس والأساليب العلاجية النفسية بتقدير امتياز.",
    thumbSrc: "/certificates/cert-07-thumb.webp",
    fullSrc: "/certificates/cert-07-full.webp",
  },
  {
    id: "cert-08",
    title: "دبلومة المقاييس النفسية (80 ساعة تدريبية)",
    issuer: "مؤسسة ذاتك — وزارة التضامن الاجتماعي",
    year: "2023",
    category: "الدرجات الأكاديمية",
    description:
      "تطبيق وتفسير الاختبارات والمقاييس النفسية التشخيصية بتقدير امتياز.",
    thumbSrc: "/certificates/cert-08-thumb.webp",
    fullSrc: "/certificates/cert-08-full.webp",
  },
  {
    id: "cert-06",
    title: "دبلومة المناهج البحثية (80 ساعة تدريبية)",
    issuer: "مؤسسة ذاتك — وزارة التضامن الاجتماعي",
    year: "2023",
    category: "التدريب TOT والتطوير",
    description:
      "إعداد وتصميم المناهج البحثية والأسس العلمية للدراسات النفسية بتقدير امتياز.",
    thumbSrc: "/certificates/cert-06-thumb.webp",
    fullSrc: "/certificates/cert-06-full.webp",
  },
  {
    id: "cert-03",
    title: "الدبلوم المهني في التربية — تخصص الإرشاد النفسي",
    issuer: "كلية التربية — جامعة حلوان",
    year: "2021",
    category: "الدرجات الأكاديمية",
    description:
      "دبلوم الدراسات العليا في الإرشاد النفسي والتوجيه التربوي بتقدير ممتاز.",
    thumbSrc: "/certificates/cert-03-thumb.webp",
    fullSrc: "/certificates/cert-03-full.webp",
  },
  {
    id: "cert-11",
    title: "شهادة أساسيات التحول الرقمي (FDTC)",
    issuer: "المجلس الأعلى للجامعات — جامعة حلوان",
    year: "2021",
    category: "التدريب TOT والتطوير",
    description:
      "اعتماد الكفاءة الرقمية وتطبيقات التكنولوجيا التعليمية من مركز الخدمات المعرفية.",
    thumbSrc: "/certificates/cert-11-thumb.webp",
    fullSrc: "/certificates/cert-11-full.webp",
  },
  {
    id: "cert-02",
    title: "ليسانس الآداب والتربية — اللغة العربية والدراسات الإسلامية",
    issuer: "كلية التربية — جامعة حلوان",
    year: "2007",
    category: "الدرجات الأكاديمية",
    description:
      "الدرجة الجامعية الأولى من كلية التربية بجامعة حلوان بتقدير عام جيد.",
    thumbSrc: "/certificates/cert-02-thumb.webp",
    fullSrc: "/certificates/cert-02-full.webp",
  },
];
