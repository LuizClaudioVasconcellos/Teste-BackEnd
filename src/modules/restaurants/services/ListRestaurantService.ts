import { getCustomRepository } from 'typeorm';
import Restaurant from '../typeorm/entities/Restaurant';
import { RestaurantsRepository } from '../typeorm/repositories/RestaurantsRepository';

class ListRestaurantService {
  public async execute(
    city: string,
    cuisineType: string,
    dish_name: string,
  ): Promise<Restaurant[]> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);

    const restaurants = await restaurantsRepository.findAll(
      city,
      cuisineType,
      dish_name,
    );

    return restaurants;
  }
}

export default ListRestaurantService;
