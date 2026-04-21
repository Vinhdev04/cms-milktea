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
  status: 'active' | 'inactive';
  badge?: string;
  salePrice?: number | null;
  sold: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  openHours: string;
  status: 'open' | 'closed' | 'maintenance';
  todayOrders: number;
  staff: number;
  manager: string;
  rating: number;
}

export interface Topping {
  id: string;
  name: string;
  price: number;
  category: string;
  status: 'active' | 'inactive';
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
  // Extended CMS display fields
  discount: number;
  total: number;
  used: number;
  expiry: string;
  status: 'active' | 'expired';
  desc: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
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
  // Extended CMS display fields
  customer: string;
  phone: string;
  branch: string;
  payment: string;
  time: string;
  date: string;
  customerType: 'member' | 'guest';
}

export interface OrderProgressStep {
  id: string;
  label: string;
  description: string;
  time?: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
}

export interface OrderHistory {
  orderId: string;
  steps: OrderProgressStep[];
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
  // Extended CMS display fields
  type: 'product' | 'staff';
  target: string;
  customer: string;
  date: string;
}

// ============ MOCK DATA ============

export const categories: Category[] = [
  { id: 'milktea', name: 'Trà sữa' },
  { id: 'coffee', name: 'Cà phê' },
  { id: 'smoothie', name: 'Sinh tố' },
  { id: 'juice', name: 'Nước ép' },
];

export const toppings: Topping[] = [
  { id: 'topping-1', name: 'Trân châu đen', price: 10000, category: 'Trân Châu', status: 'active' },
  { id: 'topping-2', name: 'Trân châu trắng', price: 10000, category: 'Trân Châu', status: 'active' },
  { id: 'topping-3', name: 'Thạch dừa', price: 12000, category: 'Thạch', status: 'active' },
  { id: 'topping-4', name: 'Pudding', price: 12000, category: 'Pudding', status: 'active' },
  { id: 'topping-5', name: 'Kem phô mai', price: 15000, category: 'Kem', status: 'active' },
  { id: 'topping-6', name: 'Bạc hà', price: 8000, category: 'Thạch', status: 'inactive' },
];

