// components/ui/Hero.tsx
import Link from 'next/link';
import Image from 'next/image';

type HeroProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
};

export default function Hero({ title, subtitle, ctaText, ctaLink, imageSrc }: HeroProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.jpeg"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
        <div className="max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl drop-shadow-lg">
            Tamshopex
          </h1>
          <p className="mb-8 text-lg md:text-xl lg:text-2xl drop-shadow-md">
            Discover Tamanrasset

Authentic Cultural Heritage from the Heart of the Sahara
          </p>
            <p className="mb-8 text-lg md:text-xl lg:text-2xl drop-shadow-md">
                 ⴰⴼⴷ ⵜⴰⵎⴰⵏⵔⴰⵙⵙⵜ ⴰⵢⵍⴰ ⴰⴷⵍⵙⴰⵏ ⴰⵏⴰⵚⵍⵉ ⵙⴳ ⵡⵓⵍ ⵏ ⵚⵚⵃⴰⵔⴰ </p>
          <Link 
            href="/products"
            className="inline-block rounded-md bg-white px-8 py-4 text-lg font-medium text-blue-700 transition hover:bg-blue-50 hover:scale-105 shadow-lg"
          >
            Find the best deals now
          </Link>
        </div>
      </div>
    </div>
  );
}
