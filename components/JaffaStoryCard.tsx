"use client";

export default function JaffaStoryCard() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "30px",
        overflow: "hidden",
        background: "radial-gradient(circle at 82% 26%, rgba(216, 74, 54, 0.07), transparent 52%), linear-gradient(rgb(251, 248, 241), rgb(240, 235, 222))",
        padding: "60px 30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "430px",
          maxWidth: "100%",
        }}
      >
        {/* Top-left floating badge */}
        <div
          className="animate-jc-floatY"
          style={{
            position: "absolute",
            top: "30px",
            left: "-18px",
            zIndex: 6,
            background: "rgb(251, 248, 241)",
            borderRadius: "16px",
            padding: "11px 15px",
            display: "flex",
            alignItems: "center",
            gap: "11px",
            boxShadow: "rgba(120, 90, 40, 0.22) 0px 18px 40px",
          }}
        >
          <span
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgb(253, 238, 233)",
              display: "grid",
              placeItems: "center",
              fontSize: "15px",
              color: "rgb(210, 74, 54)",
            }}
          >
            ⚓
          </span>
          <div style={{ textAlign: "right" as const }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "rgb(43, 44, 28)" }}>
              مدينتنا الأم
            </div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "rgb(192, 57, 43)" }}>
              على ساحل المتوسط
            </div>
          </div>
        </div>

        {/* Bottom-right floating badge */}
        <div
          className="animate-jc-floatYsm"
          style={{
            position: "absolute",
            bottom: "36px",
            right: "-16px",
            zIndex: 6,
            background: "rgb(251, 248, 241)",
            borderRadius: "16px",
            padding: "11px 15px",
            display: "flex",
            alignItems: "center",
            gap: "11px",
            boxShadow: "rgba(120, 90, 40, 0.22) 0px 18px 40px",
            animationDelay: "1s",
          }}
        >
          <div style={{ textAlign: "right" as const }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "rgb(43, 44, 28)" }}>
              تراث بحري
            </div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "rgb(47, 125, 91)" }}>
              عراقة وأصالة
            </div>
          </div>
          <span
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgb(233, 243, 236)",
              display: "grid",
              placeItems: "center",
              fontSize: "15px",
              color: "rgb(47, 125, 91)",
            }}
          >
            ❖
          </span>
        </div>

        {/* Main Card */}
        <div
          style={{
            position: "relative",
            height: "560px",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "rgba(80, 60, 30, 0.3) 0px 40px 90px",
            border: "6px solid rgb(251, 248, 241)",
            outline: "rgba(192, 57, 43, 0.2) solid 1px",
          }}
        >
      {/* Background image - Jaffa city */}
      <img
        src="./hero-logo.jpg"
        alt="يافا"
        className="absolute inset-0 w-full h-full object-cover animate-jc-kenburns"
        style={{
          animation: "jc-kenburns 22s ease-in-out infinite",
        }}
      />

          {/* Overlays */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(40, 38, 18, 0.18) 0%, rgba(40, 38, 18, 0) 32%, rgba(33, 32, 14, 0.55) 72%, rgba(25, 24, 10, 0.86) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 28% 24%, rgba(230, 181, 62, 0.16), transparent 45%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Pulse glow */}
          <div
            className="animate-jc-pulseGlow"
            style={{
              position: "absolute",
              top: "44px",
              left: "42px",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255, 228, 160, 0.9), rgba(230, 181, 62, 0.25) 55%, transparent 72%)",
            }}
          />

          {/* Sheen effect */}
          <div
            className="animate-jc-sheen"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "70px",
              left: 0,
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent)",
              pointerEvents: "none",
              animationDelay: "2s",
            }}
          />

          {/* Twinkle stars */}
          <span
            className="animate-jc-twinkle"
            style={{
              position: "absolute",
              top: "120px",
              right: "60px",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgb(255, 255, 255)",
              animationDelay: "0s",
            }}
          />
          <span
            className="animate-jc-twinkle"
            style={{
              position: "absolute",
              top: "90px",
              right: "120px",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "rgb(255, 231, 168)",
              animationDelay: "1s",
            }}
          />

          {/* Corner borders */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              width: "26px",
              height: "26px",
              borderTop: "3px solid rgb(230, 181, 62)",
              borderRight: "3px solid rgb(230, 181, 62)",
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "14px",
              width: "26px",
              height: "26px",
              borderTop: "3px solid rgb(230, 181, 62)",
              borderLeft: "3px solid rgb(230, 181, 62)",
              borderRadius: "3px",
            }}
          />

          {/* Spinning badge */}
          <div
            style={{
              position: "absolute",
              top: "22px",
              right: "22px",
              zIndex: 5,
              width: "78px",
              height: "78px",
            }}
          >
            <div
              className="animate-jc-spin"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px dashed rgba(251, 248, 241, 0.85)",
                animationDuration: "24s",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "9px",
                borderRadius: "50%",
                background: "rgba(192, 57, 43, 0.92)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "rgb(251, 248, 241)",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 8px 20px",
              }}
            >
              <span style={{ fontFamily: "Lalezar, cursive", fontSize: "22px", lineHeight: 1 }}>
                يافا
              </span>
              <span style={{ fontSize: "8px", fontWeight: 800, letterSpacing: "2px" }}>
                EST · 1799
              </span>
            </div>
          </div>

          {/* Top label */}
          <div
            style={{
              position: "absolute",
              top: "26px",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 4,
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "3px",
                color: "rgb(251, 248, 241)",
                textShadow: "rgba(0, 0, 0, 0.5) 0px 2px 8px",
              }}
            >
              فلسطين · عروس البحر
            </span>
          </div>

          {/* Bottom content */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "96px",
              textAlign: "center",
              zIndex: 4,
              padding: "0 18px",
            }}
          >
            <div
              className="animate-jc-floatYsm"
              style={{
                fontFamily: "Lalezar, cursive",
                fontSize: "88px",
                lineHeight: 0.92,
                color: "rgb(251, 248, 241)",
                textShadow: "rgba(0, 0, 0, 0.55) 0px 6px 26px",
              }}
            >
              يافا
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              <span style={{ height: "1px", width: "40px", background: "rgba(251, 248, 241, 0.6)" }} />
              <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "8px", color: "rgb(251, 248, 241)", paddingRight: "8px" }}>
                JAFFA
              </span>
              <span style={{ height: "1px", width: "40px", background: "rgba(251, 248, 241, 0.6)" }} />
            </div>
            <p
              style={{
                margin: "12px auto 0",
                maxWidth: "280px",
                fontSize: "13px",
                fontWeight: 600,
                lineHeight: 1.7,
                color: "rgb(240, 236, 224)",
                textShadow: "rgba(0, 0, 0, 0.6) 0px 2px 10px",
              }}
            >
              من ميناء يافا العتيق بدأت الحكاية — نكهة تحمل رائحة البحر وعراقة المدينة.
            </p>
          </div>

          {/* Wave animation */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "54px",
              overflow: "hidden",
              zIndex: 3,
            }}
          >
            <div
              className="animate-jc-wave"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "300%",
                height: "100%",
                background: "repeating-linear-gradient(90deg, rgba(47, 125, 91, 0) 0px, rgba(120, 190, 170, 0.35) 22px, rgba(47, 125, 91, 0) 44px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100%",
                background: "linear-gradient(transparent, rgba(20, 40, 40, 0.5))",
              }}
            />
          </div>

          {/* Tatreez border at bottom */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "10px",
              zIndex: 4,
              backgroundImage:
                "linear-gradient(45deg, transparent 44%, rgb(192, 57, 43) 44%, rgb(192, 57, 43) 56%, transparent 56%), linear-gradient(-45deg, transparent 44%, rgb(192, 57, 43) 44%, rgb(192, 57, 43) 56%, transparent 56%)",
              backgroundSize: "14px 14px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