export const products: Product[] = [
  {
    id: '1', name: 'Trà Sữa Trân Châu Đường Đen',
    description: 'Vị trà sữa cân bằng cùng trân châu đen dai mềm, phù hợp cho lựa chọn uống mỗi ngày.',
    price: 45000, image: 'https://vimages.coccoc.com/vimage?ns=recipe&url=https%3A%2F%2Fmonngonmoingay.com%2Fwp-content%2Fuploads%2F2019%2F03%2Ftra-sua-tran-chau-duong-den-500.jpg',
    category: 'Trà Sữa', rating: 4.8, isAvailable: true, isNew: false, isPopular: true,
    status: 'active', badge: 'Bán chạy', salePrice: null, sold: 312,
  },
  {
    id: '2', name: 'Matcha Đá Xay',
    description: 'Matcha mát lạnh xay mịn, hậu vị thanh và dễ uống.',
    price: 50000, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=900&auto=format&fit=crop',
    category: 'Đá Xay', rating: 4.6, isAvailable: true, isNew: true, isPopular: false,
    status: 'active', badge: 'Mới', salePrice: null, sold: 87,
  },
  {
    id: '3', name: 'Cà Phê Đen Đá',
    description: 'Cà phê đậm vị, thơm mạnh và phù hợp cho buổi sáng cần tỉnh táo.',
    price: 35000, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop',
    category: 'Cà Phê', rating: 4.7, isAvailable: true, isNew: false, isPopular: true,
    status: 'active', badge: 'Bán chạy', salePrice: null, sold: 256,
  },
  {
    id: '4', name: 'Nước Cam Tươi',
    description: 'Nước cam ép tươi, vị thanh mát và cân bằng vị ngọt tự nhiên.',
    price: 40000, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=900&auto=format&fit=crop',
    category: 'Trà Trái Cây', rating: 4.5, isAvailable: true, isNew: false, isPopular: false,
    status: 'active', badge: undefined, salePrice: null, sold: 134,
  },
  {
    id: '5', name: 'Trà Sữa Kem Phô Mai',
    description: 'Lớp kem phô mai béo mịn phủ trên nền trà sữa đậm vị, phù hợp cho khách thích vị tròn đầy.',
    price: 55000, image: 'data:image/webp;base64,UklGRvIUAABXRUJQVlA4IOYUAACQYACdASq/ANkAPkkgjUUioaESS64AKASEsZbAN/DiAY3pS6PJWd07pjaHnKPaf831o7fjzX/t96zf/L9c39u9KrqivQ66Zu1Am12xv7nj4RRHU+ARAf5begd3p8DPWblHv7vxsfvP+09gP9Ef8v1S/q70MfVH/w/1PwEfrt6VX//9w37a+zV+vJn+XMf7znVikAzn5P7b/vXmDNgIenxuk4J0BTKtVBx2s6YKatHlLXxH5RaJQVecjhGzsmC41QyUYi3Rs9UwucotEICT1N8aCjmNbJFGpM22KRXp+bjmSkVaze7FZl+Fnhkq0sbCB0YxDDDprusK+FT9H6C0lnEoxyGv15NruVLg4pbnoXavFDcnPF1B9Ry2hhBnv/1O+u8SA9ew0N//8Qe2q/8Tb8h7VSh3T/H+i2dY6mBmBd/xxrs3mp8oZDz9rLXMhw6XlYEdjUEaBAz2+ecXCX0+0r5kCnOmleIg0dHcqQleKhvxlvyFq+E6WjOVwq7H3uUnoVWzb551NplvF/L693WpzIcUU8oIgdgVqs3tnM7j1HHPmTwh/F3WAfEzGaJjeqgnf0ZTY/CLHo0+tZIHW7J9F+qVbuRNsek1isX8gb5sMtb0Bf3XAUjCgNqnyEfwai1qwnJ8UMTMFoRh73e5gWM09XYPyGJvFdActZTggBU7yTWEM9PWMZh1Hjv+vmvalxjohexldeqQVq4ptRHVLHZhrjpJ3+IJdK0XoJtXsp40R75+hrJhxRoth4u+/6ac17mVSUcWAYj7gRl4VNiBTxlvc0xrTkuwvaLWX7LAvC5xC23UD/o63/vhQ6bgj/c2vkoHK113JU34tIJ01SuUrEHLhKgNgW7eGtgNqc0w2P7d3xP2PUDx/ofLcYSQ85+x6UZp5k5eYc7kPwayLgnUPpTSS8MM2ObJDBEi/SYIUqXrOHNZb8r8JiRAD1ASBgtzvkhGpMHJlA13G4FUVuNHemN2RJQBgOaI1x+LVWa1qtm37l8LszjnhzFQ1g47lzAEbL9lG58v3Tp/26Xf9x/7EaYoAP6iLh96Rl3WiplLcq4DbSMBreh9FjNMGWGY9LQNaJBE4vq+uLThRy/ybSbyOp60hdUSEAs43MualWlhp6/AbFfrHObrgGt9TcmwtgIasRO899D09bhv9+HVJk/Vw8tdl3Y6FhB9WpGHxefZcRie7KMk7wkiThLBYdIqv4uT8i1TNIsWbN2AtpX5MzwDfL7pnNYCoDPvtt+AgFhHFJgAFZZpZYbC1eNkCaQRoJDYDfDsBLkVRRq2P2UawbkRKIjh7QiXG+RpCftoTvWogX9p5G5lZFl8xt3yvcxalfS30ablOID1HffLpquKNRTRT0vZALsPW+MTgu+ia1fkK4cmtSZ5fbx4h7JBqumIXHIt8lA81iuowDtECF5GFsZbyn1YPneu8JSuTAq+mnq8bsOyLPMC2h6wGy6H+yF4KDL+11wVJoh9aNpeGCzeCIagvsWelb8MXUrqzrlVoRkbIf34nGgMeTEPMe28bgZ7KkZ/ZXHrC/pP6fEcyeovJjHlDR9QSyncelYJ60HhQ6IN9lbiOXdtmlbNa/81hZbM3XpEdvzcH7kQ8essHWzJOHoDI7SoSD/rYMm+gzYIL7JFV7QJAJ8KEsrFA7s6az5TfXJj5BM0Cul1EzK2YYi2iZzn5qwU3SsYe15slwoJafCCVKQubCEYJnc0lF7HaJ0/nPVeKJTHy2/lWOlsHoLzDWvq+WOr2cuzp1CegML/ErRGFUx/3mgwpQtuokccjzxyo9LGYTEgIfnpzaVidubhXWWGKWU6OpY4DUJS8lAKFZF+BsGJvh3ZCvb8VWvp2wltRnoML6XHsfRS7Cb8o0j72VoE0GEPx8hf0/mnFgk0EahX9ODjQmQfMQy5wq9aslVqdfWK3Gf0pRuO1wr3r2zeQTtfkTuy6CfB+aDGzS+dub6+wJb/q4SwnKTzKddpvGwTm6cj0Ct53NzmSYIsDbS7wFk7UlqBJGX2dLEakqvg9m9qhxYX1md6HT35Hn73663QPqpF613z9bz73YOnNm4MHfuOG2QgwW14cw+Kbh1n7saAOeyOj7TUm0fTSj8hRPbe5Tt/3P4/qhHYCLj6WTihwWebHo5MSHutToZptsl9069iNfFsCZR7rqeSOzoMWEwIy5JZv9XP4xma7HSfNMViv7/lZpu3f+haM+9ocv6+v25GWnTu8IUnQZyn6QAtMTyqaMj8Y4dNey8ekVnnT6DVjbTpn31E+zRch1avVNn11fBs4MOhdsO7mJ5UJ02SGCq6UyVrD/xQyZuWuKRukqzItNEk5p1zeGnjx0FeTpsY4Laa4cBB9A75nIuIXG6iiBjoUMx9ifrpdmSLz8p8xf9Q8P6Gtw1P0zEMIt1xGOYqLMX519oU60PO3SRPcol1njdm14D1wwvsiSq7X71FaPjCJS4uaS3xWOOmwu4bPmx2Uoz++l0z6nUOVGSZWClTnRN2N+WqXttrDH0KViDxjYPYx/SlC5oi6M42QqqTMDRpLZoFCNjSpogHPrrQCfhN2QVpgqEeXosnTklH7rJIe1Tv8CNkgBRcDGSuJJ+SAazZBKqdqverQH4KjrwZ0IejKdcP4ulYX0in7Fi7BPz6Hna22mG8srTwtKIYbq2tBiHJ+YoRtL1Zpwma+aOWkvmB7qBd62gfOq4PdMibMB8xbv0qyWbso8pND6ZAGBZ3uti2kfPdHgxLVVUFemO7igK2W+cy1BIIWpL2b48PRS0iCbT7wQNvkw9XTBAMlkPkHLglRlUBwXFTq6SjlfF4lm67Reh9Ky1Dit2KDnI7W4ZHddxgUcs/sWL+rkKdTHk9q11J5Hw4sy//3b4o3f8oPq7e9KSsQzPxJWJZfFkXqIkZENoOrqV9YEpfXQFJng/1RPddNxAdGqOesKk2LP2GeD24XUKsS4izzr9kk0oCnDDUZm0R1mlwuk+MCNPwiPHe6F9Kc0d+lr+4FJQaBZOeYRlxtBnpSBnPafNg9pUpeaKR0GygNtLgDPUa22t3BDDjYLoMQGvR3JuGcTIqxRVdKdvBhhOfPYjsNaQYD2kkdfP9kz0AGnHRIlbvnlO2SODBvKLqJLrlNgpRcAWG7Pi9D8DxA36U2kF1US1NuFK4DzJyYHprgJLvRTDaYlXOt+4aeOCmU+FWdMYBqvQoAbb0HK1g1stQJNkhfINZuW01D5uPs3NFzfnGhWmzZ9tUXJ0oj63YTBzqE2X2siXp4pYD0p7BCnZe+A/mqtXfXe7ONVnhx25r3uACD4dChNoIx3FYM33tDcOfo+xZByjD3wAnxrP4bsRT5Ri6bNY+76eeuftUKwx1tdIsLj+f6C2ALQBTNflL4s5HT7KDcVLSYL2szp0Q4T7Nl4PS8ULBN3ou7pSK412VJ8o3ysSESxIVQJzugYil4yHuCqZPoLGLBJetfCGk7RpMHjDiQN7tCyTH0vj9TaBIj33hoa6yTRNLOerKAVcJHHnEOWu/rz7R5t9uS7sWTJmNdwM5h2eF55W/u2leorH98qac3oteZvE3viMy2v4Dd80lb3d/baf3cWBQ7xLT+fqATwaUD8UUBLyWlgd22TdkGNJLyasMly3BD1/oHC9819BsiKneG4P3QEq69+DgjKoWbHPR7HDMsXN/nVUMp4wPB5Qvh8R/Ai+XoMIs6VXLJdZgUl54xDWIhNFFY+4Utw4leXzbZxqWJMXVpP4gAWxqWzG5lsY3T3hfwhPRPWP03nkfjzpDMFfon3PgfX2egkCv+MBhXQbBVv0KmuPkV9v5v2AfbrU9L4z/qqu8Tk9UsEQ9TDDWuLL4nIAVwstMOe7jcg1UQwZWj/8qjdw6Mu3Oc+3+vRfFWxVsLR5f/79RbFUpDxaJvXpnWLLSnEGze8gE5mLedIbchuc76vhCCqKfJSt7dnRuksjChYgOOXHxmHoUUO5pX6ii2zdEFjet7tZcxg3lB6t33LEE9bKwvHxfOKsIq4udOYoHpIlOKQy5piWfJqmpQXQ2SXfCEU+hsi2U+ZOcdDd5etlhRpV2izpNst6hiGm38cfCRd2rDZlb/hXpALoaK4Q8qr+CO2Z6pfyDYj8gRbT35Tz14LKiFUeMIZ9Ar70yYuXdtSYzeta1qc5Mi+5yuQuMDLI3IKST/JgXR2GHhhHmSG8n1uLKBPgb7qeht7M7Ve/GhpMH+Gz//h4TUCbqaHCY+11MJSdHiZfzJDgZ0VhBxs+dm43sHrtPAJm5MPpw8aog2VCSSE/LWJWw+ZHmty5ERkKkGbV6bnMKioEf4dUuF0y28Dj0Dgi4cfyrimTpdnudqej/HOF7UwG0WMKGVf8R9HPlJHWC+JdNOC04sVE3kOGRjE2/evYRCY5DdLvNEWTgECZjx/AKJJmmue6MGg7KH07ASWt6+fXVcEKJH9zegNtGd4S4jXI3ZdnM8FgqlvOXH4wjhh+TBl7kkCOYdfjMEwLxOHPWWfz9NhDQFIHGC+v8KkqTW+vFN9FB9prHri+T0vNSws1hVshBxIvN2F8ZAj0R6cWb7PSdjZVc1/QVgoQ0qbt+m4DHtfn4fJCR+3qvCh2XZfHg9Ko+LU7LbECBwHWDe7y6eBbSW7T+4l1SJ0nj6Yr/EVV1/rUyEMqRcOlMueEAAAFASs9dWwy3jok0jUMA3EuiQ9DasBBCV86j4xXn6SeSHEme10QXfPdf2CHkRxsZuz1z/GmJBUrA3mlCi2YIz4Y0Tx+b+D2kEIsA66bX5lfWzke9dlkO02pWi9HsIeF/pmHoRoSSYiE/Bn6O0WMCCjS2WU0Z6mjlnJL3dbCCSfjUcesqJ9sCBBc3OhbHe1C6DHk8hENDRgRPr4rsC4khi29sYO7okW90+Jwr4wmSISFZ2wgC+bc+upvuycBhq144RkvoVSqdqw/V0gzBEjwal0GREaT1CZL1Zu9EKGYQA+/MH2F0s82jm9GAMi4a24JKCbpBfXfJ+VVau6FOfXZhqJrrk5IdMfcRUmTVZ+3RHeeFmGbnKCGOOwJi0FpyLMXrDcS4Y3eQZ1ylEfC4nR7r/bsvnFUF2rYZYwskG0JNT93c/DSnPJf4Jtwp3piD4wmLWrZq1JhiglXL+yw3Bi3bHb6QMIGviuGYpbRDE+BmcRccLjzBsBQ5KcO/e6R1eyCCKesmdnxbP0ReXYpH+o/oH7Lmcb7vz78U8nJDGGqhgNCwhdjzERJXUcJJTE/3M+lHSaa8xNxSiszzY5nrPwkqnZARUqHJRKGNBcPR6ZS0U40RnmOFmP7YvRevfoCFbId7QFXVEOdWe2PhHqPTQ19vCTWmQ3TnRHyxXyjKYRvHpXirsetkpsP+ulGPDE7hy/xMPmKIKXY7D7oHqcCpXhXvP6OlOMZiVH4HDsbMQsGYb3uHYIhgxtKJSXrldZqi5M/+nhdPjEpKqzKr2ztAZ/sLdmxhtqjdItWiTPBSUB+6wbB/omC7AFLdhZJ+cm+DtVFwEuq4saAxOYP6syMk4JHSiv58enWkWCUyETzKRfmN4ukpOCDGmlroYeqaDkqtCwLBSqY/p918icBZMI5czYFyCH0BNnDqFhRjtYMxsGY8OwLqseN7sO9IJ+vY9q2JCCMfw2ZEVbzNo2t3kvVqRxYOYtYqinN+Y5TlC8QZa73h38arPMG9pTZl9YMCz5jhpZbntJb7G+Fi79SutKWejhTYInmh5Kl8Lz3SYb5iTUPgOW2yK0LTrZhEmZ8/DuVbL8FilxxhRAwdEEa4jJAg4CgLXkAIyQHbgdC8og/25HfWDx8UwZx96odML+A84iq3UOCk01X5m2dmgOTYQtW1Mn5Llkc7zW6ujbZbti2xcOggHCVbfWwQ3lltyK48cHZTaNUnGHccZ4Tr0kbsnwFY/cCtKdiNOoKqEzGByFYamreVY3szhoUIpJztqvQ26yxLAzNmj5yWHS+MxogqOlnmIJOgxVm8XHIXwatW80xVo1zy46w3vT2hpTDUxEnnP+bCQgriX6Sg+YsEP/bnOY1hooyXXXQ59r7BiLmcGjXbQqu+TXvTnD6x/F97G6cIeqb5cOzL42n289cBWweZZwE2Djvw13xPw4gMMXbpjRNMNXM9D45ptySh/8wH4H9gH6bIjcEGsyXC4qAwBEBvG9SsLe6vCNeywtgK2irxw2FK+yFWBU7UkKC04xAfkOLol8nMLm+nwAjDYHLelAiJmBeP5xq4f3y81Oydn1gbQYmQdY0ZIvScpKZqLz+mtZENf+HLNkKdrKnlUZfJQo/e9zZ2lyFrbkchTkM0pjxQ3E2wDZafRGbEpv6vkbMVPylt+J0uMYINPg+jgPVe1KfMFEErXIu4IwQZ48TjiE3XTrY+hRCb7aOm4TbS7tPlW5ZdkwB6mQQoQG8gkk3srZH3CRTh1OdGnESt03fca7QkLNJ3lGM9D7Iy8niW/pOXuCCZsK7mkNriyLSjDzvtCyWiVbyEDTlu8laSWRweJE39kW/CsrSEO2yX2sY/w1tzDXnR/G/Py7rQEw7Hjf25O57gZqY3sX2lhSRO44wFWLb9g3ozTpq7WrDyXsHOhYwG28jCybH2ihoFWbCVrcuk9VQwCmB/JsiJCNQHGARK+PouZqPO3Au5k4kdSE0npKZzZqj+GzWzkGkQLzfCU+SNf4a2jAjSYWo90jgcILDtXWaSBAO8edZ72xf+0fXbNuiYxQzajWZn0iOK48ClVuwROG68GW+hzxInw+IufAdjak0QMI65cectfow9AxGVDoVn1g0AZUB9g7A+q/cUcmgAF/0CH2lHW7jvCKAk4RacVU3ncO9mWtjrbOxzesOkyMjrYIdrrKWuEyNBMSvxSd43Gmr3cZHqwRIfLl3vKHQLMGL/n7NO60wLIiVgPFxzl+D0xrnzN383KWkl14VQ3UJGZEL0TiEwY+FDUTxKsUMleVhpP1GPkZr3Sa/fUbLI4MHjBP6RyYgAAAByemjtNiN0ByjJwbhdnrGeSYIU16fVfkODf/7eYSHHADobeNkR7gPPbBqj64yhCZOB0yUfcUGCQm4JIcGlKJ6IAp0Oh4txkiybaJdGEv/6VmnOf8LOB+dHH/dI3D5Lct5aW9OOF0TC8lJGtb0OD/47QAO6RhQWFxfDV17+SnuFJEKi7T+j7HJ613vpx8Ba4i1AAAAA',
    category: 'Trà Sữa', rating: 4.9, isAvailable: true, isNew: true, isPopular: true,
    status: 'active', badge: 'Mới', salePrice: 49000, sold: 198,
  },
  {
    id: '6', name: 'Trà Sữa Việt Quất',
    description: 'Kết hợp vị trà sữa êm với hương việt quất nổi bật, phù hợp khi muốn đổi vị.',
    price: 50000, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&auto=format&fit=crop',
    category: 'Trà Sữa', rating: 4.6, isAvailable: false, isNew: false, isPopular: true,
    status: 'inactive', badge: undefined, salePrice: null, sold: 67,
  },
];

