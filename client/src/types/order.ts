// src/types/order.ts
export type OrderStatus =
	| 'pending'
	| 'confirmed'
	| 'shipped'
	| 'delivered'
	| 'rejected';

export type PaymentMethod = 'paypal' | 'stripe' | 'cash';

export type PaymentStatus = 'pending' | 'paid' | 'failed';

export type AddressInfo = {
	addressId: string;
	address: string;
	city: string;
	pincode: string;
	phone: string;
	notes?: string;
};

export type CartItem = {
	productId: string;
	title: string;
	image: string;
	price: number;
	quantity: number;
};

export type Order = {
	_id?: string;
	userId: string;
	cartId: string;
	cartItems: CartItem[];
	addressInfo: AddressInfo;
	orderStatus: OrderStatus;
	paymentMethod: PaymentMethod;
	paymentStatus: PaymentStatus;
	totalAmount: number;
	orderDate: Date;
	orderUpdateDate: Date;
	paymentId?: string;
	payerId?: string;
};

export type OrderListItem = Pick<
	Order,
	'_id' | 'orderStatus' | 'orderDate' | 'totalAmount'
> & {
	id: string;
};

export type CreateOrderPayload = Omit<
	Order,
	'_id' | 'orderUpdateDate' | 'paymentId' | 'payerId'
>;


// FOr Admin realted orders types
export interface AdminOrderState {
	orderList: Order[];
	orderDetails: Order | null;
	isLoading: boolean;
}
