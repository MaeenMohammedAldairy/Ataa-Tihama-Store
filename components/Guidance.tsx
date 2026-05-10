import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowRight, X, ChevronUp, Search, Filter, Star, Sprout, Droplets, ShieldAlert, CalendarClock } from 'lucide-react';
import { Article } from '../types';

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'أفضل طرق الري الحديثة للمانجو',
    category: 'ري وزراعة',
    summary: 'تعرف على تقنيات الري بالتنقيط وكيف تساهم في توفير المياه وزيادة إنتاجية أشجار المانجو في تهامة.',
    content: `
      يعتبر الري بالتنقيط من أهم التقنيات الحديثة التي يجب على مزارعي المانجو في تهامة اتباعها.
      
      الفوائد الرئيسية:
      1. توفير المياه بنسبة تصل إلى 60% مقارنة بالري بالغمر.
      2. تقليل نمو الحشائش الضارة حول الأشجار.
      3. إمكانية إضافة الأسمدة مع مياه الري (التسميد بالري).
      
      خطوات التنفيذ:
      - مد شبكة أنابيب رئيسية وفرعية.
      - تركيب منقطات ذات تصريف مناسب (مثلاً 8 لتر/ساعة) حول جذع الشجرة.
      - الري في الصباح الباكر أو المساء لتقليل التبخر.
    `,
    date: '2025-10-15',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    title: 'مكافحة دودة الحشد الخريفية في الذرة',
    category: 'وقاية نبات',
    summary: 'دليل شامل للمزارع التهامي حول طرق الكشف المبكر والمكافحة المتكاملة لهذه الآفة الخطيرة.',
    content: `
      دودة الحشد الخريفية تشكل تهديداً كبيراً لمحصول الذرة في تهامة.
      
      طرق الكشف:
      - تفقد الحقل مرتين أسبوعياً.
      - البحث عن أوراق متآكلة أو وجود فضلات اليرقات في قلب النبات.
      
      طرق المكافحة:
      1. المصائد الفرمونية: لجذب الذكور وتقليل التكاثر.
      2. المكافحة الحيوية: استخدام الأعداء الطبيعيين.
      3. المبيدات المتخصصة: عند وصول الإصابة للحد الاقتصادي الحرج، يفضل استخدام مبيدات آمنة وفعالة مثل (Emamectin benzoate).
    `,
    date: '2025-11-01',
    image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    title: 'جدول مواعيد زراعة الخضروات الشتوية',
    category: 'مواعيد زراعية',
    summary: 'التقويم الزراعي للمنطقة الوسطى والساحلية لزراعة الطماطم والكوسا والباذنجان.',
    content: `
      الالتزام بمواعيد الزراعة يضمن إنتاجية عالية ومقاومة أفضل للآفات.
      
      المواعيد المقترحة لتهامة (العروة الشتوية):
      - الطماطم: زراعة الشتلات في الحقل المكشوف تبدأ من أكتوبر حتى نوفمبر.
      - الكوسا: يمكن زراعتها طوال الشتاء مع تفضيل البكور في سبتمبر وأكتوبر.
      - الباذنجان: يزرع في المشاتل في أغسطس وينقل للحقل في سبتمبر.
      
      نصيحة: تأكد من خلو الشتلات من الفيروسات قبل النقل.
    `,
    date: '2025-09-20',
    image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'الكل', icon: BookOpen },
  { id: 'ري وزراعة', label: 'ري وزراعة', icon: Droplets },
  { id: 'وقاية نبات', label: 'وقاية ومكافحة', icon: ShieldAlert },
  { id: 'مواعيد زراعية', label: 'المواسم الزراعية', icon: CalendarClock },
];

