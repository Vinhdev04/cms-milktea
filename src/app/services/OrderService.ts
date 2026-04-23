import { Order, orders as initialOrders } from '../../data/mockData';

const ORDERS_KEY = 'milktea_all_orders';

export const OrderService = {
  getAllOrders: (): Order[] => {
    const saved = localStorage.getItem(ORDERS_KEY);
    if (!saved) {
      // Initialize with mock data if none exists
      localStorage.setItem(ORDERS_KEY, JSON.stringify(initialOrders));
      return initialOrders;
    }
    return JSON.parse(saved);
  },

  saveOrder: (order: Order) => {
    const orders = OrderService.getAllOrders();
    // Prepend new order
    const updated = [order, ...orders];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    // Dispatch event to notify other parts of the app
    window.dispatchEvent(new Event('storage'));
  },

  getOrderById: (orderId: string): Order | undefined => {
    const orders = OrderService.getAllOrders();
    return orders.find(o => o.id === orderId);
  },

  updateOrderStatus: (orderId: string, status: Order['status']) => {
    const orders = OrderService.getAllOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    
    const order = orders.find(o => o.id === orderId);
    
    // Set a notification payload for the Header/Layout to pick up
    const notification = {
      id: `NTF-${Date.now()}`,
      orderId,
      customerId: order?.customerId || 'guest',
      status,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('milktea_last_notification', JSON.stringify(notification));

    // Trigger a storage event so other tabs/components can update
    window.dispatchEvent(new Event('storage'));
  },
};
