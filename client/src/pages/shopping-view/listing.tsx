/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpDownIcon } from 'lucide-react';
import ProductFilter, {
	FilterKey,
	Filters,
} from '../../components/shopping-view/filter';
import { Button } from '../../components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { sortOptions } from '../../config';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
	fetchAllFilteredProducts,
	FilterParams,
	SortParams,
} from '../../store/shop/products-slice';
import ShoppingProductTile from './shopping-product-tile';
import { useSearchParams } from 'react-router-dom';

function createSearchParamsHelper(
	filterParams: Record<string, string[]>,
): string {
	const queryParams: string[] = [];

	for (const [key, value] of Object.entries(filterParams)) {
		if (Array.isArray(value) && value.length > 0) {
			const paramValue = value.join(',');
			queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
		}
	}

	console.log(queryParams, 'queryParams');
	return queryParams.join('&');
}

const ShoppingListing = () => {
	// Search Params Realted Hook & State
	const [searchParams, setSearchParams] = useSearchParams();

	// Point: to handle filter
	const [filters, setFilters] = useState<Filters>({
		category: [],
		brand: [],
	});
	const handleFilter = (getSectionId: FilterKey, getCurrentOption: string) => {
		const copyFilter = { ...filters };

		// Check if section exists, otherwise initialize
		if (!copyFilter[getSectionId]) {
			copyFilter[getSectionId] = [getCurrentOption];
		} else {
			const indexOfCurrentOption =
				copyFilter[getSectionId].indexOf(getCurrentOption);

			if (indexOfCurrentOption === -1) {
				copyFilter[getSectionId].push(getCurrentOption);
			} else {
				copyFilter[getSectionId].splice(indexOfCurrentOption, 1);
			}
		}

		setFilters(copyFilter);
		sessionStorage.setItem('filters', JSON.stringify(copyFilter));
		console.log(getSectionId, getCurrentOption);
	};

	// Point:  TO handle sort
	const [sort, setSort] = useState<string | null>(null);
	const handleSort = (value: string) => {
		setSort(value);
	};

	// Point: TO get and fetch shop product
	const dispatch = useDispatch<AppDispatch>();
	const { productList } = useSelector((state: RootState) => state.shopProducts);

	useEffect(() => {
		if (filters !== null && sort !== null)
			dispatch(
				fetchAllFilteredProducts({
					filterParams: filters as FilterParams,
					sortParams: sort as SortParams,
				}),
			);
	}, [dispatch, filters, sort]);

	console.log(productList, 'productList');

	// to handle filter
	const handleGetProductDetails = () => {};

	const handleAddToCart = () => {};

	// Point:   all the use effect logic
	useEffect(() => {
		setSort('price-lowtohigh');
		setFilters(
			typeof sessionStorage.getItem('filters') === 'string'
				? JSON.parse(sessionStorage.getItem('filters')!)
				: {},
		);
	}, []);

	//
	useEffect(() => {
		if (filters && Object.keys(filters).length > 0) {
			const createQueryString = createSearchParamsHelper(filters);
			setSearchParams(new URLSearchParams(createQueryString));
		}
	}, [filters]);

	return (
		<div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
			<ProductFilter handleFilter={handleFilter} filters={filters} />

			<div className='bg-background w-full rounded-lg shadow-sm'>
				<div className='p-4 border-b flex items-center justify-between'>
					<h2 className='text-lg font-extrabold'>All Products</h2>
					<div className='flex items-center gap-3'>
						<span className='text-muted-foreground'>
							{/* {productList?.length} Products */}
						</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									size='sm'
									className='flex items-center gap-1'
								>
									<ArrowUpDownIcon className='h-4 w-4' />
									<span>Sort by</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-[200px]'>
								<DropdownMenuRadioGroup
									value={sort ?? 'price-lowtohigh'}
									onValueChange={handleSort}
								>
									{sortOptions.map((sortItem) => (
										<DropdownMenuRadioItem
											value={sortItem.id}
											key={sortItem.id}
										>
											{sortItem.label}
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
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
	);
};

export default ShoppingListing;
