import { Button } from './components/ui/button';

function App() {
	return (
		<>
			<div>
				<h1 className='text-3xl font-bold text-red-500'>
					Hello World {new Date().toLocaleString()}
				</h1>
				<Button>Hello js</Button>
			</div>
		</>
	);
}

export default App;
