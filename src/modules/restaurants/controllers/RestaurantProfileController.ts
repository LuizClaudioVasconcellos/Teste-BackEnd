import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class RestaurantProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const restaurant_id = request.restaurantId.id;

    const restaurant = await showProfile.execute({ restaurant_id });

    return response.json(restaurant);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const restaurant_id = request.restaurantId.id;
    const {
      restaurantName,
      email,
      contactNumber,
      city,
      cuisineType,
      password,
      old_password,
    } = request.body;

    const updateProfile = new UpdateProfileService();

    const restaurant = await updateProfile.execute({
      restaurant_id,
      restaurantName,
      email,
      contactNumber,
      city,
      cuisineType,
      password,
      old_password,
    });

    return response.json(restaurant);
  }
}
