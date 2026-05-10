import React, { useState } from 'react';
import { Sprout, LogIn, Globe, LogOut, User, Menu, X, ShoppingBag, LayoutDashboard, Bot, Home, Store } from 'lucide-react';
import { UserRole } from '../types';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
  cartCount: number;
  userRole: UserRole | null;
  onLogout: () => void;
  hasOrders: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ userRole, onLogout, cartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lang, setLang] = useState<'AR' | 'EN'>('AR');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(prev => prev === 'AR' ? 'EN' : 'AR');
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'الأقسام', path: '/categories', icon: <Store className="h-4 w-4" /> },
    { name: 'السوق', path: '/market', icon: <ShoppingBag className="h-4 w-4" /> },
    ...(userRole && [UserRole.FARMER, UserRole.MERCHANT, UserRole.ASSOCIATION].includes(userRole) 
      ? [{ name: 'الإحصائيات', path: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> }]
      : [])
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 py-3 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Desktop Nav Links */}
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => navigate('/')}
            >
              <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform duration-300">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg md:text-xl text-gray-900 tracking-tight leading-none">عطاء تهامة</span>
                <span className="text-[9px] font-bold text-primary-600 uppercase tracking-widest mt-0.5 hidden xs:block">Ataa Tihama</span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 bg-gray-50/50 p-1 rounded-2xl border border-gray-100">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive(link.path)
                      ? 'bg-white text-primary-700 shadow-sm border border-gray-100'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher (Desktop) */}
            <button 
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all font-bold text-xs text-gray-600 hover:text-primary-700"
            >
              <Globe className="h-4 w-4" />
              <span>{lang === 'AR' ? 'EN' : 'العربية'}</span>
            </button>

            {userRole ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex flex-col text-left mr-2 items-end">
                  <span className="text-[10px] font-black text-gray-400 leading-none">مرحباً بك</span>
                  <span className="text-xs font-bold text-gray-900 leading-tight truncate max-w-[100px]">{userRole}</span>
                </div>
                <button 
                  onClick={() => navigate('/profile')}
                  className="bg-gray-100 p-2.5 rounded-full border border-gray-200 hover:bg-white hover:border-primary-300 transition-all text-gray-600 hover:text-primary-600 shadow-sm"
                >
                  <User className="h-4 w-4" />
                </button>
                <button 
                  onClick={onLogout}
                  className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                  title="خروج"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="bg-primary-600 text-white px-4 md:px-6 py-2.5 rounded-xl font-black text-xs md:text-sm shadow-lg shadow-primary-200 hover:bg-primary-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden xs:inline">دخول / تسجيل</span>
                <span className="xs:hidden">دخول</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-white border-b border-gray-100 shadow-2xl animate-in slide-in-from-top-4 duration-300 z-50">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl text-base font-bold transition-all ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-xl scale-110 ${isActive(link.path) ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {link.icon}
                </div>
                {link.name}
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
              <button 
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 p-4 rounded-2xl border border-gray-100 font-bold text-sm text-gray-600"
              >
                <Globe className="h-4 w-4" />
                {lang === 'AR' ? 'English' : 'العربية'}
              </button>
              {userRole && (
                <button 
                  onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  تسجيل خروج
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
