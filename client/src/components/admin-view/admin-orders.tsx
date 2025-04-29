import { useState } from 'react';
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

const AdminOrdersView = () => {
	const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

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
						<TableRow>
							<TableCell>565</TableCell>
							<TableCell>4256534</TableCell>
							<TableCell>42654634</TableCell>
							<TableCell>586</TableCell>
							<TableCell>
								<Dialog
									open={openDetailsDialog}
									onOpenChange={() => {
										setOpenDetailsDialog(false);
									}}
								>
									<Button
										onClick={() => {
											setOpenDetailsDialog(true);
										}}
									>
										View Details
									</Button>
									<AdminOrderDetailsView />
								</Dialog>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default AdminOrdersView;
