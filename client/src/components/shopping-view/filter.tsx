import { filterOptions } from '@/config';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

type FilterKey = keyof typeof filterOptions;
type FilterOption = { id: string; label: string };

type Filters = {
	[K in FilterKey]?: string[];
};

type Props = {
	filters: Filters;
	handleFilter: (key: FilterKey, id: string) => void;
};

function ProductFilter({ filters, handleFilter }: Props) {
	return (
		<div className='bg-background rounded-lg shadow-sm'>
			<div className='p-4 border-b'>
				<h2 className='text-lg font-extrabold'>Filters</h2>
			</div>
			<div className='p-4 space-y-4'>
				{(Object.keys(filterOptions) as FilterKey[]).map((keyItem) => (
					<div key={keyItem}>
						<div>
							<h3 className='text-base font-bold capitalize'>{keyItem}</h3>
							<div className='grid gap-2 mt-2'>
								{filterOptions[keyItem].map((option: FilterOption) => (
									<Label
										key={option.id}
										className='flex font-medium items-center gap-2'
									>
										<Checkbox
											checked={Boolean(filters[keyItem]?.includes(option.id))}
											onCheckedChange={() => handleFilter(keyItem, option.id)}
										/>
										{option.label}
									</Label>
								))}
							</div>
						</div>
						<Separator className='my-4' />
					</div>
				))}
			</div>
		</div>
	);
}

export default ProductFilter;
