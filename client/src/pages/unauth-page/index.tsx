import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function UnauthPage() {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className={cn(
				'flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#ff99cc] to-[#ff66b3] px-4 py-12 sm:px-6 lg:px-8',
			)}
		>
			<motion.div
				initial={{ rotateY: -90 }}
				animate={{ rotateY: 0 }}
				exit={{ rotateY: -90 }}
				transition={{ duration: 0.5 }}
			>
				<Card className={cn('max-w-md p-8 shadow-lg bg-white')}>
					<h2 className={cn('mb-4 text-center text-3xl font-bold')}>
						Access Denied
					</h2>
					<p className={cn('mb-8 text-center')}>
						You don't have access to view this page
					</p>
					<Button
						variant='outline'
						className={cn('w-full')}
						onClick={() => navigate('/')}
					>
						Go back
					</Button>
				</Card>
			</motion.div>
		</motion.div>
	);
}

export default UnauthPage;
