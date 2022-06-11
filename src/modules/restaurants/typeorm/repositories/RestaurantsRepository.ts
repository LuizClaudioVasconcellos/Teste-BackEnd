import { EntityRepository, Like, Repository } from 'typeorm';
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
  ): Promise<Restaurant[]> {
    const restaurant = await this.find({
      select: ['restaurantName', 'contactNumber', 'city', 'cuisineType'],
      where: {
        city: Like(`%${city}%`),
        cuisineType: Like(`%${cuisineType}%`),
      },
    });

    return restaurant;
  }
}
