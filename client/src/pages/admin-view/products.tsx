/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import CommonForm from '../../components/common/form';
import { Button } from '../../components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '../../components/ui/sheet';
import { addProductFormElements } from '../../config';

const initialFormData: Record<string, any> = {
	image: null,
	title: '',
	description: '',
	category: '',
	brand: '',
	price: '',
	salePrice: '',
	totalStock: '',
	averageReview: 0,
};

const AdminProducts = () => {
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState(false);
	const [formData, setFormData] = useState(initialFormData);

	const [currentEditedId, setCurrentEditedId] = useState(null);

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
	}

	return (
		<>
			<div className='mb-5 w-full flex justify-end'>
				<Button onClick={() => setOpenCreateProductsDialog(true)}>
					Add New Product
				</Button>
			</div>
			<div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
			<Sheet
				open={openCreateProductsDialog}
				onOpenChange={() => {
					setOpenCreateProductsDialog(false);
					setCurrentEditedId(null);
					setFormData(initialFormData);
				}}
			>
				<SheetContent side='right' className='overflow-auto px-3'>
					<SheetHeader>
						<SheetTitle>
							{currentEditedId !== null ? 'Edit Product' : 'Add New Product'}
						</SheetTitle>
					</SheetHeader>

					<div className='py-6'>
						<CommonForm
							onSubmit={onSubmit}
							formData={formData}
							setFormData={setFormData}
							buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
							formControls={addProductFormElements}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default AdminProducts;
