import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { Trash2, Truck, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: (total: number) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onCheckout }) => {
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const [transportCompany, setTransportCompany] = useState('');

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = transportCompany ? 2000 : 0;
  const finalTotal = total + shippingCost;

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="p-10 text-center">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Truck className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">السلة فارغة</h2>
        <p className="text-gray-500">لم تقم بإضافة أي منتجات للسلة بعد.</p>
      </div>
    );
  }

  const renderSuccess = () => (
    <div className="text-center p-10 max-w-lg mx-auto bg-white rounded-2xl shadow-xl mt-10">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
        <CheckCircle className="h-10 w-10" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">تم الطلب بنجاح!</h2>
      <p className="text-gray-600 mb-6">شكراً لك. تم إرسال الطلب إلى المزارع وشركة النقل بنجاح. يمكنك الآن متابعة حالة الطلب في صفحة طلباتي.</p>
      <button 
        onClick={() => onCheckout(finalTotal)}
        className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-primary-700 w-full transition-all active:scale-95"
      >
        عرض طلباتي الآن
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {step === 'success' ? renderSuccess() : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">
              {step === 'cart' && 'مراجعة السلة'}
              {step === 'shipping' && 'الشحن والتوصيل'}
              {step === 'payment' && 'الدفع'}
            </h2>

            {step === 'cart' && (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.price} ريال / {item.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{item.quantity}x</span>
                      <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setStep('shipping')}
                  className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 flex items-center justify-center gap-2"
                >
                  متابعة للشحن <ArrowRight className="h-5 w-5 rotate-180" />
                </button>
              </div>
            )}

            {step === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">اختر شركة النقل</label>
                  <div className="space-y-3">
                    {['ناقل تهامة السريع', 'شركة البركة اللوجستية', 'خدمات المزارع للنقل'].map((company, idx) => (
                      <label key={idx} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${transportCompany === company ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="transport" 
                            checked={transportCompany === company}
                            onChange={() => setTransportCompany(company)}
                            className="text-primary-600"
                          />
                          <span className="font-medium">{company}</span>
                        </div>
                        <span className="text-sm text-gray-500">2000 ريال</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep('cart')} className="flex-1 border border-gray-300 py-3 rounded-lg font-bold">رجوع</button>
                  <button 
                    onClick={() => setStep('payment')}
                    disabled={!transportCompany}
                    className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 disabled:opacity-50"
                  >
                    متابعة للدفع
                  </button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm mb-4">
                  ملاحظة: هذه محاكاة لعملية الدفع الإلكتروني. لن يتم خصم أي مبلغ حقيقي.
                </div>
                <div className="space-y-3">
                   <div className="border p-4 rounded-lg flex items-center gap-3 cursor-pointer bg-primary-50 border-primary-500">
                      <CreditCard className="h-6 w-6 text-primary-600" />
                      <span className="font-bold">بطاقة بنكية / مدى</span>
                   </div>
                   <div className="border p-4 rounded-lg flex items-center gap-3 cursor-pointer">
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                      <span className="font-bold">محفظة إلكترونية (جوال)</span>
                   </div>
                   <div className="border p-4 rounded-lg flex items-center gap-3 cursor-pointer">
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                      <span className="font-bold">دفع عند الاستلام</span>
                   </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep('shipping')} className="flex-1 border border-gray-300 py-3 rounded-lg font-bold">رجوع</button>
                  <button 
                    onClick={() => setStep('success')}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
                  >
                    تأكيد الطلب ({finalTotal} ريال)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-80 h-fit bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">ملخص الطلب</h3>
            <div className="space-y-2 text-sm text-gray-600 border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{total} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span>{shippingCost} ريال</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>الإجمالي</span>
              <span>{finalTotal} ريال</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};