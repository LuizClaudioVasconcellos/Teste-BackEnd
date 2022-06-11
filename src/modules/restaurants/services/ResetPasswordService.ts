import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import { RestaurantsRepository } from '../typeorm/repositories/RestaurantsRepository';
import { RestaurantTokensRepository } from '../typeorm/repositories/RestaurantTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);
    const restaurantTokenRepository = getCustomRepository(
      RestaurantTokensRepository,
    );

    const restaurantToken = await restaurantTokenRepository.findByToken(token);

    if (!restaurantToken) {
      throw new AppError('Restaurant Token does not exists.');
    }

    const restaurant = await restaurantsRepository.findById(
      restaurantToken.restaurant_id,
    );

    if (!restaurant) {
      throw new AppError('Restaurant does not exists.');
    }

    const tokenCreatedAt = restaurantToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    restaurant.password = await hash(password, 8);

    await restaurantsRepository.save(restaurant);
  }
}

export default ResetPasswordService;
