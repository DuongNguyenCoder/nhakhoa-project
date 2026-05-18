import { Suspense } from "react";

export default function VideoComponent() {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-5 py-8">
      <TitleContent />
      <Suspense fallback={<p>Loading video...</p>}>
        <div className="relative max-w-5xl w-full mx-auto aspect-video border border-[#de3030] rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/92FCO4bCBgc"
            title="YouTube Video"
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Suspense>
    </section>
  );
}

function TitleContent() {
  return (
    <div
      id="video"
      className="
        relative
        flex flex-col items-center
        text-center
        w-full
        overflow-hidden
      "
    >
      {/* Background Blur Accent */}
      <div
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-60 h-60
          bg-[#E24B4A]/10
          blur-3xl
          rounded-full
          pointer-events-none
        "
      />

      {/* Small Label */}
      <div
        className="
          mb-3
          px-4 py-1.5
          rounded-full
          border border-[#E24B4A]/20
          bg-[#FFF5F5]
          text-[#B71C1C]
          text-[11px] md:text-[12px]
          font-bold
          tracking-[0.18em]
          uppercase
          font-['SVN-Avenir_Next',sans-serif]
        "
      >
        Minh&nbsp;Dental Proservice
      </div>

      {/* Main Title */}
      <h2
        className={`
          relative
          font-['SVN-Avenir_Next',sans-serif]
          font-bold
          uppercase
          text-[#1A1A1A]
          leading-[1.15]
          tracking-[-0.04em]
          text-[20px] md:text-[28px] xl:text-[32px]
        `}
      >
        Quy Trình Bảo Trì Bảo Dưỡng Thiết Bị
      </h2>
    </div>
  );
}
