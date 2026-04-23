export interface StorefrontCollection {
  id: string;
  name: string;
  image: string;
  countLabel: string;
}

export interface StorefrontMenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  badge?: string;
}

export interface StorefrontCategory {
  id: string;
  name: string;
  items: StorefrontMenuItem[];
}

export interface StorefrontStore {
  id: string;
  name: string;
  coverImage: string;
  thumbnail: string;
  address: string;
  district: string;
  eta: string;
  rating: number;
  promo?: string;
  statusLabel?: string;
  tags: string[];
  categories: StorefrontCategory[];
}

export const storefrontCollections: StorefrontCollection[] = [
  {
    id: 'signature',
    name: 'Đồ uống signature',
    image: 'https://images.unsplash.com/photo-1558857563-b37103fac9eb?auto=format&fit=crop&w=1200&q=80',
    countLabel: '24 món nổi bật',
  },
  {
    id: 'coffee-snacks',
    name: 'Cà phê & ăn vặt',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    countLabel: '18 quán gần bạn',
  },
  {
    id: 'healthy',
    name: 'Fresh & healthy',
    image: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=1200&q=80',
    countLabel: '12 lựa chọn nhẹ bụng',
  },
  {
    id: 'late-night',
    name: 'Mở khuya',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    countLabel: 'Giao nhanh sau 22h',
  },
];

export const storefrontStores: StorefrontStore[] = [
  {
    id: 'chips-nguyen-hue',
    name: 'Chips Signature - Nguyễn Huệ',
    coverImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
    address: '123 Nguyễn Huệ, Bến Nghé, Quận 1, Hồ Chí Minh',
    district: 'Quận 1',
    eta: '20 - 25 phút',
    rating: 4.8,
    promo: 'Giảm 20% đơn từ 99K',
    statusLabel: 'Mở cửa tới 22:00',
    tags: ['Bestsellers', 'Trà sữa', 'Pickup'],
    categories: [
      {
        id: 'hotline',
        name: 'Hotline',
        items: [
          {
            id: 'hotline-1',
            name: 'Liên hệ cửa hàng',
            description: 'Thiếu món / đổi đường / chỉnh đơn nhanh qua hotline',
            image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80',
            price: 1000,
            badge: 'Support',
          },
        ],
      },
      {
        id: 'bestsellers',
        name: 'Bestsellers',
        items: [
          {
            id: 'drink-1',
            name: 'Trà Sữa Hoàng Kim Kem Cheese',
            description: 'Kem cheese mịn, topping hoàng kim dai vừa, vị dễ uống.',
            image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
            price: 59000,
            badge: 'Best seller',
          },
          {
            id: 'drink-2',
            name: 'Ô Long Nhài Trân Châu Nướng',
            description: 'Ô long nhài thanh và hậu vị sạch, topping nướng thơm.',
            image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
            price: 57000,
          },
          {
            id: 'drink-8',
            name: 'Trà Sữa Gạo Rang Hokkaido',
            description: 'Mùi gạo rang thơm ấm, hợp khẩu vị đậm vừa.',
            image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=800&q=80',
            price: 61000,
            badge: 'Signature',
          },
        ],
      },
      {
        id: 'fruit-tea',
        name: 'Giải nhiệt',
        items: [
          {
            id: 'drink-3',
            name: 'Hồng Trà Vải Hoa Hồng',
            description: 'Vị vải rõ, nền hồng trà nhẹ và topping nha đam.',
            image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ_VopEJXiBVSwkEVwz3AlfYOlPEgm8GpPhuMX3xVlyPFH2oOr0GxO_2kcQKzoBe4cnc5HASm8nm23_6j6y58AgkWdmLKF-CkpgwAzB-BbK12Ftzp4zmiAV&usqp=CAc',
            price: 52000,
            badge: 'Mới',
          },
          {
            id: 'drink-6',
            name: 'Cam Dứa Nhiệt Đới',
            description: 'Chua ngọt cân bằng, mát và hợp ngày nóng.',
            image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80',
            price: 49000,
          },
          {
            id: 'drink-10',
            name: 'Trà Đào Cam Sả',
            description: 'Đào ngọt dịu với sả và lát cam thơm mát.',
            image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=800&q=80',
            price: 45000,
          },
        ],
      },
      {
        id: 'snacks',
        name: 'Ăn vặt',
        items: [
          {
            id: 'snack-1',
            name: 'Bánh Croffle Bơ Mặn',
            description: 'Ăn cùng trà sữa rất hợp, giòn ngoài mềm trong.',
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
            price: 42000,
          },
          {
            id: 'snack-2',
            name: 'Bánh Cheese Tart',
            description: 'Size nhỏ, tiện ăn kèm hoặc đặt nhóm 2-3 phần.',
            image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=800&q=80',
            price: 38000,
          },
        ],
      },
    ],
  },
  {
    id: 'co-ti-phan-boi-chau',
    name: 'Cô Tí - Bánh Nướng & Ăn Vặt',
    coverImage: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    address: '13 Phan Bội Châu, Bến Thành, Quận 1, Hồ Chí Minh',
    district: 'Quận 1',
    eta: '25 - 30 phút',
    rating: 4.7,
    promo: 'Promo bánh tươi mỗi sáng',
    statusLabel: 'Đóng cửa trong 15 phút nữa',
    tags: ['Bánh tươi', 'Ăn vặt', 'Promo'],
    categories: [
      {
        id: 'banh-tuoi',
        name: 'Bánh tươi',
        items: [
          {
            id: 'fresh-1',
            name: 'Pateso bông thịt nướng',
            description: 'Bánh nóng, lớp vỏ giòn nhẹ và nhân đậm vị.',
            image: 'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=800&q=80',
            price: 100000,
            badge: 'Promo',
          },
          {
            id: 'fresh-2',
            name: 'Bánh mì gà xé',
            description: 'Combo 5 bánh, tiện đặt cho nhóm nhỏ.',
            image: 'https://images.unsplash.com/photo-1485451456034-3f9391c6f769?auto=format&fit=crop&w=800&q=80',
            price: 90000,
          },
        ],
      },
      {
        id: 'an-vat',
        name: 'Ăn vặt',
        items: [
          {
            id: 'snack-3',
            name: 'Khoai lắc phô mai',
            description: 'Món thêm dễ bán chạy khi đặt đơn nhóm.',
            image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80',
            price: 45000,
          },
        ],
      },
    ],
  },
  {
    id: 'cua-bac-fruit-lab',
    name: 'Cửa Bắc Fruit Lab',
    coverImage: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1600&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&q=80',
    address: '89 Cửa Bắc, Quận Ba Đình, Hà Nội',
    district: 'Ba Đình',
    eta: '15 - 20 phút',
    rating: 4.9,
    promo: 'Freeship nội thành',
    statusLabel: 'Ưu tiên giao nhanh',
    tags: ['Healthy', 'Juice', 'Freeship'],
    categories: [
      {
        id: 'juice',
        name: 'Nước ép',
        items: [
          {
            id: 'juice-1',
            name: 'Green Detox Juice',
            description: 'Táo xanh, cần tây, dứa. Vị nhẹ, dễ uống.',
            image: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=800&q=80',
            price: 65000,
          },
        ],
      },
    ],
  },
];

