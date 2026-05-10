import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, ShoppingBasket, Wheat, Tractor, Droplets, Tag, ChevronLeft, ArrowLeft
} from 'lucide-react';
import { ProductCategory } from '../types';

const CATEGORY_DETAILS: Record<string, { icon: React.ReactNode, description: string, image: string, color: string }> = {
  [ProductCategory.VEGETABLES]: {
    icon: <Leaf className="h-8 w-8" />,
    description: "خضروات طازجة متنوعة من مزارع تهامة الخصيبة.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000",
    color: "bg-green-100 text-green-700"
  },
  [ProductCategory.FRUITS]: {
    icon: <ShoppingBasket className="h-8 w-8" />,
    description: "مانجو، جوافة، وحمضيات بجميع أنواعها ومذاقها الفريد.",
    image: "https://images.unsplash.com/photo-1619566636858-adb3ef264562?q=80&w=1000",
    color: "bg-orange-100 text-orange-700"
  },
  [ProductCategory.GRAINS]: {
    icon: <Wheat className="h-8 w-8" />,
    description: "ذرة، دخن، وبقوليات عالية الجودة من قلب اليمن.",
    image: "https://images.unsplash.com/photo-1536679545707-c76a741d831d?q=80&w=1000",
    color: "bg-yellow-100 text-yellow-700"
  },
  [ProductCategory.LIVESTOCK]: {
    icon: <Tractor className="h-8 w-8" />,
    description: "مواشي بلدية بجميع الأحجام والأعمار تحت إشراف صحي.",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1000",
    color: "bg-red-100 text-red-700"
  },
  [ProductCategory.SEEDS]: {
    icon: <Tag className="h-8 w-8" />,
    description: "بذور وتقاوي محسنة لضمان أفضل إنتاجية لمحصولك.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000",
    color: "bg-emerald-100 text-emerald-700"
  },
  [ProductCategory.FERTILIZERS]: {
    icon: <Droplets className="h-8 w-8" />,
    description: "أسمدة ومبيدات معتمدة لرفع كفاءة تربتك وحماية زرعك.",
    image: "https://images.unsplash.com/photo-1505230833350-73f1feafafed?q=80&w=1000",
    color: "bg-blue-100 text-blue-700"
  }
};

export const Categories: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/market?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">تصفح حسب <span className="text-green-600">الأقسام</span></h1>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          نظمنا لك المنتجات في فئات سهلة التصفح لمساعدتك في الوصول إلى ما تحتاجه بسرعة وكفاءة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(CATEGORY_DETAILS).map(([name, details]) => (
          <div 
            key={name}
            onClick={() => handleCategoryClick(name)}
            className="group cursor-pointer bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
          >
            <div className="h-64 relative overflow-hidden">
               <img src={details.image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-green-900/80 transition-colors"></div>
               <div className="absolute bottom-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">تصفح القسم</span>
                  <h3 className="text-3xl font-black">{name}</h3>
               </div>
            </div>
            <div className="p-8 flex-1 flex flex-col items-start space-y-4">
               <div className={`${details.color} p-4 rounded-2xl`}>
                  {details.icon}
               </div>
               <p className="text-gray-500 font-medium leading-relaxed flex-1">
                 {details.description}
               </p>
               <button className="flex items-center gap-2 text-green-600 font-black text-sm group-hover:gap-4 transition-all">
                  عرض المنتجات 
                  <ArrowLeft className="h-4 w-4" />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#052e16] rounded-[3rem] p-12 text-white relative overflow-hidden">
         <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl md:text-5xl font-black leading-tight">مالذي تبحث عنه ؟</h2>
               <p className="text-green-100 text-lg opacity-80 leading-relaxed font-bold">
                 منصتنا توفر خيارات واسعة تلبي احتياجات المزارعين، التجار، والمستهلكين في تهامة وعموم اليمن.
               </p>
               <button 
                 onClick={() => navigate('/market')}
                 className="bg-green-500 text-green-950 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-green-400 transition-all"
               >
                 اكتشف كل المحاصيل
               </button>
            </div>
            <div className="hidden md:block relative">
               <div className="grid grid-cols-2 gap-4">
                  <div className="h-40 rounded-3xl bg-white/10 backdrop-blur-md transform rotate-6 scale-90 border border-white/20"></div>
                  <div className="h-40 rounded-3xl bg-white/10 backdrop-blur-md transform -rotate-12 border border-white/20"></div>
                  <div className="h-40 rounded-3xl bg-white/10 backdrop-blur-md transform -rotate-3 translate-y-4 border border-white/20"></div>
                  <div className="h-40 rounded-3xl bg-white/10 backdrop-blur-md transform rotate-2 border border-white/20"></div>
               </div>
               <ShoppingBasket className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 text-green-400 opacity-50" />
            </div>
         </div>
      </div>
    </div>
  );
};
