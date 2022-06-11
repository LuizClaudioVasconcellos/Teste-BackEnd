import { Router } from 'express';
import itemsRouter from '@modules/items/routes/items.routes';
import restaurantsRouter from '@modules/restaurants/routes/restaurants.routes';
import sessionsRouter from '@modules/restaurants/routes/sessions.routes';
import passwordRouter from '@modules/restaurants/routes/password.routes';
import profileRouter from '@modules/restaurants/routes/profile.routes';

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/restaurants', restaurantsRouter);
routes.use('/auth', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
