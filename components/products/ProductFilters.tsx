// components/products/ProductFilters.tsx
export default function ProductFilters() {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="category-electronics"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="category-electronics" className="ml-2 text-gray-700">
              Electronics
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="category-clothing"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="category-clothing" className="ml-2 text-gray-700">
              Clothing
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="category-home"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="category-home" className="ml-2 text-gray-700">
              Home & Kitchen
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="category-books"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="category-books" className="ml-2 text-gray-700">
              Books
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="category-sports"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="category-sports" className="ml-2 text-gray-700">
              Sports
            </label>
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="price-under-25"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="price-under-25" className="ml-2 text-gray-700">
              Under $25
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="price-25-50"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="price-25-50" className="ml-2 text-gray-700">
              $25 to $50
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="price-50-100"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="price-50-100" className="ml-2 text-gray-700">
              $50 to $100
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="price-over-100"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="price-over-100" className="ml-2 text-gray-700">
              Over $100
            </label>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Customer Rating</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="rating-4-up"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="rating-4-up" className="ml-2 text-gray-700">
              4 Stars & Up
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="rating-3-up"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="rating-3-up" className="ml-2 text-gray-700">
              3 Stars & Up
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="rating-2-up"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="rating-2-up" className="ml-2 text-gray-700">
              2 Stars & Up
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="rating-1-up"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="rating-1-up" className="ml-2 text-gray-700">
              1 Star & Up
            </label>
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
}
