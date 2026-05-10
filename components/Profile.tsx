import React, { useState } from 'react';
import { 
  User, MessageSquare, Bot, Package, LayoutDashboard, 
  Settings, LogOut, ChevronLeft, Bell, Shield, CreditCard,
  MapPin, Phone, Mail, Camera, ArrowLeft
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { UserChat } from './UserChat';
import { AIAdvisor } from './AIAdvisor';
import { Orders } from './Orders';
import { StatsDashboard } from './StatsDashboard';

import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';

interface ProfileProps {
  userProfile: UserProfile | null;
  onLogout: () => void;
  orders: any[];
  products?: any[]; // Added products prop
  chatTarget?: string;
  onUpdateOrderStatus?: (orderId: string, newStatus: any) => void; // Added update handler
}

export const Profile: React.FC<ProfileProps> = ({ userProfile, onLogout, orders, products, chatTarget, onUpdateOrderStatus }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = (searchParams.get('tab') || 'overview') as 'overview' | 'messages' | 'advisor' | 'orders' | 'stats';

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  if (!userProfile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center space-y-6">
        <div className="bg-gray-100 p-6 rounded-full">
          <User className="h-12 w-12 text-gray-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900">سجل دخولك أولاً</h2>
          <p className="text-gray-500 font-medium">يجب عليك تسجيل الدخول للوصول إلى بيانات حسابك</p>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-green-700 transition-all active:scale-95"
        >
          تسجيل الدخول الآن
        </button>
      </div>
    );
  }

  const menuItems = [
    { id: 'messages', label: 'الرسائل', icon: <MessageSquare className="h-5 w-5" />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'advisor', label: 'المرشد الزراعي', icon: <Bot className="h-5 w-5" />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'orders', label: 'طلباتي', icon: <Package className="h-5 w-5" />, color: 'text-orange-600', bg: 'bg-orange-50' },
    ...( [UserRole.FARMER, UserRole.MERCHANT, UserRole.ASSOCIATION].includes(userProfile.role)
      ? [{ id: 'stats', label: 'الإحصائيات والتقارير', icon: <LayoutDashboard className="h-5 w-5" />, color: 'text-emerald-600', bg: 'bg-emerald-50' }]
      : []
    ),
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'messages':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                   <ArrowLeft className="h-5 w-5" />
                </button>
                <h2 className="text-2xl font-black">الرسائل والمحادثات</h2>
             </div>
             <UserChat initialContact={chatTarget} />
          </div>
        );
      case 'advisor':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                   <ArrowLeft className="h-5 w-5" />
                </button>
                <h2 className="text-2xl font-black">المرشد الزراعي الذكي</h2>
             </div>
             <AIAdvisor />
          </div>
        );
      case 'orders':
        return (
           <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-4 mb-4">
                 <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                    <ArrowLeft className="h-5 w-5" />
                 </button>
                 <h2 className="text-2xl font-black">إدارة الطلبات</h2>
              </div>
              <Orders 
                 orders={orders} 
                 products={products}
                 userRole={userProfile.role} 
                 userName={userProfile.name} 
                 onUpdateStatus={onUpdateOrderStatus} 
              />
           </div>
        );
      case 'stats':
        if (![UserRole.FARMER, UserRole.MERCHANT, UserRole.ASSOCIATION].includes(userProfile.role)) {
          return <Navigate to="/profile" />;
        }
        return (
           <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-4 mb-4">
                 <button onClick={() => setActiveTab('overview')} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                    <ArrowLeft className="h-5 w-5" />
                 </button>
                 <h2 className="text-2xl font-black">لوحة الإحصائيات</h2>
              </div>
              <StatsDashboard />
           </div>
        );
      default:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Profile Header */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl"></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                     <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                        <User className="h-16 w-16 text-green-600" />
                     </div>
                     <button className="absolute -bottom-2 -left-2 p-2 bg-white rounded-xl shadow-lg text-gray-400 hover:text-green-600 transition-all border border-gray-100">
                        <Camera className="h-4 w-4" />
                     </button>
                  </div>
                  <div className="flex-1 text-center md:text-right space-y-2">
                     <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <h1 className="text-3xl font-black text-gray-900">{userProfile.name}</h1>
                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full w-fit mx-auto md:mx-0">
                           {userProfile.role}
                        </span>
                     </div>
                     <p className="text-gray-500 font-bold flex items-center justify-center md:justify-start gap-2">
                        <Phone className="h-4 w-4" />
                        {userProfile.phone}
                     </p>
                     <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                        <div className="text-center">
                           <p className="text-xl font-black text-gray-900">{orders.length}</p>
                           <p className="text-[10px] font-bold text-gray-400 uppercase">طلبات</p>
                        </div>
                        <div className="w-px h-8 bg-gray-100"></div>
                        <div className="text-center">
                           <p className="text-xl font-black text-gray-900">4.9</p>
                           <p className="text-[10px] font-bold text-gray-400 uppercase">التقييم</p>
                        </div>
                     </div>
                  </div>
                  <button className="bg-gray-50 text-gray-400 p-4 rounded-2xl hover:bg-gray-100 hover:text-gray-600 transition-all">
                     <Settings className="h-6 w-6" />
                  </button>
               </div>
            </div>

            {/* Account Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-6 group text-right w-full"
                  >
                    <div className={`${item.bg} ${item.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                       {item.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                       <h3 className="font-black text-gray-900 text-lg">{item.label}</h3>
                       <p className="text-xs font-bold text-gray-400">تحقق من {item.label.toLowerCase()} وإدارتها بشكل كامل</p>
                    </div>
                    <ChevronLeft className="h-5 w-5 text-gray-300 group-hover:text-green-600 group-hover:-translate-x-2 transition-all" />
                  </button>
               ))}
            </div>

            {/* Logout Section */}
            <div className="pt-8">
               <button 
                  onClick={onLogout}
                  className="w-full bg-red-50 text-red-600 p-6 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-red-100 transition-all border border-red-100"
               >
                  <LogOut className="h-5 w-5" />
                  تسجيل الخروج من الحساب
               </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      {renderContent()}
    </div>
  );
};
