import { Router } from 'express';
import ItemsController from '../controllers/ItemsController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import FoodImageController from '../controllers/FoodImageController';

const itemsRouter = Router();
const itemsController = new ItemsController();
const foodImageController = new FoodImageController();

const upload = multer(uploadConfig);

itemsRouter.get('/', isAuthenticated, itemsController.index);

itemsRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  itemsController.show,
);

itemsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      dish_name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
    },
  }),
  itemsController.create,
);

itemsRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      dish_name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  itemsController.update,
);

itemsRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  itemsController.delete,
);

itemsRouter.patch(
  '/food/:itemId',
  isAuthenticated,
  upload.single('food'),
  foodImageController.update,
);

export default itemsRouter;
