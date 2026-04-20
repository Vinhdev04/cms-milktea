// ===================== MOCK DATA FOR SMYOU MILKTEA CMS =====================

export const revenueData = [
  { month: 'T1', revenue: 42000000, orders: 312 },
  { month: 'T2', revenue: 38500000, orders: 287 },
  { month: 'T3', revenue: 51000000, orders: 381 },
  { month: 'T4', revenue: 47500000, orders: 354 },
  { month: 'T5', revenue: 63000000, orders: 469 },
  { month: 'T6', revenue: 58000000, orders: 432 },
  { month: 'T7', revenue: 72000000, orders: 538 },
  { month: 'T8', revenue: 68500000, orders: 511 },
  { month: 'T9', revenue: 55000000, orders: 410 },
  { month: 'T10', revenue: 61000000, orders: 456 },
  { month: 'T11', revenue: 78000000, orders: 582 },
  { month: 'T12', revenue: 92000000, orders: 687 },
];

export const weeklyData = [
  { day: 'T2', revenue: 8500000, orders: 63 },
  { day: 'T3', revenue: 7200000, orders: 54 },
  { day: 'T4', revenue: 9100000, orders: 68 },
  { day: 'T5', revenue: 11200000, orders: 84 },
  { day: 'T6', revenue: 13800000, orders: 103 },
  { day: 'T7', revenue: 18500000, orders: 138 },
  { day: 'CN', revenue: 16000000, orders: 119 },
];

export const categoryData = [
  { name: 'Trà sữa', value: 42, color: '#A8D5BA' },
  { name: 'Trà trái cây', value: 23, color: '#2D6A4F' },
  { name: 'Cà phê', value: 15, color: '#FCBABD' },
  { name: 'Đá xay', value: 12, color: '#FEF3C7' },
  { name: 'Topping', value: 8, color: '#E8F5EC' },
];

