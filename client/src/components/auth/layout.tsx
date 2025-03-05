import { Outlet } from 'react-router-dom';

function AuthLayout() {
	return (
		<div className='flex min-h-screen w-full'>
			<div className='hidden lg:flex lg:flex-1 items-center justify-center bg-black px-12'>
				<div className='max-w-md space-y-6 text-center text-primary-foreground'>
					<h1 className='text-4xl font-extrabold tracking-tight'>
						Welcome to ECommerce Shopping <br /> where you will go crazy
					</h1>
				</div>
			</div>
			<div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
				<Outlet />
			</div>
		</div>
	);
}

export default AuthLayout;
