import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Loading = () => {
	const cartControls = useAnimation();
	const products = [
		{ id: 1, name: 'earphone', color: 'bg-blue-500' },
		{ id: 2, name: 'Phone', color: 'bg-green-500' },
		{ id: 3, name: 'Laptop', color: 'bg-purple-500' },
		{ id: 4, name: 'Watch', color: 'bg-yellow-500' },
		{ id: 5, name: 'Camera', color: 'bg-red-500' },
	];

	useEffect(() => {
		const sequence = async () => {
			// Start cart animation
			cartControls.start({
				y: [0, -10, 0],
				transition: {
					duration: 1,
					repeat: Infinity,
					repeatType: 'reverse',
					ease: 'easeInOut',
				},
			});
		};

		sequence();
	}, [cartControls]);

	return (
		<div className='flex items-center justify-center w-full h-screen bg-gray-100'>
			<div className='relative w-full max-w-md px-6'>
				<h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>
					Adding Items to Cart...
				</h2>

				{/* Products that will animate */}
				{products.map((product, index) => (
					<motion.div
						key={product.id}
						className={`absolute top-20 right-0 w-16 h-16 ${product.color} rounded-lg shadow-lg flex items-center justify-center`}
						initial={{ x: 400, y: 50, opacity: 0, scale: 0.5 }}
						animate={{
							x: [400, 0, 0, 0],
							y: [50, 0, 0, -100],
							opacity: [0, 1, 1, 0],
							scale: [0.5, 1.2, 0.8, 0.5],
						}}
						transition={{
							duration: 2,
							times: [0, 0.3, 0.7, 1],
							ease: 'easeInOut',
							delay: index * 1.5,
							repeat: Infinity,
							repeatDelay: products.length * 1.5 - 1,
						}}
					>
						<span className='text-white text-xs font-medium'>
							{product.name}
						</span>
					</motion.div>
				))}

				{/* Shopping cart */}
				<motion.div
					animate={cartControls}
					className='mx-auto w-32 h-32 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-2 relative overflow-hidden'
				>
					{/* Cart handle */}
					<div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-6 border-2 border-gray-300 rounded-t-full border-b-0'></div>

					{/* Cart body */}
					<div className='w-full h-full bg-gray-50 rounded flex items-center justify-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-12 w-12 text-gray-400'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={1.5}
								d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
							/>
						</svg>
					</div>
				</motion.div>

				{/* Loading spinner */}
				<div className='mt-8 flex justify-center'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800'></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
