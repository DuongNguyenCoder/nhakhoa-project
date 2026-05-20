"use client";

import { useEffect, useState } from "react";
import { Siren, Facebook, MessageCircle } from "lucide-react";
import { usePopup } from "../popup/PopupProvider";

const ACTIONS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/nhakhoaminhphuong.net",
    icon: Facebook,
    className: "bg-[#1877F2] hover:bg-[#1666D9]",
  },
  {
    id: "zalo",
    label: "Zalo",
    href: "https://zalo.me/0913783696",
    icon: MessageCircle,
    className: "bg-[#2563EB] hover:bg-[#1D4ED8]",
  },
];

export default function FloatingSidebar() {
  const { openPopup } = usePopup();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 120);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed
        right-4
        bottom-5
        z-[9997]

        flex flex-col gap-2.5

        transition-all duration-500

        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }
      `}
    >
      {/* SOS */}
      <SidebarButton
        label="SOS kỹ thuật"
        onClick={openPopup}
        className="
          bg-[#B71C1C]
          hover:bg-[#9F1717]
          relative
        "
        pulse
      >
        <Siren size={18} />
      </SidebarButton>

      {/* Facebook + Zalo */}
      {ACTIONS.map((item) => {
        const Icon = item.icon;

        return (
          <SidebarButton
            key={item.id}
            label={item.label}
            href={item.href}
            className={item.className}
          >
            <Icon size={18} />
          </SidebarButton>
        );
      })}
    </div>
  );
}

function SidebarButton({
  children,
  label,
  href,
  onClick,
  className,
  pulse = false,
}) {
  const content = (
    <button
      onClick={onClick}
      className={`
        group
        relative

        w-12 h-12
        rounded-full

        flex items-center justify-center

        text-white
        shadow-[0_8px_24px_rgba(0,0,0,0.18)]

        transition-all duration-300
        hover:scale-110

        ${className}
      `}
    >
      {/* pulse SOS */}
      {pulse && (
        <span
          className="
            absolute inset-0
            rounded-full
            bg-[#B71C1C]/30
            animate-ping
          "
        />
      )}

      <span className="relative z-10">{children}</span>

      {/* tooltip desktop */}
      <div
        className="
          hidden md:block

          absolute
          right-[calc(100%+12px)]
          top-1/2
          -translate-y-1/2

          whitespace-nowrap

          rounded-xl
          bg-[#1A1A1A]
          px-3 py-2

          text-[12px]
          font-semibold
          text-white

          opacity-0
          pointer-events-none

          translate-x-2

          transition-all duration-200

          group-hover:opacity-100
          group-hover:translate-x-0
        "
      >
        {label}
      </div>
    </button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
