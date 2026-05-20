import Image from "next/image";
import MainHeroContent from "./HeroContent";

export default function HeroSection() {
  return (
    <section className="max-w-7xl grid grid-cols-1 lg:grid-cols-5 w-full mx-auto items-center justify-center py-16 gap-10">
      {/* Image */}
      <div className="lg:col-span-2 lg:order-2 lg:aspect-square relative aspect-16/10 rounded-2xl overflow-hidden w-full">
        <Image
          src="https://leyfeolxdr.ufs.sh/f/DKQnMo5A7EdzsoslYiTCrQDgKVYa12HOj0ULuoncFkEAhm7z"
          alt="minhdental Proservice"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="lg:col-span-3">
        <MainHeroContent />
      </div>
    </section>
  );
}
