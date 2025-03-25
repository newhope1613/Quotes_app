import Container from 'react-bootstrap/Container';

const Footer = () => {
	return (
		<footer className='bg-dark text-light py-3 mt-auto'>
			<Container className='text-center'>
				<p className='mb-0'>
					&copy; {new Date().getFullYear()} MyQuotes. Все права защищены.
				</p>
			</Container>
		</footer>
	);
};

export default Footer;
