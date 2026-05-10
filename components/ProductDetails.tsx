import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ArrowRight, MapPin, Building2, User, Phone, ShoppingCart, MessageCircle, Star, ShieldCheck, Share2, Check } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => boolean;
  onContact: (sellerName: string) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack, onAddToCart, onContact }) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isAdded, setIsAdded] = useState(false);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    const success = onAddToCart(product);
    if (success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      {/* Breadcrumb / Back */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6 font-bold transition-colors"
      >
        <ArrowRight className="h-5 w-5" />
        العودة للسوق
      </button>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Gallery Section */}
          <div className="p-6 lg:p-10 bg-gray-50 flex flex-col gap-4">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200 relative">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-primary-600 ring-2 ring-primary-100' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-6 lg:p-10 flex flex-col">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 text-primary-600" />
                    {product.location}
                  </div>
               </div>
               <button className="text-gray-400 hover:text-primary-600 transition p-2 rounded-full hover:bg-gray-50">
                  <Share2 className="h-6 w-6" />
               </button>
            </div>

            <div className="flex items-end gap-2 mb-8 border-b border-gray-100 pb-6">
              <span className="text-4xl font-bold text-primary-700">{product.price}</span>
              <span className="text-gray-500 font-medium mb-1.5">ريال يمني / {product.unit}</span>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">وصف المنتج</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description || "لا يوجد وصف إضافي لهذا المنتج."}
              </p>
            </div>

            {/* Seller Info Card */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">معلومات البائع</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 flex items-center gap-1">
                      {product.sellerName}
                      <ShieldCheck className="h-4 w-4 text-blue-500" title="موثوق" />
                    </p>
                    {product.associationName && (
                      <p className="text-xs text-primary-600 font-medium flex items-center gap-1 mt-1">
                        <Building2 className="h-3 w-3" />
                        عضو في: {product.associationName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-xs text-gray-400 font-bold mr-1">(4.8)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 relative overflow-hidden py-4 rounded-2xl font-black transition-all duration-500 flex items-center justify-center gap-3 text-base active:scale-95 shadow-xl ${
                  isAdded 
                  ? 'bg-green-100 text-green-700 shadow-none' 
                  : 'bg-primary-600 text-white shadow-[0_20px_40px_rgba(21,128,61,0.25)] hover:bg-primary-800'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-6 w-6" />
                      <span>تمت الإضافة للسلة</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="h-6 w-6" />
                      <span>إضافة للسلة</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <button 
                onClick={() => onContact(product.sellerName)}
                className="flex-1 border-2 border-gray-100 text-gray-700 py-4 rounded-2xl font-black hover:border-primary-600 hover:text-primary-600 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                تواصل مع البائع
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};