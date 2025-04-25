import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, logoutUser } from '@/store/auth-slice';
import { shoppingViewHeaderMenuItems } from '../../config';
import { Label } from '../ui/label';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { toast } from 'sonner';

import UserCartWrapper from './cart-wrapper';
import { fetchCartItems } from '../../store/shop/cart-slice';

interface MenuItemType {
	id: string;
	path: string;
	label: string;
}

function MenuItems() {
	const navigate = useNavigate();
	const location = useLocation();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();

	function handleNavigate(getCurrentMenuItem: MenuItemType) {
		sessionStorage.removeItem('filters');
		const currentFilter =
			getCurrentMenuItem.id !== 'home' &&
			getCurrentMenuItem.id !== 'products' &&
			getCurrentMenuItem.id !== 'search'
				? {
						category: [getCurrentMenuItem.id],
				  }
				: null;

		sessionStorage.setItem('filters', JSON.stringify(currentFilter));

		if (location.pathname.includes('listing') && currentFilter !== null) {
			setSearchParams(
				new URLSearchParams(`?category=${getCurrentMenuItem.id}`),
			);
		} else {
			navigate(getCurrentMenuItem.path);
		}
	}

	return (
		<nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
			{shoppingViewHeaderMenuItems.map((menuItem) => (
				<Label
					onClick={() => handleNavigate(menuItem)}
					className='text-sm font-medium cursor-pointer'
					key={menuItem.id}
				>
					{menuItem.label}
				</Label>
			))}
		</nav>
	);
}

function HeaderRightContent() {
	const { user } = useSelector((state: { auth: AuthState }) => state.auth);
	const { cartItems } = useSelector((state: RootState) => state.shopCart);

	const [openCartSheet, setOpenCartSheet] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchCartItems({ userId: user?.id || '' }));
	}, [dispatch, user?.id]);

	function handleLogout() {
		dispatch(logoutUser());
		toast.success('Logged out successfully');
	}

	console.log('Cartitems header', cartItems);
	return (
		<div className='flex lg:items-center lg:flex-row flex-col gap-4'>
			<Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
				<Button
					onClick={() => setOpenCartSheet(true)}
					variant='outline'
					size='icon'
					className='relative'
				>
					<ShoppingCart className='w-6 h-6' />
					<span className='absolute top-[-5px] right-[2px] font-bold text-sm'>
						{cartItems?.length || 0}
					</span>
					<span className='sr-only'>User cart</span>
				</Button>
				<UserCartWrapper
					setOpenCartSheet={setOpenCartSheet}
					cartItems={
						cartItems && cartItems && cartItems.length > 0 ? cartItems : []
					}
				/>
			</Sheet>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className='bg-black cursor-pointer'>
						<AvatarFallback className='bg-black text-white font-extrabold'>
							{user?.userName[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent side='right' className='w-56'>
					<DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => navigate('/shop/account')}>
						<UserCog className='mr-2 h-4 w-4' />
						Account
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => navigate('/shop/listing')}>
						<UserCog className='mr-2 h-4 w-4' />
						Product Lists
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogout}>
						<LogOut className='mr-2 h-4 w-4' />
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

function ShoppingHeader() {
	return (
		<header className='sticky top-0 z-40 w-full border-b bg-background'>
			<div className='flex h-16 items-center justify-between px-4 md:px-6'>
				<Link to='/shop/home' className='flex items-center gap-2'>
					<HousePlug className='h-6 w-6' />
					<span className='font-bold'>Ecommerce</span>
				</Link>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant='outline' size='icon' className='lg:hidden'>
							<Menu className='h-6 w-6' />
							<span className='sr-only'>Toggle header menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='left' className='w-full max-w-xs'>
						<MenuItems />
						{<HeaderRightContent />}
					</SheetContent>
				</Sheet>
				<div className='hidden lg:block'>
					<MenuItems />
				</div>

				<div className='hidden lg:block'>{<HeaderRightContent />}</div>
			</div>
		</header>
	);
}

export default ShoppingHeader;
