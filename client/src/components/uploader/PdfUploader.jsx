"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PdfUploader({ value, onChange }) {
  const inputRef = useRef(null);

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!value) {
      setFileName("");
      return;
    }

    if (value instanceof File) {
      setFileName(value.name);
      return;
    }

    if (typeof value === "string") {
      const name = decodeURIComponent(value.split("/").pop() || "");
      setFileName(name);
    }
  }, [value]);

  const handleSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Chỉ hỗ trợ file PDF.");
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setFileName("");
    onChange(null);
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={handleSelect}
      />

      {!fileName ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          className="w-full border-dashed h-28 flex flex-col gap-2"
        >
          <Upload className="h-6 w-6" />
          <span>Chọn file PDF</span>
        </Button>
      ) : (
        <div className="rounded-lg border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <FileText className="h-6 w-6 text-red-500 shrink-0" />

            <div className="truncate">
              <p className="truncate font-medium">{fileName}</p>

              {typeof value === "string" && (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Xem file
                </a>
              )}
            </div>
          </div>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
