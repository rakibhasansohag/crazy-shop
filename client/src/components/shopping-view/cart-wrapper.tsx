import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../store/shop/cart-slice';
import { Button } from '../ui/button';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import UserCartItemsContent from './cart-items-content';

type Props = {
	cartItems: CartItem[];
	setOpenCartSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserCartWrapper = ({ cartItems, setOpenCartSheet }: Props) => {
	const navigate = useNavigate();

	const totalCartAmount =
		cartItems && cartItems.length > 0
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

	return (
		<SheetContent className='sm:max-w-md'>
			<SheetHeader>
				<SheetTitle className='text-base font-semibold text-gray-900'>
					Your Cart
				</SheetTitle>
			</SheetHeader>
			<div className='mt-8 space-y-4'>
				{cartItems && cartItems.length > 0
					? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
					: null}
			</div>

			<div className='px-4'>
				<div className='mt-8 space-y-4'></div>
				<div className='mt-8 space-y-4'>
					<div className='flex items-center justify-between'>
						<span className='font-bold'>Total</span>
						<span className='font-bold'>${totalCartAmount}</span>
					</div>
				</div>
				<Button
					className='w-full mt-6'
					onClick={() => {
						navigate('/shop/checkout');
						setOpenCartSheet(false);
					}}
				>
					Checkout
				</Button>
			</div>
		</SheetContent>
	);
};

export default UserCartWrapper;
