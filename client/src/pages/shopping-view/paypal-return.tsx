import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { capturePayment } from '@/store/shop/order-slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { motion } from 'framer-motion';

function PaypalReturnPage() {
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const paymentId = params.get('paymentId');
	const payerId = params.get('PayerID');

	useEffect(() => {
		if (paymentId && payerId) {
			const raw = sessionStorage.getItem('currentOrderId');
			const orderId = raw ? JSON.parse(raw) : null;

			console.log({
				paymentId,
				payerId,
				orderId,
			});

			dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
				if (data?.meta?.requestStatus === 'fulfilled') {
					sessionStorage.removeItem('currentOrderId');
					window.location.href = '/shop/payment-success';
				}
			});
		}
	}, [paymentId, payerId, dispatch]);

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200'>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.6, ease: 'easeInOut' }}
			>
				<Card className='w-[350px] shadow-xl border-2 border-white/40 bg-white/80 backdrop-blur-sm rounded-2xl'>
					<CardHeader className='text-center'>
						<CardTitle className='text-xl font-bold text-purple-700 animate-pulse'>
							Processing Payment...
						</CardTitle>
						<p className='text-sm text-gray-600 mt-2'>Please wait!</p>
					</CardHeader>
				</Card>
			</motion.div>
		</div>
	);
}

export default PaypalReturnPage;
