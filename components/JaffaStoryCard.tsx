"use client";

export default function JaffaStoryCard() {
  return (
    <div className="relative w-full max-w-[430px] mx-auto rounded-[30px] overflow-hidden p-4 sm:p-8 md:p-[60px] flex justify-center"
      style={{
        background: "radial-gradient(circle at 82% 26%, rgba(216, 74, 54, 0.07), transparent 52%), linear-gradient(rgb(251, 248, 241), rgb(240, 235, 222))",
      }}
    >
      <div className="relative w-full max-w-[430px]">
        {/* Top-left floating badge - hidden on small mobile */}
        <div className="animate-jc-floatY absolute top-[10px] sm:top-[30px] left-[-10px] sm:left-[-18px] z-[6] bg-[rgb(251,248,241)] rounded-2xl p-2 sm:p-[11px_15px] flex items-center gap-2 sm:gap-[11px] shadow-lg"
          style={{ boxShadow: "rgba(120, 90, 40, 0.22) 0px 18px 40px" }}
        >
          <span className="w-[28px] h-[28px] sm:w-[34px] sm:h-[34px] rounded-full bg-[rgb(253,238,233)] grid place-items-center text-[13px] sm:text-[15px] text-[rgb(210,74,54)]">
            ⚓
          </span>
          <div className="text-right">
            <div className="text-[11px] sm:text-[13px] font-extrabold text-[rgb(43,44,28)]">مدينتنا الأم</div>
            <div className="text-[9px] sm:text-[11px] font-bold text-[rgb(192,57,43)]">على ساحل المتوسط</div>
          </div>
        </div>

        {/* Bottom-right floating badge - hidden on small mobile */}
        <div className="animate-jc-floatYsm absolute bottom-[20px] sm:bottom-[36px] right-[-10px] sm:right-[-16px] z-[6] bg-[rgb(251,248,241)] rounded-2xl p-2 sm:p-[11px_15px] flex items-center gap-2 sm:gap-[11px] shadow-lg"
          style={{ boxShadow: "rgba(120, 90, 40, 0.22) 0px 18px 40px", animationDelay: "1s" }}
        >
          <div className="text-right">
            <div className="text-[11px] sm:text-[13px] font-extrabold text-[rgb(43,44,28)]">تراث بحري</div>
            <div className="text-[9px] sm:text-[11px] font-bold text-[rgb(47,125,91)]">عراقة وأصالة</div>
          </div>
          <span className="w-[28px] h-[28px] sm:w-[34px] sm:h-[34px] rounded-full bg-[rgb(233,243,236)] grid place-items-center text-[13px] sm:text-[15px] text-[rgb(47,125,91)]">
            ❖
          </span>
        </div>

        {/* Main Card */}
        <div className="relative w-full aspect-[3/4] rounded-[28px] overflow-hidden shadow-2xl border-[6px] border-[rgb(251,248,241)]"
          style={{ outline: "rgba(192, 57, 43, 0.2) solid 1px" }}
        >
          {/* Background image */}
          <div className="absolute inset-0 bg-cover bg-center animate-jc-kenburns"
            style={{ backgroundImage: "url(/hero-logo.jpg)", animation: "jc-kenburns 22s ease-in-out infinite" }}
          />

          {/* Overlays */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(rgba(40, 38, 18, 0.18) 0%, rgba(40, 38, 18, 0) 32%, rgba(33, 32, 14, 0.55) 72%, rgba(25, 24, 10, 0.86) 100%)" }}
          />
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 28% 24%, rgba(230, 181, 62, 0.16), transparent 45%)", mixBlendMode: "screen" }}
          />

          {/* Pulse glow */}
          <div className="animate-jc-pulseGlow absolute top-[44px] left-[42px] w-[70px] h-[70px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255, 228, 160, 0.9), rgba(230, 181, 62, 0.25) 55%, transparent 72%)" }}
          />

          {/* Sheen effect */}
          <div className="animate-jc-sheen absolute top-0 bottom-0 w-[70px] left-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent)", animationDelay: "2s" }}
          />

          {/* Twinkle stars */}
          <span className="animate-jc-twinkle absolute top-[120px] right-[60px] w-[5px] h-[5px] rounded-full bg-white" style={{ animationDelay: "0s" }} />
          <span className="animate-jc-twinkle absolute top-[90px] right-[120px] w-[4px] h-[4px] rounded-full" style={{ background: "rgb(255, 231, 168)", animationDelay: "1s" }} />

          {/* Corner borders */}
          <div className="absolute top-[14px] right-[14px] w-[26px] h-[26px] rounded-[3px]"
            style={{ borderTop: "3px solid rgb(230, 181, 62)", borderRight: "3px solid rgb(230, 181, 62)" }}
          />
          <div className="absolute top-[14px] left-[14px] w-[26px] h-[26px] rounded-[3px]"
            style={{ borderTop: "3px solid rgb(230, 181, 62)", borderLeft: "3px solid rgb(230, 181, 62)" }}
          />

          {/* Spinning badge */}
          <div className="absolute top-[22px] right-[22px] z-[5] w-[78px] h-[78px]">
            <div className="animate-jc-spin absolute inset-0 rounded-full"
              style={{ border: "2px dashed rgba(251, 248, 241, 0.85)", animationDuration: "24s" }}
            />
            <div className="absolute inset-[9px] rounded-full flex flex-col items-center justify-center text-[rgb(251,248,241)]"
              style={{ background: "rgba(192, 57, 43, 0.92)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 8px 20px" }}
            >
              <span className="font-[Lalezar] text-[22px] leading-none">يافا</span>
              <span className="text-[8px] font-extrabold tracking-[2px]">EST · 1799</span>
            </div>
          </div>

          {/* Top label */}
          <div className="absolute top-[26px] left-0 right-0 text-center z-[4]">
            <span className="inline-block text-[11px] font-extrabold tracking-[3px] text-[rgb(251,248,241)]"
              style={{ textShadow: "rgba(0, 0, 0, 0.5) 0px 2px 8px" }}
            >
              فلسطين · عروس البحر
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute left-0 right-0 bottom-[60px] sm:bottom-[96px] text-center z-[4] px-[18px]">
            <div className="animate-jc-floatYsm font-[Lalezar] text-[clamp(36px,15vw,88px)] leading-[0.92] text-[rgb(251,248,241)]"
              style={{ textShadow: "rgba(0, 0, 0, 0.55) 0px 6px 26px" }}
            >
              يافا
            </div>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="h-[1px] w-[40px] bg-[rgba(251,248,241,0.6)]" />
              <span className="text-[14px] font-extrabold tracking-[8px] text-[rgb(251,248,241)] pr-2">JAFFA</span>
              <span className="h-[1px] w-[40px] bg-[rgba(251,248,241,0.6)]" />
            </div>
            <p className="mt-3 mx-auto max-w-[280px] text-[13px] font-semibold leading-[1.7] text-[rgb(240,236,224)]"
              style={{ textShadow: "rgba(0, 0, 0, 0.6) 0px 2px 10px" }}
            >
              من ميناء يافا العتيق بدأت الحكاية — نكهة تحمل رائحة البحر وعراقة المدينة.
            </p>
          </div>

          {/* Wave animation */}
          <div className="absolute left-0 right-0 bottom-0 h-[54px] overflow-hidden z-[3]">
            <div className="animate-jc-wave absolute bottom-0 left-0 w-[300%] h-full"
              style={{ background: "repeating-linear-gradient(90deg, rgba(47, 125, 91, 0) 0px, rgba(120, 190, 170, 0.35) 22px, rgba(47, 125, 91, 0) 44px)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-full"
              style={{ background: "linear-gradient(transparent, rgba(20, 40, 40, 0.5))" }}
            />
          </div>

          {/* Tatreez border at bottom */}
          <div className="absolute left-0 right-0 bottom-0 h-[10px] z-[4]"
            style={{
              backgroundImage: "linear-gradient(45deg, transparent 44%, rgb(192, 57, 43) 44%, rgb(192, 57, 43) 56%, transparent 56%), linear-gradient(-45deg, transparent 44%, rgb(192, 57, 43) 44%, rgb(192, 57, 43) 56%, transparent 56%)",
              backgroundSize: "14px 14px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
