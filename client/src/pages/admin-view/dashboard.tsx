import ProductImageUpload from '@/components/admin-view/image-upload';
import { Button } from '@/components/ui/button';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { addFeatureImage, getFeatureImages } from '../../store/common-slice';
import { toast } from 'sonner';

function AdminDashboard() {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState('');
	const [imageLoadingState, setImageLoadingState] = useState(false);

	const dispatch = useDispatch<AppDispatch>();
	const { featureImageList } = useSelector(
		(state: RootState) => state.commonFeature,
	);

	console.log(dispatch, 'dispatch');

	function handleUploadFeatureImage() {
		if (!uploadedImageUrl) return;

		dispatch(addFeatureImage(uploadedImageUrl))
			.unwrap()
			.then(() => {
				dispatch(getFeatureImages());
				setImageFile(null);
				setUploadedImageUrl('');
				toast.success('Image uploaded successfully');
			})
			.catch((error) => {
				console.error('Upload failed:', error);
				toast.error(
					error?.message || error || 'Image upload failed. Please try again.',
				);
			});
	}

	useEffect(() => {
		dispatch(getFeatureImages());
	}, [dispatch]);

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

			<div className='flex flex-col gap-4 mt-5'>
				{featureImageList && featureImageList.length > 0
					? featureImageList.map((featureImgItem) => (
							<div className='relative' key={featureImgItem._id}>
								<img
									src={featureImgItem.image}
									className='w-full h-[300px] object-cover rounded-t-lg'
								/>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
}

export default AdminDashboard;
