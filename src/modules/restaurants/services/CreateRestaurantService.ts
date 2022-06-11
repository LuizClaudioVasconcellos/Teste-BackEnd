import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Restaurant from '../typeorm/entities/Restaurant';
import { RestaurantsRepository } from '../typeorm/repositories/RestaurantsRepository';

interface IRequest {
  restaurantName: string;
  email: string;
  contactNumber: string;
  city: string;
  cuisineType: string;
  password: string;
}

class CreateRestaurantService {
  public async execute({
    restaurantName,
    email,
    contactNumber,
    city,
    cuisineType,
    password,
  }: IRequest): Promise<Restaurant> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);
    const emailExists = await restaurantsRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already use');
    }

    const hashedPassword = await hash(password, 8);

    const restaurant = restaurantsRepository.create({
      restaurantName,
      email,
      contactNumber,
      city,
      cuisineType,
      password: hashedPassword,
    });

    await restaurantsRepository.save(restaurant);

    return restaurant;
  }
}

export default CreateRestaurantService;
