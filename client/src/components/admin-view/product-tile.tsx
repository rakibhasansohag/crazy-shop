/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Product } from '../../store/admin/products-slice';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog';

type AdminProductTileProps = {
	product: Product;
	setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
	setOpenCreateProductsDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentEditedId: React.Dispatch<React.SetStateAction<string | null>>;
	handleDelete: (id: string) => void;
};

function AdminProductTile({
	product,
	setFormData,
	setOpenCreateProductsDialog,
	setCurrentEditedId,
	handleDelete,
}: AdminProductTileProps) {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	return (
		<Card className='w-full max-w-sm mx-auto'>
			<div>
				<div className='relative'>
					<img
						src={product?.image}
						alt={product?.title}
						className='w-full h-[300px] object-cover rounded-t-lg'
					/>
				</div>
				<CardContent>
					<h2 className='text-xl font-bold mb-2 mt-2'>{product?.title}</h2>
					<div className='flex justify-between items-center mb-2'>
						<span
							className={`${
								product?.salePrice > 0 ? 'line-through' : ''
							} text-lg font-semibold text-primary`}
						>
							${product?.price}
						</span>
						{product?.salePrice > 0 ? (
							<span className='text-lg font-bold'>${product?.salePrice}</span>
						) : null}
					</div>
				</CardContent>
				<CardFooter className='flex justify-between items-center'>
					<Button
						onClick={() => {
							setOpenCreateProductsDialog(true);
							setCurrentEditedId(product?._id);
							setFormData(product);
						}}
					>
						Edit
					</Button>

					<AlertDialog
						open={showDeleteDialog}
						onOpenChange={setShowDeleteDialog}
					>
						<AlertDialogTrigger asChild>
							<Button variant='destructive' className='text-white'>
								Delete
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will permanently delete the
									product and remove its data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={() => handleDelete(product._id)}
									className='bg-destructive text-white hover:bg-destructive/90 '
								>
									Confirm Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</CardFooter>
			</div>
		</Card>
	);
}

export default AdminProductTile;
