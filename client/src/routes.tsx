import { MAIN_ROUTE, ADD_ROUTE } from './utils/consts';
import AddQuote from './pages/AddQuote';
import Quotes from './pages/Quotes';

export const publicRoutes = [
	{
		path: MAIN_ROUTE,
		Component: Quotes,
	},
	{
		path: ADD_ROUTE,
		Component: AddQuote,
	},
];
