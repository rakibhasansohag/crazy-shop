import { useSelector } from 'react-redux';
import { DialogContent } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { RootState } from '../../store/store';
import CommonForm from '../../components/common/form';
import { useState } from 'react';

type FormData = {
	status: string;
};

const initialFormData: FormData = {
	status: '',
};

function AdminOrderDetailsView() {
	const [formData, setFormData] = useState(initialFormData);

	const { user } = useSelector((state: RootState) => state.auth);

	const handleUpdateStatus = () => {};

	const orderDetails = {
		_id: '1234567890',
		orderDate: '2022-11-24T14:30:00.000Z',
		totalAmount: 1000,
		paymentMethod: 'card',
		paymentStatus: 'pending',
		orderStatus: 'confirmed',
		cartItems: [
			{
				title: 'Product 1',
				quantity: 2,
				price: 500,
			},
			{
				title: 'Product 2',
				quantity: 1,
				price: 300,
			},
		],
		addressInfo: {
			address: '123 Main St',
			city: 'New York',
			pincode: '10001',
			phone: '1234567890',
			notes: 'This is a test order',
		},
	};

	return (
		<DialogContent className='sm:max-w-[600px]'>
			<div className='grid gap-6'>
				<div className='grid gap-2'>
					<div className='flex mt-6 items-center justify-between'>
						<p className='font-medium'>Order ID</p>
						<Label>{orderDetails?._id}</Label>
					</div>
					<div className='flex mt-2 items-center justify-between'>
						<p className='font-medium'>Order Date</p>
						<Label>{orderDetails?.orderDate.split('T')[0]}</Label>
					</div>
					<div className='flex mt-2 items-center justify-between'>
						<p className='font-medium'>Order Price</p>
						<Label>${orderDetails?.totalAmount}</Label>
					</div>
					<div className='flex mt-2 items-center justify-between'>
						<p className='font-medium'>Payment method</p>
						<Label>{orderDetails?.paymentMethod}</Label>
					</div>
					<div className='flex mt-2 items-center justify-between'>
						<p className='font-medium'>Payment Status</p>
						<Label>{orderDetails?.paymentStatus}</Label>
					</div>
					<div className='flex mt-2 items-center justify-between'>
						<p className='font-medium'>Order Status</p>
						<Label>
							<Badge
								className={`py-1 px-3 ${
									orderDetails?.orderStatus === 'confirmed'
										? 'bg-green-500'
										: orderDetails?.orderStatus === 'rejected'
										? 'bg-red-600'
										: 'bg-black'
								}`}
							>
								{orderDetails?.orderStatus}
							</Badge>
						</Label>
					</div>
				</div>
				<Separator />
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						<div className='font-medium'>Order Details</div>
						<ul className='grid gap-3'>
							{orderDetails?.cartItems && orderDetails?.cartItems.length > 0
								? orderDetails?.cartItems.map((item) => (
										<li className='flex items-center justify-between'>
											<span>Title: {item.title}</span>
											<span>Quantity: {item.quantity}</span>
											<span>Price: ${item.price}</span>
										</li>
								  ))
								: null}
						</ul>
					</div>
				</div>
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						<div className='font-medium'>Shipping Info</div>
						<div className='grid gap-0.5 text-muted-foreground'>
							<span>{user?.userName}</span>
							<span>{orderDetails?.addressInfo?.address}</span>
							<span>{orderDetails?.addressInfo?.city}</span>
							<span>{orderDetails?.addressInfo?.pincode}</span>
							<span>{orderDetails?.addressInfo?.phone}</span>
							<span>{orderDetails?.addressInfo?.notes}</span>
						</div>
					</div>
				</div>
				<div>
					<CommonForm
						formControls={[
							{
								label: 'Order Status',
								name: 'status',
								componentType: 'select',
								options: [
									{ id: 'pending', label: 'Pending' },
									{ id: 'inProcess', label: 'In Process' },
									{ id: 'inShipping', label: 'In Shipping' },
									{ id: 'delivered', label: 'Delivered' },
									{ id: 'rejected', label: 'Rejected' },
								],
							},
						]}
						formData={formData}
						setFormData={setFormData}
						buttonText={'Update Order Status'}
						onSubmit={handleUpdateStatus}
					/>
				</div>
			</div>
		</DialogContent>
	);
}

export default AdminOrderDetailsView;
