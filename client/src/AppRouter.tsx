import { publicRoutes } from './routes';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
	return (
		<div>
			<Routes>
				{publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			</Routes>
		</div>
	);
};

export default AppRouter;
