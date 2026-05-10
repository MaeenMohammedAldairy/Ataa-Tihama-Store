
import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, NavLink, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Home as HomePage } from './components/Home';
import { Categories } from './components/Categories';
import { Marketplace } from './components/Marketplace';
import { Profile } from './components/Profile';
import { AIAdvisor } from './components/AIAdvisor';
import { StatsDashboard } from './components/StatsDashboard';
import { ProductForm } from './components/ProductForm';
import { GuidanceLibrary } from './components/Guidance';
import { Cart } from './components/Cart';
import { Orders } from './components/Orders';
import { UserChat } from './components/UserChat';
import { ProductDetails } from './components/ProductDetails';
import { Footer } from './components/Footer';
import { 
  Home, ShoppingBag, MessageSquare, Bot, User, Package, PlusCircle, 
  LayoutDashboard, Tractor, Store, Building2, Users, CheckCircle, 
  ArrowLeft, ArrowRight, ShieldCheck, Mail, Smartphone, AlertCircle, 
  Loader2 
} from 'lucide-react';
import { Product, ProductCategory, UserRole, CartItem, Order, UserProfile } from './types';

// --- MOCK DATA ---
const ASSOCIATIONS = [
  "جمعية باجل الزراعية",
  "جمعية الزيدية التعاونية",
  "جمعية المراوعة لمنتجي الحبوب",
  "جمعية زبيد للتنمية الزراعية",
  "جمعية تهامة المركزية"
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'مانجو تيمور فاخر',
    category: ProductCategory.FRUITS,
    price: 3500,
    unit: 'سلة (20 كجم)',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000',
      'https://images.unsplash.com/photo-1621506289937-be8e496cc0d5?q=80&w=1000',
      'https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1000'
    ],
    sellerName: 'مزارع علي الرمعي',
    location: 'الحديدة - باجل',
    description: 'مانجو تيمور درجة أولى، خالي من الألياف، طعم سكري مميز. قطاف اليوم.',
    rating: 4.8
  },
  {
    id: '2',
    name: 'طماطم تهامي طازج',
    category: ProductCategory.VEGETABLES,
    price: 1200,
    unit: 'كرتون (10 كجم)',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1000',
      'https://images.unsplash.com/photo-1546473530-9a377bc2310d?q=80&w=1000'
    ],
    sellerName: 'مزارع حسن زبيد',
    location: 'الحديدة - زبيد',
    description: 'طماطم بلدي طازج، قطاف يومي، جودة عالية ومذاق رائع.',
    rating: 4.5
  },
  {
    id: '3',
    name: 'بصل أحمر ممتاز',
    category: ProductCategory.VEGETABLES,
    price: 2500,
    unit: 'شوالة (25 كجم)',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=1000',
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=1000'
    ],
    sellerName: 'مزارع محمد باجل',
    location: 'الحديدة - باجل',
    description: 'بصل أحمر درجة أولى، مجفف جيداً، صالح للتخزين لفترات طويلة.',
    rating: 4.2
  },
  {
    id: '4',
    name: 'ذرة رفيعة (غريب)',
    category: ProductCategory.GRAINS,
    price: 45000,
    unit: 'قدح (50 كجم)',
    image: 'https://images.unsplash.com/photo-1536679545707-c76a741d831d?q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1536679545707-c76a741d831d?q=80&w=1000',
      'https://images.unsplash.com/photo-1595124253349-20f0e6561ffb?q=80&w=1000'
    ],
    sellerName: 'مزارع أحمد المراوعة',
    location: 'الحديدة - المراوعة',
    description: 'ذرة رفيعة بلدية، محصول الموسم، نظيفة جداً وخالية من الشوائب.',
    rating: 4.9
  },
  {
    id: '5',
    name: 'جوافة تهامية وردية',
    category: ProductCategory.FRUITS,
    price: 4500,
    unit: 'كرتون (8 كجم)',
    image: 'https://images.unsplash.com/photo-1539670119842-8c1059f13f1e?q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1539670119842-8c1059f13f1e?q=80&w=1000',
      'https://images.unsplash.com/photo-1615485501000-802526848079?q=80&w=1000'
    ],
    sellerName: 'مزارع سعيد الدريهمي',
    location: 'الحديدة - الدريهمي',
    description: 'جوافة وردية حلوة المذاق، مقطوفة بعناية في فترة النضج المثالية.',
    rating: 4.7
  },
  {
    id: '6',
    name: 'فلفل حار (حامي)',
    category: ProductCategory.VEGETABLES,
    price: 800,
    unit: 'سلة صغيرة (3 كجم)',
    image: 'https://images.unsplash.com/photo-1588252303780-609930fca683?q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1588252303780-609930fca683?q=80&w=1000'
    ],
    sellerName: 'مزارع عبال',
    location: 'ريمة - عبال',
    description: 'فلفل حار تهامي أصيل، طازج جداً ولون أحمر زاهي.',
    rating: 4.3
  },
  {
    id: '7',
    name: 'بذور طماطم هجين',
    category: ProductCategory.SEEDS,
    price: 15000,
    unit: 'علبة (5000 بذرة)',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000'
    ],
    sellerName: 'مؤسسة الوديان الزراعية',
    location: 'صنعاء',
    description: 'بذور طماطم هجين عالية التغطية ومقاومة للأمراض الفيروسية المنتشرة في تهامة.',
    rating: 4.6
  },
  {
    id: '8',
    name: 'تيس بلدي تهامي',
    category: ProductCategory.LIVESTOCK,
    price: 75000,
    unit: 'رأس',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1000'
    ],
    sellerName: 'سوق الماشية بالزيدية',
    location: 'الحديدة - الزيدية',
    description: 'تيوس بلدية تربية طبيعية (مرعى تهامي)، لحم طري وجودة مضمونة.',
    rating: 4.8
  },
  {
    id: '9',
    name: 'مبيد حشري عضوي سائل',
    category: ProductCategory.FERTILIZERS,
    price: 3200,
    unit: 'لتر',
    image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=1000'],
    sellerName: 'شركة تهامة الزراعية',
    location: 'الحديدة - ميناء الكثيب',
    description: 'مبيد عضوي آمن للبيئة فعال ضد المن والعنكبوت الأحمر، مناسب للمحاصيل المكشوفة.',
    rating: 4.5
  },
  {
    id: '10',
    name: 'بصل أحمر "باجل"',
    category: ProductCategory.VEGETABLES,
    price: 1800,
    unit: 'شوالة (20 كجم)',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=1000'],
    sellerName: 'مزارع الوادي - باجل',
    location: 'الحديدة - باجل',
    description: 'بصل باجل الشهير، قشرة قوية وصلاحية تخزينية عالية.',
    rating: 4.9
  },
  {
    id: '11',
    name: 'دخن تهامي بلدي',
    category: ProductCategory.GRAINS,
    price: 42000,
    unit: 'قدح (50 كجم)',
    image: 'https://images.unsplash.com/photo-1536679545707-c76a741d831d?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1536679545707-c76a741d831d?q=80&w=1000'],
    sellerName: 'مزارع سهل تهامة',
    location: 'الحديدة - المنصورية',
    description: 'دخن بلدي مغذي جداً، محصول الموسم الجديد، منقى آلياً.',
    rating: 4.6
  },
  {
    id: '12',
    name: 'جح (بطيخ) تهامي سكري',
    category: ProductCategory.FRUITS,
    price: 1500,
    unit: 'حبة كبيرة',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000'],
    sellerName: 'مزارع الجرعاني',
    location: 'الحديدة - وادي مور',
    description: 'بطيخ تهامي أحمر سكري، من خيرات وادي مور الكبيرة والممتلئة.',
    rating: 4.8
  },
  {
    id: '13',
    name: 'عسل سدر تهامي ملكي',
    category: ProductCategory.OTHER,
    price: 35000,
    unit: 'كجم',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1558583055-d7ac00b1adca?q=80&w=1000'],
    sellerName: 'مناحل الوادي الأخضر',
    location: 'الحديدة - القناوص',
    description: 'عسل سدر تهامي أصلي 100%، مستخلص من أشجار السدر في سهول تهامة الخصبة. يتميز برائحة عطرية قوية وفوائد علاجية متعددة.',
    rating: 5.0
  },
  {
    id: '14',
    name: 'بن يمني خولاني (مطر ريفي)',
    category: ProductCategory.GRAINS,
    price: 18000,
    unit: 'كجم',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000'],
    sellerName: 'جبال اليمن للتصدير',
    location: 'صعدة - خولان',
    description: 'بن خولاني فاخر (مطر ريفي)، منتقى حبة حبة، تجفيف طبيعي تحت الشمس. قهوة عربية أصيلة بنكهة تهامية يمنية لا تضاهى.',
    rating: 4.9
  },
  {
    id: '15',
    name: 'محراث آلي (تيار) يدوي',
    category: ProductCategory.EQUIPMENT,
    price: 185000,
    unit: 'قطعة',
    image: 'https://images.unsplash.com/photo-1530268577195-71c14a282480?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1530268577195-71c14a282480?q=80&w=1000'],
    sellerName: 'مركز تهامة للمعدات',
    location: 'الحديدة - باجل',
    description: 'محراث آلي صغير وسهل الاستخدام، مثالي للمساحات المتوسطة والحدائق المنزلية، محرك قوي واستهلاك وقود منخفض.',
    rating: 4.4
  },
  {
    id: '16',
    name: 'شتلات نخيل (برحي) نسيجي',
    category: ProductCategory.SEEDS,
    price: 12000,
    unit: 'شتلة',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000'],
    sellerName: 'مشتل النخيل الذهبي',
    location: 'الحديدة - الجراحي',
    description: 'شتلات نخيل صنف برحي نسيجي مضمونة الصنف، منتجة في مختبرات معتمدة، جاهزة للغرس المباشر وتتحمل حرارة تهامة.',
    rating: 4.8
  }
];

