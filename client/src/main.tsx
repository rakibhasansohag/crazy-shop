import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App.tsx';
import store from './store/store.ts';
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
			<Toaster
				position='top-center'
				toastOptions={{
					className: 'sonner',
					duration: 3000,
					style: {
						background: '#1f2937',
						color: '#fff',
					},
				}}
			/>
		</Provider>
	</BrowserRouter>,
);
