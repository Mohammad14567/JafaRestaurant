"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import {
  Loader2,
  ShieldAlert,
  Trash2,
  Plus,
  ClipboardList,
  UtensilsCrossed,
  Phone,
  CheckCircle2,
  Clock,
  ImageIcon,
  Pencil,
  X,
  GripVertical,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

interface OrderDoc {
  id: string;
  customerName?: string;
  customerEmail?: string;
  phone?: string;
  note?: string;
  total?: number;
  status?: string;
  items?: { name: string; qty: number; price: number }[];
  createdAt?: { seconds: number } | null;
}

interface MenuRow {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
}

interface GalleryRow {
  id: string;
  image: string;
  label: string;
  description: string;
  order: number;
  span?: string;
}

export default function AdminPage() {
  const { user, isAdmin, loading, ready } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"orders" | "menu" | "gallery">("orders");

  // gate
  if (!loading && ready && !user) {
    router.push("/login?redirect=/admin");
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-clay-600" />
      </div>
    );
  }

  if (!ready) {
    return (
      <Gate
        title="Firebase غير مهيأ"
        text="أضف بيانات مشروعك في ملف .env.local لتفعيل لوحة التحكم."
      />
    );
  }

  if (!isAdmin) {
    return (
      <Gate
        title="هذه الصفحة لصاحب المطعم فقط"
        text="حسابك لا يملك صلاحية الوصول إلى لوحة التحكم."
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-olive-900">لوحة التحكم</h1>
          <p className="mt-1 text-sm text-olive-600">أهلاً {user?.displayName || "صاحب المطعم"} 👋</p>
        </div>
        <div className="flex gap-2 rounded-full bg-white p-1 shadow-card ring-1 ring-olive-100">
          <TabBtn active={tab === "orders"} onClick={() => setTab("orders")} icon={<ClipboardList className="h-4 w-4" />}>
            الطلبات
          </TabBtn>
          <TabBtn active={tab === "menu"} onClick={() => setTab("menu")} icon={<UtensilsCrossed className="h-4 w-4" />}>
            المنيو
          </TabBtn>
          <TabBtn active={tab === "gallery"} onClick={() => setTab("gallery")} icon={<ImageIcon className="h-4 w-4" />}>
            المعرض
          </TabBtn>
        </div>
      </div>

      <div className="mt-8">
        {tab === "orders" && <OrdersPanel />}
        {tab === "menu" && <MenuPanel />}
        {tab === "gallery" && <GalleryPanel />}
      </div>
    </div>
  );
}