export const branches: Branch[] = [
  {
    id: 'branch-1', name: 'SMYOU MilkTea - Quận 1',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM', phone: '0123456789', openHours: '7:00 - 22:00',
    status: 'open', todayOrders: 48, staff: 8, manager: 'Nguyễn Văn An', rating: 4.8,
  },
  {
    id: 'branch-2', name: 'SMYOU MilkTea - Quận 3',
    address: '456 Võ Văn Tần, Quận 3, TP.HCM', phone: '0987654321', openHours: '7:00 - 22:00',
    status: 'open', todayOrders: 35, staff: 6, manager: 'Trần Thị Bình', rating: 4.6,
  },
  {
    id: 'branch-3', name: 'SMYOU MilkTea - Quận 7',
    address: '789 Nguyễn Hữu Cảnh, Quận 7, TP.HCM', phone: '0912345678', openHours: '8:00 - 23:00',
    status: 'maintenance', todayOrders: 0, staff: 5, manager: 'Lê Thị Thu', rating: 4.5,
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
  {
    id: 'voucher-1', code: 'WELCOME20', name: 'Giảm 20% cho khách mới',
    description: 'Áp dụng cho đơn hàng đầu tiên', type: 'percentage', value: 20,
    minOrder: 100000, maxUses: 100, usedCount: 45, startDate: '2024-01-01', endDate: '2024-12-31', isActive: true,
    discount: 20, total: 100, used: 45, expiry: '31/12/2024', status: 'active', desc: 'Áp dụng cho đơn hàng đầu tiên',
  },
  {
    id: 'voucher-2', code: 'COMBO50K', name: 'Giảm 50K cho combo',
    description: 'Áp dụng khi mua combo 2 ly trở lên', type: 'fixed', value: 50000,
    minOrder: 150000, maxUses: 200, usedCount: 120, startDate: '2024-02-01', endDate: '2024-12-31', isActive: true,
    discount: 50000, total: 200, used: 120, expiry: '31/12/2024', status: 'active', desc: 'Áp dụng khi mua combo 2 ly trở lên',
  },
  {
    id: 'voucher-3', code: 'SUMMER10', name: 'Ưu đãi hè 10%',
    description: 'Chương trình hè 2023', type: 'percentage', value: 10,
    minOrder: 50000, maxUses: 500, usedCount: 500, startDate: '2023-06-01', endDate: '2023-08-31', isActive: false,
    discount: 10, total: 500, used: 500, expiry: '31/08/2023', status: 'expired', desc: 'Chương trình hè 2023',
  },
];

export const orders: Order[] = [
  {
    id: 'order-1', customerId: 'cust-1', customerName: 'Nguyễn Thị Lan', total: 95000,
    status: 'completed', type: 'delivery', createdAt: '2024-04-21T10:30:00Z',
    items: [{ productId: '1', productName: 'Trà Sữa Trân Châu Đường Đen', quantity: 2, price: 45000 }],
    customer: 'Nguyễn Thị Lan', phone: '0901234567', branch: 'SMYOU Quận 1',
    payment: 'Tiền mặt', time: '10:30', date: '21/04/2024', customerType: 'member',
  },
  {
    id: 'order-2', customerId: 'cust-2', customerName: 'Trần Văn Minh', total: 135000,
    status: 'preparing', type: 'takeaway', createdAt: '2024-04-21T14:15:00Z',
    items: [
      { productId: '3', productName: 'Cà Phê Đen Đá', quantity: 3, price: 35000 },
      { productId: '2', productName: 'Matcha Đá Xay', quantity: 1, price: 50000 },
    ],
    customer: 'Trần Văn Minh', phone: '0912345678', branch: 'SMYOU Quận 3',
    payment: 'Momo', time: '14:15', date: '21/04/2024', customerType: 'member',
  },
  {
    id: 'order-3', customerId: '', customerName: 'Khách vãng lai', total: 45000,
    status: 'pending', type: 'dine-in', createdAt: '2024-04-21T15:00:00Z',
    items: [{ productId: '1', productName: 'Trà Sữa Trân Châu Đường Đen', quantity: 1, price: 45000 }],
    customer: 'Khách vãng lai', phone: '—', branch: 'SMYOU Quận 7',
    payment: 'Tiền mặt', time: '15:00', date: '21/04/2024', customerType: 'guest',
  },
];

export const reviews: Review[] = [
  {
    id: 'review-1', productId: '1', productName: 'Trà Sữa Trân Châu Đường Đen',
    customerName: 'Nguyễn Thị Lan', rating: 5,
    comment: 'Rất ngon, vị cân bằng và topping mềm vừa phải.', createdAt: '2024-04-20T16:45:00Z',
    status: 'approved', type: 'product', target: 'Trà Sữa Trân Châu Đường Đen',
    customer: 'Nguyễn Thị Lan', date: '20/04/2024',
  },
  {
    id: 'review-2', productId: '5', productName: 'Trà Sữa Kem Phô Mai',
    customerName: 'Trần Văn Minh', rating: 4,
    comment: 'Kem phô mai đậm vị, phù hợp ai thích đồ uống béo hơn.', createdAt: '2024-04-19T11:20:00Z',
    status: 'pending', type: 'product', target: 'Trà Sữa Kem Phô Mai',
    customer: 'Trần Văn Minh', date: '19/04/2024',
  },
  {
    id: 'review-3', productId: '', productName: '',
    customerName: 'Lê Thị Hương', rating: 5,
    comment: 'Nhân viên rất nhiệt tình và thân thiện.', createdAt: '2024-04-18T09:00:00Z',
    status: 'approved', type: 'staff', target: 'Nguyễn Văn A (Quản lý)',
    customer: 'Lê Thị Hương', date: '18/04/2024',
  },
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
  { day: 'Mon', revenue: 12000000 },
  { day: 'Tue', revenue: 15000000 },
  { day: 'Wed', revenue: 14000000 },
  { day: 'Thu', revenue: 18000000 },
  { day: 'Fri', revenue: 22000000 },
  { day: 'Sat', revenue: 28000000 },
  { day: 'Sun', revenue: 25000000 },
];

export const categoryData = [
  { name: 'Trà sữa', value: 45, color: '#F58220' },
  { name: 'Cà phê', value: 25, color: '#5D2E0F' },
  { name: 'Sinh tố', value: 18, color: '#F5C088' },
  { name: 'Nước ép', value: 12, color: '#A0845C' },
];

export const orderHistoryMock: Record<string, OrderProgressStep[]> = {
  'SM240421001': [
    { id: '1', label: 'Đặt hàng', description: 'Đơn hàng đã được khởi tạo', time: '10:25', status: 'completed', icon: 'ShoppingBag' },
    { id: '2', label: 'Thanh toán', description: 'Đã thanh toán qua ví Momo', time: '10:26', status: 'completed', icon: 'Wallet' },
    { id: '3', label: 'Xác nhận', description: 'Cửa hàng đã xác nhận đơn hàng', time: '10:30', status: 'completed', icon: 'CheckCircle2' },
    { id: '4', label: 'Đang pha chế', description: 'Barista đã chuẩn bị xong món', time: '10:40', status: 'completed', icon: 'Coffee' },
    { id: '5', label: 'Đang giao', description: 'Shipper đang trên đường tới bạn', status: 'current', icon: 'Bike' },
    { id: '6', label: 'Hoàn thành', description: 'Giao hàng tận tay khách hàng', status: 'upcoming', icon: 'Package' },
  ],
  'order-2': [
    { id: '1', label: 'Đặt hàng', description: 'Đơn hàng đã được khởi tạo', time: '14:15', status: 'completed', icon: 'ShoppingBag' },
    { id: '2', label: 'Thanh toán', description: 'Đã thanh toán qua ví Momo', time: '14:16', status: 'completed', icon: 'Wallet' },
    { id: '3', label: 'Xác nhận', description: 'Cửa hàng đã xác nhận đơn hàng', time: '14:20', status: 'completed', icon: 'CheckCircle2' },
    { id: '4', label: 'Đang pha chế', description: 'Barista đang chuẩn bị món cho bạn', status: 'current', icon: 'Coffee' },
    { id: '5', label: 'Hoàn thành', description: 'Giao hàng tận tay khách hàng', status: 'upcoming', icon: 'Package' },
  ],
  'order-3': [
    { id: '1', label: 'Đặt hàng', description: 'Đơn hàng đã được khởi tạo', time: '15:00', status: 'completed', icon: 'ShoppingBag' },
    { id: '2', label: 'Thanh toán', description: 'Chờ thanh toán tại quầy', status: 'current', icon: 'Banknote' },
    { id: '3', label: 'Xác nhận', description: 'Chờ cửa hàng xác nhận', status: 'upcoming', icon: 'CheckCircle2' },
  ]
};
