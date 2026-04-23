import { Order, orders as initialOrders } from '../../data/mockData';

const ORDERS_KEY = 'milktea_orders_clean';
const LAST_NOTIFICATION_KEY = 'milktea_last_notification';

type OrderNotificationActor = 'user' | 'admin' | 'system';

const TRANSITION_MAP: Record<Order['status'], Order['status'][]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['preparing', 'cancelled'],
  preparing: ['ready'],
  ready: ['completed'],
  completed: [],
  cancelled: [],
};

const buildNotification = (orderId: string, customerId: string, status: Order['status'], actor: OrderNotificationActor) => ({
  id: `NTF-${Date.now()}`,
  orderId,
  customerId: customerId || 'guest',
  status,
  actor,
  timestamp: new Date().toISOString()
});

export const OrderService = {
  getAllOrders: (): Order[] => {
    const saved = localStorage.getItem(ORDERS_KEY);
    const orders = saved ? JSON.parse(saved) : [];
    console.log(`[OrderService] Loading orders from ${ORDERS_KEY}:`, orders.length);
    if (!saved) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
    }
    return orders;
  },

  saveOrder: (order: Order) => {
    const orders = OrderService.getAllOrders();
    const updated = [order, ...orders];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    console.log(`[OrderService] Saved new order ${order.id}. Total:`, updated.length);
    
    const notification = buildNotification(order.id, order.customerId, 'pending', 'user');
    localStorage.setItem(LAST_NOTIFICATION_KEY, JSON.stringify(notification));

    // Dispatch event to notify other parts of the app
    window.dispatchEvent(new Event('storage'));
  },

  getOrderById: (orderId: string): Order | undefined => {
    const orders = OrderService.getAllOrders();
    return orders.find(o => o.id === orderId);
  },

  canTransitionTo: (currentStatus: Order['status'], nextStatus: Order['status']) => {
    return TRANSITION_MAP[currentStatus].includes(nextStatus);
  },

  canUserCancel: (orderId: string) => {
    const order = OrderService.getOrderById(orderId);
    return order?.status === 'pending';
  },

  updateOrderStatus: (orderId: string, status: Order['status'], actor: OrderNotificationActor = 'admin') => {
    const orders = OrderService.getAllOrders();
    const currentOrder = orders.find(o => o.id === orderId);
    if (!currentOrder) {
      return { success: false, error: 'Không tìm thấy đơn hàng.' };
    }

    if (currentOrder.status === status) {
      return { success: true, order: currentOrder };
    }

    if (!OrderService.canTransitionTo(currentOrder.status, status)) {
      return {
        success: false,
        error: `Không thể chuyển đơn từ ${currentOrder.status} sang ${status}.`
      };
    }

    const updatedOrder = { ...currentOrder, status };
    const updated = orders.map(o => o.id === orderId ? updatedOrder : o);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));

    const notification = buildNotification(orderId, currentOrder.customerId, status, actor);
    localStorage.setItem(LAST_NOTIFICATION_KEY, JSON.stringify(notification));

    // Trigger a storage event so other tabs/components can update
    window.dispatchEvent(new Event('storage'));

    return { success: true, order: updatedOrder };
  },

  cancelOrderByUser: (orderId: string) => {
    const order = OrderService.getOrderById(orderId);
    if (!order) {
      return { success: false, error: 'Không tìm thấy đơn hàng.' };
    }

    if (order.status !== 'pending') {
      return { success: false, error: 'Chỉ có thể hủy đơn khi cửa hàng chưa xác nhận.' };
    }

    return OrderService.updateOrderStatus(orderId, 'cancelled', 'user');
  },
};
