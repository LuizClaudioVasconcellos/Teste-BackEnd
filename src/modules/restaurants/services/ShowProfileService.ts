import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Restaurant from '../typeorm/entities/Restaurant';
import { RestaurantsRepository } from '../typeorm/repositories/RestaurantsRepository';

interface IRequest {
  restaurant_id: number;
}

class ShowProfileService {
  public async execute({ restaurant_id }: IRequest): Promise<Restaurant> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);

    const restaurant = await restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }

    return restaurant;
  }
}

export default ShowProfileService;
