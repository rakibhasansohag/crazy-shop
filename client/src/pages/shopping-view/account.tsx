import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import accImg from '../../assets/account.jpg';
import Address from '../../components/shopping-view/address';
import { AddressItem } from '../../store/shop/address-slice';
import ShoppingOrders from '../../components/shopping-view/shopping-orders';

const ShoppingAccount = () => {
	return (
		<div className='flex flex-col'>
			<div className='relative h-[300px] w-full overflow-hidden'>
				<img
					src={accImg}
					className='h-full w-full object-cover object-center'
				/>
			</div>
			<div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
				<div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
					<Tabs defaultValue='orders'>
						<TabsList>
							<TabsTrigger value='orders'>Orders</TabsTrigger>
							<TabsTrigger value='address'>Address</TabsTrigger>
						</TabsList>
						<TabsContent value='orders'>
							<ShoppingOrders />
						</TabsContent>
						<TabsContent value='address'>
							<Address
								selectedId={null}
								setCurrentSelectedAddress={(address: AddressItem) => {
									console.log('clicked', address);
								}}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default ShoppingAccount;
