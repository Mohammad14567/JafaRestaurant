"use client";

import Image from "next/image";

export default function JaffaStoryCard() {
  return (
    <div className="relative w-full mx-auto rounded-[28px] overflow-hidden shadow-2xl" style={{ aspectRatio: "3/4" }}>
      {/* Background image - Jaffa city */}
      <div className="absolute inset-0">
        <Image
          src="/hero-logo.jpg"
          alt="يافا"
          fill
          className="object-cover animate-jc-kenburns"
          style={{ animation: "jc-kenburns 22s ease-in-out infinite" }}
        />
      </div>

      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(40, 38, 18, 0.18) 0%, rgba(40, 38, 18, 0) 32%, rgba(33, 32, 14, 0.55) 72%, rgba(25, 24, 10, 0.86) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 28% 24%, rgba(230, 181, 62, 0.16), transparent 45%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
