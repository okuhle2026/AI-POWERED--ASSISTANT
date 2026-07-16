import { Shield } from "lucide-react";

interface GuardianOrbProps {
  size?: number;
  className?: string;
}

export function GuardianOrb({ size = 320, className = "" }: GuardianOrbProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.68 0.24 305 / 0.55) 0%, oklch(0.68 0.2 250 / 0.35) 40%, transparent 70%)",
        }}
      />

      {/* Outer orbits */}
      <div className="absolute inset-0 animate-orbit-slow">
        <div
          className="absolute rounded-full border"
          style={{
            inset: "6%",
            borderColor: "oklch(0.68 0.24 305 / 0.35)",
            borderStyle: "dashed",
          }}
        />
        <div
          className="absolute h-2 w-2 rounded-full"
          style={{
            top: "6%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "oklch(0.85 0.15 305)",
            boxShadow: "0 0 20px oklch(0.75 0.24 305)",
          }}
        />
      </div>
      <div className="absolute inset-0 animate-orbit-reverse">
        <div
          className="absolute rounded-full border"
          style={{
            inset: "16%",
            borderColor: "oklch(0.7 0.2 240 / 0.4)",
          }}
        />
        <div
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            top: "16%",
            right: "20%",
            background: "oklch(0.85 0.14 200)",
            boxShadow: "0 0 16px oklch(0.82 0.14 200)",
          }}
        />
      </div>

      {/* Core sphere */}
      <div className="absolute inset-[24%] animate-float-slow">
        <div
          className="relative h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, oklch(0.95 0.06 300) 0%, oklch(0.62 0.24 300) 35%, oklch(0.28 0.15 280) 75%, oklch(0.15 0.08 275) 100%)",
            boxShadow:
              "0 0 60px 0 oklch(0.68 0.24 305 / 0.6), inset 0 -20px 60px oklch(0.2 0.1 260 / 0.6), inset 0 20px 40px oklch(1 0 0 / 0.15)",
          }}
        >
          {/* Neural grid overlay */}
          <div
            className="absolute inset-0 rounded-full opacity-40 mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, transparent 40%, oklch(0.85 0.14 200 / 0.3) 41%, transparent 42%), radial-gradient(circle at 50% 50%, transparent 60%, oklch(0.75 0.22 300 / 0.3) 61%, transparent 62%)",
            }}
          />

          {/* Shield emblem */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield
              className="h-1/2 w-1/2 text-white/90 drop-shadow-[0_0_18px_oklch(0.85_0.14_200)]"
              strokeWidth={1.4}
            />
          </div>

          {/* Specular highlight */}
          <div
            className="absolute rounded-full"
            style={{
              top: "12%",
              left: "18%",
              width: "35%",
              height: "22%",
              background:
                "radial-gradient(ellipse, oklch(1 0 0 / 0.5) 0%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />
        </div>
      </div>

      {/* Pulse rings */}
      <div
        className="absolute inset-[24%] rounded-full border"
        style={{
          borderColor: "oklch(0.82 0.14 200 / 0.5)",
          animation: "pulse-ring 3s ease-out infinite",
        }}
      />
      <div
        className="absolute inset-[24%] rounded-full border"
        style={{
          borderColor: "oklch(0.75 0.22 300 / 0.5)",
          animation: "pulse-ring 3s ease-out infinite 1.5s",
        }}
      />
    </div>
  );
}
