import Image from 'next/image';
import Link from 'next/link';

import CategoriesSection from '@/components/home/CategoriesSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-100 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Tamanrasset
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Authentic Cultural Heritage from the Heart of the Sahara
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  Welcome to our digital marketplace celebrating the rich cultural heritage of Tamanrasset, 
                  the jewel of southern Algeria. Nestled in the heart of the Sahara Desert, Tamanrasset 
                  has been a crossroads of civilizations for millennia, where Tuareg, Arab, and African 
                  cultures have blended to create something truly unique.
                </p>
                <p>
                  Our mission is to preserve and share the authentic craftsmanship, traditional arts, 
                  and cultural treasures of this remarkable region with the world. Every product in 
                  our collection tells a story of heritage, skill, and the enduring spirit of the 
                  desert peoples.
                </p>
                <p>
                  From handwoven textiles that have warmed nomadic families for generations to intricate 
                  jewelry that speaks of ancient trade routes, each item represents not just a purchase, 
                  but a connection to a living culture that continues to thrive in one of the world's 
                  most challenging environments.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src="/p/13.jpg" 
                  alt="Tamanrasset landscape with traditional architecture"
                  className="rounded-lg shadow-xl object-cover w-full h-96"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Heritage Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            The Cultural Heritage of Tamanrasset
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tuareg Culture */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tuareg Traditions</h3>
              <p className="text-gray-700">
                The noble Tuareg people, known as the "blue men of the desert," have maintained 
                their distinctive culture for over a millennium. Their exquisite silverwork, 
                leather crafts, and traditional textiles reflect a sophisticated understanding 
                of both beauty and function in desert life.
              </p>
            </div>

            {/* Desert Craftsmanship */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Desert Craftsmanship</h3>
              <p className="text-gray-700">
                Every piece in our collection represents hours of meticulous handwork by master 
                artisans. From the intricate geometric patterns that adorn traditional pottery 
                to the delicate filigree of Tuareg jewelry, these crafts have been perfected 
                over generations.
              </p>
            </div>

            {/* Trade Routes Legacy */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trade Routes Legacy</h3>
              <p className="text-gray-700">
                Tamanrasset's position along ancient trans-Saharan trade routes brought together 
                influences from across Africa and the Mediterranean. This cultural convergence 
                is evident in the diverse styles and techniques found in our authentic pieces.
              </p>
            </div>
          </div>
        </div>

        
        {/* Our Commitment Section */}
        <div className="bg-gray-50 rounded-xl p-8 md:p-12 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Commitment to Authenticity
            </h2>
            <div className="prose prose-lg text-gray-700 mx-auto space-y-4">
              <p>
                We work directly with local artisans and their families, ensuring that every 
                purchase supports the traditional craftspeople who keep these ancient arts alive. 
                Our commitment goes beyond commerce – we're dedicated to cultural preservation 
                and sustainable livelihoods for desert communities.
              </p>
              <p>
                Each product comes with a certificate of authenticity and the story of its maker, 
                connecting you not just to a beautiful object, but to the hands and heart that 
                created it. When you choose our products, you're not just decorating your home 
                – you're becoming part of a living cultural legacy.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Explore Our Collection
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover authentic Tamanrasset cultural products and bring a piece of Saharan 
            heritage into your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Browse All Products
            </Link>
            <Link 
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
