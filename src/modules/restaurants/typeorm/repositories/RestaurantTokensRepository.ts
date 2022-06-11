import { EntityRepository, Repository } from 'typeorm';
import RestaurantToken from '../entities/RestaurantToken';

@EntityRepository(RestaurantToken)
export class RestaurantTokensRepository extends Repository<RestaurantToken> {
  public async findByToken(token: string): Promise<RestaurantToken | undefined> {
    const restaurantToken = await this.findOne({
      where: {
        token,
      },
    });

    return restaurantToken;
  }

  public async generate(restaurant_id: number): Promise<RestaurantToken> {
    const restaurantToken = await this.create({
      restaurant_id,
    });

    await this.save(restaurantToken);

    return restaurantToken;
  }
}
