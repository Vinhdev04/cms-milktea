// Mock data for CMS and User application

// ============ INTERFACES ============

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isAvailable: boolean;
  isNew: boolean;
  isPopular: boolean;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  openHours: string;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  branch: string;
  status: 'active' | 'inactive';
  avatar?: string;
  joinDate: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  points: number;
  totalSpent: number;
  joinDate: string;
  lastOrder?: string;
}

export interface Voucher {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxUses: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  type: 'delivery' | 'takeaway' | 'dine-in';
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

// ============ MOCK DATA ============

export const categories: Category[] = [
  { id: 'milktea', name: 'Trà sữa' },
  { id: 'coffee', name: 'Cà phê' },
  { id: 'smoothie', name: 'Sinh tố' },
  { id: 'juice', name: 'Nước ép' },
];

export const toppings: Topping[] = [
  { id: 'topping-1', name: 'Trân châu đen', price: 10000 },
  { id: 'topping-2', name: 'Trân châu trắng', price: 10000 },
  { id: 'topping-3', name: 'Thạch dừa', price: 12000 },
  { id: 'topping-4', name: 'Pudding', price: 12000 },
  { id: 'topping-5', name: 'Kem phô mai', price: 15000 },
  { id: 'topping-6', name: 'Bạc hà', price: 8000 },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Trà Sữa Trân Châu Đường Đen',
    description: 'Vị trà sữa cân bằng cùng trân châu đen dai mềm, phù hợp cho lựa chọn uống mỗi ngày.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1599810694-b5ac1ea63fe2?w=900&auto=format&fit=crop',
    category: 'milktea',
    rating: 4.8,
    isAvailable: true,
    isNew: false,
    isPopular: true,
  },
  {
    id: '2',
    name: 'Matcha Đá Xay',
    description: 'Matcha mát lạnh xay mịn, hậu vị thanh và dễ uống.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=900&auto=format&fit=crop',
    category: 'smoothie',
    rating: 4.6,
    isAvailable: true,
    isNew: true,
    isPopular: false,
  },
  {
    id: '3',
    name: 'Cà Phê Đen Đá',
    description: 'Cà phê đậm vị, thơm mạnh và phù hợp cho buổi sáng cần tỉnh táo.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop',
    category: 'coffee',
    rating: 4.7,
    isAvailable: true,
    isNew: false,
    isPopular: true,
  },
  {
    id: '4',
    name: 'Nước Cam Tươi',
    description: 'Nước cam ép tươi, vị thanh mát và cân bằng vị ngọt tự nhiên.',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=900&auto=format&fit=crop',
    category: 'juice',
    rating: 4.5,
    isAvailable: true,
    isNew: false,
    isPopular: false,
  },
  {
    id: '5',
    name: 'Trà Sữa Kem Phô Mai',
    description: 'Lớp kem phô mai béo mịn phủ trên nền trà sữa đậm vị, phù hợp cho khách thích vị tròn đầy.',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1558857563-b37103fac9eb?w=900&auto=format&fit=crop',
    category: 'milktea',
    rating: 4.9,
    isAvailable: true,
    isNew: true,
    isPopular: true,
  },
  {
    id: '6',
    name: 'Trà Sữa Việt Quất',
    description: 'Kết hợp vị trà sữa êm với hương việt quất nổi bật, phù hợp khi muốn đổi vị.',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&auto=format&fit=crop',
    category: 'milktea',
    rating: 4.6,
    isAvailable: true,
    isNew: false,
    isPopular: true,
  },
];

export const branches: Branch[] = [
  {
    id: 'branch-1',
    name: 'SMYOU MilkTea - Quận 1',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '0123456789',
    openHours: '7:00 - 22:00',
  },
  {
    id: 'branch-2',
    name: 'SMYOU MilkTea - Quận 3',
    address: '456 Võ Văn Tần, Quận 3, TP.HCM',
    phone: '0987654321',
    openHours: '7:00 - 22:00',
  },
  {
    id: 'branch-3',
    name: 'SMYOU MilkTea - Quận 7',
    address: '789 Nguyễn Hữu Cảnh, Quận 7, TP.HCM',
    phone: '0912345678',
    openHours: '8:00 - 23:00',
  },
];

