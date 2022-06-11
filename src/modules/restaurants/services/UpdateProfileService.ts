import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Restaurant from '../typeorm/entities/Restaurant';
import { RestaurantsRepository } from '../typeorm/repositories/RestaurantsRepository';

interface IRequest {
  restaurant_id: number;
  restaurantName: string;
  email: string;
  contactNumber: string;
  city: string;
  cuisineType: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    restaurant_id,
    restaurantName,
    email,
    contactNumber,
    city,
    cuisineType,
    password,
    old_password,
  }: IRequest): Promise<Restaurant> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);

    const restaurant = await restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }

    const restaurantUpdateEmail = await restaurantsRepository.findByEmail(email);

    if (restaurantUpdateEmail && restaurantUpdateEmail.id !== restaurant_id) {
      throw new AppError('There is already one restaurant with email');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && restaurant.password) {
      const checkCurrentPassword = await compare(password, restaurant.password);

      if (checkCurrentPassword) {
        throw new AppError(
          'The new password must be different from the current password.',
        );
      }
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, restaurant.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does no match.');
      }

      restaurant.password = await hash(password, 8);
    }

    restaurant.restaurantName = restaurantName;
    restaurant.email = email;
    restaurant.contactNumber = contactNumber;
    restaurant.city = city;
    restaurant.cuisineType = cuisineType;

    await restaurantsRepository.save(restaurant);

    return restaurant;
  }
}

export default UpdateProfileService;
