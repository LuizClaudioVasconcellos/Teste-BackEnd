import { Request, Response } from 'express';
import CreateRestaurantService from '../services/CreateRestaurantService';
import ListRestaurantService from '../services/ListRestaurantService';

export default class RestaurantsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const city = request.query.city ? (request.query.city as string) : '';
    const cuisineType = request.query.cuisineType
      ? (request.query.cuisineType as string)
      : '';

    const listRestaurant = new ListRestaurantService();

    const restaurants = await listRestaurant.execute(city, cuisineType);

    return response.json(restaurants);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { restaurantName, email, contactNumber, city, cuisineType, password } =
      request.body;

    const createRestaurant = new CreateRestaurantService();

    const restaurant = await createRestaurant.execute({
      restaurantName,
      email,
      contactNumber,
      city,
      cuisineType,
      password,
    });

    return response.json(restaurant);
  }
}
