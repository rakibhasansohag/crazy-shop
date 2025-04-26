import { Minus, Plus, Trash } from 'lucide-react';
import {
	CartItem,
	deleteCartItem,
	updateCartQuantity,
} from '../../store/shop/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { AppDispatch, RootState } from '../../store/store';
import { toast } from 'sonner';

const UserCartItemsContent = ({ cartItem }: { cartItem: CartItem }) => {
	const { user } = useSelector((state: RootState) => state.auth);
	const { productList } = useSelector((state: RootState) => state.shopProducts);
	const { cartItems } = useSelector((state: RootState) => state.shopCart);

	console.log({ cartItem, cartItems });

	const dispatch = useDispatch<AppDispatch>();

	function handleUpdateQuantity(
		getCartItem: CartItem,
		typeOfAction: 'plus' | 'minus',
	) {
		if (typeOfAction == 'plus') {
			const getCartItems = cartItems || [];

			if (getCartItems.length) {
				const indexOfCurrentCartItem = getCartItems.findIndex(
					(item) => item.productId === getCartItem?.productId,
				);

				const getCurrentProductIndex = productList.findIndex(
					(product) => product._id === getCartItem?.productId,
				);
				const getTotalStock = productList[getCurrentProductIndex].totalStock;

				console.log(getCurrentProductIndex, getTotalStock, 'getTotalStock');

				if (indexOfCurrentCartItem > -1) {
					const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
					if (getQuantity + 1 > getTotalStock) {
						toast.success(
							`Only ${getQuantity} quantity can be added for this item`,
						);

						return;
					}
				}
			}
		}

		dispatch(
			updateCartQuantity({
				userId: user?.id || '',
				productId: getCartItem?.productId,
				quantity:
					typeOfAction === 'plus'
						? getCartItem?.quantity + 1
						: getCartItem?.quantity - 1,
			}),
		)
			.unwrap()
			.then((res) => {
				if (res.success) {
					toast.success(
						`Cart item of ( ${getCartItem?.title} ) updated successfully`,
					);
				}
			});
	}

	function handleCartItemDelete(getCartItem: CartItem) {
		dispatch(
			deleteCartItem({
				userId: user?.id || '',
				productId: getCartItem?.productId,
			}),
		)
			.unwrap()
			.then((res) => {
				if (res?.success) {
					toast.success(
						`Cart item of ( ${getCartItem?.title} ) removed successfully`,
					);
				}
			});
	}

	return (
		<div className='flex items-center space-x-4'>
			<img
				src={cartItem?.image}
				alt={cartItem?.title}
				className='w-20 h-20 rounded object-cover'
			/>
			<div className='flex-1'>
				<h3 className='font-extrabold'>{cartItem?.title}</h3>
				<div className='flex items-center gap-2 mt-1'>
					<Button
						variant='outline'
						className='h-8 w-8 rounded-full'
						size='icon'
						disabled={cartItem?.quantity === 1}
						onClick={() => handleUpdateQuantity(cartItem, 'minus')}
					>
						<Minus className='w-4 h-4' />
						<span className='sr-only'>Decrease</span>
					</Button>
					<span className='font-semibold'>{cartItem?.quantity}</span>
					<Button
						variant='outline'
						className='h-8 w-8 rounded-full'
						size='icon'
						onClick={() => handleUpdateQuantity(cartItem, 'plus')}
					>
						<Plus className='w-4 h-4' />
						<span className='sr-only'>Decrease</span>
					</Button>
				</div>
			</div>
			<div className='flex flex-col items-end'>
				<p className='font-semibold'>
					$
					{(
						(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
						cartItem?.quantity
					).toFixed(2)}
				</p>
				<Trash
					onClick={() => handleCartItemDelete(cartItem)}
					className='cursor-pointer mt-1'
					size={20}
				/>
			</div>
		</div>
	);
};

export default UserCartItemsContent;
