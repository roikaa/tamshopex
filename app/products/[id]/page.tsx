
// app/products/[id]/page.tsx
export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
          <p className="text-gray-500">Product Image</p>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product {params.id}</h1>
          <p className="text-xl text-gray-600 mb-4">$99.99</p>
          <div className="border-t border-b border-gray-200 py-4 my-6">
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 rounded-md mb-4">
            Add to Cart
          </button>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <ul className="text-sm text-gray-700">
              <li className="py-1">Material: Premium quality</li>
              <li className="py-1">Dimensions: 10 x 20 cm</li>
              <li className="py-1">Weight: 500g</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