export const GuidanceLibrary: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.includes(searchQuery) || article.summary.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = ARTICLES[0]; // Assuming the first one is featured for demo

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen space-y-8">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
             <Sprout className="h-8 w-8 text-primary-600" />
             المكتبة الزراعية
          </h2>
          <p className="text-gray-500 mt-2">مرجعك الشامل لأفضل الممارسات الزراعية في تهامة</p>
        </div>
        
        <div className="relative w-full md:w-96">
           <input 
             type="text" 
             placeholder="ابحث عن موضوع (ري، طماطم، آفات)..."
             className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm outline-none"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
           <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Featured Article */}
      {selectedCategory === 'all' && !searchQuery && (
        <div 
          onClick={() => setSelectedArticle(featuredArticle)}
          className="relative rounded-3xl overflow-hidden bg-gray-900 text-white cursor-pointer group shadow-2xl h-[400px]"
        >
           <img 
             src={featuredArticle.image} 
             alt={featuredArticle.title} 
             className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
           <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">
              <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1">
                 <Star className="h-3 w-3 fill-white" />
                 مقال مميز
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{featuredArticle.title}</h3>
              <p className="text-gray-200 line-clamp-2 text-lg mb-6">{featuredArticle.summary}</p>
              <button className="flex items-center gap-2 font-bold text-primary-400 group-hover:text-primary-300 transition-colors">
                 اقرأ المقال كاملاً <ArrowRight className="h-5 w-5" />
              </button>
           </div>
        </div>
      )}

      {/* Categories Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
         {CATEGORIES.map(cat => (
           <button
             key={cat.id}
             onClick={() => setSelectedCategory(cat.id)}
             className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
               selectedCategory === cat.id 
                 ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                 : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
             }`}
           >
             <cat.icon className="h-4 w-4" />
             {cat.label}
           </button>
         ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div 
            key={article.id} 
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group" 
            onClick={() => setSelectedArticle(article)}
          >
            <div className="h-48 overflow-hidden relative">
               <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-lg text-gray-800 shadow-sm">
                  {article.category}
               </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">{article.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-3">{article.summary}</p>
              
              <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4 text-xs text-gray-400">
                 <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                 </div>
                 <span className="text-primary-600 font-bold flex items-center gap-1">
                    المزيد <ArrowRight className="h-3 w-3" />
                 </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
         <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-700">لا توجد مقالات تطابق بحثك</h3>
            <p className="text-gray-500">جرب البحث بكلمات مختلفة أو تغيير التصنيف</p>
         </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 flex flex-col">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 left-4 bg-white/50 hover:bg-white p-2 rounded-full transition-colors z-20 backdrop-blur-md"
            >
              <X className="h-6 w-6 text-gray-900" />
            </button>
            <div className="h-64 w-full relative shrink-0">
               <img src={selectedArticle.image} className="w-full h-full object-cover" alt={selectedArticle.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
               <div className="absolute bottom-0 inset-x-0 p-8">
                  <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block shadow-sm">{selectedArticle.category}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{selectedArticle.title}</h2>
               </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 text-gray-500 text-sm mb-6 pb-6 border-b">
                 <Calendar className="h-4 w-4" />
                 <span>تاريخ النشر: {selectedArticle.date}</span>
                 <span className="mx-2">•</span>
                 <span>كتب بواسطة: فريق الإرشاد</span>
              </div>
              <div className="prose prose-lg prose-headings:text-gray-800 prose-p:text-gray-600 whitespace-pre-line leading-relaxed">
                {selectedArticle.content}
              </div>
              <div className="mt-8 pt-6 border-t flex justify-end">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="bg-gray-100 text-gray-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  إغلاق القراءة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Banner */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-xl">
        <div className="relative z-10">
           <h3 className="text-2xl md:text-3xl font-bold mb-4">هل تواجه مشكلة محددة في محصولك؟</h3>
           <p className="text-primary-100 mb-8 max-w-xl mx-auto text-lg">
             المرشد الذكي متاح 24 ساعة لتشخيص الأمراض واقتراح الحلول المناسبة فوراً.
           </p>
           <button className="bg-white text-primary-800 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition shadow-lg flex items-center gap-2 mx-auto">
             <Sprout className="h-5 w-5" />
             اسأل المرشد الذكي الآن
           </button>
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-white/10 w-64 h-64 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 bg-black/10 w-64 h-64 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};