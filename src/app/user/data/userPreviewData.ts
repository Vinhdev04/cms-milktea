export interface UserPreviewCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  itemCount: number;
}

export interface UserPreviewProduct {
  id: string;
  name: string;
  categoryId: string;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  prepTime: string;
  badge?: string;
  description: string;
  image: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface UserPreviewOffer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountLabel: string;
  minOrder: number;
  expiry: string;
  status: 'active' | 'claimed' | 'ending';
}

export interface UserPreviewOrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface UserPreviewOrder {
  id: string;
  branch: string;
  createdAt: string;
  status: 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  orderType: 'delivery' | 'pickup';
  total: number;
  eta: string;
  items: UserPreviewOrderItem[];
  address?: string;
}

export interface UserPreviewBranch {
  id: string;
  name: string;
  address: string;
  district: string;
  distance: string;
  rating: number;
  openHours: string;
  deliveryTime: string;
  phone: string;
  services: string[];
  image: string;
  status: 'open' | 'busy' | 'closing';
}

export interface UserPreviewAddress {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

export interface UserPreviewPaymentMethod {
  id: string;
  type: string;
  label: string;
  detail: string;
  maskedDetail: string;
  isPrimary: boolean;
  icon: string;
}

export interface UserPreviewNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export const userPreviewStats = [
  { label: 'Ưu đãi khả dụng', value: '12', note: 'Voucher và combo trong tuần' },
  { label: 'Giao đúng giờ', value: '98%', note: 'Tối ưu theo khu vực gần bạn' },
  { label: 'Đơn đã hoàn tất', value: '26', note: 'Lịch sử đặt món 30 ngày' },
];

export const userPreviewCategories: UserPreviewCategory[] = [
  { id: 'milk-tea', name: 'Trà sữa', icon: '🧋', description: 'Best seller với nền trà đậm và topping signature.', itemCount: 16 },
  { id: 'fruit-tea', name: 'Trà trái cây', icon: '🍊', description: 'Vị tươi mát, hợp đơn buổi trưa và chiều.', itemCount: 11 },
  { id: 'coffee', name: 'Cà phê', icon: '☕', description: 'Đậm vị, cân bằng vị ngọt béo.', itemCount: 8 },
  { id: 'ice-blended', name: 'Đá xay', icon: '🥤', description: 'Texture mịn, phù hợp đơn nhóm.', itemCount: 9 },
];

export const userPreviewProducts: UserPreviewProduct[] = [
  {
    id: 'drink-1',
    name: 'Trà Sữa Hoàng Kim Kem Cheese',
    categoryId: 'milk-tea',
    categoryLabel: 'Trà sữa',
    price: 59000,
    originalPrice: 69000,
    rating: 4.9,
    reviews: 1842,
    sold: 1240,
    prepTime: '12 phút',
    badge: 'Bán chạy',
    description: 'Nền trà đậm, kem cheese mịn và topping hoàng kim dai vừa.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    tags: ['Kem cheese', 'Signature', 'Ít ngọt'],
    isFeatured: true,
  },
  {
    id: 'drink-2',
    name: 'Ô Long Nhài Trân Châu Nướng',
    categoryId: 'milk-tea',
    categoryLabel: 'Trà sữa',
    price: 57000,
    rating: 4.8,
    reviews: 1130,
    sold: 980,
    prepTime: '10 phút',
    badge: 'Top rated',
    description: 'Ô long nhài thanh, hậu trà sạch vị và topping nướng thơm đường đen.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    tags: ['Ô long', 'Nướng', 'Recommended'],
    isFeatured: true,
  },
  {
    id: 'drink-3',
    name: 'Hồng Trà Vải Hoa Hồng',
    categoryId: 'fruit-tea',
    categoryLabel: 'Trà trái cây',
    price: 52000,
    rating: 4.7,
    reviews: 874,
    sold: 754,
    prepTime: '8 phút',
    badge: 'Mới',
    description: 'Vị vải rõ, nền hồng trà nhẹ và topping nha đam dễ uống.',
    image: 'https://images.unsplash.com/photo-1627993043810-7e615e45511b?auto=format&fit=crop&w=800&q=80',
    tags: ['Fresh', 'Nha đam', 'Mới'],
  },
  {
    id: 'drink-4',
    name: 'Cà Phê Muối Kem Mây',
    categoryId: 'coffee',
    categoryLabel: 'Cà phê',
    price: 55000,
    rating: 4.8,
    reviews: 760,
    sold: 662,
    prepTime: '9 phút',
    description: 'Cà phê đậm vị kết hợp kem muối nhẹ, hợp khách thích vị cân bằng.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    tags: ['Coffee', 'Kem mặn'],
    isFeatured: true,
  },
  {
    id: 'drink-5',
    name: 'Matcha Dâu Yến Mạch',
    categoryId: 'ice-blended',
    categoryLabel: 'Đá xay',
    price: 64000,
    originalPrice: 72000,
    rating: 4.6,
    reviews: 598,
    sold: 508,
    prepTime: '11 phút',
    badge: 'Sale',
    description: 'Matcha đá xay cùng dâu tươi và lớp sữa yến mạch nhẹ béo.',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80',
    tags: ['Matcha', 'Oat milk', 'Sale'],
  },
  {
    id: 'drink-6',
    name: 'Cam Dứa Nhiệt Đới',
    categoryId: 'fruit-tea',
    categoryLabel: 'Trà trái cây',
    price: 49000,
    rating: 4.5,
    reviews: 512,
    sold: 430,
    prepTime: '7 phút',
    description: 'Vị cam dứa tươi, chua ngọt cân bằng, dễ uống cả ngày.',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80',
    tags: ['Tropical', 'Low sugar'],
  },
  {
    id: 'drink-7',
    name: 'Socola Đá Xay Oreo',
    categoryId: 'ice-blended',
    categoryLabel: 'Đá xay',
    price: 62000,
    rating: 4.6,
    reviews: 714,
    sold: 610,
    prepTime: '13 phút',
    description: 'Socola đậm vị kết hợp oreo, phù hợp khách trẻ và nhóm bạn.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    tags: ['Chocolate', 'Oreo'],
  },
  {
    id: 'drink-8',
    name: 'Trà Sữa Gạo Rang Hokkaido',
    categoryId: 'milk-tea',
    categoryLabel: 'Trà sữa',
    price: 61000,
    rating: 4.9,
    reviews: 1024,
    sold: 875,
    prepTime: '12 phút',
    badge: 'Signature',
    description: 'Mùi gạo rang thơm ấm, hậu vị kem sữa mượt và dễ nhớ.',
    image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=800&q=80',
    tags: ['Premium', 'Signature'],
    isFeatured: true,
  },
  {
    id: 'drink-9',
    name: 'Bạc Xỉu Sương Sáo',
    categoryId: 'coffee',
    categoryLabel: 'Cà phê',
    price: 42000,
    rating: 4.7,
    reviews: 420,
    sold: 380,
    prepTime: '5 phút',
    description: 'Bạc xỉu truyền thống với sương sáo dai giòn, mát lạnh.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    tags: ['Cà phê', 'Sương sáo'],
  },
  {
    id: 'drink-10',
    name: 'Trà Đào Cam Sả',
    categoryId: 'fruit-tea',
    categoryLabel: 'Trà trái cây',
    price: 45000,
    rating: 4.8,
    reviews: 950,
    sold: 890,
    prepTime: '6 phút',
    description: 'Trà đào thơm nồng sả tươi và lát cam vàng mọng nước.',
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=800&q=80',
    tags: ['Trà đào', 'Refreshing'],
  }
];

export const userPreviewOffers: UserPreviewOffer[] = [
  {
    id: 'offer-1',
    title: 'Giảm 20% cho đơn đầu tuần',
    description: 'Áp dụng cho đơn từ 99K, phù hợp khi đặt lại món quen.',
    code: 'ORANGE20',
    discountLabel: 'Giảm tối đa 40K',
    minOrder: 99000,
    expiry: '30/04/2026',
    status: 'active',
  },
  {
    id: 'offer-2',
    title: 'Miễn phí giao hàng nội thành',
    description: 'Áp dụng tại Quận 1, Quận 3 và Bình Thạnh.',
    code: 'FREESHIP15',
    discountLabel: 'Miễn phí tối đa 15K',
    minOrder: 120000,
    expiry: '27/04/2026',
    status: 'active',
  },
  {
    id: 'offer-3',
    title: 'Voucher khách hàng Gold',
    description: 'Ưu đãi riêng cho thành viên hạng Gold và Platinum.',
    code: 'GOLDMEM',
    discountLabel: 'Giảm 10% toàn menu',
    minOrder: 0,
    expiry: '31/05/2026',
    status: 'claimed',
  },
];

export const userPreviewOrders: UserPreviewOrder[] = [
  {
    id: 'SM240421001',
    branch: 'SMYOU Quận 1',
    createdAt: '21/04/2026 • 10:25',
    status: 'delivering',
    orderType: 'delivery',
    total: 175000,
    eta: '08 phút nữa',
    address: '12 Nguyễn Bỉnh Khiêm, Quận 1',
    items: [
      { name: 'Trà Sữa Hoàng Kim Kem Cheese', quantity: 2, price: 59000 },
      { name: 'Cam Dứa Nhiệt Đới', quantity: 1, price: 49000 },
    ],
  },
];

export const userPreviewBranches: UserPreviewBranch[] = [
  {
    id: 'branch-q1',
    name: 'SMYOU Nguyễn Huệ',
    address: '123 Nguyễn Huệ, Bến Nghé, Quận 1',
    district: 'Quận 1',
    distance: '1.2 km',
    rating: 4.8,
    openHours: '07:00 - 22:00',
    deliveryTime: '20 - 25 phút',
    phone: '028 1234 5678',
    services: ['Giao nhanh', 'Pickup', 'Thanh toán QR'],
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    status: 'open',
  },
];

export const userPreviewAddresses: UserPreviewAddress[] = [
  {
    id: 'addr-1',
    label: 'Nhà riêng',
    recipient: 'Nguyễn Thị Lan',
    phone: '0901234567',
    address: '12 Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM',
    isDefault: true,
  },
];

export const userPreviewPaymentMethods: UserPreviewPaymentMethod[] = [
  { id: 'pay-1', type: 'Momo', label: 'Ví MoMo', detail: '0901 234 567', maskedDetail: '•••• •••• 567', isPrimary: true, icon: '💜' },
];

export const userPreviewNotifications: UserPreviewNotification[] = [
  {
    id: 'noti-1',
    title: 'Đơn SM240421001 đang được giao',
    message: 'Tài xế đang đến, dự kiến 8 phút nữa.',
    time: 'Vừa xong',
    unread: true,
  },
];

export const userPreviewProfile = {
  name: 'Nguyễn Thị Lan',
  email: 'member@smyou.vn',
  phone: '0901234567',
  tier: 'Gold',
  points: 2450,
  nextTierTarget: 3000,
  favoriteStore: 'SMYOU Nguyễn Huệ',
  favoriteDrink: 'Trà Sữa Hoàng Kim Kem Cheese',
  joinedAt: '15/03/2024',
};
