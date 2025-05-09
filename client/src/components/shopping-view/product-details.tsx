import { StarIcon } from 'lucide-react';
import { Product } from '../../store/admin/products-slice';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setProductDetails } from '../../store/shop/products-slice';
import StarRatingComponent from '../common/star-rating';
import { useState } from 'react';

type ProductDetailsDialogProps = {
	openDetailsDialog: boolean;
	setOpenDetailsDialog: (open: boolean) => void;
	handleAddToCart: (productId: string, totalStock: number) => void;
	productDetails: Product | null;
};

const ProductDetailsDialog = ({
	openDetailsDialog,
	setOpenDetailsDialog,
	productDetails,
	handleAddToCart,
}: ProductDetailsDialogProps) => {
	const [reviewMsg, setReviewMsg] = useState('');
	const [rating, setRating] = useState(0);
	const dispatch = useDispatch<AppDispatch>();

	// close dialog from outside
	const handleDialogClose = () => {
		setOpenDetailsDialog(false);
		dispatch(setProductDetails());
	};

	const handleRatingChange = (newRating: number) => {
		console.log(newRating, 'newRating');
		setRating(newRating);
	};

	return (
		<Dialog open={openDetailsDialog} onOpenChange={handleDialogClose}>
			<DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] '>
				<div className='relative overflow-hidden rounded-lg bg-muted'>
					<img
						src={productDetails?.image}
						alt={productDetails?.title}
						className='w-full h-full object-cover aspect-square'
						width={600}
						height={600}
					/>
				</div>
				<div className='space-y-4'>
					<div>
						<h1 className='3xl font-extrabold'>{productDetails?.title}</h1>
						<p className='text-muted-foreground text-2xl'>
							{productDetails?.description}
						</p>
					</div>
					<div className='flex items-center justify-between'>
						<p
							className={`text-3xl font-bold text-primary ${
								productDetails?.salePrice && productDetails?.salePrice > 0
									? 'line-through'
									: ''
							}`}
						>
							${productDetails?.price}
						</p>
						{productDetails?.salePrice && productDetails?.salePrice > 0 ? (
							<p className='text-2xl font-bold text-muted-foreground'>
								${productDetails?.salePrice}
							</p>
						) : null}
					</div>

					{/* Point :  Afverage rating */}
					<div className='flex items center gap-2 '>
						<div className='flex gap-1 items-center'>
							<StarIcon className='w-5 h-5 fill-primary' />
							<StarIcon className='w-5 h-5 fill-primary' />
							<StarIcon className='w-5 h-5 fill-primary' />
							<StarIcon className='w-5 h-5 fill-primary' />
							<StarIcon className='w-5 h-5 fill-primary' />
						</div>
						<span className='text-muted-foreground'>(4.58)</span>
					</div>

					{/* Point : to handle add to cart */}
					<div className='mt-5 mb-5'>
						{productDetails?.totalStock === 0 ? (
							<Button className='w-full opacity-60 cursor-not-allowed'>
								Out of Stock
							</Button>
						) : (
							<Button
								className='w-full'
								onClick={() =>
									// /TODO : need to update the hanlde cart error handling if the stock is finished added an error message
									handleAddToCart(
										productDetails?._id as string,
										productDetails?.totalStock as number,
									)
								}
							>
								Add to Cart
							</Button>
						)}
					</div>
					{/* TODO  : Review and rating  */}
					<Separator className='my-10' />
					<div className='max-h-[300px] overflow-auto'>
						<h2 className='text-xl font-bold mb-4'>Reviews</h2>
						<div className='grid gap-6 '>
							<div className='flex gap-4'>
								<Avatar className='w-10 h-10 border'>
									<AvatarFallback>RS</AvatarFallback>
								</Avatar>
								<div className='grid gap-1.5'>
									<div className='flex gap-2 items-center'>
										<h3 className='font-bold leading-none'>
											Rakib Hasan Sohag
										</h3>
									</div>
									<div className='flex gap-1 items-center'>
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
									</div>
									<p className='text-muted-foreground'>This is a nice proect</p>
								</div>
							</div>
							<div className='flex gap-4'>
								<Avatar className='w-10 h-10 border'>
									<AvatarFallback>RS</AvatarFallback>
								</Avatar>
								<div className='grid gap-1.5'>
									<div className='flex gap-2 items-center'>
										<h3 className='font-bold leading-none'>
											Rakib Hasan Sohag
										</h3>
									</div>
									<div className='flex gap-1 items-center'>
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
									</div>
									<p className='text-muted-foreground'>This is a nice proect</p>
								</div>
							</div>
							<div className='flex gap-4'>
								<Avatar className='w-10 h-10 border'>
									<AvatarFallback>RS</AvatarFallback>
								</Avatar>
								<div className='grid gap-1.5'>
									<div className='flex gap-2 items-center'>
										<h3 className='font-bold leading-none'>
											Rakib Hasan Sohag
										</h3>
									</div>
									<div className='flex gap-1 items-center'>
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
										<StarIcon className='w-5 h-5 fill-primary' />
									</div>
									<p className='text-muted-foreground'>This is a nice proect</p>
								</div>
							</div>
						</div>

						{/* Point : to handle add review */}
						<div className='mt-10 flex-col flex gap-2'>
							<Label>Write a review</Label>
							<div className='flex gap-1'>
								<StarRatingComponent
									rating={rating}
									handleRatingChange={handleRatingChange}
								/>
							</div>
							<Input
								value={reviewMsg}
								onChange={(event) => setReviewMsg(event.target.value)}
								name='reviewMsg'
								placeholder='Write a review...'
							/>
							<Button>Submit</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProductDetailsDialog;
