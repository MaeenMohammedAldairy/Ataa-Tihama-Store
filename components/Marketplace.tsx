import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Tag, Plus, MessageCircle, SlidersHorizontal, Leaf, ShoppingBasket, Wheat, CheckCircle2, Filter, ChevronRight, ChevronLeft, Droplets, Tractor, TrendingUp, TrendingDown, AlertCircle, Info, Eye, X, Star, ShoppingCart, ShieldCheck, Heart, Trash2, Map, CreditCard, Check } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface MarketplaceProps {
  products: Product[];
  onAddToCart: (product: Product) => boolean;
  onContact: (sellerId: string) => void;
  onProductClick: (product: Product) => void;
}

type SortOption = 'newest' | 'price-asc' | 'price-desc';

const SproutIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.2.4-4.8-.4-1.2-.6-2.1-1.9-2.1-3.3 0-1.9 1.5-3.4 3.4-3.4 1.2 0 2.2.8 2.2 2 0 .5-.2 1-.5 1.4z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-.8 1.6-1.9 1.6-3 0-1.7-1.4-3-3-3-1.4 0-2.3 1-2.3 2 0 .5.2 1 .5 1.4z" />
  </svg>
);

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  [ProductCategory.VEGETABLES]: <Leaf className="h-5 w-5" />,
  [ProductCategory.FRUITS]: <ShoppingBasket className="h-5 w-5" />,
  [ProductCategory.GRAINS]: <Wheat className="h-5 w-5" />,
  [ProductCategory.LIVESTOCK]: <Tractor className="h-5 w-5" />,
  [ProductCategory.SEEDS]: <SproutIcon className="h-5 w-5" />,
  [ProductCategory.FERTILIZERS]: <Droplets className="h-5 w-5" />,
  [ProductCategory.EQUIPMENT]: <Tractor className="h-5 w-5" />,
  'default': <Tag className="h-5 w-5" />
};

