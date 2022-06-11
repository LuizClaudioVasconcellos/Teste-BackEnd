import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import RestaurantProfileController from '../controllers/RestaurantProfileController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const profileRouter = Router();
const restaurantProfileController = new RestaurantProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', restaurantProfileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      restaurantName: Joi.string().required(),
      email: Joi.string().email().required(),
      contactNumber: Joi.string(),
      city: Joi.string(),
      cuisineType: Joi.string(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  restaurantProfileController.update,
);

export default profileRouter;
