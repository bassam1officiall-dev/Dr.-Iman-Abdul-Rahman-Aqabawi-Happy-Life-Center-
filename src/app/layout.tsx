import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Amiri } from "next/font/google";
import "./globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "د. إيمان عبد الرحمن عقباوي | مركز الحياة السعيدة للاستشارات النفسية والسلوكية والتربوية",
  description:
    "مركز الحياة السعيدة للاستشارات النفسية والسلوكية والتربوية بإدارة د. إيمان عبد الرحمن عقباوي (دكتوراه في الصحة النفسية والتربية الخاصة ودكتوراه في الإرشاد الأسري، ماجستير CBT والمقاييس النفسية والإرشاد الزواجي، عضو هيئة تدريس منتدب) — علاج ADHD للأطفال والكبار، تعديل السلوك، وصعوبات التعلم في البدرشين وفيصل وأونلاين.",
  keywords: [
    "دكتورة إيمان عقباوي",
    "د إيمان عبد الرحمن عقباوي",
    "مركز الحياة السعيدة البدرشين",
    "علاج ADHD فيصل والبدرشين",
    "تعديل سلوك أطفال الجيزة",
    "استشاري نفسي وأسري البدرشين",
    "دكتوراه الصحة النفسية والتربية الخاصة",
    "العلاج المعرفي السلوكي CBT",
    "تحسين الوظائف التنفيذية",
    "صعوبات تعلم وتخاطب الجيزة",
    "تدريب عملي تربية خاصة وتخاطب",
  ],
  openGraph: {
    title:
      "د. إيمان عبد الرحمن عقباوي | مركز الحياة السعيدة للاستشارات النفسية والسلوكية والتربوية",
    description:
      "دكتوراه في الصحة النفسية والتربية الخاصة والإرشاد الأسري — استشارات نفسية وأسرية، تشخيص تفريقي وعلاج ADHD للأطفال والكبار، وتعديل السلوك في البدرشين وفيصل وأونلاين.",
    locale: "ar_EG",
    type: "website",
    siteName: "مركز الحياة السعيدة",
  },
  twitter: {
    card: "summary_large_image",
    title: "د. إيمان عبد الرحمن عقباوي | مركز الحياة السعيدة",
    description:
      "دكتوراه في الصحة النفسية والتربية الخاصة والإرشاد الأسري — استشاري علاج ADHD والعلاقات الأسرية وتعديل السلوك في البدرشين وفيصل وأونلاين.",
  },
};

const medicalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "مركز الحياة السعيدة للاستشارات النفسية والسلوكية والتربوية — د. إيمان عبد الرحمن عقباوي",
  alternateName: "AL HAYAT AL SAEDA CENTER",
  description:
    "مركز متخصص بإدارة د. إيمان عبد الرحمن عقباوي (دكتوراه في الصحة النفسية والتربية الخاصة ودكتوراه في الإرشاد الأسري، ماجستير العلاج النفسي CBT والمقاييس النفسية والإرشاد الزواجي، عضو هيئة تدريس منتدب) — تشخيص وعلاج ADHD للأطفال والكبار، تحسين الوظائف التنفيذية، تعديل السلوك، صعوبات التعلم، والتدريب العملي للخريجات.",
  telephone: "+201030003844",
  medicalSpecialty: ["Psychology", "BehavioralTherapy", "FamilyCounseling"],
  areaServed: ["البدرشين", "فيصل", "الجيزة", "مصر", "أونلاين"],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61554604286869",
    "https://www.facebook.com/ayman.bdalrhmn.qbawy",
  ],
  department: [
    {
      "@type": "MedicalClinic",
      name: "مركز الحياة السعيدة — فرع البدرشين",
      telephone: "+201030003844",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "بجوار بنك مصر الإسلامي الجديد، أبراج الحاج سهيل بجوار مستشفى البدرشين العام / أرض صليبة بجوار برج الصفا ٢",
        addressLocality: "البدرشين",
        addressRegion: "الجيزة",
        addressCountry: "EG",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Friday", "Saturday"],
          opens: "11:00",
          closes: "18:00",
        },
      ],
    },
    {
      "@type": "MedicalClinic",
      name: "مركز الحياة السعيدة — فرع فيصل",
      telephone: "+201030003844",
      address: {
        "@type": "PostalAddress",
        streetAddress: "شارع المطبعة — فوق كشري التحرير",
        addressLocality: "فيصل",
        addressRegion: "الجيزة",
        addressCountry: "EG",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Wednesday"],
          opens: "12:00",
          closes: "18:00",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar-EG"
      dir="rtl"
      className={`${ibmPlexArabic.variable} ${amiri.variable}`}
    >
      <body className="font-ui bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased selection:bg-[var(--brand-burgundy)] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(medicalBusinessJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
