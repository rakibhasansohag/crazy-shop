import ProductFilter from '../../components/shopping-view/filter';

const ShoppingListing = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
			<ProductFilter handleFilter={() => {}} filters={{}} />
		</div>
	);
};

export default ShoppingListing;
