import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '../../components/common/form';
import { registerFormControls } from '../../config';

const AuthRegister = () => {
	const initialState: Record<string, string> = {
		userName: '',
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
					Create a new account
				</h1>
				<p className='mt-2'>
					Already have an account?{' '}
					<Link
						to='/auth/login'
						className='font-medium text-primary hover:underline ml-1'
					>
						Login
					</Link>{' '}
				</p>
			</div>
			<CommonForm
				formControls={registerFormControls}
				buttonText='Sign Up'
				formData={formData}
				setFormData={setFormData}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default AuthRegister;
