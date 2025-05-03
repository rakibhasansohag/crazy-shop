import { useDispatch, useSelector } from 'react-redux';
import { DialogContent } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { AppDispatch, RootState } from '../../store/store';
import CommonForm from '../../components/common/form';
import { useState } from 'react';
import { Order } from '../../types/order';
import {
	getAllOrdersForAdmin,
	getOrderDetailsForAdmin,
	updateOrderStatus,
} from '../../store/admin/orders-slice';
import { toast } from 'sonner';

type FormData = {
	status: string;
};

const initialFormData: FormData = {
	status: '',
};

export type OrderDataCreateProps = {
	orderDetails: Order;
};

function AdminOrderDetailsView({ orderDetails }: OrderDataCreateProps) {
	const [formData, setFormData] = useState(initialFormData);

	const { user } = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch<AppDispatch>();

	function handleUpdateStatus(event: { preventDefault: () => void }) {
		event.preventDefault();
		const { status } = formData;

		dispatch(
			updateOrderStatus({ id: orderDetails?._id || '', orderStatus: status }),
		).then((data) => {
			if (data?.meta?.requestStatus === 'fulfilled') {
				dispatch(getOrderDetailsForAdmin(orderDetails?._id || ''));
				dispatch(getAllOrdersForAdmin()); 
				setFormData(initialFormData);
				toast.success('Order status updated successfully');
			}
		});
	}

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
						<Label>
							{new Date(orderDetails?.orderDate).toISOString().split('T')[0]}
						</Label>
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
					{/* TODO : for the select component use the initial form form the api or from the first step of the status if the status is on process than show  first step if seconds step than show the second step form the get go  */}
					<CommonForm
						formControls={[
							{
								label:
									formData && formData.status
										? formData.status
										: 'Select Status',
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
