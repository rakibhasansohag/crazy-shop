/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import CommonForm from '../../components/common/form';
import { Button } from '../../components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '../../components/ui/sheet';
import { addProductFormElements } from '../../config';
import ProductImageUpload from '../../components/admin-view/image-upload';

const initialFormData: Record<string, any> = {
	image: null as File | null,
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
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState('');
	const [imageLoadingState, setImageLoadingState] = useState(false);
	const [currentEditedId, setCurrentEditedId] = useState(null);

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
	}

	useEffect(() => {
		if (!openCreateProductsDialog) {
			setImageFile(null);
			setUploadedImageUrl('');
		}
	}, [openCreateProductsDialog]);

	return (
		<>
			<div className='mb-5 w-full flex justify-end'>
				<Button onClick={() => setOpenCreateProductsDialog(true)}>
					Add New Product
				</Button>
			</div>
			<div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
				{/* {productList && productList.length > 0
					? productList.map((productItem) => (
							<AdminProductTile
								setFormData={setFormData}
								setOpenCreateProductsDialog={setOpenCreateProductsDialog}
								setCurrentEditedId={setCurrentEditedId}
								product={productItem}
								handleDelete={handleDelete}
							/>
					  ))
					: null} */}
			</div>
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
					<ProductImageUpload
						imageFile={imageFile}
						setImageFile={setImageFile}
						uploadedImageUrl={uploadedImageUrl}
						setUploadedImageUrl={setUploadedImageUrl}
						setImageLoadingState={setImageLoadingState}
						imageLoadingState={imageLoadingState}
						isEditMode={currentEditedId !== null}
					/>
					<div className='py-6'>
						<CommonForm
							onSubmit={onSubmit}
							formData={formData}
							setFormData={setFormData}
							buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
							formControls={addProductFormElements}
							// isBtnDisabled={!isFormValid()}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default AdminProducts;
