"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { HiUser, HiPhone, HiCalendar } from "react-icons/hi";
import { useForm, Controller } from "react-hook-form";

import { ConsultationService } from "@/services/consultation.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServiceList = [
  "Ghế nha khoa CINGOL",
  "Kệ tủ nha khoa",
  "Kính lúp nha khoa",
  "Dịch vụ bảo trì, bảo dưỡng MD ProService",
];

export default function PopupConsultationForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [captchaEnabled] = useState(false);
  const [token, setToken] = useState(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const recaptchaRef = useRef();

  const siteKey = process.env.NEXT_PUBLIC_SITE_KEY_RECAPTCHA || "";

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      note: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    if (captchaEnabled && !token) {
      setShowCaptcha(true);
      toast.info("Vui lòng xác minh reCAPTCHA");
      return;
    }

    setLoading(true);

    try {
      const res = await ConsultationService.create(data);

      if (res?.success) {
        setSuccessMessage("Đăng ký thành công!");
        reset();

        recaptchaRef.current?.reset();
        setToken(null);
        setShowCaptcha(false);
      }
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl md:grid md:grid-cols-2 bg-gradient-to-br from-[#faf5f5] via-[#fcebeb] to-[#f4dbdd]">
      {/* LEFT FORM */}
      <div className="p-6 md:p-8 ">
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#9c1d22] uppercase tracking-wide">
            Tư vấn thiết bị nha khoa
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Đăng ký nhận tư vấn
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Để lại thông tin, đội ngũ chuyên viên sẽ liên hệ trong thời gian sớm
            nhất.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c1d22]" />
            <input
              {...register("name", { required: true })}
              placeholder="Họ và tên"
              className="input"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c1d22]" />
            <input
              {...register("phone", { required: true })}
              placeholder="Số điện thoại"
              className="input"
            />
          </div>

          {/* Service */}
          <Controller
            name="note"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-12 w-full bg-white pl-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#9c1d22]">
                  <SelectValue placeholder="Chọn dịch vụ cần tư vấn" />
                </SelectTrigger>

                <SelectContent>
                  {ServiceList.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {/* Call time */}
          <div className="relative">
            <HiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c1d22]" />
            <input
              {...register("message", { required: true })}
              placeholder="Giờ thuận tiện để gọi"
              className="input"
            />
          </div>

          {successMessage && (
            <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          {captchaEnabled && showCaptcha && (
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                onChange={(t) => setToken(t)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#9c1d22] font-semibold text-white transition hover:opacity-90"
          >
            {loading ? (
              <div className="mx-auto h-6 w-6 animate-spin rounded-full border-b-2 border-white" />
            ) : (
              "Gửi thông tin tư vấn"
            )}
          </button>
        </form>
      </div>

      {/* RIGHT IMAGE - Desktop only */}
      <div className="hidden md:flex md:flex-col md:justify-center md:space-y-3 min-h-[620px] py-4 pr-4">
        <div className=" relative aspect-1/2 h-[70vh]">
          <Image
            src="/assets/image-popup-sos-md-proservice.png"
            alt="consultation"
            fill
            className="object-cover rounded-xl transition-transform overflow-hidden border border-red-200"
            priority
          />
          {/* <div className="absolute inset-0 bg-linear-to-t from-[#9c1d22]/80 via-[#9c1d22]/30 to-transparent" /> */}
        </div>

        <div className=" text-[#9c1d22]">
          <h3 className="text-[22px] text-center font-bold leading-snug">
            Giải pháp thiết bị nha khoa chuyên sâu
          </h3>

          {/* <p className="mt-3 text-sm text-gray-500">
            Tối ưu vận hành phòng khám với hệ thống thiết bị hiện đại và dịch vụ
            bảo trì chuyên nghiệp.
          </p> */}
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          height: 48px;
          padding: 0 14px 0 40px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          background: white;
          transition: all 0.2s ease;
        }

        .input:focus {
          border-color: #9c1d22;
          box-shadow: 0 0 0 3px rgba(156, 29, 34, 0.12);
        }
      `}</style>
    </div>
  );
}
