import { useDispatch, useSelector } from 'react-redux';
import Address from '../../components/shopping-view/address';
import UserCartItemsContent from '../../components/shopping-view/cart-items-content';
import img from '../../assets/account.jpg';

import { AppDispatch, RootState } from '../../store/store';
import { useState } from 'react';
import { AddressItem } from '../../store/shop/address-slice';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { createNewOrder } from '../../store/shop/order-slice';
import { Order } from '../../types/order';

export interface ShoppingCheckoutProps {
	setCurrentSelectedAddress: (address: AddressItem) => void;
	selectedId: AddressItem | null;
}

const ShoppingCheckout = () => {
	const [currentSelectedAddress, setCurrentSelectedAddress] =
		useState<AddressItem | null>(null);

	const [isPaymentStart, setIsPaymentStart] = useState(false);

	const { cartItems, cartId } = useSelector(
		(state: RootState) => state.shopCart,
	);
	const { user } = useSelector((state: RootState) => state.auth);
	const { approvalURL } = useSelector((state: RootState) => state.shopOrder);
	const dispatch = useDispatch<AppDispatch>();

	const totalCartAmount =
		cartItems && cartItems && cartItems.length > 0
			? cartItems.reduce(
					(sum, currentItem) =>
						sum +
						(currentItem?.salePrice > 0
							? currentItem?.salePrice
							: currentItem?.price) *
							currentItem?.quantity,
					0,
			  )
			: 0;

	function handleInitiatePaypalPayment() {
		if (cartItems.length === 0) {
			toast.error('Your cart is empty. Please add items to cart.');

			return;
		}
		if (currentSelectedAddress === null) {
			toast.error('Please select an address to place order.');
			return;
		}

		setIsPaymentStart(true);

		const orderData: Order = {
			userId: user?.id || '',
			cartId: cartId || '',
			cartItems: cartItems.map((singleCartItem) => ({
				productId: singleCartItem?.productId,
				title: singleCartItem?.title,
				image: singleCartItem?.image,
				price:
					singleCartItem?.salePrice > 0
						? singleCartItem?.salePrice
						: singleCartItem?.price,
				quantity: singleCartItem?.quantity,
			})),
			addressInfo: {
				addressId: currentSelectedAddress?._id || '',
				address: currentSelectedAddress?.address,
				city: currentSelectedAddress?.city,
				pincode: currentSelectedAddress?.pincode,
				phone: currentSelectedAddress?.phone,
				notes: currentSelectedAddress?.notes,
			},
			orderStatus: 'pending',
			paymentMethod: 'paypal',
			paymentStatus: 'pending',
			totalAmount: totalCartAmount,
			orderDate: new Date(),
			orderUpdateDate: new Date(),
			paymentId: '',
			payerId: '',
		};

		dispatch(createNewOrder(orderData))
			.then((data) => {
				if (data.meta.requestStatus === 'fulfilled') {
					setIsPaymentStart(true);
				} else {
					setIsPaymentStart(false);
				}
			})
			.catch(() => setIsPaymentStart(false))
			.finally(() => setIsPaymentStart(false));
	}

	if (approvalURL) {
		window.location.href = approvalURL;
	}

	return (
		<div className='flex flex-col'>
			<div className='relative h-[300px] w-full overflow-hidden'>
				<img src={img} className='h-full w-full object-cover object-center' />
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
				<Address
					selectedId={currentSelectedAddress}
					setCurrentSelectedAddress={setCurrentSelectedAddress}
				/>
				<div className='flex flex-col gap-4'>
					{cartItems && cartItems && cartItems.length > 0
						? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
						: null}
					<div className='mt-8 space-y-4'>
						<div className='flex justify-between'>
							<span className='font-bold'>Total</span>
							<span className='font-bold'>${totalCartAmount}</span>
						</div>
					</div>
					<div className='mt-4 w-full'>
						<Button onClick={handleInitiatePaypalPayment} className='w-full'>
							{isPaymentStart
								? 'Processing Paypal Payment...'
								: 'Checkout with Paypal'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCheckout;
