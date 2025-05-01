import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

function PaymentSuccessPage() {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ scale: 0.95, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 120 }}
			className='max-w-md mx-auto mt-20'
		>
			<Card className='shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-r from-green-100/20 to-emerald-100/20' />
				<CardHeader className='flex flex-col items-center text-center space-y-6 py-12 relative'>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: 'spring', delay: 0.2 }}
						className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-12 w-12 text-green-600'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<motion.path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
								initial={{ pathLength: 0 }}
								animate={{ pathLength: 1 }}
								transition={{ duration: 0.5, delay: 0.5 }}
							/>
						</svg>
					</motion.div>

					<CardTitle className='text-3xl font-bold text-green-700'>
						Payment Successful!
					</CardTitle>
					<p className='text-gray-600 px-6'>
						Thank you for your purchase! Your order is being processed.
					</p>

					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='w-full mt-6'
					>
						<Button
							onClick={() => navigate('/shop/account')}
							className='w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg'
						>
							View Orders
						</Button>
					</motion.div>
				</CardHeader>
			</Card>
		</motion.div>
	);
}

export default PaymentSuccessPage;
