import { HousePlug, Menu } from 'lucide-react';
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { AuthState } from '@/store/auth-slice';
import { shoppingViewHeaderMenuItems } from '../../config';
import { Label } from '../ui/label';

interface MenuItemType {
	id: string;
	path: string;
	label: string;
}

function MenuItems() {
	const navigate = useNavigate();
	const location = useLocation();
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

function ShoppingHeader() {
	const { isAuthenticated } = useSelector(
		(state: { auth: AuthState }) => state.auth,
	);

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
						{/* <HeaderRightContent /> */}
					</SheetContent>
				</Sheet>
				<div className='hidden lg:block'>
					<MenuItems />
				</div>

				<div className='hidden lg:block'>{/* <HeaderRightContent /> */}</div>
			</div>
		</header>
	);
}

export default ShoppingHeader;
