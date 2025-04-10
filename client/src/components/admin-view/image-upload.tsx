import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner';

type ProductImageUploadProps = {
	imageFile: File | null;
	setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
	imageLoadingState: boolean;
	uploadedImageUrl: string;
	setUploadedImageUrl: React.Dispatch<React.SetStateAction<string>>;
	setImageLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
	isEditMode: boolean;
	isCustomStyling?: boolean;
};

function ProductImageUpload({
	imageFile,
	setImageFile,
	imageLoadingState,
	uploadedImageUrl,
	setUploadedImageUrl,
	setImageLoadingState,
	isEditMode,
	isCustomStyling = false,
}: ProductImageUploadProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	console.log(isEditMode, 'isEditMode', uploadedImageUrl);

	function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		console.log(event.target.files, 'event.target.files');
		const selectedFile = event.target.files?.[0];
		console.log(selectedFile);

		if (selectedFile) setImageFile(selectedFile);
	}

	function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
	}

	function handleDrop(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
		const droppedFile = event.dataTransfer.files?.[0];
		if (droppedFile) setImageFile(droppedFile);
	}

	function handleRemoveImage() {
		setImageFile(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	}

	// async function uploadImageToCloudinary() {
	// 	setImageLoadingState(true);
	// 	try {
	// 		const data = new FormData();
	// 		data.append('crazy_shop', imageFile as Blob);

	// 		console.log('Uploading file:', imageFile);
	// 		const response = await axios.post(
	// 			'http://localhost:4000/api/admin/products/upload-image',
	// 			data,
	// 			{
	// 				headers: {
	// 					'Content-Type': 'multipart/form-data',
	// 				},
	// 			},
	// 		);
	// 		console.log(response);
	// 		if (response?.data?.success) {
	// 			setUploadedImageUrl(response?.data?.result);
	// 			setImageLoadingState(false);
	// 			toast.success('Image uploaded successfully.');
	// 		} else {
	// 			throw new Error(response.data.message || 'Upload failed');
	// 		}
	// 	} catch (error) {
	// 		console.error('Upload error:', error);
	// 		setImageLoadingState(false);

	// 		toast.error('Image upload failed. Please try again.');
	// 	}
	// }

	async function uploadImageToCloudinary() {
		setImageLoadingState(true);
		try {
			const data = new FormData();
			data.append('crazy_shop', imageFile as Blob);

			const response = await axios.post(
				'http://localhost:4000/api/admin/products/upload-image',
				data,
				{ headers: { 'Content-Type': 'multipart/form-data' } },
			);

			if (response?.data?.success) {
				// ONLY STORE THE SECURE URL
				setUploadedImageUrl(response.data.result.secure_url);
				setImageLoadingState(false);
				toast.success('Image uploaded successfully.');
			}
		} catch (error) {
			console.log(error);
			setImageLoadingState(false);
			toast.error('Image upload failed. Please try again.');
		}
	}

	useEffect(() => {
		if (imageFile !== null) uploadImageToCloudinary();
	}, [imageFile]);

	return (
		<div
			className={`w-full  mt-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}
		>
			<Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className={`${
					isEditMode ? 'opacity-60' : ''
				} border-2 border-dashed rounded-lg p-4`}
			>
				<Input
					id='image-upload'
					type='file'
					className='hidden'
					ref={inputRef}
					onChange={handleImageFileChange}
					disabled={isEditMode}
				/>
				{!imageFile ? (
					<Label
						htmlFor='image-upload'
						className={`${
							isEditMode ? 'cursor-not-allowed' : ''
						} flex flex-col items-center justify-center h-32 cursor-pointer`}
					>
						<UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
						<span>Drag & drop or click to upload image</span>
					</Label>
				) : imageLoadingState ? (
					<Skeleton className='h-10 bg-gray-100' />
				) : (
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							<FileIcon className='w-8 text-primary mr-2 h-8' />
						</div>
						<p className='text-sm font-medium'>{imageFile.name}</p>
						<Button
							variant='ghost'
							size='icon'
							className='text-muted-foreground hover:text-foreground'
							onClick={handleRemoveImage}
						>
							<XIcon className='w-4 h-4' />
							<span className='sr-only'>Remove File</span>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ProductImageUpload;
