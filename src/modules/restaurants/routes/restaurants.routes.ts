import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import RestaurantsController from '../controllers/RestaurantsController';

const restaurantsRouter = Router();
const restaurantsController = new RestaurantsController();

restaurantsRouter.get('/', restaurantsController.index);

restaurantsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      restaurantName: Joi.string().required(),
      email: Joi.string().email().required(),
      contactNumber: Joi.string().required(),
      city: Joi.string().required(),
      cuisineType: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  restaurantsController.create,
);

export default restaurantsRouter;
