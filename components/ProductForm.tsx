import React, { useState, useRef } from 'react';
import { Product, ProductCategory, UserProfile } from '../types';
import { Upload, X, Building2, Image as ImageIcon, Trash2, AlertCircle } from 'lucide-react';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  onCancel: () => void;
  userProfile: UserProfile;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct, onCancel, userProfile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Validation Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    category: ProductCategory.VEGETABLES,
    price: '',
    unit: '',
    location: '',
    description: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files) as File[];
      processFiles(newFiles);
    }
  };

  const processFiles = (files: File[]) => {
    const promises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(newImages => {
      setImages(prev => [...prev, ...newImages]);
      // Clear image error if exists
      if (errors.images) {
        setErrors(prev => {
            const newErrs = {...prev};
            delete newErrs.images;
            return newErrs;
        });
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files) as File[];
      const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
      processFiles(imageFiles);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'اسم المنتج مطلوب';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'يرجى إدخال سعر صحيح أكبر من 0';
    if (!formData.unit.trim()) newErrors.unit = 'وحدة البيع مطلوبة (مثلاً: سلة، كيلو)';
    if (!formData.location.trim()) newErrors.location = 'موقع المنتج مطلوب';
    if (!formData.description.trim()) newErrors.description = 'وصف المنتج مطلوب';
    if (images.length === 0) newErrors.images = 'يجب إضافة صورة واحدة على الأقل للمنتج';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
        // Scroll to top to see errors if any
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      unit: formData.unit,
      location: formData.location,
      description: formData.description,
      sellerName: userProfile.name,
      associationName: userProfile.association,
      image: images[0], // Set the first image as primary
      images: images // Store all images
    };
    onAddProduct(newProduct);
  };

  const handleInputChange = (field: string, value: any) => {
      setFormData({ ...formData, [field]: value });
      // Clear error for this field as user types
      if (errors[field]) {
          setErrors(prev => {
              const newErrs = {...prev};
              delete newErrs[field];
              return newErrs;
          });
      }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md my-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">إضافة منتج جديد</h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-red-500 transition-colors">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6 flex items-center gap-3">
         <div className="bg-blue-100 p-2 rounded-full">
            <Building2 className="h-5 w-5 text-blue-600" />
         </div>
         <div>
            <p className="text-sm text-blue-800 font-bold">يتم النشر باسم: {userProfile.name}</p>
            <p className="text-xs text-blue-600">تحت إشراف: {userProfile.association || 'لا توجد جمعية'}</p>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">صور المنتج <span className="text-red-500">*</span></label>
           
           <div 
             onClick={() => fileInputRef.current?.click()}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
             onDrop={handleDrop}
             className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
               errors.images 
                ? 'border-red-300 bg-red-50' 
                : isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
             }`}
           >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                multiple 
                accept="image/*" 
                className="hidden" 
              />
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                 <Upload className={`h-8 w-8 ${errors.images ? 'text-red-400' : isDragging ? 'text-primary-600' : 'text-gray-400'}`} />
              </div>
              <p className="text-sm font-bold text-gray-700">انقر لرفع الصور أو اسحبها هنا</p>
              <p className="text-xs text-gray-500 mt-1">يمكنك اختيار أكثر من صورة (JPG, PNG)</p>
           </div>
           {errors.images && (
             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
               <AlertCircle className="h-3 w-3" /> {errors.images}
             </p>
           )}

           {/* Image Previews */}
           {images.length > 0 && (
             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
               {images.map((img, idx) => (
                 <div key={idx} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                   <img src={img} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                   <button
                     type="button"
                     onClick={() => removeImage(idx)}
                     className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                   >
                     <X className="h-3 w-3" />
                   </button>
                   {idx === 0 && (
                     <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] text-center py-0.5">الرئيسية</span>
                   )}
                 </div>
               ))}
               <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg aspect-square hover:bg-gray-50 transition"
               >
                  <PlusIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-[10px] text-gray-500 font-bold mt-1">إضافة</span>
               </button>
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج <span className="text-red-500">*</span></label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
              placeholder="مثال: طماطم محمي"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">التصنيف</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              value={formData.category}
              onChange={e => handleInputChange('category', e.target.value as ProductCategory)}
            >
              {Object.values(ProductCategory).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">السعر (ريال) <span className="text-red-500">*</span></label>
            <input
              type="number"
              min="0"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all ${errors.price ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
              placeholder="0.00"
              value={formData.price}
              onChange={e => handleInputChange('price', e.target.value)}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">وحدة البيع <span className="text-red-500">*</span></label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all ${errors.unit ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
              placeholder="مثال: سلة 20 كجم"
              value={formData.unit}
              onChange={e => handleInputChange('unit', e.target.value)}
            />
            {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الموقع (المديرية/المنطقة) <span className="text-red-500">*</span></label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all ${errors.location ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
            placeholder="مثال: الحديدة - الزيدية"
            value={formData.location}
            onChange={e => handleInputChange('location', e.target.value)}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">وصف المنتج <span className="text-red-500">*</span></label>
          <textarea
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all ${errors.description ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
            placeholder="اكتب وصفاً تفصيلياً للمنتج (الجودة، تاريخ القطف، الخ)..."
            value={formData.description}
            onChange={e => handleInputChange('description', e.target.value)}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Upload className="h-5 w-5" />
            نشر المنتج في السوق
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper Icon for the "Add More" button
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);