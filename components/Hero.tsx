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
    <div className="relative w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center md:flex-row md:text-left">
        <div className="md:w-1/2 md:pr-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Tamshopex</h1>
          <p className="mb-8 text-lg text-blue-100 md:text-xl">Your go to for all shoping in tammenrasset</p>
          <Link 
            href="#"
            className="inline-block rounded-md bg-white px-6 py-3 text-lg font-medium text-blue-700 transition hover:bg-blue-50"
          >
            fine the best deals now
          </Link>
        </div>
        <div className="mt-12 md:mt-0 md:w-1/2">
          <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-96">
            <Image
              src="/hero-smart-watch.png"
              alt="Hero image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
