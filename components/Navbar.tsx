"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingBag, Menu as MenuIcon, X, LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/menu", label: "المنيو" },
  { href: "/#about", label: "عن المطعم" },
  { href: "/#contact", label: "تواصل" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAdmin, signOut } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-olive-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-clay-200 shadow-sm">
            <Image src="/logo.jpeg" alt="مطعم يافا" fill className="object-cover" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-extrabold text-clay-700">
              مطعم يافا
            </span>
            <span className="block text-[11px] tracking-widest text-olive-600">
              JAFA RESTAURANT
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pathname === l.href
                  ? "bg-clay-600 text-white"
                  : "text-olive-800 hover:bg-olive-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative rounded-full p-2.5 text-olive-800 transition hover:bg-olive-100"
            aria-label="السلة"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-clay-600 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="hidden rounded-full p-2.5 text-flag-green transition hover:bg-olive-100 sm:block"
              aria-label="لوحة التحكم"
              title="لوحة التحكم"
            >
              <LayoutDashboard className="h-5 w-5" />
            </Link>
          )}

          {user ? (
            <button
              onClick={() => signOut()}
              className="hidden items-center gap-1.5 rounded-full bg-olive-100 px-3 py-2 text-sm font-semibold text-olive-800 transition hover:bg-olive-200 sm:flex"
            >
              <LogOut className="h-4 w-4" />
              خروج
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-full bg-clay-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-clay-700 sm:flex"
            >
              <UserIcon className="h-4 w-4" />
              دخول
            </Link>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2.5 text-olive-800 hover:bg-olive-100 md:hidden"
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-olive-100 bg-cream px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 font-semibold text-olive-800 hover:bg-olive-100"
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 font-semibold text-flag-green hover:bg-olive-100"
              >
                لوحة التحكم
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="mt-1 rounded-xl bg-olive-100 px-4 py-2.5 text-right font-semibold text-olive-800"
              >
                تسجيل الخروج
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl bg-clay-600 px-4 py-2.5 text-center font-semibold text-white"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      )}
      <div className="tatreez-band" />
    </header>
  );
}
