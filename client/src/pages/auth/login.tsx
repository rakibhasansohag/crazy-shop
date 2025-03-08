import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/form';
import { loginFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { loginUser } from '../../store/auth-slice';
import { toast } from 'sonner';

const AuthLogin = () => {
	const initialState: Record<string, string> = {
		email: '',
		password: '',
	};
	const dispatch = useDispatch<AppDispatch>();

	const [formData, setFormData] = useState(initialState);

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		dispatch(loginUser(formData as any))
			.unwrap()
			.then((payload) => {
				if (!payload.success) return toast.error(payload.message);
				toast.success(payload.message);
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
			<div className='text-center'>
				<h1 className='text-3xl font-bold text-foreground tracking-tight'>
					Login to your account
				</h1>
				<p className='mt-2'>
					Don't have an account?{' '}
					<Link
						to='/auth/register'
						className='font-medium text-primary hover:underline ml-1'
					>
						Sign Up
					</Link>{' '}
				</p>
			</div>
			<CommonForm
				formControls={loginFormControls}
				buttonText='Login'
				formData={formData}
				setFormData={setFormData}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default AuthLogin;
