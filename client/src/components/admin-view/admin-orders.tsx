import { useEffect, useState } from 'react';
import AdminOrderDetailsView from '../../pages/admin-view/Admin-order-details';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog } from '../ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
	getAllOrdersForAdmin,
	getOrderDetailsForAdmin,
	resetOrderDetails,
} from '../../store/admin/orders-slice';
import { Badge } from '../ui/badge';
import { Order } from '../../types/order';

const AdminOrdersView = () => {
	const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

	const { orderDetails, orderList } = useSelector(
		(state: RootState) => state.adminOrders,
	);

	const dispatch = useDispatch<AppDispatch>();

	function handleFetchOrderDetails(getId: string) {
		dispatch(getOrderDetailsForAdmin(getId));
	}

	useEffect(() => {
		dispatch(getAllOrdersForAdmin());
	}, [dispatch]);

	console.log(orderDetails, 'orderList');

	useEffect(() => {
		if (orderDetails !== null) setOpenDetailsDialog(true);
	}, [orderDetails]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Order History</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Order Date</TableHead>
							<TableHead>Order Status</TableHead>
							<TableHead>Order Price</TableHead>
							<TableHead>
								<span className='sr-only'>Details</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orderList && orderList.length > 0
							? orderList.map((orderItem: Order) => (
									<TableRow>
										<TableCell>{orderItem?._id}</TableCell>
										<TableCell>
											{
												new Date(orderItem?.orderDate)
													.toISOString()
													.split('T')[0]
											}
										</TableCell>
										<TableCell>
											<Badge
												className={`py-1 px-3 ${
													orderItem?.orderStatus === 'confirmed'
														? 'bg-green-500'
														: orderItem?.orderStatus === 'rejected'
														? 'bg-red-600'
														: 'bg-black'
												}`}
											>
												{orderItem?.orderStatus}
											</Badge>
										</TableCell>
										<TableCell>${orderItem?.totalAmount}</TableCell>
										<TableCell>
											<Dialog
												open={openDetailsDialog}
												onOpenChange={() => {
													setOpenDetailsDialog(false);
													dispatch(resetOrderDetails());
												}}
											>
												<Button
													onClick={() =>
														handleFetchOrderDetails(orderItem?._id || '')
													}
												>
													View Details
												</Button>
												{orderDetails && (
													<AdminOrderDetailsView orderDetails={orderDetails} />
												)}
											</Dialog>
										</TableCell>
									</TableRow>
							  ))
							: null}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default AdminOrdersView;