export const Marketplace: React.FC<MarketplaceProps> = ({ products, onAddToCart, onContact, onProductClick }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [filter, setFilter] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync filter with URL search params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilter(categoryParam);
    } else if (filter !== 'all' && !categoryParam && window.location.pathname === '/market') {
      // If we are on market page and no category in URL, but we have a filter, keep it or reset it?
      // For now, let's just sync when param is present.
    }
  }, [searchParams]);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const success = onAddToCart(product);
    if (success) {
      setAddedItems(prev => new Set(prev).add(product.id));
      setTimeout(() => {
        setAddedItems(prev => {
          const next = new Set(prev);
          next.delete(product.id);
          return next;
        });
      }, 2000);
    }
  };
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (hoveredProductId) {
      const product = products.find(p => p.id === hoveredProductId);
      if (product && product.images && product.images.length > 1) {
        interval = setInterval(() => {
          setCurrentImageIndex(prev => (prev + 1) % product.images!.length);
        }, 1500);
      }
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [hoveredProductId, products]);

  const toggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(productId)) {
        newFavs.delete(productId);
      } else {
        newFavs.add(productId);
      }
      return newFavs;
    });
  };

  // Simulated dynamic data generator
  const getDynamicStats = (id: string) => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const trends = ['up', 'down', 'stable'];
    const stockLevels = ['جديد', 'متوفر', 'كمية محدودة', 'قرب الحصاد'];
    return {
      trend: trends[hash % trends.length],
      change: (hash % 15) + 5,
      stock: stockLevels[hash % stockLevels.length],
      isLowStock: (hash % 5) === 0
    };
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.includes(searchTerm) || p.sellerName.includes(searchTerm) || p.associationName?.includes(searchTerm);
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    const matchesLocation = selectedLocation === 'all' || p.location.includes(selectedLocation);
    return matchesCategory && matchesSearch && matchesPrice && matchesLocation;
  }).sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return Number(b.id) - Number(a.id);
  });

  const featuredProducts = products.slice(0, 5); // Just as an example

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const locations = Array.from(new Set(products.map(p => p.location.split(' - ')[0])));

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-[#052e16] rounded-2xl md:rounded-[3rem] p-6 sm:p-10 md:p-12 mb-8 text-white relative overflow-hidden shadow-2xl group">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
            <CheckCircle2 className="h-3 w-3 text-green-400" />
            منصة مزارعي تهامة المعتمدة
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">سوق المحاصيل <br/> <span className="text-green-400">اليومية الطازجة</span></h2>
          <p className="text-primary-100/80 text-base md:text-xl mb-10 max-w-xl leading-relaxed font-medium">
            اكتشف أفضل المحاصيل الموسمية مباشرة من مزارع تهامة. شراء آمن، جودة مضمونة، ووصول مباشر.
          </p>
          
          <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2 transition-all focus-within:ring-4 focus-within:ring-primary-500/20 max-w-2xl">
            <div className="relative flex-1">
               <Search className="absolute right-4 top-3.5 h-6 w-6 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="ابحث عن مانجو، طماطم، ذرة..."
                 className="w-full text-gray-900 pl-4 pr-12 py-3.5 rounded-xl focus:outline-none bg-transparent text-lg font-bold"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <button className="bg-primary-600 text-white px-10 py-3.5 rounded-xl font-black hover:bg-primary-700 transition shadow-xl text-lg active:scale-95">
              بحث
            </button>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none group-hover:scale-105 transition-transform duration-1000">
           <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[120%] bg-emerald-500 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[80%] bg-primary-400 rounded-full blur-[100px]"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-24 self-start">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-50">
              <h4 className="font-black text-gray-900">تصفية النتائج</h4>
              <button 
                onClick={() => {
                  setFilter('all');
                  setMinPrice(0);
                  setMaxPrice(100000);
                  setSelectedLocation('all');
                }}
                className="text-xs font-bold text-primary-600 hover:underline"
              >
                مسح الكل
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">الأقسام</p>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${filter === 'all' ? 'bg-primary-50 text-primary-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className="flex items-center gap-3">
                    <Filter className="h-4 w-4" />
                    الكل
                  </span>
                  <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{products.length}</span>
                </button>
                {Object.values(ProductCategory).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${filter === cat ? 'bg-primary-50 text-primary-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <span className="flex items-center gap-3">
                      {CATEGORY_ICONS[cat] || CATEGORY_ICONS['default']}
                      {cat}
                    </span>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">
                      {products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-4 pt-4 border-t border-gray-50">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">نطاق السعر (ر.ي)</p>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-1">
                       <label className="text-[10px] font-bold text-gray-400">من</label>
                       <input 
                         type="number" 
                         value={minPrice}
                         onChange={(e) => setMinPrice(Number(e.target.value))}
                         className="w-full bg-gray-50 p-2 rounded-lg border border-gray-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                       />
                    </div>
                    <div className="flex-1 space-y-1">
                       <label className="text-[10px] font-bold text-gray-400">إلى</label>
                       <input 
                         type="number" 
                         value={maxPrice}
                         onChange={(e) => setMaxPrice(Number(e.target.value))}
                         className="w-full bg-gray-50 p-2 rounded-lg border border-gray-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                       />
                    </div>
                 </div>
              </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-4 pt-4 border-t border-gray-50">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">المحافظة / المنطقة</p>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => setSelectedLocation('all')}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all ${selectedLocation === 'all' ? 'bg-primary-50 text-primary-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Map className="h-4 w-4" />
                  جميع المناطق
                </button>
                {locations.map(loc => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all ${selectedLocation === loc ? 'bg-primary-50 text-primary-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <MapPin className="h-4 w-4" />
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Sidebar Card */}
          <div className="bg-primary-900 rounded-[2rem] p-6 text-white space-y-4 overflow-hidden relative">
             <div className="relative z-10">
                <h5 className="font-black text-lg mb-2">عطاؤنا مستمر</h5>
                <p className="text-primary-100/70 text-xs font-medium leading-relaxed mb-4">انضم لأكثر من ٥٠٠٠ مزارع يعتمدون على المنصة يومياً.</p>
                <div className="space-y-3">
                   <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-primary-200">ارتفاع الطلب</span>
                        <span className="text-sm font-black">المانجو التيمور</span>
                      </div>
                   </div>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          
          {/* Top Bar (Mobile Filters toggle & Sorting) */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3 w-full sm:w-auto">
               <button 
                 onClick={() => setIsFilterSidebarOpen(true)}
                 className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-2xl font-black text-sm text-gray-700 shadow-sm"
               >
                 <SlidersHorizontal className="h-4 w-4 text-primary-600" />
                 الفلاتر
               </button>
               <div className="flex-1 sm:flex-none flex items-center justify-between bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <select 
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="bg-transparent text-gray-900 text-sm font-bold outline-none cursor-pointer pr-2"
                    >
                        <option value="newest">الأحدث أولاً</option>
                        <option value="price-asc">السعر: من الأقل</option>
                        <option value="price-desc">السعر: من الأعلى</option>
                    </select>
                  </div>
               </div>
            </div>
            
            <p className="text-gray-400 font-bold text-sm">
               يتم عرض <span className="text-gray-900">{filteredProducts.length}</span> منتج من أصل {products.length}
            </p>
          </div>

          {/* Active Chips */}
          {(filter !== 'all' || selectedLocation !== 'all' || minPrice > 0 || maxPrice < 100000) && (
            <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in duration-500">
               {filter !== 'all' && (
                 <div className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-primary-100">
                     القسم: {filter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilter('all')} />
                 </div>
               )}
               {selectedLocation !== 'all' && (
                 <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-blue-100">
                     المنطقة: {selectedLocation}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocation('all')} />
                 </div>
               )}
               {(minPrice > 0 || maxPrice < 100000) && (
                 <div className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-orange-100">
                     السعر: {minPrice} - {maxPrice}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => { setMinPrice(0); setMaxPrice(100000); }} />
                 </div>
               )}
            </div>
          )}

          {/* Featured Carousel Section (Inside content area) */}
          {featuredProducts.length > 0 && filter === 'all' && searchTerm === '' && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-black text-gray-900">منتجات الموسم المختارة</h3>
                  <p className="text-gray-400 text-sm font-medium">أفضل العروض المباشرة من الموردين المعتمدين.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => scrollCarousel('right')} className="p-3 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-all active:scale-95">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button onClick={() => scrollCarousel('left')} className="p-3 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-all active:scale-95">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div 
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x"
              >
                {featuredProducts.map((product) => (
                  <div 
                    key={`featured-${product.id}`} 
                    className="snap-start shrink-0 w-[280px] md:w-[320px] bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                    onClick={() => onProductClick(product)}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={product.name} referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      <div className="absolute bottom-4 right-4 text-white">
                        <div className="flex items-center gap-1.5 mb-1">
                           <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest">{product.category}</span>
                        </div>
                        <h4 className="text-base font-black truncate max-w-[150px]">{product.name}</h4>
                      </div>

                      <div className="absolute top-4 left-4 flex gap-2">
                         <div className="bg-white/20 backdrop-blur-md text-white p-2 rounded-xl">
                            <Plus className="h-4 w-4" />
                         </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-baseline gap-1">
                           <span className="text-xl font-black text-primary-700">{product.price}</span>
                           <span className="text-[10px] text-gray-400 font-bold">ر.ي</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                           <span className="text-xs font-black text-gray-900">{product.rating || 4.8}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold truncate">
                        <MapPin className="h-3 w-3 text-primary-400" />
                        {product.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product) => {
              const stats = getDynamicStats(product.id);
              return (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full relative"
                  onClick={() => onProductClick(product)}
                >
                  {/* Image Container */}
                  <div 
                    className="relative h-64 overflow-hidden bg-gray-50"
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    <img 
                      src={hoveredProductId === product.id && product.images && product.images.length > 0 
                        ? product.images[currentImageIndex] 
                        : product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-1000 ease-in-out" 
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Shadow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Image Dots for Carousel */}
                    {hoveredProductId === product.id && product.images && product.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        {product.images.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'}`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Badges Overlay */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                       <span className="bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl border border-white">
                        {CATEGORY_ICONS[product.category] || <Tag className="h-3 w-3" />}
                        {product.category}
                      </span>
                      {stats.isLowStock && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-1 shadow-xl animate-pulse ring-4 ring-red-500/20">
                          <AlertCircle className="h-3 w-3" />
                          كمية محدودة
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => toggleFavorite(e, product.id)}
                      className={`absolute top-4 left-4 z-20 p-2.5 rounded-2xl backdrop-blur-md transition-all duration-300 transform ${
                        favorites.has(product.id) 
                          ? 'bg-red-500 text-white shadow-xl scale-110 active:scale-95' 
                          : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white active:scale-90 shadow-lg'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                       <button 
                         onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
                         className="bg-white text-gray-900 px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-primary-600 hover:text-white transition-all transform active:scale-95"
                       >
                         <Eye className="h-5 w-5" />
                         نظرة سريعة
                       </button>
                    </div>

                    {product.associationName && (
                      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10 group-hover:translate-x-2 transition-transform duration-500">
                         <div className="bg-primary-600 text-white p-2.5 rounded-full shadow-2xl border-2 border-white" title={`موثق من: ${product.associationName}`}>
                            <CheckCircle2 className="h-4 w-4" />
                         </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-7 flex-1 flex flex-col relative bg-white">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-gray-900 leading-none">{product.price}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ريال / {product.unit}</span>
                        </div>
                        
                        <div className={`flex items-center gap-1 mt-2 text-[10px] font-black ${
                          stats.trend === 'up' ? 'text-red-500' : stats.trend === 'down' ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {stats.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : stats.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : <Info className="h-3 w-3" />}
                          <span>{stats.trend === 'up' ? `ارتفاع ${stats.change}%` : stats.trend === 'down' ? `انخفاض ${stats.change}%` : 'سعر مستقر'}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${stats.isLowStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        <span className="text-[10px] font-black text-gray-600 tracking-tight">{stats.stock}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-primary-700 transition-colors mb-4 line-clamp-1 leading-tight">{product.name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[11px] text-gray-500 group/item">
                          <div className="bg-primary-50 p-1.5 rounded-lg group-hover/item:bg-primary-600 group-hover/item:text-white transition-colors">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col">
                             <span className="font-bold text-gray-900">{product.location}</span>
                             <span className="opacity-70">الموقع الجغرافي</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-[11px] text-gray-500 group/item">
                           <div className="bg-blue-50 p-1.5 rounded-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                             <Tractor className="h-4 w-4" />
                           </div>
                           <div className="flex flex-col">
                             <span className="font-bold text-gray-900">{product.sellerName}</span>
                             <span className="opacity-70">المورد المباشر</span>
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-8 bg-gray-50/50 p-2 rounded-2xl">
                      <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : 'text-gray-200'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-black text-gray-400 tracking-tighter">({product.rating || 4.5})</span>
                      <span className="mx-1 text-gray-300">|</span>
                      <span className="text-[10px] font-black text-primary-600">موثوق</span>
                    </div>
                    
                    <div className="mt-auto grid grid-cols-[1fr_auto] gap-3">
                       <button 
                          onClick={(e) => handleAddToCart(e, product)}
                          className={`relative overflow-hidden py-4 px-6 rounded-2xl font-black transition-all duration-300 flex items-center justify-center gap-3 text-sm active:scale-95 group/btn ${
                            addedItems.has(product.id) 
                            ? 'bg-green-100 text-green-700 shadow-none' 
                            : 'bg-primary-600 text-white shadow-[0_15px_30px_rgba(21,128,61,0.2)] hover:bg-primary-800'
                          }`}
                        >
                          <AnimatePresence mode="wait">
                            {addedItems.has(product.id) ? (
                              <motion.div 
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2"
                              >
                                <Check className="h-5 w-5" />
                                <span>تمت الإضافة</span>
                              </motion.div>
                            ) : (
                              <motion.div 
                                key="default"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2"
                              >
                                <ShoppingCart className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                                <span>إضافة للسلة</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onContact(product.sellerName); }}
                          className="bg-white text-gray-400 p-4 rounded-2xl hover:bg-primary-50 hover:text-primary-600 transition-all border border-gray-100 hover:border-primary-200 active:scale-95 group/msg"
                          title="تواصل مع البائع"
                        >
                        <MessageCircle className="h-5 w-5 group-hover/msg:scale-110 transition-transform" />
                        </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 mt-8 space-y-8">
              <div className="relative">
                <div className="bg-gray-50 p-10 rounded-full animate-pulse">
                   <Search className="h-20 w-20 text-gray-200" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary-500 p-4 rounded-3xl shadow-xl text-white">
                   <AlertCircle className="h-8 w-8" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-3xl font-black text-gray-900">لم نجد ما تبحث عنه</h3>
                <p className="text-gray-500 font-medium text-lg max-w-md">جرب تغيير كلمات البحث، أو إزالة بعض الفلاتر لعرض نتائج أكثر.</p>
              </div>
              <button 
                onClick={() => {
                  setFilter('all'); 
                  setSearchTerm('');
                  setMinPrice(0);
                  setMaxPrice(100000);
                  setSelectedLocation('all');
                }} 
                className="bg-primary-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-primary-700 transition-all active:scale-95"
              >
                 عرض جميع منتجات المنصة
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sidebar / Modal */}
      {isFilterSidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterSidebarOpen(false)}></div>
           <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-left duration-500 rounded-r-[3rem]">
              <div className="flex items-center justify-between mb-10">
                 <h4 className="text-2xl font-black text-gray-900">الفلاتر</h4>
                 <button onClick={() => setIsFilterSidebarOpen(false)} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900">
                    <X className="h-6 w-6" />
                 </button>
              </div>
              
              <div className="space-y-12">
                 {/* Re-use components or implement them directly for mobile */}
                 <div className="space-y-6">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <Tag className="h-4 w-4" />
                       الأقسام
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                       <button onClick={() => setFilter('all')} className={`p-4 rounded-2xl text-sm font-bold border transition-all ${filter === 'all' ? 'bg-primary-600 text-white border-primary-600 shadow-xl' : 'bg-white text-gray-600 border-gray-100'}`}>الكل</button>
                       {Object.values(ProductCategory).map(cat => (
                         <button key={cat} onClick={() => setFilter(cat)} className={`p-4 rounded-2xl text-sm font-bold border transition-all ${filter === cat ? 'bg-primary-600 text-white border-primary-600 shadow-xl' : 'bg-white text-gray-600 border-gray-100'}`}>{cat}</button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <CreditCard className="h-4 w-4" />
                       نطاق السعر
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                       <input type="number" value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} placeholder="من" className="bg-gray-50 p-4 rounded-2xl font-bold border border-gray-100" />
                       <input type="number" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} placeholder="إلى" className="bg-gray-50 p-4 rounded-2xl font-bold border border-gray-100" />
                    </div>
                 </div>

                 <div className="space-y-6">
                   <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      المنطقة
                   </p>
                   <div className="space-y-2">
                      <button onClick={() => setSelectedLocation('all')} className={`w-full text-right p-4 rounded-2xl font-bold transition-all ${selectedLocation === 'all' ? 'bg-primary-50 text-primary-700' : 'bg-gray-50 text-gray-500'}`}>جميع المناطق</button>
                      {locations.map(loc => (
                        <button key={loc} onClick={() => setSelectedLocation(loc)} className={`w-full text-right p-4 rounded-2xl font-bold transition-all ${selectedLocation === loc ? 'bg-primary-50 text-primary-700' : 'bg-gray-50 text-gray-500'}`}>{loc}</button>
                      ))}
                   </div>
                 </div>
              </div>

              <div className="sticky bottom-0 left-0 right-0 pt-10 pb-4 bg-white mt-12 grid grid-cols-2 gap-4">
                 <button onClick={() => setIsFilterSidebarOpen(false)} className="bg-primary-600 text-white p-5 rounded-2xl font-black shadow-xl shadow-primary-100">تطبيق</button>
                 <button 
                  onClick={() => {
                    setFilter('all');
                    setMinPrice(0);
                    setMaxPrice(100000);
                    setSelectedLocation('all');
                    setIsFilterSidebarOpen(false);
                  }}
                  className="bg-gray-50 text-gray-500 p-5 rounded-2xl font-black"
                >
                  إعادة ضبط
                </button>
              </div>
           </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-6 left-6 z-10 p-3 bg-white/80 backdrop-blur-md rounded-full text-gray-800 hover:bg-white hover:text-red-500 transition-all shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-80 lg:h-full relative overflow-hidden bg-gray-50">
                <img src={quickViewProduct.image} className="w-full h-full object-cover" alt={quickViewProduct.name} referrerPolicy="no-referrer" />
                <div className="absolute top-6 right-6">
                  <span className="bg-primary-600 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg">
                    {quickViewProduct.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 lg:p-12 flex flex-col">
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center gap-2 text-primary-600 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-2">
                     <CheckCircle2 className="h-4 w-4" />
                     منتج موثق
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4">{quickViewProduct.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5 font-bold">
                       <MapPin className="h-4 w-4 text-primary-400" />
                       {quickViewProduct.location}
                    </div>
                    <div className="hidden xs:block w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="font-bold">{quickViewProduct.sellerName}</div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-6 md:mb-8">
                    <span className="text-3xl md:text-4xl font-black text-primary-700">{quickViewProduct.price}</span>
                    <span className="text-gray-400 font-bold text-sm md:text-base">ريال يمني / {quickViewProduct.unit}</span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-100 mb-6 md:mb-8">
                    <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-3">وصف المنتج</h4>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {quickViewProduct.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 md:gap-6 mb-8 border-y border-gray-100 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase">التقييم</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs md:text-sm font-black text-gray-900">{quickViewProduct.rating || 4.9}</span>
                      </div>
                    </div>
                    <div className="w-px h-8 bg-gray-100"></div>
                    <div className="flex flex-col gap-1">
                       <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase">الموثوقية</span>
                       <div className="flex items-center gap-1 text-blue-600">
                         <ShieldCheck className="h-3 w-3 md:h-4 md:w-4" />
                         <span className="text-xs md:text-sm font-black">عالية</span>
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 md:gap-4">
                  <button 
                    onClick={() => { onAddToCart(quickViewProduct); setQuickViewProduct(null); }}
                    className="bg-primary-600 text-white py-3.5 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl font-black text-base md:text-lg shadow-xl shadow-primary-100 hover:bg-primary-700 transition-all flex items-center justify-center gap-3"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    إضافة للسلة
                  </button>
                  <button 
                    onClick={() => { onContact(quickViewProduct.sellerName); setQuickViewProduct(null); }}
                    className="p-3.5 md:p-4 border border-gray-200 rounded-xl md:rounded-2xl text-gray-400 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all flex items-center justify-center"
                  >
                    <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="sm:hidden mr-2 font-bold text-sm">تواصل</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};