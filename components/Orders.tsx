import React, { useState } from 'react';
import { Order, UserRole, Product } from '../types';
import { Package, Truck, CheckCircle2, MapPin, Phone, TrendingUp, ShoppingBag, User, ChevronRight, LayoutGrid, Tag } from 'lucide-react';

interface OrdersProps {
  orders: Order[];
  products?: Product[];
  userRole: UserRole | null;
  userName?: string;
  title?: string;
  onUpdateStatus?: (orderId: string, newStatus: Order['status']) => void;
}

export const Orders: React.FC<OrdersProps> = ({ orders, products = [], userRole, userName, title = "إدارة الطلبات", onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState<'purchases' | 'sales' | 'listings'>(
    (userRole === UserRole.FARMER || userRole === UserRole.MERCHANT) ? 'sales' : 'purchases'
  );

  const isTransport = userRole === UserRole.TRANSPORT;
  const isFarmer = userRole === UserRole.FARMER;
  const isMerchant = userRole === UserRole.MERCHANT;

  // المحاكاة: في نظام حقيقي، تأتي هذه البيانات من تفاصيل الطلب
  const mockCustomerInfo = {
    name: "سالم عبده محمد",
    phone: "777888999",
    location: "الحديدة - شارع الميناء",
    paymentMethod: "الدفع نقداً عند الاستلام"
  };

  let displayedOrders = orders;

  // منطق تصفية المبيعات للمزارعين والتجار
  if (isFarmer || isMerchant) {
    if (activeTab === 'sales') {
        displayedOrders = orders.filter(order => 
            order.items.some(item => item.sellerName === userName)
        );
        
        // عرض طلب تجريبي إذا كانت القائمة فارغة لتوضيح الوظيفة
        if (displayedOrders.length === 0) {
             displayedOrders = [
                 {
                     id: 'ord-10245',
                     date: '2025-05-20',
                     status: 'pending',
                     total: 35000,
                     items: [
                         {
                             id: '1',
                             name: 'مانجو تيمور فاخر',
                             price: 3500,
                             unit: 'سلة',
                             image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4f4716?w=200',
                             sellerName: userName || 'المستخدم الحالي',
                             quantity: 10
                         } as any
                     ],
                 }
             ];
        }
    } else {
        // مشتريات المستخدم (الطلبات التي قام هو بطلبها)
        displayedOrders = orders.filter(order => !order.items.some(item => item.sellerName === userName));
    }
  }

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'shipping': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
     switch(status) {
      case 'pending': return 'قيد التجهيز';
      case 'shipping': return 'جاري التوصيل';
      case 'delivered': return 'تم التسليم';
      default: return status;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
          <p className="text-gray-500 mt-2">نظام تتبع العمليات التجارية اللحظي</p>
        </div>
        
        {(isFarmer || isMerchant) && (
          <div className="bg-white p-1.5 rounded-2xl flex shadow-sm border border-gray-100 overflow-x-auto">
             <button 
               onClick={() => setActiveTab('sales')}
               className={`px-4 md:px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'sales' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-gray-500 hover:bg-gray-50'}`}
             >
               <TrendingUp className="h-4 w-4" />
               مبيعاتي
             </button>
             <button 
               onClick={() => setActiveTab('listings')}
               className={`px-4 md:px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'listings' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-gray-500 hover:bg-gray-50'}`}
             >
               <LayoutGrid className="h-4 w-4" />
               منتجاتي المعروضة
             </button>
             <button 
               onClick={() => setActiveTab('purchases')}
               className={`px-4 md:px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'purchases' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-gray-500 hover:bg-gray-50'}`}
             >
               <ShoppingBag className="h-4 w-4" />
               مشترياتي
             </button>
          </div>
        )}
      </div>

      <div className="grid gap-8">
        {activeTab === 'listings' ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.sellerName === userName).length === 0 ? (
                 <div className="col-span-full bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                    <LayoutGrid className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold">لم تقم بإضافة أي منتجات للسوق بعد</p>
                 </div>
              ) : (
                products.filter(p => p.sellerName === userName).map(product => (
                  <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                     <div className="relative h-48 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black text-primary-700 shadow-sm">
                           {product.price} ر.ي / {product.unit}
                        </div>
                     </div>
                     <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">{product.category}</span>
                        </div>
                        <h4 className="text-lg font-black text-gray-900 mb-2 truncate">{product.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                           <MapPin className="h-3.5 w-3.5" />
                           {product.location}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                           <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                              <span className="text-[10px] font-bold text-emerald-600 font-black">نشط في السوق</span>
                           </div>
                           <button className="text-primary-600 hover:text-primary-700 font-bold text-xs flex items-center gap-1">
                              تعديل <ChevronRight className="h-3 w-3" />
                           </button>
                        </div>
                     </div>
                  </div>
                ))
              )}
           </div>
        ) : displayedOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
             <Package className="h-16 w-16 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-500 font-bold">لا توجد طلبات لعرضها حالياً</p>
          </div>
        ) : (
          displayedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-primary-600">
                     <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase">رقم العملية</div>
                    <div className="text-gray-900 font-black">#{order.id.slice(-6)}</div>
                  </div>
                  <div className="h-10 w-px bg-gray-200 mx-2 hidden sm:block"></div>
                  <div className="hidden sm:block">
                    <div className="text-xs text-gray-400 font-bold uppercase">تاريخ الطلب</div>
                    <div className="text-gray-900 font-bold">{order.date}</div>
                  </div>
                </div>

                <div className={`px-5 py-2 rounded-full border text-xs font-black flex items-center gap-2 ${getStatusStyle(order.status)}`}>
                   <span className="relative flex h-2 w-2">
                     <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${order.status === 'pending' ? 'bg-amber-400' : (order.status === 'shipping' ? 'bg-blue-400' : 'bg-emerald-400')}`}></span>
                     <span className={`relative inline-flex rounded-full h-2 w-2 ${order.status === 'pending' ? 'bg-amber-500' : (order.status === 'shipping' ? 'bg-blue-500' : 'bg-emerald-500')}`}></span>
                   </span>
                   {getStatusLabel(order.status)}
                </div>
              </div>
              
              <div className="p-6 grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-xs font-black text-gray-400 flex items-center gap-2 mb-4 tracking-widest uppercase">
                     <ShoppingBag className="h-4 w-4" /> المنتجات في هذا الطلب
                  </h4>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                      <div className="flex-1">
                        <h5 className="font-black text-gray-900 text-lg">{item.name}</h5>
                        <div className="flex items-center gap-3 mt-1">
                           <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">البائع: {item.sellerName}</span>
                           <span className="text-xs text-gray-400">الكمية: {item.quantity} {item.unit}</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-primary-700 font-black text-xl">{item.price * item.quantity} <span className="text-xs font-normal">ر.ي</span></div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pt-6 mt-4 border-t-2 border-dashed border-gray-100">
                     <span className="text-gray-400 font-bold">إجمالي الفاتورة النهائية</span>
                     <div className="text-right">
                        <div className="text-3xl font-black text-gray-900">{order.total} <span className="text-sm font-normal text-gray-400">ريال يمني</span></div>
                        <p className="text-[10px] text-emerald-600 font-bold mt-1">شامل رسوم النقل والخدمة</p>
                     </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 flex flex-col">
                  <h4 className="text-xs font-black text-gray-400 flex items-center gap-2 mb-6 tracking-widest uppercase">
                     <User className="h-4 w-4" /> {activeTab === 'sales' ? 'بيانات المشتري' : 'تفاصيل التوصيل'}
                  </h4>
                  
                  <div className="space-y-6 mb-10">
                     <div className="flex items-start gap-4">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-gray-400">
                           <User className="h-5 w-5" />
                        </div>
                        <div>
                           <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">الاسم الكامل</div>
                           <div className="text-sm font-black text-gray-800">{mockCustomerInfo.name}</div>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-gray-400">
                           <Phone className="h-5 w-5" />
                        </div>
                        <div>
                           <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">رقم التواصل</div>
                           <div className="text-sm font-black text-gray-800" dir="ltr">{mockCustomerInfo.phone}</div>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-gray-400">
                           <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                           <div className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">عنوان الاستلام</div>
                           <div className="text-sm font-bold text-gray-800 leading-relaxed">{mockCustomerInfo.location}</div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-auto space-y-3">
                     {onUpdateStatus && activeTab === 'sales' && (
                       <>
                          {order.status === 'pending' && (
                            <button 
                              onClick={() => onUpdateStatus(order.id, 'shipping')}
                              className="w-full bg-primary-600 text-white py-4 rounded-2xl font-black hover:bg-primary-700 transition shadow-xl shadow-primary-200 flex items-center justify-center gap-2 transform active:scale-95"
                            >
                              <Truck className="h-5 w-5" />
                              بدء تجهيز وشحن الطلب
                            </button>
                          )}
                          {order.status === 'shipping' && (
                            <button 
                              onClick={() => onUpdateStatus(order.id, 'delivered')}
                              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black hover:bg-emerald-700 transition shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 transform active:scale-95"
                            >
                              <CheckCircle2 className="h-5 w-5" />
                              تأكيد اكتمال التسليم
                            </button>
                          )}
                       </>
                     )}
                     
                     {isTransport && order.status === 'shipping' && (
                       <button 
                         onClick={() => onUpdateStatus(order.id, 'delivered')}
                         className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black hover:bg-emerald-700 transition shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 transform active:scale-95"
                       >
                         <CheckCircle2 className="h-5 w-5" />
                         تأكيد توصيل الشحنة
                       </button>
                     )}
                     
                     <button className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 group">
                        <Phone className="h-5 w-5 text-gray-400 group-hover:text-primary-600" />
                        اتصال هاتفي سريع
                     </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};