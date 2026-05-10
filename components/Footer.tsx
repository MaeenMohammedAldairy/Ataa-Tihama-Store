import React from 'react';
import { Sprout, Phone, Mail, MapPin, Facebook, Twitter, Instagram, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-600 p-2.5 rounded-2xl text-white shadow-lg shadow-primary-900/20">
                <Sprout className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">عطاء تهامة</span>
            </div>
            <p className="leading-relaxed text-sm text-gray-400 mb-8 font-medium">
              المنصة الزراعية الأولى والوحيدة المتخصصة في دعم مزارعي تهامة. نهدف إلى خلق سوق عادل ومستدام للجميع.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-white font-black text-lg mb-8 relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-primary-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><button onClick={() => navigate('/market')} className="hover:text-primary-500 transition-colors flex items-center gap-2">تصفح السوق الزراعي</button></li>
              <li><button onClick={() => navigate('/profile?tab=advisor')} className="hover:text-primary-500 transition-colors flex items-center gap-2">استشر المرشد الذكي</button></li>
              <li><button onClick={() => navigate('/guidance')} className="hover:text-primary-500 transition-colors flex items-center gap-2">دليل الممارسات الزراعية</button></li>
              <li><button className="hover:text-primary-500 transition-colors flex items-center gap-2">سياسة الخصوصية والأمان</button></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-white font-black text-lg mb-8 relative inline-block">
              خدماتنا
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-primary-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-2 text-gray-400 italic">● تسويق المحاصيل التهامية</li>
              <li className="flex items-center gap-2 text-gray-400 italic">● حلول الري الحديثة</li>
              <li className="flex items-center gap-2 text-gray-400 italic">● توفير مدخلات الإنتاج</li>
              <li className="flex items-center gap-2 text-gray-400 italic">● لوجستيات النقل المبرد</li>
            </ul>
          </div>

          {/* Contact Information - Enhanced Section */}
          <div>
            <h3 className="text-white font-black text-lg mb-8 relative inline-block">
              معلومات الاتصال
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-primary-600 rounded-full"></span>
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="group">
                <a href="tel:+967770000000" className="flex items-start gap-4 hover:text-primary-500 transition-colors">
                  <div className="bg-primary-600/10 p-2.5 rounded-xl text-primary-500 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 font-black uppercase mb-1 tracking-widest">رقم الهاتف</span>
                    <span dir="ltr" className="font-black text-lg">+967 770 000 000</span>
                  </div>
                </a>
              </li>
              <li className="group">
                <a href="mailto:info@tihama-ataa.com" className="flex items-start gap-4 hover:text-primary-500 transition-colors">
                  <div className="bg-primary-600/10 p-2.5 rounded-xl text-primary-500 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 font-black uppercase mb-1 tracking-widest">البريد الإلكتروني</span>
                    <span className="font-bold">info@tihama-ataa.com</span>
                  </div>
                </a>
              </li>
              <li className="group">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-600/10 p-2.5 rounded-xl text-primary-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 font-black uppercase mb-1 tracking-widest">الموقع الجغرافي</span>
                    <span className="font-bold leading-relaxed">اليمن، الحديدة، شارع صنعاء - بجوار المجمع الحكومي</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-bold">
          <p>© {new Date().getFullYear()} منصة عطاء تهامة الزراعية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <button className="hover:text-white transition-colors">الشروط والأحكام</button>
            <button className="hover:text-white transition-colors">مركز المساعدة</button>
          </div>
        </div>
      </div>
    </footer>
  );
};