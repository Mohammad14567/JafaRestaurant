"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Mail, Lock, User as UserIcon, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { signIn, signUp, ready } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/menu";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const friendly = (code: string) => {
    if (code.includes("invalid-credential") || code.includes("wrong-password"))
      return "البريد أو كلمة المرور غير صحيحة";
    if (code.includes("email-already-in-use")) return "هذا البريد مسجّل مسبقاً";
    if (code.includes("weak-password")) return "كلمة المرور ضعيفة (6 أحرف على الأقل)";
    if (code.includes("invalid-email")) return "صيغة البريد غير صحيحة";
    return "حدث خطأ، حاول مرة أخرى";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
        toast.success("أهلاً بعودتك!");
      } else {
        await signUp(name, email, password);
        toast.success("تم إنشاء حسابك بنجاح!");
      }
      router.push(redirect);
    } catch (err: any) {
      toast.error(friendly(String(err?.code || err?.message || "")));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-14">
      <span className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-clay-200 shadow-soft">
        <Image src="/logo.jpeg" alt="مطعم يافا" fill className="object-cover" />
      </span>
      <h1 className="mt-5 font-display text-3xl font-extrabold text-olive-900">
        {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
      </h1>
      <p className="mt-2 text-center text-sm text-olive-600">
        سجّل دخولك لإتمام طلبك من مطعم يافا.
      </p>

      {!ready && (
        <div className="mt-6 flex items-start gap-2 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-amber-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <span>Firebase غير مهيأ بعد — أضف بياناته في ملف .env.local لتفعيل تسجيل الدخول.</span>
        </div>
      )}

      <form onSubmit={submit} className="mt-7 w-full space-y-4">
        {mode === "register" && (
          <Field
            icon={<UserIcon className="h-5 w-5" />}
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={setName}
            required
          />
        )}
        <Field
          icon={<Mail className="h-5 w-5" />}
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={setEmail}
          required
        />
        <Field
          icon={<Lock className="h-5 w-5" />}
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={setPassword}
          required
        />

        <button
          type="submit"
          disabled={busy || !ready}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-clay-600 py-3.5 font-bold text-white shadow-soft transition hover:bg-clay-700 disabled:opacity-60"
        >
          {busy && <Loader2 className="h-5 w-5 animate-spin" />}
          {mode === "login" ? "دخول" : "إنشاء الحساب"}
        </button>
      </form>

      <p className="mt-6 text-sm text-olive-600">
        {mode === "login" ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="font-bold text-clay-700 hover:underline"
        >
          {mode === "login" ? "أنشئ حساباً" : "سجّل دخولك"}
        </button>
      </p>

      <Link href="/menu" className="mt-3 text-xs text-olive-400 hover:text-olive-600">
        المتابعة كزائر وتصفّح المنيو
      </Link>
    </div>
  );
}

function Field({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 ring-1 ring-olive-200 focus-within:ring-2 focus-within:ring-clay-400">
      <span className="text-olive-400">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent py-3.5 text-olive-900 outline-none placeholder:text-olive-400"
      />
    </div>
  );
}
