import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/auth-slice';
import { toast } from 'sonner';

import type { AppDispatch } from '../../store/store';

const AuthRegister = () => {
	const initialState: Record<string, string> = {
		userName: '',
		email: '',
		password: '',
	};

	const [formData, setFormData] = useState(initialState);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		dispatch(registerUser(formData as any))
			.unwrap()
			.then((payload) => {
				if (!payload.success) return toast.error(payload.message);
				toast.success(payload.message);
				navigate('/auth/login');
			})
			.catch((error: { message?: string }) => {
				// console.log(error);
				return toast.error(
					error.message || 'An error occurred during registration.',
				);
			});
	}

	return (
		<div className='mx-auto w-full max-w-md space-y-6'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				<motion.h1
					className=' text-center text-3xl font-bold text-foreground tracking-tight'
					initial={{ x: -100 }}
					animate={{ x: 0 }}
					exit={{ x: 100 }}
					transition={{ duration: 0.5 }}
				>
					Create a new account
				</motion.h1>
				<motion.p
					className='mt-2 text-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
				>
					Already have an account?{' '}
					<Link
						to='/auth/login'
						className='font-medium text-primary hover:underline ml-1'
					>
						Login
					</Link>{' '}
				</motion.p>
			</motion.div>
			<AnimatePresence>
				<motion.div
					key='register-form'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<CommonForm
						formControls={registerFormControls}
						buttonText='Sign Up'
						formData={formData}
						setFormData={setFormData}
						onSubmit={onSubmit}
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default AuthRegister;
