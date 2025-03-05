import { Route, Routes } from 'react-router-dom';

import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';

function App() {
	return (
		<div className='flex flex-col overflow-hidden bg-white'>
			{/* Point: all the common components goes here */}
			<Routes>
				<Route path='/auth' element={<AuthLayout />}>
					<Route path='login' element={<AuthLogin />} />
					<Route path='register' element={<AuthRegister />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
