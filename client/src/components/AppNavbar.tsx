import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE, ADD_ROUTE } from '../utils/consts';

const AppNavbar = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Container>
				<Nav.Link as={Link} to={MAIN_ROUTE}>
					<Navbar.Brand>QuotesApp</Navbar.Brand>
				</Nav.Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						<Nav.Link as={Link} to={MAIN_ROUTE}>
							Цитаты
						</Nav.Link>
						<Nav.Link as={Link} to={ADD_ROUTE}>
							Добавить цитату
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AppNavbar;
