"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { UtensilsCrossed, Leaf, HandHeart, Star, ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const features = [
  {
    icon: Leaf,
    title: "مكوّنات طازجة",
    text: "نختار أجود المكوّنات يومياً من السوق المحلي لنضمن لك طعماً أصيلاً.",
  },
  {
    icon: HandHeart,
    title: "وصفات بيتية",
    text: "أطباق فلسطينية تتوارثها الأجيال، نطبخها بحب كما في بيت الجدّة.",
  },
  {
    icon: UtensilsCrossed,
    title: "تجربة عصرية",
    text: "اطلب أونلاين بسهولة وتابع طلبك، براحة تامة ومن أي مكان.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden tatreez-soft">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-sand/40 to-cream" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-center md:text-right"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-flag-green/10 px-4 py-1.5 text-sm font-semibold text-flag-green">
              <Star className="h-4 w-4 fill-flag-green" /> مطبخ فلسطيني أصيل
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-olive-900 md:text-6xl">
              نكهة <span className="text-gradient">يافا</span> على
              <br /> مائدتك
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-olive-700 md:mx-0">
              من قلب فلسطين إلى صحنك — أطباق شعبية تجمع دفء البيت وعراقة التراث،
              محضّرة بحب وبأجود المكوّنات.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-clay-600 px-7 py-3.5 font-bold text-white shadow-soft transition hover:bg-clay-700"
              >
                تصفّح المنيو
                <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-olive-300 px-7 py-3.5 font-bold text-olive-800 transition hover:bg-olive-100"
              >
                تعرّف علينا
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto"
          >
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-clay-200/40 blur-3xl" />
            <div className="relative mx-auto aspect-square w-72 overflow-hidden rounded-[2.5rem] ring-8 ring-white shadow-soft md:w-96 animate-float">
              <Image
                src="/logo.jpeg"
                alt="شعار مطعم يافا"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-olive-100"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-clay-50 p-3 text-clay-600">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-olive-900">{f.title}</h3>
              <p className="leading-relaxed text-olive-600">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden bg-olive-900 text-white">
        <div className="tatreez-band" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              قصّتنا تبدأ من <span className="text-clay-400">يافا</span>
            </h2>
            <p className="mt-5 leading-loose text-olive-200">
              في مطعم يافا نؤمن أن الطعام ذاكرة ووطن. نقدّم لك أطباقاً فلسطينية
              أصيلة — من المسخّن والمقلوبة إلى المسبّحة والكنافة — محضّرة بوصفات
              توارثناها جيلاً بعد جيل، لتعيش معنا حكاية النكهة الفلسطينية الحقيقية.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                ["+20", "صنف شعبي"],
                ["+5000", "عميل سعيد"],
                ["100%", "مكوّنات طازجة"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-olive-800/60 px-2 py-4">
                  <p className="font-display text-2xl font-extrabold text-clay-400">{n}</p>
                  <p className="mt-1 text-xs text-olive-300">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto aspect-[4/5] w-72 overflow-hidden rounded-[2rem] ring-4 ring-clay-500/40 md:w-80"
          >
            <Image src="/logo.jpeg" alt="مطعم يافا" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center md:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="font-display text-3xl font-extrabold text-olive-900 md:text-4xl">
            جاهز تتذوّق يافا؟
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-olive-600">
            تصفّح المنيو واطلب أطباقك المفضّلة الآن — تسجيل الدخول مطلوب فقط عند
            إتمام الطلب.
          </p>
          <Link
            href="/menu"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-clay-600 px-8 py-4 font-bold text-white shadow-soft transition hover:bg-clay-700"
          >
            اطلب الآن
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
