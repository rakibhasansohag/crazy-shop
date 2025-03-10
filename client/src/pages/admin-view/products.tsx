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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
	addNewProduct,
	deleteProduct,
	editProduct,
	fetchAllProducts,
} from '../../store/admin/products-slice';
import { toast } from 'sonner';
import AdminProductTile from '../../components/admin-view/product-tile';

const initialFormData: Record<string, any> = {
	image: null as File | null,
	title: '',
	description: '',
	category: '',
	brand: '',
	price: 0,
	salePrice: 0,
	totalStock: 0,
	averageReview: 0,
};

const AdminProducts = () => {
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState(false);
	const [formData, setFormData] = useState(initialFormData);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState('');
	const [imageLoadingState, setImageLoadingState] = useState(false);
	const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);

	const { productList } = useSelector(
		(state: RootState) => state.adminProducts,
	);

	const dispatch = useDispatch<AppDispatch>();

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const productData = {
			...formData,
			image: uploadedImageUrl,
			price: Number(formData.price),
			salePrice: Number(formData.salePrice),
			totalStock: Number(formData.totalStock),
		};

		const action = currentEditedId
			? dispatch(editProduct({ id: currentEditedId, formData: productData }))
			: dispatch(addNewProduct(productData));

		action
			.unwrap()
			.then(() => {
				dispatch(fetchAllProducts());
				setFormData(initialFormData);
				setOpenCreateProductsDialog(false);
				setUploadedImageUrl('');
				if (!currentEditedId) toast.success('Product added successfully');
			})
			.catch((error) => {
				toast.error(error.message || 'An error occurred');
			});
	}

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	console.log({
		productList,
		uploadedImageUrl,
	});

	function handleDelete(getCurrentProductId: string) {
		dispatch(deleteProduct(getCurrentProductId)).then((data) => {
			if (data?.payload?.success) {
				dispatch(fetchAllProducts());
				toast.success('Product deleted successfully');
			} else {
				toast.error(
					data?.payload?.message ||
						'An error occurred during deleting the product.',
				);
			}
		});
	}

	function isFormValid() {
		return Object.keys(formData)
			.filter((currentKey) => currentKey !== 'averageReview')
			.map((key) => formData[key] !== '')
			.every((item) => item);
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
				{productList && productList.length > 0
					? productList.map((productItem) => (
							<AdminProductTile
								setFormData={setFormData}
								setOpenCreateProductsDialog={setOpenCreateProductsDialog}
								setCurrentEditedId={setCurrentEditedId}
								product={productItem}
								handleDelete={handleDelete}
							/>
					  ))
					: null}
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
							isBtnDisabled={!isFormValid()}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default AdminProducts;
