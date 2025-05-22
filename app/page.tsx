// app/page.tsx
import Link from 'next/link';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import Hero from '@/components/Hero';
import CategoriesSection from '@/components/home/CategoriesSection';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
         <FeaturedProducts limit={6} />
        </section>
        <section className="mb-16">
         < CategoriesSection/> 
        </section>
        {/*}<section className="bg-gray-50 p-8 rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-6">Stay updated with the latest products and offers</p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-md flex-grow"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
        */}
      </div>
    </div>
  );
}


