"use client";

import Image from "next/image";
import Link from "next/link";

export default function DirectoryGrid({ directories = [] }) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {directories.map((directory) => (
          <Link
            key={directory._id}
            href={`/san-pham/directory?directory=${directory._id}&title=${encodeURIComponent(directory.title)}`}
            className="group"
          >
            <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-[#9c1d22]/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9c1d22] hover:shadow-lg">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={directory.directoryPic}
                  alt={directory.title}
                  fill
                  className="object-contain"
                  sizes="120px"
                />
              </div>

              <h3 className="mt-4 line-clamp-2 text-center text-sm font-semibold text-gray-700 transition-colors duration-300 group-hover:text-[#9c1d22] md:text-base">
                {directory.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
