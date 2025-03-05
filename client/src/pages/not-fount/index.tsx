import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

function NotFound() {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.5 }}
				className='h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
			>
				<div className='text-9xl font-extrabold text-white mb-4'>
					<motion.span
						className='block'
						animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
						transition={{ repeat: Infinity, duration: 2 }}
					>
						404
					</motion.span>
				</div>
				<div className='text-3xl text-white mb-8'>
					<motion.span
						className='block'
						initial={{ y: -20 }}
						animate={{ y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
					>
						Page not found
					</motion.span>
				</div>
				<Button variant='outline' onClick={() => (window.location.href = '/')}>
					Go Home
				</Button>
			</motion.div>
		</AnimatePresence>
	);
}

export default NotFound;
