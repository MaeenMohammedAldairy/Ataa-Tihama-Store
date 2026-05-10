import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { MarketStat } from '../types';
import { TrendingUp, TrendingDown, AlertCircle, ShoppingCart, Users, Package, ArrowUpRight, ArrowDownRight, Printer, Plus, Download } from 'lucide-react';

const PRICE_DATA: MarketStat[] = [
  { name: 'يناير', price: 2500, demand: 60 },
  { name: 'فبراير', price: 3000, demand: 70 },
  { name: 'مارس', price: 4500, demand: 85 },
  { name: 'أبريل', price: 4000, demand: 80 },
  { name: 'مايو', price: 2000, demand: 50 },
  { name: 'يونيو', price: 3500, demand: 75 },
];

const TOP_SELLING_PRODUCTS = [
  { name: 'مانجو تيمور', quantity: 450 },
  { name: 'طماطم محمي', quantity: 380 },
  { name: 'ذرة رفيعة', quantity: 310 },
  { name: 'موز', quantity: 240 },
  { name: 'بامية', quantity: 190 },
];

const SummaryCard = ({ title, value, subtext, trend, icon: Icon, color }: any) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
     <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
           <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
           <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {subtext}
           </div>
        )}
     </div>
     <h4 className="text-3xl font-extrabold text-gray-900 mb-1">{value}</h4>
     <p className="text-gray-500 text-sm font-medium">{title}</p>
  </div>
);

export const StatsDashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 min-h-screen bg-gray-50/50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">لوحة التحكم</h2>
          <p className="text-gray-500 mt-1">نظرة شاملة على أداء مبيعاتك وحركة السوق في تهامة.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 shadow-sm">
              <Download className="h-4 w-4" />
              تصدير تقرير
           </button>
           <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary-700 shadow-lg shadow-primary-200">
              <Plus className="h-4 w-4" />
              إضافة منتج
           </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
           title="إجمالي المبيعات (اليوم)" 
           value="150,000 ر.ي" 
           subtext="12%" 
           trend="up" 
           icon={ShoppingCart} 
           color="bg-green-500" 
        />
        <SummaryCard 
           title="الطلبات الجديدة" 
           value="18 طلب" 
           subtext="5%" 
           trend="up" 
           icon={Package} 
           color="bg-blue-500" 
        />
        <SummaryCard 
           title="المنتجات النشطة" 
           value="45 منتج" 
           subtext="3 منتجات نفذت" 
           trend="down" 
           icon={TrendingUp} 
           color="bg-orange-500" 
        />
        <SummaryCard 
           title="إجمالي العملاء" 
           value="120 عميل" 
           subtext="8 جدد" 
           trend="up" 
           icon={Users} 
           color="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Price Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-lg font-bold text-gray-800">تحليل أسعار السوق</h3>
             <select className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-3 py-1.5 outline-none font-medium">
                <option>آخر 6 أشهر</option>
                <option>آخر سنة</option>
             </select>
          </div>
          <div className="h-[350px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PRICE_DATA}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Quick Stats */}
        <div className="space-y-6">
           {/* Alerts */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                 <AlertCircle className="h-5 w-5 text-red-500" />
                 تنبيهات عاجلة
              </h3>
              <div className="space-y-4">
                 <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                    <div className="w-2 h-2 mt-2 rounded-full bg-red-500 shrink-0"></div>
                    <div>
                       <p className="text-sm font-bold text-gray-800">مخزون منخفض: سماد يوريا</p>
                       <p className="text-xs text-gray-500">تبقى 5 أكياس فقط. يرجى إعادة الطلب.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 shrink-0"></div>
                    <div>
                       <p className="text-sm font-bold text-gray-800">ارتفاع طلب: طماطم محمي</p>
                       <p className="text-xs text-gray-500">زيادة بنسبة 20% في الطلبات اليوم.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-white">
              <h3 className="font-bold mb-4">إجراءات سريعة</h3>
              <div className="space-y-2">
                 <button className="w-full bg-white/10 hover:bg-white/20 transition p-3 rounded-lg text-sm flex items-center justify-between">
                    <span>طباعة فاتورة أخيرة</span>
                    <Printer className="h-4 w-4 opacity-70" />
                 </button>
                 <button className="w-full bg-white/10 hover:bg-white/20 transition p-3 rounded-lg text-sm flex items-center justify-between">
                    <span>تحديث المخزون</span>
                    <Package className="h-4 w-4 opacity-70" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Top Selling */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">أكثر المنتجات مبيعاً</h3>
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_SELLING_PRODUCTS} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#334155'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="quantity" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demand Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">مؤشر الطلب الشهري</h3>
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRICE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Bar dataKey="demand" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};