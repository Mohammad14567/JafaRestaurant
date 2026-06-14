import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="mt-20 bg-olive-900 text-olive-100">
      <div className="tatreez-band" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-clay-400">
              <Image src="/logo.jpeg" alt="مطعم يافا" fill className="object-cover" />
            </span>
            <div>
              <p className="font-display text-xl font-extrabold text-white">مطعم يافا</p>
              <p className="text-xs tracking-widest text-olive-300">JAFA RESTAURANT</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-olive-300">
            نكهة فلسطينية أصيلة تجمع دفء البيت وعراقة المطبخ الشعبي، نقدّمها لك
            بحب من قلب فلسطين.
          </p>
          <p className="mt-3 text-sm text-olive-300">
            صاحب المطعم: <span className="font-semibold text-white">صلاح راعي</span>
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-white">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-olive-200">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay-400" />
              <span>فلسطين - قلقيلية - الشارع الغربي، بجانب عمارة حسن القبعة</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-clay-400" />
              <a href="tel:+5342550599" className="hover:text-white">+53 42 550599</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-clay-400" /> يومياً ١٠ صباحاً – ١٢ منتصف الليل
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold text-white">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-olive-200">
            <li><Link href="/menu" className="hover:text-white">المنيو</Link></li>
            <li><Link href="/login" className="hover:text-white">تسجيل الدخول</Link></li>
            <li><Link href="/cart" className="hover:text-white">سلة الطلبات</Link></li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=100063592714808"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-olive-800 p-2.5 transition hover:bg-clay-600"
              aria-label="فيسبوك"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-olive-800 py-5 text-center text-xs text-olive-400">
        © {new Date().getFullYear()} مطعم يافا — جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
