import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/form';
import { loginFormControls } from '@/config';

const AuthLogin = () => {
	const initialState: Record<string, string> = {
		email: '',
		password: '',
	};

	const [formData, setFormData] = useState(initialState);

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		return console.log(formData);
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
