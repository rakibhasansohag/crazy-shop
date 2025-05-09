import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductDetailsDialog from '@/components/shopping-view/product-details';

import { Input } from '@/components/ui/input';

import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { fetchProductDetails } from '@/store/shop/products-slice';
import {
	getSearchResults,
	resetSearchResults,
} from '@/store/shop/search-slice';
import { AppDispatch, RootState } from '../../store/store';
import { toast } from 'sonner';
import ShoppingProductTile from '../../components/shopping-view/shopping-product-tile';
import { Product } from '../../store/admin/products-slice';
 
function SearchProducts() {
	const [keyword, setKeyword] = useState('');
	const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch<AppDispatch>();

	console.log(searchParams, 'searchParams');

	// Selectors with proper typing
	const { searchResults } = useSelector((state: RootState) => state.shopSearch);
	const { productDetails } = useSelector(
		(state: RootState) => state.shopProducts,
	);
	const { cartItems } = useSelector((state: RootState) => state.shopCart);
	const { user } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		const searchDelay = setTimeout(() => {
			if (keyword.trim().length > 2) {
				setSearchParams({ keyword });
				dispatch(getSearchResults(keyword));
			} else {
				setSearchParams({ keyword: '' });
				dispatch(resetSearchResults());
			}
		}, 500);

		return () => clearTimeout(searchDelay);
	}, [keyword, dispatch, setSearchParams]);

	const handleAddToCart = (productId: string, totalStock: number) => {
		const existingItem = cartItems.find((item) => item.productId === productId);

		if (existingItem && existingItem.quantity >= totalStock) {
			toast.error('You have reached the maximum quantity');
			return;
		}

		dispatch(
			addToCart({
				userId: user?.id || '',
				productId,
				quantity: 1,
			}),
		)
			.unwrap()
			.then(() => {
				dispatch(fetchCartItems({ userId: user?.id || '' }));
				toast.success('Product added to cart successfully');
			})
			.catch((error) => {
				toast.error(error.message || 'An error occurred');
			});
	};

	const handleGetProductDetails = (productId: string) => {
		dispatch(fetchProductDetails(productId));
	};

	useEffect(() => {
		if (productDetails) setOpenDetailsDialog(true);
	}, [productDetails]);

	return (
		<div className='container mx-auto md:px-6 px-4 py-8'>
			<div className='flex justify-center mb-8'>
				<div className='w-full max-w-2xl'>
					<Input
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						className='py-6 text-lg'
						placeholder='Search products...'
					/>
				</div>
			</div>

			{searchResults.length === 0 && keyword.trim().length > 2 && (
				<h1 className='text-2xl text-center text-muted-foreground'>
					No results found for "{keyword}"
				</h1>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
				{searchResults.map((item: Product) => (
					<ShoppingProductTile
						key={item._id}
						product={item}
						handleAddToCart={() => handleAddToCart(item._id, item?.totalStock)}
						handleGetProductDetails={() => handleGetProductDetails(item._id)}
					/>
				))}
			</div>

			<ProductDetailsDialog
				openDetailsDialog={openDetailsDialog}
				setOpenDetailsDialog={setOpenDetailsDialog}
				productDetails={productDetails}
				handleAddToCart={handleAddToCart}
			/>
		</div>
	);
}

export default SearchProducts;
