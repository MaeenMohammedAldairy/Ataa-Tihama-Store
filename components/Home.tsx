
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tractor, Leaf, Users, Bot, ShoppingBag, ArrowLeft, 
  TrendingUp, CheckCircle, ShieldCheck, Zap, Globe, MessageSquare 
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface HomeProps {
  products: Product[];
}

export const Home: React.FC<HomeProps> = ({ products }) => {
  const navigate = useNavigate();

  const features = [
    {
      title: "التسويق الذكي",
      desc: "نصل بمحصولك إلى أكبر شبكة تجار في اليمن والمنطقة.",
      icon: <ShoppingBag className="h-6 w-6" />,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "إرشاد زراعي رقمي",
      desc: "استشارية ذكاء اصطناعي تدعمك في التسميد والري ومكافحة الآفات.",
      icon: <Bot className="h-6 w-6" />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "تحليلات السوق",
      desc: "توقعات الأسعار وحجم الطلب لمساعدتك في اتخاذ قرارات دقيقة.",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "مجتمع المزارعين",
      desc: "تبادل الخبرات مع مزارعي تهامة والجمعيات الزراعية المعتمدة.",
      icon: <Users className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const stats = [
    { label: "مزارع مسجل", value: "+٥,٠٠٠", icon: <Tractor /> },
    { label: "طن محصول منتج", value: "+١٢,٠٠٠", icon: <Leaf /> },
    { label: "جمعية تعاونية", value: "٤٢", icon: <ShieldCheck /> },
    { label: "صفقة ناجحة", value: "+٨,٥٠٠", icon: <CheckCircle /> }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#052e16] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full opacity-20">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-green-400 rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[80%] bg-emerald-500 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-black tracking-widest text-green-300 animate-in fade-in slide-in-from-right-4 duration-700">
                  <Zap className="h-3 w-3" />
                  مستقبل الزراعة في تهامة
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                  نحو نهضة <span className="text-green-400">زراعية رقمية</span> شاملة
                </h1>
                <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                  عطاء تهامة هي المنصة الوطنية الموحدة لربط المزارع بالتاجر، وتعزيز الإنتاجية بإرشاد ذكي وتسهيلات تسويقية متكاملة.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                  <button 
                    onClick={() => navigate('/market')}
                    className="bg-green-500 hover:bg-green-600 text-[#052e16] px-10 py-5 rounded-2xl font-black shadow-[0_20px_40px_rgba(34,197,94,0.3)] transition-all hover:-translate-y-1 active:translate-y-0 text-lg"
                  >
                    اكتشف الماركت
                  </button>
                  <button 
                    onClick={() => navigate('/profile?tab=advisor')}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black transition-all hover:border-white/40 text-lg"
                  >
                    المرشد الزراعي
                  </button>
                </div>
              </div>
              
              {/* Hero Image/Illustration Area */}
              <div className="relative hidden lg:block group">
                <div className="relative z-10 rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl aspect-square rotate-3 group-hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000" 
                    alt="زراعة تهامة" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#052e16] via-transparent to-transparent opacity-60"></div>
                </div>
                {/* Floating tags */}
                <div className="absolute -top-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl text-[#052e16] animate-bounce-slow">
                  <Leaf className="h-8 w-8 text-green-600 mb-2" />
                  <p className="font-black text-sm">محاصيل عضوية</p>
                </div>
                <div className="absolute -bottom-10 -right-6 bg-white p-6 rounded-3xl shadow-2xl text-[#052e16] animate-float">
                  <ShieldCheck className="h-8 w-8 text-blue-600 mb-2" />
                  <p className="font-black text-sm">جودة مضمونة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Statistics */}
      <section className="bg-gray-50 py-12 -mt-12 relative z-20 mx-4 md:mx-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-3 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="bg-green-50 p-3 rounded-2xl text-green-600">
                  {React.cloneElement(stat.icon as React.ReactElement, { className: "h-6 w-6" })}
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-gray-900 leading-none mb-1">{stat.value}</div>
                  <div className="text-sm font-bold text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid - New Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div className="text-right space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900">تسوق حسب <span className="text-green-600">الفئة</span></h2>
            <p className="text-gray-500 font-medium text-lg max-w-xl">اختر نوع المنتجات التي تهمك واستعرض أفضل المحاصيل المتوفرة حالياً.</p>
          </div>
          <button 
            onClick={() => navigate('/categories')}
            className="flex items-center gap-2 text-green-700 font-black hover:gap-4 transition-all"
          >
            عرض جميع الفئات
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {[
            { name: "خضروات", icon: <Leaf />, color: "bg-green-50 text-green-600", path: `/market?category=${ProductCategory.VEGETABLES}` },
            { name: "فواكه", icon: <ShoppingBag />, color: "bg-orange-50 text-orange-600", path: `/market?category=${ProductCategory.FRUITS}` },
            { name: "حبوب", icon: <Tractor />, color: "bg-yellow-50 text-yellow-600", path: `/market?category=${ProductCategory.GRAINS}` },
            { name: "مواشي", icon: <Users />, color: "bg-red-50 text-red-600", path: `/market?category=${ProductCategory.LIVESTOCK}` },
            { name: "أسمدة", icon: <Zap />, color: "bg-blue-50 text-blue-600", path: `/market?category=${ProductCategory.FERTILIZERS}` },
            { name: "بذور", icon: <TrendingUp />, color: "bg-emerald-50 text-emerald-600", path: `/market?category=${ProductCategory.SEEDS}` },
          ].map((cat, i) => (
            <button 
              key={i}
              onClick={() => navigate(cat.path)}
              className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all group flex flex-col items-center text-center space-y-3"
            >
              <div className={`${cat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                {React.cloneElement(cat.icon as React.ReactElement, { className: "h-6 w-6" })}
              </div>
              <span className="font-black text-gray-900 group-hover:text-green-700 transition-colors">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">خدمات صممت <span className="text-green-600">للمزارع التهامي</span></h2>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">نطور حلولاً تقنية برؤية زراعية أصيلة لخدمة مزارعينا وتسهيل وصولهم للأسواق.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:border-green-100 transition-all duration-500">
              <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">{f.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Market Section */}
      <section className="bg-green-600 rounded-[3rem] md:rounded-[4rem] mx-4 py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6">
              <h2 className="text-3xl md:text-5xl font-black leading-tight">سوق المحاصيل <br/> مباشر من المزرعة</h2>
              <p className="text-green-50 text-lg font-medium opacity-90 leading-relaxed">
                تصفح أفضل المحاصيل الموسمية من مزارع تهامة. شراء مباشر، جودة مضمونه، وأسعار عادلة للجميع.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <button 
                  onClick={() => navigate('/market')}
                  className="bg-white text-green-700 px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-green-50 transition-all"
                >
                  تصفح السوق الآن
                </button>
                <div className="flex -space-x-3 rtl:space-x-reverse items-center">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-green-600 bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="مستخدم" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="pr-4 text-sm font-bold text-green-50">+٤٠٠ تاجر نشط</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              {products.slice(0, 4).map((p, i) => (
                <div key={i} className={`bg-white rounded-3xl p-4 text-gray-900 space-y-3 shadow-2xl ${i % 2 === 1 ? 'translate-y-8' : ''}`}>
                  <div className="h-32 rounded-2xl overflow-hidden bg-gray-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="font-black text-sm">{p.name}</p>
                    <p className="text-green-600 font-black text-xs">{p.price} ر.ي</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Globe className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" />
        </div>
      </section>

      {/* App CTA Section */}
      <section className="max-w-7xl mx-auto px-4 text-center space-y-12 py-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">هل أنت مستعد <span className="text-green-600">للانطلاق؟</span></h2>
          <p className="text-gray-500 text-lg font-medium">سواء كنت مزارعاً يبحث عن تسويق محصوله، أو تاجراً يبحث عن أجود المحاصيل، أو مهتماً بمستقبل الزراعة في تهامة.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl w-80 text-right space-y-4 hover:-translate-y-2 transition-all">
            <Tractor className="h-10 w-10 text-green-600 mb-2" />
            <h4 className="text-xl font-black">سجل بصفتك مزارع</h4>
            <p className="text-gray-500 text-sm font-medium">انضم لجمعيتك، سوّق محصولك، واحصل على استشارات ذكية لزيادة إنتاجك.</p>
            <button className="text-green-600 font-black flex items-center gap-2 group pt-4">
              ابدأ الآن <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="bg-[#052e16] p-8 rounded-[2.5rem] shadow-xl w-80 text-right space-y-4 text-white hover:-translate-y-2 transition-all">
            <ShoppingBag className="h-10 w-10 text-green-400 mb-2" />
            <h4 className="text-xl font-black text-white">سجل بصفتك تاجر</h4>
            <p className="text-green-100 text-sm font-medium opacity-80">ابحث عن موردين موثوقين، تتبع طلباتك، واحصل على أفضل الأسعار مباشرة.</p>
            <button className="text-green-400 font-black flex items-center gap-2 group pt-4">
              ابدأ الآن <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl w-80 text-right space-y-4 hover:-translate-y-2 transition-all">
            <MessageSquare className="h-10 w-10 text-blue-600 mb-2" />
            <h4 className="text-xl font-black">تعاون معنا</h4>
            <p className="text-gray-500 text-sm font-medium">كجمعية زراعية أو شريك تنموي، لتعزيز الأمن الغذائي في تهامة.</p>
            <button className="text-blue-600 font-black flex items-center gap-2 group pt-4">
              تحدث إلينا <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
