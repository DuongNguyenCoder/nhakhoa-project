import React from "react";
import {
  MapPin,
  Phone,
  Printer,
  Mail,
  Building2,
  Store,
} from "lucide-react";
import PageTitle from "@/components/pageTitle";

const ContactPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageTitle title="Liên Hệ - Minh Dental" />
      <h1 className="text-4xl font-bold text-center text-rose-600 mb-12">
        Trụ Sở Chính
      </h1>

      {/* Google Map */}
      <div className="mb-12 shadow-xl rounded-3xl overflow-hidden border border-gray-200">
        <iframe
          title="Google Map - Trụ sở Minh Dental"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.708525348936!2d105.83799657482093!3d21.00431788063886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac79df7ad1df%3A0x1301b482473b4caf!2zTUlOSCBEZW50YWwsIDExMS1FMSBQaMawxqFuZyBNYWksIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2sus!4v1745059343896!5m2!1svi!2sus"
          width="100%"
          height="400"
          loading="lazy"
          className="w-full h-[400px] border-0"
        ></iframe>
      </div>

      {/* Trụ sở */}
      <div className="bg-white/90 backdrop-blur-xl p-6 mb-10 rounded-2xl shadow-lg border-l-4 border-rose-400">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="text-rose-500" />
          <h2 className="text-2xl font-semibold text-rose-700">Trụ sở chính</h2>
        </div>
        <ul className="space-y-3 pl-1 text-gray-700 text-[17px]">
          <li className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <span>Số 41 ngõ 38 Phương Mai - Đống Đa - Hà Nội</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-500 mt-1" />
            <span>Hotline: (024) 3710 0625</span>
          </li>
          <li className="flex items-start gap-3">
            <Printer className="w-5 h-5 text-gray-500 mt-1" />
            <span>Fax: (024) 3222 2788</span>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-500 mt-1" />
            <a
              href="mailto:info@minhdental.com"
              className="hover:underline text-blue-600"
            >
              info@minhdental.com
            </a>
          </li>
        </ul>
      </div>

      {/* Showroom */}
      {/* <div className="bg-white/90 backdrop-blur-xl p-6 mb-10 rounded-2xl shadow-lg border-l-4 border-rose-400">
        <div className="flex items-center gap-3 mb-4">
          <Store className="text-rose-500" />
          <h2 className="text-2xl font-semibold text-rose-700">Showroom</h2>
        </div>
        <ul className="space-y-3 pl-1 text-gray-700 text-[17px]">
          <li className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <span>111 E1 Phương Mai - Đống Đa - Hà Nội</span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-500 mt-1" />
            <span>Hotline: (+84 4) 3852 3643</span>
          </li>
          <li className="flex items-start gap-3">
            <Printer className="w-5 h-5 text-gray-500 mt-1" />
            <span>Fax: (+84 4) 3576 4192</span>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-500 mt-1" />
            <a
              href="mailto:vatlieunhakhoaminh@gmail.com"
              className="hover:underline text-blue-600"
            >
              vatlieunhakhoaminh@gmail.com
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default ContactPage;
