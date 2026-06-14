"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import { useCart, type MenuItem } from "@/lib/cart-context";
import {
  UtensilsCrossed,
  Leaf,
  HandHeart,
  Star,
  ArrowLeft,
  ChevronLeft,
  Plus,
  Sparkles,
  Flame,
  Clock,
  ChefHat,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
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
  const { add } = useCart();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseEnabled || !db) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, "menu"), orderBy("createdAt", "desc"), limit(3));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setItems(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MenuItem, "id">) }))
        );
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-olive-900">
        {/* Decorative overlay pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-olive-900 via-olive-800 to-olive-900" />
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-clay-600/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-flag-green/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-center md:text-right"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-clay-300 backdrop-blur-sm border border-white/10">
              <Sparkles className="h-4 w-4 fill-clay-300" /> مطبخ فلسطيني أصيل
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.15] text-white md:text-7xl">
              نكهة <span className="text-gradient-hero">يافا</span> على
              <br /> مائدتك
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-olive-200 md:mx-0">
              من قلب فلسطين إلى صحنك — أطباق شعبية تجمع دفء البيت وعراقة التراث،
              محضّرة بحب وبأجود المكوّنات.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-clay-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-clay-600/25 transition-all hover:bg-clay-500 hover:scale-105 hover:shadow-xl hover:shadow-clay-600/30"
              >
                تصفّح المنيو
                <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-7 py-3.5 font-bold text-white transition hover:bg-white/10 hover:border-white/30"
              >
                تعرّف علينا
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto"
          >
            <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-clay-600/20 blur-3xl" />
            <div className="relative mx-auto aspect-square w-72 overflow-hidden rounded-[2.5rem] ring-4 ring-white/10 shadow-2xl md:w-96 animate-float">
              <Image
                src="/logo.jpeg"
                alt="شعار مطعم يافا"
                fill
                priority
                className="object-cover"
              />
              {/* Overlay gradient on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-olive-900/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-xl md:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-clay-100 text-clay-600">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-olive-800">أطباق شعبية</p>
                  <p className="text-[10px] text-olive-500">محضّرة بالطريقة الأصيلة</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 -right-4 rounded-2xl bg-white p-4 shadow-xl md:-right-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-flag-green/10 text-flag-green">
                  <Star className="h-5 w-5 fill-flag-green" />
                </div>
                <div>
                  <p className="text-xs font-bold text-olive-800">تقييم ممتاز</p>
                  <p className="text-[10px] text-olive-500">+5000 عميل سعيد</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#faf6ef"
            />
          </svg>
        </div>
      </section>

      {/* FEATURED MEALS */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-clay-50 px-4 py-1.5 text-sm font-semibold text-clay-700 border border-clay-100">
            <ChefHat className="h-4 w-4" /> أشهر الأطباق
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-olive-900 md:text-4xl">
            نكهات لا تُنسى من <span className="text-clay-600">منيو يافا</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-olive-600">
            اكتشف أشهر أطباقنا المختارة بعناية — من المطبخ الفلسطيني الأصيل إلى مائدتك.
          </p>
          <div className="tatreez-band mx-auto mt-5 w-40" />
        </motion.div>

        {/* Loading state */}
        {firebaseEnabled && loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-clay-600" />
              <p className="text-sm text-olive-500">جاري تحميل الأطباق...</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {firebaseEnabled && !loading && items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-md rounded-3xl bg-white p-12 text-center shadow-card ring-1 ring-olive-100"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-olive-50">
              <UtensilsCrossed className="h-10 w-10 text-olive-300" />
            </div>
            <p className="mt-6 font-bold text-xl text-olive-800">المنيو قيد التحضير</p>
            <p className="mt-2 text-sm text-olive-500 leading-relaxed">
              لم يُضِف صاحب المطعم أي أصناف بعد — تابعنا قريباً لاكتشاف أشهى الأطباق الفلسطينية!
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-olive-400">
              <Clock className="h-4 w-4" />
              <span>سيتم إضافة الأطباق قريباً</span>
            </div>
          </motion.div>
        )}

        {/* Featured meals grid */}
        {items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <motion.article
                key={item.id}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={scaleIn}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-olive-100 transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-olive-50">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-olive-50 to-olive-100 text-olive-300">
                      <UtensilsCrossed className="h-14 w-14 mb-2" />
                      <span className="text-xs text-olive-400">صورة الطبق</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  {item.category && (
                    <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-clay-700 shadow-sm backdrop-blur-sm">
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-olive-900 group-hover:text-clay-700 transition-colors">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-olive-500 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="font-display text-2xl font-extrabold text-clay-700">
                      {item.price} <span className="text-sm font-semibold text-olive-500">₪</span>
                    </span>
                    <button
                      onClick={() => {
                        add(item);
                        toast.success(`أُضيف ${item.name} إلى السلة`);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-clay-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-clay-500 hover:scale-105 active:scale-95 shadow-sm"
                    >
                      <Plus className="h-4 w-4" /> أضف
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Discover more button */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 rounded-full bg-olive-800 px-8 py-4 font-bold text-white shadow-lg shadow-olive-800/20 transition-all hover:bg-olive-700 hover:scale-105 hover:shadow-xl"
            >
              اكتشف المزيد
              <ChevronLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
            </Link>
          </motion.div>
        )}
      </section>

      {/* FEATURES */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-olive-50 px-4 py-1.5 text-sm font-semibold text-olive-700 border border-olive-100">
              <Star className="h-4 w-4 fill-olive-700" /> لماذا يافا؟
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-olive-900 md:text-4xl">
              تجربة فريدة في كل طبق
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-3xl bg-cream p-8 shadow-card ring-1 ring-olive-100 transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-clay-50 p-4 text-clay-600 ring-1 ring-clay-100">
                  <f.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-olive-900">{f.title}</h3>
                <p className="leading-relaxed text-olive-600">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOD GALLERY / PALESTINIAN ATMOSPHERE */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-olive-900 via-olive-800 to-olive-900" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-clay-300 border border-white/10">
              <Image src="/logo.jpeg" alt="" width={20} height={20} className="rounded-full" /> أجواء فلسطينية
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white md:text-4xl">
              لحظات من <span className="text-clay-400">المطبخ الفلسطيني</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-olive-200">
              صور من أطباقنا و أجواء مطعم يافا — دفء البيت و عبق التراث في كل زاوية.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              { span: "col-span-2 row-span-2", label: "المسخّن الفلسطيني", desc: "طبقنا المميز" },
              { span: "", label: "المقلوبة", desc: "كلاسيكي" },
              { span: "", label: "الكنافة", desc: "حلويات" },
              { span: "col-span-2", label: "المسبحة", desc: "إفطار فلسطيني" },
              { span: "", label: "الفتّوش", desc: "سلطات طازجة" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group relative overflow-hidden rounded-2xl bg-olive-800 ring-1 ring-white/10 ${img.span || "aspect-square"}`}
              >
                {/* Placeholder for food image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-olive-800 to-olive-900">
                  <UtensilsCrossed className="h-12 w-12 text-olive-600 mb-3" />
                  <span className="text-sm font-bold text-olive-400">{img.label}</span>
                  <span className="text-xs text-olive-600 mt-1">{img.desc}</span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-bold text-white">{img.label}</p>
                  <p className="text-xs text-white/70">{img.desc}</p>
                </div>
                {/* Empty indicator */}
                <div className="absolute top-3 right-3 rounded-full bg-black/30 px-2 py-1 text-[10px] text-white/70 backdrop-blur-sm">
                  أضف صورة
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-clay-50/50 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-olive-50/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="order-2 md:order-1"
          >
            <h2 className="font-display text-3xl font-extrabold text-olive-900 md:text-4xl leading-tight">
              قصّتنا تبدأ من <span className="text-clay-600">يافا</span>
            </h2>
            <p className="mt-5 leading-loose text-olive-600 text-lg">
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
                <motion.div
                  key={l}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl bg-cream p-5 ring-1 ring-olive-100 shadow-sm transition-all hover:shadow-card"
                >
                  <p className="font-display text-3xl font-extrabold text-clay-600">{n}</p>
                  <p className="mt-1 text-sm text-olive-500 font-medium">{l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto order-1 md:order-2"
          >
            <div className="absolute inset-0 -z-10 scale-105 rounded-[2rem] bg-clay-200/30 blur-2xl" />
            <div className="relative mx-auto aspect-[4/5] w-72 overflow-hidden rounded-[2rem] ring-4 ring-clay-100/50 shadow-2xl md:w-80">
              <Image src="/logo.jpeg" alt="مطعم يافا" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-900/20 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-clay-100/50 blur-xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-olive-100/50 blur-xl" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        </div>
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-clay-600/10 blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative mx-auto max-w-3xl px-6 text-center md:px-8"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
            <Sparkles className="h-8 w-8 text-clay-300" />
          </div>
          <h2 className="font-display text-3xl font-extrabold text-white md:text-5xl leading-tight">
            جاهز تتذوّق <span className="text-clay-400">يافا</span>؟
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-olive-200">
            تصفّح المنيو واطلب أطباقك المفضّلة الآن — تسجيل الدخول مطلوب فقط عند
            إتمام الطلب.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 rounded-full bg-clay-600 px-8 py-4 font-bold text-white shadow-lg shadow-clay-600/25 transition-all hover:bg-clay-500 hover:scale-105 hover:shadow-xl"
            >
              اطلب الآن
              <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              تسجيل الدخول
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
