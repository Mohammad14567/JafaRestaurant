"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import { useCart, type MenuItem } from "@/lib/cart-context";
import { Plus, UtensilsCrossed, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function MenuPage() {
  const { add } = useCart();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string>("الكل");

  useEffect(() => {
    if (!firebaseEnabled || !db) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, "menu"), orderBy("createdAt", "desc"));
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

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.category && set.add(i.category));
    return ["الكل", ...Array.from(set)];
  }, [items]);

  const shown = active === "الكل" ? items : items.filter((i) => i.category === active);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
      <header className="text-center">
        <h1 className="font-display text-4xl font-extrabold text-olive-900">منيو يافا</h1>
        <p className="mx-auto mt-3 max-w-lg text-olive-600">
          اختر أطباقك المفضّلة من تشكيلتنا الفلسطينية الأصيلة.
        </p>
        <div className="tatreez-band mx-auto mt-5 w-40" />
      </header>

      {/* category filter */}
      {categories.length > 1 && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                active === c
                  ? "bg-clay-600 text-white"
                  : "bg-white text-olive-700 ring-1 ring-olive-200 hover:bg-olive-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* states */}
      {!firebaseEnabled && (
        <div className="mx-auto mt-12 max-w-xl rounded-3xl bg-amber-50 p-8 text-center ring-1 ring-amber-200">
          <AlertCircle className="mx-auto h-10 w-10 text-amber-500" />
          <p className="mt-3 font-bold text-amber-800">لم يتم إعداد Firebase بعد</p>
          <p className="mt-2 text-sm text-amber-700">
            أضف بيانات مشروعك في ملف <code>.env.local</code> ليتمكن صاحب المطعم من
            إضافة الأصناف وعرضها هنا.
          </p>
        </div>
      )}

      {firebaseEnabled && loading && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-olive-100/60" />
          ))}
        </div>
      )}

      {firebaseEnabled && !loading && shown.length === 0 && (
        <div className="mx-auto mt-12 max-w-md rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-olive-100">
          <UtensilsCrossed className="mx-auto h-12 w-12 text-olive-300" />
          <p className="mt-4 font-bold text-olive-800">المنيو قيد التحضير</p>
          <p className="mt-2 text-sm text-olive-500">
            لم يُضِف صاحب المطعم أي أصناف بعد — تابعنا قريباً!
          </p>
        </div>
      )}

      {/* grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <article
            key={item.id}
            className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-olive-100 transition hover:shadow-soft"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-olive-50">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-olive-200">
                  <UtensilsCrossed className="h-14 w-14" />
                </div>
              )}
              {item.category && (
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-clay-700">
                  {item.category}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold text-olive-900">{item.name}</h3>
              {item.description && (
                <p className="mt-1 line-clamp-2 text-sm text-olive-500">
                  {item.description}
                </p>
              )}
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="font-display text-xl font-extrabold text-clay-700">
                  {item.price} ₪
                </span>
                <button
                  onClick={() => {
                    add(item);
                    toast.success(`أُضيف ${item.name} إلى السلة`);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-clay-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-clay-700"
                >
                  <Plus className="h-4 w-4" /> أضف
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
