import ProductImageUpload from '@/components/admin-view/image-upload';
import { Button } from '@/components/ui/button';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useState } from 'react';

function AdminDashboard() {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState('');
	const [imageLoadingState, setImageLoadingState] = useState(false);
	const dispatch = useDispatch<AppDispatch>();

	console.log(dispatch, 'dispatch');

	const handleUploadFeatureImage = () => {};

	return (
		<div>
			<ProductImageUpload
				imageFile={imageFile}
				setImageFile={setImageFile}
				uploadedImageUrl={uploadedImageUrl}
				setUploadedImageUrl={setUploadedImageUrl}
				setImageLoadingState={setImageLoadingState}
				imageLoadingState={imageLoadingState}
				isCustomStyling={true}
				isEditMode={false}
			/>
			<Button onClick={handleUploadFeatureImage} className='mt-5 w-full'>
				Upload
			</Button>
		</div>
	);
}

export default AdminDashboard;
