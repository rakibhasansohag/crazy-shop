import {
	BadgeCheckIcon,
	ChartNoAxesCombinedIcon,
	LayoutDashboardIcon,
	ShoppingBasketIcon,
} from 'lucide-react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

export type AdminSidebarMenuItem = {
	id: string;
	label: string;
	path: string;
	icon: React.ReactNode;
};

type MenuItemsProps = {
	setOpen: (open: boolean) => void;
};

const adminSidebarMenuItems: AdminSidebarMenuItem[] = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		path: '/admin/dashboard',
		icon: <LayoutDashboardIcon />,
	},
	{
		id: 'products',
		label: 'Products',
		path: '/admin/products',
		icon: <ShoppingBasketIcon />,
	},
	{
		id: 'orders',
		label: 'Orders',
		path: '/admin/orders',
		icon: <BadgeCheckIcon />,
	},
	{
		id: 'features',
		label: 'Features',
		path: '/admin/features',
		icon: <ChartNoAxesCombinedIcon />,
	},
];

function MenuItems({ setOpen }: MenuItemsProps) {
	const navigate = useNavigate();

	return (
		<nav className='mt-8 flex-col flex gap-2'>
			{adminSidebarMenuItems.map((menuItem) => (
				<div
					key={menuItem.id}
					onClick={() => {
						navigate(menuItem.path);
						setOpen(false);
					}}
					className='flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'
				>
					{menuItem.icon}
					<span>{menuItem.label}</span>
				</div>
			))}
		</nav>
	);
}

type AdminSideBarProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

function AdminSideBar({ open, setOpen }: AdminSideBarProps) {
	const navigate = useNavigate();

	return (
		<Fragment>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side='left' className='w-64'>
					<div className='flex flex-col h-full'>
						<SheetHeader className='border-b'>
							<SheetTitle className='flex gap-2 mt-5 mb-5'>
								<ChartNoAxesCombinedIcon size={30} />
								<h1 className='text-2xl font-extrabold'>Admin Panel</h1>
							</SheetTitle>
						</SheetHeader>
						<MenuItems setOpen={setOpen} />
					</div>
				</SheetContent>
			</Sheet>
			<aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
				<div
					onClick={() => navigate('/admin/dashboard')}
					className='flex cursor-pointer items-center gap-2'
				>
					<ChartNoAxesCombinedIcon size={30} />
					<h1 className='text-2xl font-extrabold'>Admin Panel</h1>
				</div>
				<MenuItems setOpen={setOpen} />
			</aside>
		</Fragment>
	);
}

export default AdminSideBar;
