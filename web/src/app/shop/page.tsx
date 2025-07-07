"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "../../lib/cart-store";

// Define Product type for backend data
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrls?: string[];
  stock: number;
  type?: string;
  tags?: string[];
};

const TABS = [
  { label: "All", value: "all" },
  { label: "Wigits", value: "wigit" },
  { label: "T-Shirts", value: "tshirt" },
];

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "priceLow" },
  { label: "Price: High to Low", value: "priceHigh" },
  { label: "Best Selling", value: "bestSelling" },
];

const PER_PAGE_OPTIONS = [9, 15, 21, 30];

// QuickView component
function QuickView({ product, onClose, anchorRect, onMouseEnter, onMouseLeave }: { product: Product, onClose: () => void, anchorRect: DOMRect | null, onMouseEnter: () => void, onMouseLeave: () => void }) {
  const { addItem } = useCartStore();
  
  // Position popup near anchorRect (desktop)
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      type: 'wigit',
      image: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '',
    });
    onClose();
  };

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-[340px] max-w-[95vw]"
      style={anchorRect ? {
        top: Math.min(window.innerHeight - 400, anchorRect.bottom + 8),
        left: Math.min(window.innerWidth - 360, anchorRect.left),
      } : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
      </div>
      {product.imageUrls && product.imageUrls.length > 0 ? (
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {product.imageUrls.map((url, idx) => (
            <img key={idx} src={url} alt={product.name} className="w-24 h-24 object-cover rounded border" />
          ))}
        </div>
      ) : (
        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 mb-3">No Image</div>
      )}
      <div className="mb-2 text-gray-700 text-sm max-h-20 overflow-y-auto">{product.description}</div>
      <div className="font-bold text-lg text-gray-900 mb-2">${product.price.toFixed(2)}</div>
      <button 
        onClick={handleAddToCart}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-green-800 transition w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [perPage, setPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [quickViewAnchor, setQuickViewAnchor] = useState<DOMRect | null>(null);
  const { addItem } = useCartStore();
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const hoverRectRef = useRef<DOMRect | null>(null);
  const [cardHovered, setCardHovered] = useState(false);
  const [quickViewHovered, setQuickViewHovered] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Compute unique tags for the selected type
  const tagsForType = activeTab === "all"
    ? []
    : Array.from(new Set(products.filter(p => p.type === activeTab && Array.isArray(p.tags)).flatMap(p => p.tags!)));

  // Filter products based on active tab and selected tag
  const filteredProducts = products.filter(product => {
    if (activeTab !== "all" && product.type !== activeTab) return false;
    if (selectedTag && (!product.tags || !product.tags.includes(selectedTag))) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleImageMouseEnter = (product: Product, event: React.MouseEvent) => {
    setCardHovered(true);
    hoverRectRef.current = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const timer = setTimeout(() => {
      setQuickViewProduct(product);
      setQuickViewAnchor(hoverRectRef.current);
    }, 600);
    setHoverTimer(timer);
  };

  const handleImageMouseLeave = () => {
    setCardHovered(false);
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    hoverRectRef.current = null;
  };

  useEffect(() => {
    if (!cardHovered && !quickViewHovered) {
      setQuickViewProduct(null);
      setQuickViewAnchor(null);
    }
  }, [cardHovered, quickViewHovered]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      type: 'wigit',
      image: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '',
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Shop</h1>
          <p className="text-xl">Discover our collection of Wigits and T-Shirts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Tabs */}
            <div className="flex gap-2">
              {TABS.map(tab => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveTab(tab.value);
                    setSelectedTag(null);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    activeTab === tab.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tag Filters */}
            {activeTab !== "all" && tagsForType.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 rounded-full font-medium transition ${
                    !selectedTag ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {tagsForType.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full font-medium transition ${
                      selectedTag === tag ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Sort and Per Page */}
            <div className="flex gap-4 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-3 py-2"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded px-3 py-2"
              >
                {PER_PAGE_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option} per page
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
              onMouseEnter={e => handleImageMouseEnter(product, e)}
              onMouseLeave={handleImageMouseLeave}
            >
              <div className="relative">
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500"
                  >No Image</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-dark mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-dark">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-green-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => {
            setQuickViewProduct(null);
            setQuickViewAnchor(null);
          }}
          anchorRect={quickViewAnchor}
          onMouseEnter={() => setQuickViewHovered(true)}
          onMouseLeave={() => setQuickViewHovered(false)}
        />
      )}
    </div>
  );
} 