export const products = [
  { id: 'P001', name: 'Trà Sữa Trân Châu Hoàng Kim', category: 'Trà Sữa', price: 55000, salePrice: null, status: 'active', stock: 'available', sold: 1248, rating: 4.8, badge: 'Bán chạy', image: 'https://images.unsplash.com/photo-1558857563-b37103fac9eb?auto=format&fit=crop&w=500&q=80', description: 'Hương vị trà sữa truyền thống đậm đà kết hợp trân châu hoàng kim dai giòn độc đáo.' },
  { id: 'P002', name: 'Matcha Đào Kem Cheese', category: 'Trà Sữa', price: 65000, salePrice: 52000, status: 'active', stock: 'available', sold: 986, rating: 4.9, badge: 'Mới', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=500&q=80', description: 'Sự hòa quyện tuyệt vời giữa matcha Nhật Bản thanh mát và đào tươi, phủ lớp kem phô mai béo ngậy.' },
  { id: 'P003', name: 'Hồng Trà Vải Thiều', category: 'Trà Trái Cây', price: 50000, salePrice: null, status: 'active', stock: 'available', sold: 754, rating: 4.7, badge: null, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80', description: 'Hồng trà thơm nồng ủ lạnh sảng khoái với những múi vải thiều ngọt lịm.' },
  { id: 'P004', name: 'Cà Phê Muối Kem Béo', category: 'Cà Phê', price: 59000, salePrice: null, status: 'active', stock: 'available', sold: 623, rating: 4.6, badge: 'Bán chạy', image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=500&q=80', description: 'Cà phê nguyên chất đậm đà, kết hợp với lớp kem muối đặc trưng làm dậy lên hương vị bùi béo.' },
  { id: 'P005', name: 'Đá Xay Dâu Tây Oreo', category: 'Đá Xay', price: 62000, salePrice: 49000, status: 'active', stock: 'available', sold: 589, rating: 4.5, badge: 'Sale', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80', description: 'Đá xay dâu tây chua ngọt kết hợp cùng vụn bánh oreo giòn rụm và sốt socola.' },
  { id: 'P006', name: 'Trà Chanh Leo Granita', category: 'Trà Trái Cây', price: 48000, salePrice: null, status: 'inactive', stock: 'out', sold: 412, rating: 4.4, badge: 'Hết hàng', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80', description: 'Đồ uống đá tuyết giải khát cực mạnh với vị chua thanh của chanh leo nguyên chất.' },
  { id: 'P007', name: 'Ô Long Trân Châu Nướng', category: 'Trà Sữa', price: 57000, salePrice: null, status: 'active', stock: 'available', sold: 897, rating: 4.7, badge: null, image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=500&q=80', description: 'Trà ô long thượng hạng ủ lạnh tinh tế kết hợp trân châu đường đen nướng thơm lừng.' },
  { id: 'P008', name: 'Socola Đen Kem Tươi', category: 'Đá Xay', price: 68000, salePrice: 55000, status: 'active', stock: 'available', sold: 334, rating: 4.3, badge: 'Sale', image: 'https://images.unsplash.com/photo-1517485078519-74d32a13fca3?auto=format&fit=crop&w=500&q=80', description: 'Socola đen nguyên chất được xay nhuyễn với đá, bên trên phủ ngập kem tươi béo mịn.' },
];

export const toppings = [
  { id: 'T001', name: 'Trân Châu Đen', price: 10000, category: 'Trân Châu', status: 'active', image: 'https://images.unsplash.com/photo-1595981234058-a9302bf97828?auto=format&fit=crop&w=150&q=80', description: 'Hạt trân châu dai giòn truyền thống được nấu kỹ với đường đen thơm lừng.' },
  { id: 'T002', name: 'Trân Châu Trắng', price: 10000, category: 'Trân Châu', status: 'active', image: 'https://images.unsplash.com/photo-1558857563-b37103fac9eb?auto=format&fit=crop&w=150&q=80', description: 'Trân châu 3Q trắng giòn sần sật, ít béo và có vị ngọt thanh.' },
  { id: 'T003', name: 'Trân Châu Hoàng Kim', price: 12000, category: 'Trân Châu', status: 'active', image: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?auto=format&fit=crop&w=150&q=80', description: 'Phiên bản cao cấp của trân châu đen với màu vàng rực rỡ và độ dai hoàn hảo.' },
  { id: 'T004', name: 'Thạch Dừa', price: 8000, category: 'Thạch', status: 'active', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=150&q=80', description: 'Thạch dừa nguyên chất thanh mát, tốt cho sức khỏe và giải nhiệt cực tốt.' },
  { id: 'T005', name: 'Thạch Cà Phê', price: 8000, category: 'Thạch', status: 'active', image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=150&q=80', description: 'Thạch sương sáo mang hương vị cà phê đậm đà, mềm mịn tan trong miệng.' },
  { id: 'T006', name: 'Kem Cheese', price: 15000, category: 'Kem', status: 'active', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=150&q=80', description: 'Lớp kem phô mai béo ngậy, sánh mịn với vị mặn ngọt hài hòa đặc trưng.' },
  { id: 'T007', name: 'Kem Tươi', price: 12000, category: 'Kem', status: 'active', image: 'https://images.unsplash.com/photo-1517485078519-74d32a13fca3?auto=format&fit=crop&w=150&q=80', description: 'Kem tươi vanilla béo béo, nhẹ nhàng được đánh bông mềm mịn.' },
  { id: 'T008', name: 'Pudding Trứng', price: 10000, category: 'Pudding', status: 'active', image: 'https://images.unsplash.com/photo-1614548483181-b51f0ab17a4c?auto=format&fit=crop&w=150&q=80', description: 'Pudding trứng ngọt ngào, mềm tan trên đầu lưỡi, rất hợp khi dùng kèm trà sữa.' },
  { id: 'T009', name: 'Nata De Coco', price: 8000, category: 'Thạch', status: 'inactive', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=150&q=80', description: 'Thạch nha đam dai dai, mọng nước, mang hương vị trái cây nhiệt đới.' },
  { id: 'T010', name: 'Đậu Đỏ', price: 8000, category: 'Đậu', status: 'active', image: 'https://images.unsplash.com/photo-1504382262782-5b4eae14e0ae?auto=format&fit=crop&w=150&q=80', description: 'Đậu đỏ hạt to được ninh nhừ với đường phèn tạo vị bùi béo tự nhiên.' },
];

export const orders = [
  { id: 'ORD-2412001', customer: 'Nguyễn Thị Lan', phone: '0901234567', branch: 'Quận 1', items: 3, total: 175000, status: 'completed', time: '10:25', date: '20/04/2026', payment: 'Chuyển khoản' },
  { id: 'ORD-2412002', customer: 'Trần Văn Minh', phone: '0912345678', branch: 'Quận 3', items: 2, total: 118000, status: 'processing', time: '10:42', date: '20/04/2026', payment: 'COD' },
  { id: 'ORD-2412003', customer: 'Phạm Thu Hà', phone: '0923456789', branch: 'Quận 7', items: 4, total: 243000, status: 'pending', time: '10:58', date: '20/04/2026', payment: 'Momo' },
  { id: 'ORD-2412004', customer: 'Lê Quang Hùng', phone: '0934567890', branch: 'Quận 1', items: 1, total: 65000, status: 'ready', time: '11:05', date: '20/04/2026', payment: 'Chuyển khoản' },
  { id: 'ORD-2412005', customer: 'Võ Thị Mai', phone: '0945678901', branch: 'Bình Thạnh', items: 5, total: 312000, status: 'completed', time: '11:18', date: '20/04/2026', payment: 'COD' },
  { id: 'ORD-2412006', customer: 'Hoàng Văn Long', phone: '0956789012', branch: 'Quận 3', items: 2, total: 125000, status: 'cancelled', time: '11:30', date: '20/04/2026', payment: 'Momo' },
  { id: 'ORD-2412007', customer: 'Ngô Thị Bích', phone: '0967890123', branch: 'Quận 7', items: 3, total: 189000, status: 'processing', time: '11:45', date: '20/04/2026', payment: 'COD' },
  { id: 'ORD-2412008', customer: 'Đặng Quốc Tuấn', phone: '0978901234', branch: 'Bình Thạnh', items: 2, total: 134000, status: 'pending', time: '12:00', date: '20/04/2026', payment: 'Chuyển khoản' },
];

export const customers = [
  { id: 'C001', name: 'Nguyễn Thị Lan', phone: '0901234567', email: 'lan.nguyen@email.com', tier: 'Gold', points: 2450, totalOrders: 48, totalSpent: 3240000, joinDate: '15/03/2024', lastOrder: '20/04/2026' },
  { id: 'C002', name: 'Trần Văn Minh', phone: '0912345678', email: 'minh.tran@email.com', tier: 'Silver', points: 1180, totalOrders: 23, totalSpent: 1540000, joinDate: '22/06/2024', lastOrder: '18/04/2026' },
  { id: 'C003', name: 'Phạm Thu Hà', phone: '0923456789', email: 'ha.pham@email.com', tier: 'Gold', points: 3870, totalOrders: 67, totalSpent: 5210000, joinDate: '08/01/2024', lastOrder: '20/04/2026' },
  { id: 'C004', name: 'Lê Quang Hùng', phone: '0934567890', email: 'hung.le@email.com', tier: 'Member', points: 420, totalOrders: 8, totalSpent: 560000, joinDate: '10/12/2025', lastOrder: '15/04/2026' },
  { id: 'C005', name: 'Võ Thị Mai', phone: '0945678901', email: 'mai.vo@email.com', tier: 'Silver', points: 1650, totalOrders: 31, totalSpent: 2180000, joinDate: '03/09/2024', lastOrder: '20/04/2026' },
  { id: 'C006', name: 'Hoàng Văn Long', phone: '0956789012', email: 'long.hoang@email.com', tier: 'Gold', points: 4210, totalOrders: 72, totalSpent: 5890000, joinDate: '25/02/2024', lastOrder: '19/04/2026' },
  { id: 'C007', name: 'Ngô Thị Bích', phone: '0967890123', email: 'bich.ngo@email.com', tier: 'Member', points: 280, totalOrders: 5, totalSpent: 325000, joinDate: '05/02/2026', lastOrder: '20/04/2026' },
  { id: 'C008', name: 'Đặng Quốc Tuấn', phone: '0978901234', email: 'tuan.dang@email.com', tier: 'Silver', points: 890, totalOrders: 17, totalSpent: 1120000, joinDate: '18/08/2024', lastOrder: '17/04/2026' },
  { id: 'C009', name: 'Lê Đình Sơn', phone: '0989012345', email: 'son.le@email.com', tier: 'Blacklist', points: 0, totalOrders: 3, totalSpent: 150000, joinDate: '12/01/2026', lastOrder: '25/02/2026' },
];

export const vouchers = [
  { id: 'V001', code: 'SMYOU20', name: 'Giảm 20% đơn hàng', type: 'percent', discount: 20, minOrder: 100000, maxDiscount: 50000, used: 234, total: 500, expiry: '30/06/2026', status: 'active' },
  { id: 'V002', code: 'NEWUSER', name: 'Khách hàng mới -30K', type: 'fixed', discount: 30000, minOrder: 80000, maxDiscount: null, used: 89, total: 200, expiry: '31/05/2026', status: 'active' },
  { id: 'V003', code: 'SUMMER50', name: 'Mùa hè giảm 50K', type: 'fixed', discount: 50000, minOrder: 150000, maxDiscount: null, used: 412, total: 400, expiry: '15/04/2026', status: 'expired' },
  { id: 'V004', code: 'BIRTHDAY', name: 'Sinh nhật giảm 15%', type: 'percent', discount: 15, minOrder: 70000, maxDiscount: 35000, used: 156, total: 300, expiry: '31/12/2026', status: 'active' },
  { id: 'V005', code: 'GOLD10', name: 'Ưu đãi thành viên Gold', type: 'percent', discount: 10, minOrder: 0, maxDiscount: 30000, used: 678, total: 1000, expiry: '31/12/2026', status: 'active' },
];

export const branches = [
  { id: 'B001', name: 'SMYOU Quận 1', address: '123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM', phone: '028 1234 5678', manager: 'Trần Thị Ngọc', staff: 8, status: 'open', todayOrders: 87, rating: 4.8 },
  { id: 'B002', name: 'SMYOU Quận 3', address: '456 Võ Văn Tần, P.5, Q.3, TP.HCM', phone: '028 2345 6789', manager: 'Nguyễn Văn Bình', staff: 6, status: 'open', todayOrders: 64, rating: 4.7 },
  { id: 'B003', name: 'SMYOU Quận 7', address: '789 Nguyễn Thị Thập, P.Tân Phú, Q.7, TP.HCM', phone: '028 3456 7890', manager: 'Lê Thị Thu', staff: 7, status: 'open', todayOrders: 72, rating: 4.9 },
  { id: 'B004', name: 'SMYOU Bình Thạnh', address: '321 Đinh Bộ Lĩnh, P.26, Q.Bình Thạnh, TP.HCM', phone: '028 4567 8901', manager: 'Phạm Văn Đức', staff: 5, status: 'maintenance', todayOrders: 0, rating: 4.6 },
  { id: 'B005', name: 'SMYOU Thủ Đức', address: '654 Võ Văn Ngân, P.Linh Chiểu, TP.Thủ Đức', phone: '028 5678 9012', manager: 'Hoàng Thị Hoa', staff: 9, status: 'open', todayOrders: 95, rating: 4.8 },
];

export const staff = [
  { id: 'S001', name: 'Trần Thị Ngọc', role: 'Quản lý chi nhánh', branch: 'Quận 1', phone: '0901111111', email: 'ngoc.tran@smyou.vn', status: 'active', joinDate: '01/03/2023' },
  { id: 'S002', name: 'Nguyễn Văn Bình', role: 'Quản lý chi nhánh', branch: 'Quận 3', phone: '0902222222', email: 'binh.nguyen@smyou.vn', status: 'active', joinDate: '15/04/2023' },
  { id: 'S003', name: 'Lê Thị Thu', role: 'Quản lý chi nhánh', branch: 'Quận 7', phone: '0903333333', email: 'thu.le@smyou.vn', status: 'active', joinDate: '01/06/2023' },
  { id: 'S004', name: 'Phạm Văn Đức', role: 'Quản lý chi nhánh', branch: 'Bình Thạnh', phone: '0904444444', email: 'duc.pham@smyou.vn', status: 'active', joinDate: '10/07/2023' },
  { id: 'S005', name: 'Hoàng Thị Hoa', role: 'Quản lý chi nhánh', branch: 'Thủ Đức', phone: '0905555555', email: 'hoa.hoang@smyou.vn', status: 'active', joinDate: '01/09/2023' },
  { id: 'S006', name: 'Vũ Minh Tuấn', role: 'Pha chế viên', branch: 'Quận 1', phone: '0906666666', email: 'tuan.vu@smyou.vn', status: 'active', joinDate: '15/01/2024' },
  { id: 'S007', name: 'Đỗ Thị Hương', role: 'Thu ngân', branch: 'Quận 3', phone: '0907777777', email: 'huong.do@smyou.vn', status: 'inactive', joinDate: '01/03/2024' },
  { id: 'S008', name: 'Bùi Văn Nam', role: 'Giao hàng', branch: 'Quận 7', phone: '0908888888', email: 'nam.bui@smyou.vn', status: 'active', joinDate: '20/04/2024' },
];

export const reviews = [
  { id: 'R001', type: 'product', target: 'Trà Sữa Trân Châu Hoàng Kim', customer: 'Nguyễn Thị Lan', rating: 5, comment: 'Trà sữa ngon, trân châu rất dai và thơm.', date: '20/04/2026', status: 'approved' },
  { id: 'R002', type: 'staff', target: 'Trần Thị Ngọc', customer: 'Trần Văn Minh', rating: 5, comment: 'Quản lý rất nhiệt tình, hỗ trợ khách hàng nhanh chóng.', date: '19/04/2026', status: 'approved' },
  { id: 'R003', type: 'product', target: 'Cà Phê Muối Kem Béo', customer: 'Phạm Thu Hà', rating: 4, comment: 'Cà phê hơi ngọt so với khẩu vị của mình, nhưng kem muối rất ngon.', date: '18/04/2026', status: 'pending' },
  { id: 'R004', type: 'staff', target: 'Vũ Minh Tuấn', customer: 'Lê Quang Hùng', rating: 3, comment: 'Pha chế hơi chậm, mình phải đợi khá lâu.', date: '17/04/2026', status: 'approved' },
  { id: 'R005', type: 'product', target: 'Matcha Đào Kem Cheese', customer: 'Võ Thị Mai', rating: 5, comment: 'Vị matcha đậm đà, kem cheese béo ngậy rất thích.', date: '16/04/2026', status: 'approved' },
  { id: 'R006', type: 'staff', target: 'Đỗ Thị Hương', customer: 'Hoàng Văn Long', rating: 2, comment: 'Thái độ thu ngân không được tốt lắm.', date: '15/04/2026', status: 'rejected' },
];
