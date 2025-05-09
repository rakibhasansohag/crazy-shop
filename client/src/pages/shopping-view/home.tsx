import { useEffect, useState } from 'react';

import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
	fetchAllFilteredProducts,
	fetchProductDetails,
} from '../../store/shop/products-slice';
import ShoppingProductTile from '../../components/shopping-view/shopping-product-tile';
import {
	addToCart,
	CartResponse,
	fetchCartItems,
} from '../../store/shop/cart-slice';
import { toast } from 'sonner';
import ProductDetailsDialog from '../../components/shopping-view/product-details';
import { BrandsWithIcon, CategoriesWithIcon } from '../../config';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShoppingHome = () => {
	const slides = [bannerOne, bannerTwo, bannerThree];
	const [currentSlide, setCurrentSlide] = useState(0);
	const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { productDetails, productList } = useSelector(
		(state: RootState) => state.shopProducts,
	);
	const { user } = useSelector((state: RootState) => state.auth);

	console.dir({
		productDetails,
		productList,
		user,
	});

	function handleNavigateToListingPage(
		getCurrentItem: {
			id: string;
		},
		section: string,
	) {
		sessionStorage.removeItem('filters');
		const currentFilter = {
			[section]: [getCurrentItem.id],
		};

		sessionStorage.setItem('filters', JSON.stringify(currentFilter));
		navigate(`/shop/listing`);
	}

	function handleGetProductDetails(getCurrentProductId: string) {
		dispatch(fetchProductDetails(getCurrentProductId));
	}

	const handleAddToCart = (getCurrentProductId: string) => {
		if (!user?.id) {
			toast.error('You must be logged in to add items to cart');
			return;
		}

		dispatch(
			addToCart({
				userId: user?.id,
				productId: getCurrentProductId,
				quantity: 1,
			}),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		).then((data: any) => {
			const payload = data?.payload as CartResponse;

			if (payload?.success) {
				toast.success('Product added to cart successfully');
				dispatch(fetchCartItems({ userId: user.id }));
			} else {
				toast.error(payload?.message || 'Failed to add to cart');
			}
		});
	};

	useEffect(() => {
		if (productDetails !== null) setOpenDetailsDialog(true);
	}, [productDetails]);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
		}, 5000);

		return () => {
			clearInterval(timer);
		};
	}, [slides.length]);

	useEffect(() => {
		dispatch(
			fetchAllFilteredProducts({
				filterParams: {},
				sortParams: 'price_asc',
			}),
		);
	}, [dispatch]);

	return (
		<div className='flex flex-col min-h-screen'>
			<div className='relative w-full h-[600px] overflow-hidden '>
				{slides.map((slide, index) => (
					<img
						src={slide}
						key={index}
						className={` ${
							index === currentSlide ? 'opacity-100' : 'opacity-0'
						} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
						alt={`banner-${index + 1}`}
					/>
				))}
				<Button
					variant='outline'
					size='icon'
					onClick={() =>
						setCurrentSlide(
							(prevSlide) => (prevSlide - 1 + slides.length) % slides.length,
						)
					}
					className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'
				>
					<ChevronLeftIcon className='w-4 h-4' />
				</Button>
				<Button
					variant='outline'
					size='icon'
					onClick={() =>
						setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
					}
					className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
				>
					<ChevronRightIcon className='w-4 h-4' />
				</Button>
			</div>
			<section className='py-12 bg-gray-20'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						Shop By Category
					</h2>
					<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center'>
						{CategoriesWithIcon.map((categoryItem) => (
							<Card
								onClick={() =>
									handleNavigateToListingPage(categoryItem, 'category')
								}
								className='cursor-pointer hover:shadow-lg transition-shadow'
							>
								<CardContent className='flex flex-col items-center justify-center p-6'>
									<categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
									<span className='font-bold'>{categoryItem.label}</span>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Point : TO get Brand */}
			<section className='py-12 bg-gray-50'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
						{BrandsWithIcon.map((brandItem) => (
							<Card
								onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
								className='cursor-pointer hover:shadow-lg transition-shadow'
							>
								<CardContent className='flex flex-col items-center justify-center p-6'>
									<brandItem.icon className='w-12 h-12 mb-4 text-primary' />
									<span className='font-bold'>{brandItem.label}</span>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold text-center mb-8'>
						Feature Products
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{productList && productList.length > 0
							? productList.map((productItem) => (
									<ShoppingProductTile
										handleGetProductDetails={handleGetProductDetails}
										product={productItem}
										handleAddToCart={handleAddToCart}
									/>
							  ))
							: null}
					</div>
				</div>
			</section>
			<ProductDetailsDialog
				openDetailsDialog={openDetailsDialog}
				setOpenDetailsDialog={setOpenDetailsDialog}
				productDetails={productDetails}
				handleAddToCart={handleAddToCart}
			/>
		</div>
	);
};

export default ShoppingHome;