export const staff: Staff[] = [
  { id: 'staff-1', name: 'Nguyễn Văn A', email: 'a.nguyen@smyou.vn', phone: '0901234567', position: 'Quản lý', branch: 'Quận 1', status: 'active', avatar: 'A', joinDate: '2023-01-15' },
  { id: 'staff-2', name: 'Trần Thị B', email: 'b.tran@smyou.vn', phone: '0912345678', position: 'Nhân viên', branch: 'Quận 1', status: 'active', avatar: 'TB', joinDate: '2023-06-20' },
  { id: 'staff-3', name: 'Phạm Văn C', email: 'c.pham@smyou.vn', phone: '0923456789', position: 'Nhân viên', branch: 'Quận 3', status: 'active', avatar: 'PC', joinDate: '2023-08-10' },
];

export const customers: Customer[] = [
  { id: 'cust-1', name: 'Nguyễn Thị Lan', email: 'lan.nguyen@example.com', phone: '0901234567', tier: 'Gold', points: 2450, totalSpent: 4500000, joinDate: '2022-05-10', lastOrder: '2024-04-20' },
  { id: 'cust-2', name: 'Trần Văn Minh', email: 'minh.tran@example.com', phone: '0912345678', tier: 'Silver', points: 1180, totalSpent: 2800000, joinDate: '2022-08-15', lastOrder: '2024-04-18' },
  { id: 'cust-3', name: 'Lê Thị Hương', email: 'huong.le@example.com', phone: '0923456789', tier: 'Gold', points: 3200, totalSpent: 6200000, joinDate: '2022-01-20', lastOrder: '2024-04-21' },
];

export const vouchers: Voucher[] = [
  { id: 'voucher-1', code: 'WELCOME20', name: 'Giảm 20% cho khách mới', description: 'Áp dụng cho đơn hàng đầu tiên', type: 'percentage', value: 20, minOrder: 100000, maxUses: 100, usedCount: 45, startDate: '2024-01-01', endDate: '2024-12-31', isActive: true },
  { id: 'voucher-2', code: 'COMBO50K', name: 'Giảm 50K cho combo', description: 'Áp dụng khi mua combo 2 ly trở lên', type: 'fixed', value: 50000, minOrder: 150000, maxUses: 200, usedCount: 120, startDate: '2024-02-01', endDate: '2024-12-31', isActive: true },
];

export const orders: Order[] = [
  {
    id: 'order-1',
    customerId: 'cust-1',
    customerName: 'Nguyễn Thị Lan',
    total: 95000,
    status: 'completed',
    type: 'delivery',
    createdAt: '2024-04-21T10:30:00Z',
    items: [
      { productId: '1', productName: 'Trà Sữa Trân Châu Đường Đen', quantity: 2, price: 45000 },
      { productId: '5', productName: 'Trà Sữa Kem Phô Mai', quantity: 1, price: 55000 },
    ],
  },
  {
    id: 'order-2',
    customerId: 'cust-2',
    customerName: 'Trần Văn Minh',
    total: 135000,
    status: 'preparing',
    type: 'takeaway',
    createdAt: '2024-04-21T14:15:00Z',
    items: [
      { productId: '3', productName: 'Cà Phê Đen Đá', quantity: 3, price: 35000 },
      { productId: '2', productName: 'Matcha Đá Xay', quantity: 1, price: 50000 },
    ],
  },
];

export const reviews: Review[] = [
  { id: 'review-1', productId: '1', productName: 'Trà Sữa Trân Châu Đường Đen', customerName: 'Nguyễn Thị Lan', rating: 5, comment: 'Rất ngon, vị cân bằng và topping mềm vừa phải.', createdAt: '2024-04-20T16:45:00Z', status: 'approved' },
  { id: 'review-2', productId: '5', productName: 'Trà Sữa Kem Phô Mai', customerName: 'Trần Văn Minh', rating: 4, comment: 'Kem phô mai đậm vị, phù hợp ai thích đồ uống béo hơn.', createdAt: '2024-04-19T11:20:00Z', status: 'pending' },
];

export const revenueData = [
  { month: 'Jan', revenue: 45000000 },
  { month: 'Feb', revenue: 52000000 },
  { month: 'Mar', revenue: 48000000 },
  { month: 'Apr', revenue: 61000000 },
  { month: 'May', revenue: 55000000 },
  { month: 'Jun', revenue: 67000000 },
];

export const weeklyData = [
  { day: 'Mon', sales: 12000 },
  { day: 'Tue', sales: 15000 },
  { day: 'Wed', sales: 14000 },
  { day: 'Thu', sales: 18000 },
  { day: 'Fri', sales: 22000 },
  { day: 'Sat', sales: 28000 },
  { day: 'Sun', sales: 25000 },
];

export const categoryData = [
  { name: 'Trà sữa', value: 45 },
  { name: 'Cà phê', value: 25 },
  { name: 'Sinh tố', value: 18 },
  { name: 'Nước ép', value: 12 },
];