/* ----------------------------- Orders ----------------------------- */
function OrdersPanel() {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<OrderDoc, "id">) })));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const done = async (id: string) => {
    if (!db) return;
    if (!confirm("إنهاء هذا الطلب وحذفه نهائياً من قاعدة البيانات؟")) return;
    try {
      await deleteDoc(doc(db, "orders", id));
      toast.success("تم إنهاء الطلب وحذفه");
    } catch {
      toast.error("تعذّر الحذف");
    }
  };

  const markPreparing = async (id: string) => {
    if (!db) return;
    await updateDoc(doc(db, "orders", id), { status: "preparing" });
  };

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-clay-600" /></div>;
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-card ring-1 ring-olive-100">
        <ClipboardList className="mx-auto h-12 w-12 text-olive-200" />
        <p className="mt-4 font-bold text-olive-800">لا توجد طلبات حالياً</p>
        <p className="mt-1 text-sm text-olive-500">ستظهر الطلبات الجديدة هنا فوراً.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {orders.map((o) => (
        <div key={o.id} className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-olive-100">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-olive-900">{o.customerName}</h3>
              <p className="text-xs text-olive-500">{o.customerEmail}</p>
            </div>
            <span
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                o.status === "preparing"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-flag-green/10 text-flag-green"
              }`}
            >
              {o.status === "preparing" ? <Clock className="h-3 w-3" /> : <span className="h-2 w-2 rounded-full bg-flag-green" />}
              {o.status === "preparing" ? "قيد التحضير" : "جديد"}
            </span>
          </div>

          {o.phone && (
            <a href={`tel:${o.phone}`} className="mt-2 inline-flex items-center gap-1.5 text-sm text-clay-700">
              <Phone className="h-4 w-4" /> {o.phone}
            </a>
          )}

          <ul className="mt-3 divide-y divide-olive-50 rounded-2xl bg-cream/60 px-4 py-2">
            {o.items?.map((it, i) => (
              <li key={i} className="flex justify-between py-2 text-sm">
                <span className="text-olive-700">{it.name} × {it.qty}</span>
                <span className="font-semibold text-olive-900">{it.price * it.qty} ₪</span>
              </li>
            ))}
          </ul>

          {o.note && (
            <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
              📝 {o.note}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-xl font-extrabold text-clay-700">{o.total} ₪</span>
            <div className="flex gap-2">
              {o.status !== "preparing" && (
                <button
                  onClick={() => markPreparing(o.id)}
                  className="rounded-full bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-200"
                >
                  بدء التحضير
                </button>
              )}
              <button
                onClick={() => done(o.id)}
                className="inline-flex items-center gap-1.5 rounded-full bg-flag-green px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4" /> إنهاء وحذف
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Menu ------------------------------ */
function MenuPanel() {
  const [items, setItems] = useState<MenuRow[]>([]);
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "", image: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "menu"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MenuRow, "id">) })))
    );
  }, []);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    if (!form.name || !form.price) {
      toast.error("الاسم والسعر مطلوبان");
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, "menu"), {
        name: form.name.trim(),
        price: Number(form.price),
        category: form.category.trim() || "أطباق",
        description: form.description.trim(),
        image: form.image.trim(),
        createdAt: serverTimestamp(),
      });
      setForm({ name: "", price: "", category: "", description: "", image: "" });
      toast.success("تمت إضافة الصنف");
    } catch {
      toast.error("تعذّرت الإضافة");
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: string) => {
    if (!db) return;
    if (!confirm("حذف هذا الصنف من المنيو؟")) return;
    await deleteDoc(doc(db, "menu", id));
    toast.success("تم الحذف");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* form */}
      <form
        onSubmit={addItem}
        className="h-fit space-y-3 rounded-3xl bg-white p-6 shadow-card ring-1 ring-olive-100 lg:col-span-2"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-olive-900">
          <Plus className="h-5 w-5 text-clay-600" /> إضافة صنف جديد
        </h2>
        <Input label="اسم الصنف" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="السعر (₪)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
          <Input label="التصنيف" value={form.category} onChange={(v) => setForm({ ...form, category: v })} placeholder="مثال: مشاوي" />
        </div>
        <Input label="رابط الصورة (اختياري)" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://..." />
        <div>
          <label className="mb-1 block text-sm font-semibold text-olive-700">الوصف</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full resize-none rounded-xl bg-cream px-4 py-2.5 text-sm outline-none ring-1 ring-olive-200 focus:ring-2 focus:ring-clay-400"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-clay-600 py-3 font-bold text-white transition hover:bg-clay-700 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-5 w-5 animate-spin" />}
          إضافة إلى المنيو
        </button>
      </form>

      {/* list */}
      <div className="space-y-3 lg:col-span-3">
        {items.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-olive-100">
            <UtensilsCrossed className="mx-auto h-10 w-10 text-olive-200" />
            <p className="mt-3 text-sm text-olive-500">لم تُضِف أي أصناف بعد.</p>
          </div>
        ) : (
          items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card ring-1 ring-olive-100"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-olive-900">{it.name}</h3>
                  {it.category && (
                    <span className="rounded-full bg-olive-100 px-2 py-0.5 text-xs text-olive-600">
                      {it.category}
                    </span>
                  )}
                </div>
                {it.description && <p className="mt-0.5 line-clamp-1 text-sm text-olive-500">{it.description}</p>}
              </div>
              <span className="font-display text-lg font-extrabold text-clay-700">{it.price} ₪</span>
              <button
                onClick={() => del(it.id)}
                className="rounded-full p-2 text-clay-400 hover:bg-clay-50 hover:text-clay-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Gallery ------------------------------ */
function GalleryPanel() {
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [form, setForm] = useState({ image: "", label: "", description: "", order: "0", span: "" });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ image: "", label: "", description: "", order: "0", span: "" });

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "gallery"), orderBy("order", "asc"));
    return onSnapshot(q, (snap) =>
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryRow, "id">) })))
    );
  }, []);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    if (!form.label || !form.image) {
      toast.error("اسم الصورة والرابط مطلوبان");
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, "gallery"), {
        image: form.image.trim(),
        label: form.label.trim(),
        description: form.description.trim(),
        order: Number(form.order) || 0,
        span: form.span.trim(),
        createdAt: serverTimestamp(),
      });
      setForm({ image: "", label: "", description: "", order: "0", span: "" });
      toast.success("تمت إضافة الصورة");
    } catch {
      toast.error("تعذّرت الإضافة");
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: string) => {
    if (!db) return;
    if (!confirm("حذف هذه الصورة من المعرض؟")) return;
    await deleteDoc(doc(db, "gallery", id));
    toast.success("تم الحذف");
  };

  const startEdit = (item: GalleryRow) => {
    setEditing(item.id);
    setEditForm({
      image: item.image || "",
      label: item.label || "",
      description: item.description || "",
      order: String(item.order ?? 0),
      span: item.span || "",
    });
  };

  const saveEdit = async (id: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, "gallery", id), {
        image: editForm.image.trim(),
        label: editForm.label.trim(),
        description: editForm.description.trim(),
        order: Number(editForm.order) || 0,
        span: editForm.span.trim(),
      });
      setEditing(null);
      toast.success("تم التحديث");
    } catch {
      toast.error("تعذّر التحديث");
    }
  };

  const spanOptions = [
    { value: "", label: "عادي (1x1)" },
    { value: "col-span-2", label: "عريض (2x1)" },
    { value: "row-span-2", label: "طويل (1x2)" },
    { value: "col-span-2 row-span-2", label: "كبير (2x2)" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* form */}
      <form
        onSubmit={addItem}
        className="h-fit space-y-3 rounded-3xl bg-white p-6 shadow-card ring-1 ring-olive-100 lg:col-span-2"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-olive-900">
          <Plus className="h-5 w-5 text-clay-600" /> إضافة صورة للمعرض
        </h2>
        <Input label="اسم / وصف الصورة" value={form.label} onChange={(v) => setForm({ ...form, label: v })} placeholder="مثال: المسخّن الفلسطيني" />
        <Input label="رابط الصورة" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://..." />
        <Input label="وصف فرعي" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="مثال: طبقنا المميز" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="الترتيب (رقم)" type="number" value={form.order} onChange={(v) => setForm({ ...form, order: v })} placeholder="0" />
          <div>
            <label className="mb-1 block text-sm font-semibold text-olive-700">حجم البطاقة</label>
            <select
              value={form.span}
              onChange={(e) => setForm({ ...form, span: e.target.value })}
              className="w-full rounded-xl bg-cream px-4 py-2.5 text-sm outline-none ring-1 ring-olive-200 focus:ring-2 focus:ring-clay-400"
            >
              {spanOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-clay-600 py-3 font-bold text-white transition hover:bg-clay-700 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-5 w-5 animate-spin" />}
          إضافة إلى المعرض
        </button>
      </form>

      {/* list */}
      <div className="space-y-3 lg:col-span-3">
        {items.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-olive-100">
            <ImageIcon className="mx-auto h-10 w-10 text-olive-200" />
            <p className="mt-3 text-sm text-olive-500">لم تُضِف أي صور للمعرض بعد.</p>
          </div>
        ) : (
          items.map((it) => (
            <div key={it.id} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-olive-100">
              {editing === it.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="" value={editForm.label} onChange={(v) => setEditForm({ ...editForm, label: v })} placeholder="الاسم" />
                    <Input label="" value={editForm.image} onChange={(v) => setEditForm({ ...editForm, image: v })} placeholder="رابط الصورة" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Input label="" value={editForm.description} onChange={(v) => setEditForm({ ...editForm, description: v })} placeholder="وصف فرعي" />
                    <Input label="" type="number" value={editForm.order} onChange={(v) => setEditForm({ ...editForm, order: v })} placeholder="ترتيب" />
                    <div>
                      <select
                        value={editForm.span}
                        onChange={(e) => setEditForm({ ...editForm, span: e.target.value })}
                        className="w-full rounded-xl bg-cream px-3 py-2.5 text-sm outline-none ring-1 ring-olive-200 focus:ring-2 focus:ring-clay-400"
                      >
                        {spanOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(it.id)} className="inline-flex items-center gap-1.5 rounded-full bg-flag-green px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                      <Save className="h-4 w-4" /> حفظ
                    </button>
                    <button onClick={() => setEditing(null)} className="inline-flex items-center gap-1.5 rounded-full bg-olive-100 px-4 py-2 text-sm font-semibold text-olive-700 hover:bg-olive-200">
                      <X className="h-4 w-4" /> إلغاء
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-olive-50 ring-1 ring-olive-100">
                    {it.image ? (
                      <img src={it.image} alt={it.label} className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-olive-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-olive-900">{it.label}</h3>
                      {it.span && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                          {spanOptions.find(o => o.value === it.span)?.label || it.span}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-olive-500">{it.description}</p>
                    <p className="text-[10px] text-olive-400 mt-0.5">الترتيب: {it.order}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(it)} className="rounded-full p-2 text-olive-400 hover:bg-olive-50 hover:text-olive-600">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => del(it.id)} className="rounded-full p-2 text-clay-400 hover:bg-clay-50 hover:text-clay-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ----------------------------- helpers ----------------------------- */
function Gate({ title, text }: { title: string; text: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
      <ShieldAlert className="h-14 w-14 text-clay-400" />
      <h1 className="mt-4 font-display text-2xl font-extrabold text-olive-900">{title}</h1>
      <p className="mt-2 text-olive-600">{text}</p>
      <Link href="/" className="mt-6 rounded-full bg-clay-600 px-6 py-3 font-bold text-white hover:bg-clay-700">
        العودة للرئيسية
      </Link>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-clay-600 text-white" : "text-olive-700 hover:bg-olive-50"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      {label && <label className="mb-1 block text-sm font-semibold text-olive-700">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-cream px-4 py-2.5 text-sm outline-none ring-1 ring-olive-200 focus:ring-2 focus:ring-clay-400"
      />
    </div>
  );
}
