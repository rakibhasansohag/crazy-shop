import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';

const AdminOrders = () => {
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
							<TableCell>fdf</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default AdminOrders;
