import { motion } from 'framer-motion';

import { Leaf, Package } from 'lucide-react';
import { Button } from '../../components/ui/button';

const NoProducts = ({ onAddNew }: { onAddNew: () => void }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'
		>
			<motion.div
				initial={{ scale: 0.5 }}
				animate={{ scale: 1 }}
				transition={{ type: 'spring', stiffness: 100 }}
				className='mb-8 relative'
			>
				<div className='absolute inset-0 bg-primary/10 rounded-full blur-[60px] animate-pulse' />
				<motion.div
					animate={{
						rotate: [0, -5, 5, -5, 0],
						y: [0, -10, 10, -10, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
					className='relative z-10'
				>
					<Package
						className='h-24 w-24 text-primary mx-auto'
						strokeWidth={1.5}
					/>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				<h2 className='text-3xl font-bold tracking-tight mb-4'>
					No Products Found
				</h2>
				<p className='text-muted-foreground mb-8 max-w-md mx-auto'>
					It looks like your store is empty. Start by adding your first product
					to showcase to your customers.
				</p>
			</motion.div>

			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<Button onClick={onAddNew} size='lg' className='gap-2'>
					<Leaf className='w-4 h-4' />
					Add First Product
				</Button>
			</motion.div>
		</motion.div>
	);
};

export default NoProducts;
