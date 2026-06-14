"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { lines, total, setQty, remove, clear } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);

  const checkout = async () => {
    if (!user) {
      toast("يرجى تسجيل الدخول لإتمام الطلب", { icon: "🔒" });
      router.push("/login?redirect=/cart");
      return;
    }
    if (!firebaseEnabled || !db) {
      toast.error("الطلب غير متاح — Firebase غير مهيأ");
      return;
    }
    if (!phone.trim()) {
      toast.error("أدخل رقم هاتفك للتواصل");
      return;
    }
    setBusy(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        customerName: user.displayName || "زائر",
        customerEmail: user.email,
        phone: phone.trim(),
        note: note.trim(),
        items: lines.map((l) => ({
          id: l.id,
          name: l.name,
          price: l.price,
          qty: l.qty,
        })),
        total,
        status: "new",
        createdAt: serverTimestamp(),
      });
      clear();
      toast.success("تم استلام طلبك! سنتواصل معك قريباً 🌿");
      router.push("/");
    } catch (e) {
      toast.error("تعذّر إرسال الطلب، حاول مجدداً");
    } finally {
      setBusy(false);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-olive-200" />
        <h1 className="mt-5 font-display text-2xl font-extrabold text-olive-900">
          سلتك فارغة
        </h1>
        <p className="mt-2 text-olive-600">أضف بعض الأطباق الشهية من المنيو.</p>
        <Link
          href="/menu"
          className="mt-6 rounded-full bg-clay-600 px-7 py-3 font-bold text-white transition hover:bg-clay-700"
        >
          تصفّح المنيو
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-8">
      <h1 className="font-display text-3xl font-extrabold text-olive-900">سلة الطلبات</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* items */}
        <div className="space-y-4 lg:col-span-2">
          {lines.map((l) => (
            <div
              key={l.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-olive-100"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-olive-50">
                {l.image ? (
                  <Image src={l.image} alt={l.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-olive-200">
                    <ShoppingBag className="h-7 w-7" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-olive-900">{l.name}</h3>
                <p className="text-sm text-clay-700">{l.price} ₪</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(l.id, l.qty - 1)}
                  className="rounded-full bg-olive-100 p-1.5 text-olive-700 hover:bg-olive-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-bold">{l.qty}</span>
                <button
                  onClick={() => setQty(l.id, l.qty + 1)}
                  className="rounded-full bg-olive-100 p-1.5 text-olive-700 hover:bg-olive-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => remove(l.id)}
                className="rounded-full p-2 text-clay-400 hover:bg-clay-50 hover:text-clay-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* summary */}
        <div className="h-fit rounded-3xl bg-white p-6 shadow-card ring-1 ring-olive-100">
          <h2 className="text-lg font-bold text-olive-900">ملخّص الطلب</h2>
          <div className="mt-4 space-y-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="رقم الهاتف"
              className="w-full rounded-xl bg-cream px-4 py-3 text-sm outline-none ring-1 ring-olive-200 focus:ring-2 focus:ring-clay-400"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="ملاحظات (اختياري)"
              rows={3}
              className="w-full resize-none rounded-xl bg-cream px-4 py-3 text-sm outline-none ring-1 ring-olive-200 focus:ring-2 focus:ring-clay-400"
            />
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-olive-100 pt-4">
            <span className="text-olive-600">الإجمالي</span>
            <span className="font-display text-2xl font-extrabold text-clay-700">
              {total} ₪
            </span>
          </div>
          <button
            onClick={checkout}
            disabled={busy}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-flag-green py-3.5 font-bold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {busy && <Loader2 className="h-5 w-5 animate-spin" />}
            {user ? "تأكيد الطلب" : "سجّل الدخول لإتمام الطلب"}
          </button>
          {!user && (
            <p className="mt-3 text-center text-xs text-olive-500">
              التصفّح متاح للجميع، لكن إتمام الطلب يتطلب تسجيل الدخول.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
