import { Router } from 'express';
const routes = Router();
import QuoteController from '../controllers/quoteController.js';

routes.get('/random', QuoteController.getOne);
routes.get('/all', QuoteController.getAll);
routes.post('/', QuoteController.create);
routes.delete('/:id', QuoteController.delete);

export default routes;
