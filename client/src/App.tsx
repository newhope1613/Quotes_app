import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import AppRouter from './AppRouter';
import './App.css';

function App() {
	return (
		<div className='d-flex flex-column min-vh-100'>
			<AppNavbar />
			<div className='flex-grow-1'>
				<AppRouter />
			</div>
			<Footer />
		</div>
	);
}

export default App;
