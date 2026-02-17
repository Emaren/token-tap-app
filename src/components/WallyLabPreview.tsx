"use client";

type Props = {
  variant: "white" | "dark";
  className?: string;
};

export default function WallyLabPreview({ variant, className }: Props) {
  const isDark = variant === "dark";

  return (
    <div className={["w-full flex justify-center", className ?? ""].join(" ")}>
      <div
        className={[
          "relative w-full max-w-[240px] aspect-square rounded-[28px] overflow-hidden",
          isDark ? "bg-white/5" : "bg-white",
          isDark ? "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" : "shadow-[0_0_0_1px_rgba(0,0,0,0.08)]",
        ].join(" ")}
      >
        {/* inner stage */}
        <div
          className={[
            "absolute inset-[14px] rounded-[22px]",
            isDark ? "bg-black/40" : "bg-black/5",
            isDark ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" : "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]",
          ].join(" ")}
        />

        {/* top highlight */}
        <div
          className={[
            "absolute left-[26px] top-[26px] w-[94px] h-[60px] rounded-full blur-[0.2px]",
            isDark ? "bg-white/8" : "bg-white/60",
          ].join(" ")}
        />

        {/* face plate */}
        <div
          className={[
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-[68%] h-[68%] rounded-[26px]",
            isDark ? "bg-white/6" : "bg-black/0",
            isDark ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]" : "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.10)]",
          ].join(" ")}
        />

        {/* clouds (white lab) / blobs (dark lab) */}
        <div
          className={[
            "absolute left-[34px] top-[64px] w-[52px] h-[66px] rounded-[18px]",
            isDark ? "bg-white/6" : "bg-white/90",
            isDark ? "shadow-[0_6px_18px_rgba(0,0,0,0.35)]" : "shadow-[0_6px_18px_rgba(0,0,0,0.10)]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute right-[34px] top-[64px] w-[52px] h-[66px] rounded-[18px]",
            isDark ? "bg-white/6" : "bg-white/90",
            isDark ? "shadow-[0_6px_18px_rgba(0,0,0,0.35)]" : "shadow-[0_6px_18px_rgba(0,0,0,0.10)]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute right-[58px] top-[126px] w-[34px] h-[44px] rounded-[14px]",
            isDark ? "bg-white/6" : "bg-white/90",
            isDark ? "shadow-[0_6px_18px_rgba(0,0,0,0.35)]" : "shadow-[0_6px_18px_rgba(0,0,0,0.10)]",
          ].join(" ")}
        />

        {/* eyes */}
        <div
          className={[
            "absolute left-1/2 top-[52%] -translate-x-[46px] -translate-y-1/2 w-[14px] h-[14px] rounded-full",
            isDark ? "bg-white/80" : "bg-black/90",
          ].join(" ")}
        />
        <div
          className={[
            "absolute left-1/2 top-[52%] translate-x-[32px] -translate-y-1/2 w-[14px] h-[14px] rounded-full",
            isDark ? "bg-white/80" : "bg-black/90",
          ].join(" ")}
        />

        {/* mouth */}
        <div
          className={[
            "absolute left-1/2 top-[62%] -translate-x-1/2 w-[44px] h-[24px]",
            "border-b-2 border-l-2 border-r-2 rounded-b-full",
            isDark ? "border-white/45" : "border-black/35",
          ].join(" ")}
          style={{ borderTop: "0px solid transparent" }}
        />

        {/* label */}
        <div
          className={[
            "absolute left-1/2 bottom-[18px] -translate-x-1/2 text-[10px] tracking-wide",
            isDark ? "text-white/30" : "text-black/30",
          ].join(" ")}
        >
          WALLY v0
        </div>
      </div>
    </div>
  );
}
