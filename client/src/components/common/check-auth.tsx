import { Navigate, useLocation } from 'react-router-dom';

interface CheckAuthProps {
	isAuthenticated: boolean;
	user: {
		role: string;
	} | null;
	children: React.ReactNode;
}

/**
 * A component that checks if the user is authenticated and redirects
 * them to the right page. If the user is not authenticated, they will
 * be redirected to the login page. If the user is authenticated, they
 * will be redirected to the home page based on their role. If the user
 * is trying to access a page that they don't have access to, they will
 * be redirected to the unauth-page.
 *
 * @param {boolean} isAuthenticated - Whether the user is authenticated.
 * @param {{ role: string } | null} user - The user object with their role.
 * @param {React.ReactNode} children - The children of the component.
 * @returns {React.ReactElement} A React element that will be rendered.
 */
function CheckAuth({ isAuthenticated, user, children }: CheckAuthProps) {
	const location = useLocation();

	console.log(location.pathname, isAuthenticated);

	if (location.pathname === '/') {
		if (!isAuthenticated) {
			return <Navigate to='/auth/login' />;
		} else {
			if (user?.role === 'admin') {
				return <Navigate to='/admin/dashboard' />;
			} else {
				return <Navigate to='/shop/home' />;
			}
		}
	}

	if (
		!isAuthenticated &&
		!(
			location.pathname.includes('/login') ||
			location.pathname.includes('/register')
		)
	) {
		return <Navigate to='/auth/login' />;
	}

	if (
		isAuthenticated &&
		(location.pathname.includes('/login') ||
			location.pathname.includes('/register'))
	) {
		if (user?.role === 'admin') {
			return <Navigate to='/admin/dashboard' />;
		} else {
			return <Navigate to='/shop/home' />;
		}
	}

	if (
		isAuthenticated &&
		user?.role !== 'admin' &&
		location.pathname.includes('admin')
	) {
		return <Navigate to='/unauth-page' />;
	}

	if (
		isAuthenticated &&
		user?.role === 'admin' &&
		location.pathname.includes('shop')
	) {
		return <Navigate to='/admin/dashboard' />;
	}

	return <>{children}</>;
}

export default CheckAuth;
