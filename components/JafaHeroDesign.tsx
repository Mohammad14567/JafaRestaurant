"use client";

export default function JafaHeroDesign() {
  return (
    <div
      className="jafa-hero-design-wrap"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        padding: "32px 16px",
      }}
    >
      <div
        className="jafa-hero-design-card"
        style={{
          position: "relative",
          width: "470px",
          maxWidth: "100%",
        }}
      >
        {/* Top-right floating badge */}
        <div
          className="animate-jc-floatY"
          style={{
            position: "absolute",
            top: "22px",
            right: "-14px",
            zIndex: 6,
            background: "rgb(251, 248, 241)",
            borderRadius: "16px",
            padding: "11px 15px",
            display: "flex",
            alignItems: "center",
            gap: "11px",
            boxShadow: "rgba(0, 0, 0, 0.28) 0px 18px 40px",
          }}
        >
          <div style={{ textAlign: "right" as const }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "rgb(43, 44, 28)" }}>
              طبخ على مهل
            </div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "rgb(192, 57, 43)" }}>
              نار هادئة · نكهة أعمق
            </div>
          </div>
          <span
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgb(253, 238, 233)",
              display: "grid",
              placeItems: "center",
              fontSize: "16px",
              color: "rgb(210, 74, 54)",
            }}
          >
            ◗
          </span>
        </div>

        {/* Bottom-left floating badge */}
        <div
          className="animate-jc-floatYsm"
          style={{
            position: "absolute",
            bottom: "30px",
            left: "-18px",
            zIndex: 6,
            background: "rgb(251, 248, 241)",
            borderRadius: "16px",
            padding: "11px 15px",
            display: "flex",
            alignItems: "center",
            gap: "11px",
            boxShadow: "rgba(0, 0, 0, 0.28) 0px 18px 40px",
            animationDelay: "0.8s",
          }}
        >
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
            ✦
          </span>
          <div style={{ textAlign: "right" as const }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "rgb(43, 44, 28)" }}>
              وصفات موروثة
            </div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "rgb(47, 125, 91)" }}>
              من جيل إلى جيل
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div
          style={{
            position: "relative",
            borderRadius: "28px",
            padding: "30px 26px 26px",
            background: "linear-gradient(168deg, rgb(69, 57, 31) 0%, rgb(45, 41, 19) 58%, rgb(33, 29, 14) 100%)",
            border: "1px solid rgba(230, 181, 62, 0.28)",
            boxShadow: "rgba(0, 0, 0, 0.45) 0px 40px 90px, rgba(245, 239, 225, 0.07) 0px 1px 0px inset",
            overflow: "hidden",
          }}
        >
          {/* Pulse glow behind */}
          <div
            className="animate-jc-pulseGlow"
            style={{
              position: "absolute",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "340px",
              height: "340px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(216, 120, 60, 0.32), transparent 65%)",
              pointerEvents: "none",
            }}
          />

          {/* Sheen effect */}
          <div
            className="animate-jc-sheen"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "60px",
              left: 0,
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent)",
              pointerEvents: "none",
              animationDelay: "1s",
            }}
          />

          {/* Tatreez border */}
          <div
            style={{
              height: "16px",
              borderRadius: "6px",
              marginBottom: "18px",
              position: "relative",
              zIndex: 2,
              backgroundImage:
                "linear-gradient(45deg, transparent 44%, rgb(192, 57, 43) 44%, rgb(192, 57, 43) 56%, transparent 56%), linear-gradient(-45deg, transparent 44%, rgb(192, 57, 43) 44%, rgb(192, 57, 43) 56%, transparent 56%), linear-gradient(45deg, transparent 46%, rgb(230, 181, 62) 46%, rgb(230, 181, 62) 54%, transparent 54%), linear-gradient(-45deg, transparent 46%, rgb(230, 181, 62) 46%, rgb(230, 181, 62) 54%, transparent 54%)",
              backgroundSize: "16px 16px, 16px 16px, 16px 16px, 16px 16px",
              backgroundPosition: "0px 0px, 0px 0px, 8px 0px, 8px 0px",
            }}
          />

          {/* Title section */}
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: "6px" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "2px",
                color: "rgb(230, 181, 62)",
              }}
            >
              المطبخ الفلسطيني
            </span>
          </div>
          <h2
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              margin: "0 0 4px",
              fontSize: "27px",
              fontWeight: 900,
              color: "rgb(245, 239, 225)",
              letterSpacing: "-0.5px",
            }}
          >
            أطباق أصيلة من الوطن
          </h2>
          <p
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              margin: "0 auto 14px",
              maxWidth: "330px",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "rgb(205, 201, 180)",
            }}
          >
            من قلب فلسطين إلى مائدتك — كل طبق حكاية تُروى بالحبّ وأجود المكوّنات.
          </p>

          {/* Animated Circle */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "240px",
              height: "240px",
              margin: "6px auto 8px",
            }}
          >
            {/* Steam effects */}
            <span
              className="animate-jc-steam"
              style={{
                position: "absolute",
                top: "14px",
                left: "96px",
                width: "10px",
                height: "36px",
                borderRadius: "8px",
                background: "linear-gradient(to top, rgba(245, 239, 225, 0.55), transparent)",
                filter: "blur(3px)",
                animationDuration: "4.2s",
              }}
            />
            <span
              className="animate-jc-steam"
              style={{
                position: "absolute",
                top: "8px",
                left: "120px",
                width: "10px",
                height: "40px",
                borderRadius: "8px",
                background: "linear-gradient(to top, rgba(245, 239, 225, 0.5), transparent)",
                filter: "blur(3px)",
                animationDuration: "4.8s",
                animationDelay: "0.9s",
              }}
            />
            <span
              className="animate-jc-steam"
              style={{
                position: "absolute",
                top: "14px",
                left: "142px",
                width: "9px",
                height: "34px",
                borderRadius: "8px",
                background: "linear-gradient(to top, rgba(245, 239, 225, 0.5), transparent)",
                filter: "blur(3px)",
                animationDuration: "4.5s",
                animationDelay: "1.8s",
              }}
            />

            {/* Ring pulses */}
            <span
              className="animate-jc-ringPulse"
              style={{
                position: "absolute",
                inset: "14px",
                borderRadius: "50%",
                border: "2px solid rgba(230, 181, 62, 0.5)",
              }}
            />
            <span
              className="animate-jc-ringPulse"
              style={{
                position: "absolute",
                inset: "14px",
                borderRadius: "50%",
                border: "2px solid rgba(216, 74, 54, 0.5)",
                animationDelay: "1.7s",
              }}
            />

            {/* Dashed spinning ring */}
            <div
              className="animate-jc-spin"
              style={{
                position: "absolute",
                inset: "8px",
                borderRadius: "50%",
                border: "2px dashed rgba(230, 181, 62, 0.55)",
              }}
            />

            {/* Main dish circle */}
            <div
              style={{
                position: "absolute",
                inset: "24px",
                borderRadius: "50%",
                background: "conic-gradient(rgb(230, 181, 62), rgb(210, 74, 54), rgb(192, 57, 43), rgb(230, 181, 62), rgb(210, 74, 54), rgb(230, 181, 62))",
                padding: "7px",
                boxShadow: "rgba(216, 74, 54, 0.35) 0px 0px 30px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 50% 38%, rgb(251, 248, 241), rgb(239, 231, 212))",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    color: "rgb(176, 122, 42)",
                    marginBottom: "2px",
                  }}
                >
                  الطبق المميّز
                </span>

                {/* Dish cycling animation */}
                <div style={{ position: "relative", width: "100%", height: "62px" }}>
                  <div
                    className="animate-jc-dishCycle"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontFamily: "Lalezar, cursive", fontSize: "30px", color: "rgb(192, 57, 43)", lineHeight: 1 }}>
                      حمص بلحمة
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "rgb(124, 106, 58)" }}>
                      HUMMUS BIL LAHME
                    </span>
                  </div>
                  <div
                    className="animate-jc-dishCycle"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      animationDelay: "2.6s",
                    }}
                  >
                    <span style={{ fontFamily: "Lalezar, cursive", fontSize: "30px", color: "rgb(192, 57, 43)", lineHeight: 1 }}>
                      حمص و فول
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "rgb(124, 106, 58)" }}>
                      HUMMUS &amp; FOUL
                    </span>
                  </div>
                  <div
                    className="animate-jc-dishCycle"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      animationDelay: "5.2s",
                    }}
                  >
                    <span style={{ fontFamily: "Lalezar, cursive", fontSize: "27px", color: "rgb(192, 57, 43)", lineHeight: 1 }}>
                      قلاية بندورة
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "rgb(124, 106, 58)" }}>
                      QALAYEH BANADOURA
                    </span>
                  </div>
                  <div
                    className="animate-jc-dishCycle"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      animationDelay: "7.8s",
                    }}
                  >
                    <span style={{ fontFamily: "Lalezar, cursive", fontSize: "27px", color: "rgb(192, 57, 43)", lineHeight: 1 }}>
                      وجبات أخرى
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "rgb(124, 106, 58)" }}>
                      OTHER DISHES
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rotating squares around */}
            <div
              className="animate-jc-spin"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "0",
                height: "0",
                animationDuration: "30s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "-7px",
                  top: "-7px",
                  width: "14px",
                  height: "14px",
                  background: "rgb(230, 181, 62)",
                  transform: "rotate(0deg) translateY(-128px) rotate(45deg)",
                  boxShadow: "rgba(230, 181, 62, 0.6) 0px 0px 10px",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "-6px",
                  top: "-6px",
                  width: "12px",
                  height: "12px",
                  background: "rgb(210, 74, 54)",
                  transform: "rotate(60deg) translateY(-128px) rotate(45deg)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "-7px",
                  top: "-7px",
                  width: "14px",
                  height: "14px",
                  background: "rgb(192, 57, 43)",
                  transform: "rotate(120deg) translateY(-128px) rotate(45deg)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "-6px",
                  top: "-6px",
                  width: "12px",
                  height: "12px",
                  background: "rgb(230, 181, 62)",
                  transform: "rotate(180deg) translateY(-128px) rotate(45deg)",
                  boxShadow: "rgba(230, 181, 62, 0.6) 0px 0px 10px",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "-7px",
                  top: "-7px",
                  width: "14px",
                  height: "14px",
                  background: "rgb(210, 74, 54)",
                  transform: "rotate(240deg) translateY(-128px) rotate(45deg)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "-6px",
                  top: "-6px",
                  width: "12px",
                  height: "12px",
                  background: "rgb(192, 57, 43)",
                  transform: "rotate(300deg) translateY(-128px) rotate(45deg)",
                }}
              />
            </div>
          </div>

          {/* Dish tags */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            <span
              className="animate-jc-shimmer"
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "rgb(243, 236, 216)",
                border: "1px solid rgba(230, 181, 62, 0.4)",
                borderRadius: "999px",
                padding: "6px 13px",
                background: "linear-gradient(90deg, rgba(230, 181, 62, 0.14), rgba(216, 74, 54, 0.12), rgba(230, 181, 62, 0.14)) 0% 0% / 200% 100%",
              }}
            >
              حمص بلحمة
            </span>
            <span
              className="animate-jc-shimmer"
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "rgb(243, 236, 216)",
                border: "1px solid rgba(230, 181, 62, 0.4)",
                borderRadius: "999px",
                padding: "6px 13px",
                background: "linear-gradient(90deg, rgba(230, 181, 62, 0.14), rgba(216, 74, 54, 0.12), rgba(230, 181, 62, 0.14)) 0% 0% / 200% 100%",
                animationDelay: "0.6s",
              }}
            >
              حمص و فول
            </span>
            <span
              className="animate-jc-shimmer"
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "rgb(243, 236, 216)",
                border: "1px solid rgba(230, 181, 62, 0.4)",
                borderRadius: "999px",
                padding: "6px 13px",
                background: "linear-gradient(90deg, rgba(230, 181, 62, 0.14), rgba(216, 74, 54, 0.12), rgba(230, 181, 62, 0.14)) 0% 0% / 200% 100%",
                animationDelay: "1.2s",
              }}
            >
              قلاية بندورة
            </span>
            <span
              className="animate-jc-shimmer"
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "rgb(243, 236, 216)",
                border: "1px solid rgba(230, 181, 62, 0.4)",
                borderRadius: "999px",
                padding: "6px 13px",
                background: "linear-gradient(90deg, rgba(230, 181, 62, 0.14), rgba(216, 74, 54, 0.12), rgba(230, 181, 62, 0.14)) 0% 0% / 200% 100%",
                animationDelay: "1.8s",
              }}
            >
              وجبات أخرى
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