const ProductDetailsDynamic = ({ products, onAddToCart, onContact, navigate }: { 
  products: Product[], 
  onAddToCart: (p: Product) => boolean, 
  onContact: (s: string) => void,
  navigate: any
}) => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="text-gray-400 text-6xl font-black">404</div>
        <p className="text-gray-500 font-bold">عذراً، هذا المنتج غير متوفر حالياً</p>
        <button onClick={() => navigate('/market')} className="bg-primary-600 text-white px-6 py-2 rounded-xl font-bold">العودة للسوق</button>
      </div>
    );
  }

  return (
    <ProductDetails 
      product={product} 
      onBack={() => navigate('/market')} 
      onAddToCart={onAddToCart} 
      onContact={onContact} 
    />
  );
};

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [chatTarget, setChatTarget] = useState<string | undefined>(undefined);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleAddToCart = (product: Product) => {
    if (!userProfile) {
      setShowLoginAlert(true);
      setTimeout(() => {
        setShowLoginAlert(false);
        navigate('/login');
      }, 2000);
      return false;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    return true;
  };

  // Auth State
  const [isRegistering, setIsRegistering] = useState(false);
  const [regStep, setRegStep] = useState(1); // 1: Role, 2: Fields, 3: Verification
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.FARMER);
  const [formData, setFormData] = useState<any>({
    name: '',
    phone: '',
    email: '',
    association: '',
    location: '',
    tradeType: 'قطاع خاص',
    address: '',
    region: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent, role: UserRole) => {
    e.preventDefault();
    const profile: UserProfile = { 
      id: Date.now().toString(), 
      name: 'مستخدم تهامي', 
      phone: '777', 
      role: role, 
      isVerified: true 
    };
    setUserProfile(profile);
    setUserRole(role);
    navigate('/');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRegStep(3); // Go to verification simulation
    setIsSubmitting(false);
  };

  const finalizeRegistration = () => {
    const profile: UserProfile = { 
      id: Date.now().toString(), 
      name: formData.name || formData.associationName || 'مستخدم جديد', 
      phone: formData.phone, 
      role: selectedRole, 
      isVerified: true 
    };
    setUserProfile(profile);
    setUserRole(selectedRole);
    navigate('/');
    // Reset registration state
    setIsRegistering(false);
    setRegStep(1);
  };

  // Fix for error line 396: Added handleUpdateOrderStatus function
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const isPathActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex flex-col font-sans" dir="rtl">
      <Navigation 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        userRole={userRole}
        onLogout={() => { setUserRole(null); setUserProfile(null); navigate('/'); }}
        hasOrders={orders.length > 0}
      />

      <main className="flex-1 pb-24 md:pb-10">
        <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/market" element={<Marketplace products={products} onAddToCart={(p) => setCart([...cart, {...p, quantity: 1}])} onContact={(n) => { setChatTarget(n); navigate('/profile?tab=messages'); }} onProductClick={(p) => navigate(`/product/${p.id}`)} />} />
            <Route path="/login" element={
               <div className="flex items-center justify-center py-12 px-4">
                  <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-2xl border border-gray-100 transition-all">
                     
                     {/* Toggle Login/Register */}
                     <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-8">
                        <button 
                          onClick={() => setIsRegistering(false)}
                          className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${!isRegistering ? 'bg-white shadow-md text-green-700' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          دخول
                        </button>
                        <button 
                          onClick={() => { setIsRegistering(true); setRegStep(1); }}
                          className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${isRegistering ? 'bg-white shadow-md text-green-700' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          إنشاء حساب جديد
                        </button>
                     </div>

                     {!isRegistering ? (
                        /* --- LOGIN FORM --- */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                           <h2 className="text-3xl font-black text-center mb-2">مرحباً بك مجدداً</h2>
                           <p className="text-gray-400 text-center mb-8 font-bold">سجل دخولك لمتابعة أعمالك الزراعية</p>
                           <form onSubmit={(e) => handleLogin(e, selectedRole)} className="space-y-6">
                              <div className="space-y-2">
                                 <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">رقم الهاتف</label>
                                 <input type="tel" required placeholder="77xxxxxxx" className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">كلمة المرور</label>
                                 <input type="password" required placeholder="••••••••" className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold" />
                              </div>
                              <button className="w-full bg-green-700 text-white py-5 rounded-2xl font-black shadow-xl shadow-green-100 hover:bg-green-800 transition-all transform active:scale-95">
                                 تسجيل الدخول
                              </button>
                           </form>
                        </div>
                     ) : (
                        /* --- REGISTRATION MULTI-STEP --- */
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                           {regStep === 1 && (
                              <div className="space-y-6">
                                 <div className="text-center">
                                    <h2 className="text-3xl font-black mb-2">من أنت؟</h2>
                                    <p className="text-gray-400 font-bold">اختر نوع الحساب الذي يناسب نشاطك</p>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    {[
                                       { role: UserRole.FARMER, icon: Tractor, label: "مزارع", desc: "أريد بيع محصولي" },
                                       { role: UserRole.MERCHANT, icon: Store, label: "تاجر", desc: "أريد شراء المنتجات" },
                                       { role: UserRole.ASSOCIATION, icon: Building2, label: "جمعية", desc: "إدارة وتنظيم المزارعين" },
                                       { role: UserRole.CONSUMER, icon: Users, label: "مستهلك", desc: "شراء منتجات طازجة" }
                                    ].map((item) => (
                                       <button 
                                          key={item.role}
                                          onClick={() => { setSelectedRole(item.role); setRegStep(2); }}
                                          className="p-6 rounded-[2rem] border-2 border-gray-50 hover:border-green-500 hover:bg-green-50/50 transition-all text-right group"
                                       >
                                          <item.icon className="h-8 w-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                                          <h4 className="font-black text-gray-900">{item.label}</h4>
                                          <p className="text-[10px] font-bold text-gray-400">{item.desc}</p>
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           )}

                           {regStep === 2 && (
                              <div className="space-y-8">
                                 <div className="flex items-center gap-4">
                                    <button onClick={() => setRegStep(1)} className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 text-gray-400">
                                       <ArrowRight className="h-5 w-5" />
                                    </button>
                                    <h2 className="text-2xl font-black">بيانات الـ {selectedRole}</h2>
                                 </div>
                                 <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                       <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">الاسم الكامل / الرسمي</label>
                                       <input 
                                          type="text" required 
                                          value={formData.name}
                                          onChange={e => setFormData({...formData, name: e.target.value})}
                                          className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold" 
                                       />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">رقم الهاتف</label>
                                       <input 
                                          type="tel" required 
                                          value={formData.phone}
                                          onChange={e => setFormData({...formData, phone: e.target.value})}
                                          placeholder="77xxxxxxx" 
                                          className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold" 
                                       />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">البريد الإلكتروني (اختياري)</label>
                                       <input 
                                          type="email" 
                                          value={formData.email}
                                          onChange={e => setFormData({...formData, email: e.target.value})}
                                          placeholder="user@example.com" 
                                          className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold" 
                                       />
                                    </div>

                                    {/* Role Specific Fields */}
                                    {selectedRole === UserRole.FARMER && (
                                       <>
                                          <div className="space-y-2">
                                             <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">الجمعية التابع لها</label>
                                             <select 
                                                required
                                                value={formData.association}
                                                onChange={e => setFormData({...formData, association: e.target.value})}
                                                className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold"
                                             >
                                                <option value="">اختر الجمعية</option>
                                                {ASSOCIATIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                             </select>
                                          </div>
                                          <div className="space-y-2">
                                             <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">موقع المزرعة</label>
                                             <input 
                                                type="text" required placeholder="المديرية / القرية" 
                                                value={formData.location}
                                                onChange={e => setFormData({...formData, location: e.target.value})}
                                                className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold" 
                                             />
                                          </div>
                                       </>
                                    )}

                                    {selectedRole === UserRole.MERCHANT && (
                                       <>
                                          <div className="space-y-2">
                                             <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">نوع التجارة</label>
                                             <select 
                                                required
                                                value={formData.tradeType}
                                                onChange={e => setFormData({...formData, tradeType: e.target.value})}
                                                className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold"
                                             >
                                                <option value="تجزئة">تجزئة</option>
                                                <option value="جملة">جملة</option>
                                                <option value="تصدير">تصدير</option>
                                             </select>
                                          </div>
                                          <div className="space-y-2">
                                             <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">نطاق التغطية (المنطقة)</label>
                                             <input 
                                                type="text" required placeholder="مثلاً: إقليم تهامة" 
                                                value={formData.region}
                                                onChange={e => setFormData({...formData, region: e.target.value})}
                                                className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold" 
                                             />
                                          </div>
                                       </>
                                    )}

                                    {(selectedRole === UserRole.ASSOCIATION || selectedRole === UserRole.CONSUMER) && (
                                       <div className="md:col-span-2 space-y-2">
                                          <label className="text-xs font-black text-gray-500 mr-2 uppercase tracking-widest">العنوان التفصيلي</label>
                                          <input 
                                             type="text" required placeholder="المحافظة - المديرية - الشارع" 
                                             value={formData.address}
                                             onChange={e => setFormData({...formData, address: e.target.value})}
                                             className="w-full bg-gray-50 p-4 rounded-2xl outline-none border border-gray-200 focus:border-green-500 focus:bg-white transition-all font-bold" 
                                          />
                                       </div>
                                    )}

                                    <div className="md:col-span-2 pt-4">
                                       <button 
                                          disabled={isSubmitting}
                                          className="w-full bg-green-700 text-white py-5 rounded-2xl font-black shadow-xl shadow-green-100 hover:bg-green-800 transition-all flex items-center justify-center gap-3"
                                       >
                                          {isSubmitting ? (
                                             <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                جاري المعالجة...
                                             </>
                                          ) : (
                                             "إنشاء الحساب"
                                          )}
                                       </button>
                                    </div>
                                 </form>
                              </div>
                           )}

                           {regStep === 3 && (
                              <div className="text-center space-y-8 py-4 animate-in zoom-in-95">
                                 <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner">
                                    <ShieldCheck className="h-12 w-12" />
                                 </div>
                                 <div className="space-y-2">
                                    <h2 className="text-3xl font-black">خطوة أخيرة للتوثيق</h2>
                                    <p className="text-gray-400 font-bold">تم إرسال رموز التحقق إلى وسائلك المسجلة</p>
                                 </div>

                                 <div className="grid gap-4 max-w-sm mx-auto">
                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4 text-right">
                                       <Smartphone className="h-6 w-6 text-blue-600" />
                                       <div className="flex-1">
                                          <p className="text-[10px] font-black text-blue-400 uppercase">رسالة SMS</p>
                                          <p className="text-xs font-bold text-blue-700">تم إرسال كود التفعيل إلى {formData.phone}</p>
                                       </div>
                                    </div>
                                    {formData.email && (
                                       <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl flex items-center gap-4 text-right">
                                          <Mail className="h-6 w-6 text-purple-600" />
                                          <div className="flex-1">
                                             <p className="text-[10px] font-black text-purple-400 uppercase">بريد إلكتروني</p>
                                             <p className="text-xs font-bold text-purple-700">تحقق من صندوق الوارد في بريدك</p>
                                          </div>
                                       </div>
                                    )}
                                    {selectedRole === UserRole.FARMER && formData.association && (
                                       <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-4 text-right">
                                          <Building2 className="h-6 w-6 text-amber-600" />
                                          <div className="flex-1">
                                             <p className="text-[10px] font-black text-amber-400 uppercase">إشعار للجمعية</p>
                                             <p className="text-xs font-bold text-amber-700">تم إرسال طلب انضمامك لـ {formData.association} للموافقة</p>
                                          </div>
                                       </div>
                                    )}
                                 </div>

                                 <div className="pt-6">
                                    <button 
                                       onClick={finalizeRegistration}
                                       className="w-full bg-green-700 text-white py-5 rounded-2xl font-black shadow-xl shadow-green-100 hover:bg-green-800 transition-all"
                                    >
                                       أكملت التحقق، ابدأ الآن
                                    </button>
                                 </div>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               </div>
            } />
            <Route path="/orders" element={<Orders orders={orders} products={products} userRole={userRole} userName={userProfile?.name} onUpdateStatus={handleUpdateOrderStatus} />} />
            <Route path="/dashboard" element={
               userProfile && [UserRole.FARMER, UserRole.MERCHANT, UserRole.ASSOCIATION].includes(userProfile.role) 
                  ? <StatsDashboard /> 
                  : <Navigate to={userProfile ? "/" : "/login"} />
            } />
            <Route path="/cart" element={
               <Cart 
                  items={cart} 
                  onRemove={(id) => setCart(cart.filter(c => c.id !== id))} 
                  onCheckout={(total) => {
                    const newOrder: Order = {
                      id: 'ord-' + Math.random().toString(36).substring(2, 9),
                      date: new Date().toISOString().split('T')[0],
                      status: 'pending',
                      total: total,
                      items: cart.map(item => ({...item}))
                    };
                    setOrders([newOrder, ...orders]);
                    setCart([]);
                    navigate('/orders');
                  }} 
               />
            } />
            <Route path="/guidance" element={<GuidanceLibrary />} />
            <Route path="/profile" element={
              <Profile 
                userProfile={userProfile} 
                onLogout={() => { setUserRole(null); setUserProfile(null); navigate('/'); }} 
                orders={orders} 
                products={products}
                chatTarget={chatTarget} 
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            } />
            <Route path="/add-product" element={<ProductForm onAddProduct={(p) => { setProducts([p, ...products]); navigate('/profile?tab=orders'); }} onCancel={() => navigate(-1)} userProfile={userProfile!} />} />
            <Route path="/product/:id" element={<ProductDetailsDynamic products={products} onAddToCart={handleAddToCart} onContact={(name) => { setChatTarget(name); navigate('/profile?tab=messages'); }} navigate={navigate} />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation - Fix for error line 418: using isPathActive helper to avoid scope issues with isActive */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 flex justify-between items-center z-[100] shadow-[0_-10px_25px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
         <NavLink to="/" className={() => `flex flex-col items-center gap-1 ${isPathActive('/') ? 'text-green-600' : 'text-gray-400'}`}>
            <Home className="h-6 w-6" />
            <span className="text-[10px] font-bold">الرئيسية</span>
         </NavLink>
         <NavLink to="/market" className={() => `flex flex-col items-center gap-1 ${isPathActive('/market') ? 'text-green-600' : 'text-gray-400'}`}>
            <ShoppingBag className="h-6 w-6" />
            <span className="text-[10px] font-bold">السوق</span>
         </NavLink>
         <NavLink to="/categories" className={() => `flex flex-col items-center gap-1 ${isPathActive('/categories') ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`p-3 -mt-10 rounded-2xl shadow-lg border-4 border-white transform transition-transform ${isPathActive('/categories') ? 'bg-green-600 text-white scale-110' : 'bg-green-700 text-white'}`}>
               <Store className="h-7 w-7" />
            </div>
            <span className="text-[10px] font-bold">الأقسام</span>
         </NavLink>
         <NavLink to="/orders" className={() => `flex flex-col items-center gap-1 ${isPathActive('/orders') ? 'text-green-600' : 'text-gray-400'}`}>
            <Package className="h-6 w-6" />
            <span className="text-[10px] font-bold">طلباتي</span>
         </NavLink>
         <NavLink to="/profile" className={() => `flex flex-col items-center gap-1 ${isPathActive('/profile') ? 'text-green-600' : 'text-gray-400'}`}>
            <User className="h-6 w-6" />
            <span className="text-[10px] font-bold">حسابي</span>
         </NavLink>
      </nav>

      <AnimatePresence>
        {showLoginAlert && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:w-96 z-[200]"
          >
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-red-50 flex items-center gap-4">
              <div className="bg-red-50 p-4 rounded-2xl text-red-600">
                <AlertCircle className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-gray-900 leading-tight">يرجى تسجيل الدخول</h4>
                <p className="text-xs text-gray-500 font-bold mt-1">يجب أن يكون لديك حساب لإضافة منتجات للسلة</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {(location.pathname === '/' || !userRole) && <Footer />}
    </div>
  );
};
