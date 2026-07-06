"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import PopupConsultationForm from "@/components/common/PopupConsultationForm";

export default function PopupRenderer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const key = "popup_consultation";

    if (sessionStorage.getItem(key)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(key, "1");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 p-4 flex items-center justify-center">
      <div className="relative w-full max-w-[920px] max-h-[90vh] overflow-y-auto rounded-2xl">
        <PopupConsultationForm />

        <button
          onClick={() => setVisible(false)}
          className="absolute top-0.5 right-1 z-20 bg-red-950 rounded-full p-2 shadow-md hover:bg-red-600 transition"
        >
          <X className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
}
