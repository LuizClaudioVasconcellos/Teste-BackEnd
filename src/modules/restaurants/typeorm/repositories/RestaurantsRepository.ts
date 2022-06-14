import { EntityRepository, ILike, Repository } from 'typeorm';
import Restaurant from '../entities/Restaurant';

@EntityRepository(Restaurant)
export class RestaurantsRepository extends Repository<Restaurant> {
  public async findByName(name: string): Promise<Restaurant | undefined> {
    const restaurant = await this.findOne({
      where: {
        name,
      },
    });

    return restaurant;
  }

  public async findById(id: number): Promise<Restaurant | undefined> {
    const restaurant = await this.findOne({
      where: {
        id,
      },
    });

    return restaurant;
  }

  public async findByEmail(email: string): Promise<Restaurant | undefined> {
    const restaurant = await this.findOne({
      where: {
        email,
      },
    });

    return restaurant;
  }

  public async findAll(
    city: string,
    cuisineType: string,
    dish_name: string,
  ): Promise<Restaurant[]> {
    const restaurant = await this.createQueryBuilder('restaurants')
      .where({ city: ILike(`%${city}%`) })
      .andWhere({ cuisineType: ILike(`%${cuisineType}%`) })
      .leftJoinAndSelect('restaurants.items', 'items')
      .andWhere('items.dish_name ILIKE :dish_name', {
        dish_name: `%${dish_name}%`,
      })
      .getMany();

    return restaurant;
  }
}
