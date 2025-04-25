import { Button } from '../ui/button';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const UserCartItemsContent = () => {
	return (
		<SheetContent className='sm:max-w-md'>
			<SheetHeader>
				<SheetTitle className='text-base font-semibold text-gray-900'>
					Your Cart
				</SheetTitle>
			</SheetHeader>
			<div className='px-4'>
				<div className='mt-8 space-y-4'></div>
				<div className='mt-8 space-y-4'>
					<div className='flex items-center justify-between'>
						<span className='font-bold'>Total</span>
						<span className='font-bold'>$100</span>
					</div>
				</div>
				<Button className='w-full mt-6'>Checkout</Button>
			</div>
		</SheetContent>
	);
};

export default UserCartItemsContent;
