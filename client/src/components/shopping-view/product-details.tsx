import { Product } from '../../store/admin/products-slice';
import { Dialog, DialogContent } from '../ui/dialog';

type ProductDetailsDialogProps = {
	openDetailsDialog: boolean;
	setOpenDetailsDialog: (open: boolean) => void;

	productDetails: Product | null;
};

const ProductDetailsDialog = ({
	openDetailsDialog,
	setOpenDetailsDialog,
	productDetails,
}: ProductDetailsDialogProps) => {
	return (
		<Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
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
				<div className='grid gap-6'>
					<div>
						<h1 className='3xl font-extrabold'>{productDetails?.title}</h1>
						<p className='text-muted-foreground'>
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
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProductDetailsDialog;
