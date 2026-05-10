export enum UserRole {
  FARMER = 'مزارع',
  MERCHANT = 'تاجر',
  CONSUMER = 'مستهلك',
  TRANSPORT = 'شركة نقل',
  ASSOCIATION = 'جمعية زراعية',
  ADMIN = 'مشرف',
  GUEST = 'زائر'
}

export enum ProductCategory {
  VEGETABLES = 'خضروات',
  FRUITS = 'فواكه',
  GRAINS = 'حبوب',
  LIVESTOCK = 'مواشي',
  SEEDS = 'بذور وتقاوي',
  FERTILIZERS = 'أسمدة ومبيدات',
  EQUIPMENT = 'معدات ومستلزمات',
  OTHER = 'أخرى'
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  governorate?: string;
  district?: string;
  area?: string;
  association?: string; // For Farmers
  tradeType?: string; // For Merchants (Retail, Wholesale, Export)
  isVerified: boolean;
  associationVerified?: boolean; // If farmer is approved by association
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  image: string; // Primary Image
  images?: string[]; // Gallery of images
  sellerName: string;
  associationName?: string; // Link product to an association
  location: string;
  description: string;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipping' | 'delivered';
  date: string;
  trackingNumber?: string;
  associationName?: string; // To route the order
}

export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  image: string;
}

export interface MarketStat {
  name: string;
  price: number;
  demand: number; // 0-100 scale
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UserConversation {
  id: string;
  contactName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
}