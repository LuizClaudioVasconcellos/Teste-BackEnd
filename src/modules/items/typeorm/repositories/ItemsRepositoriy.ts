import { EntityRepository, Repository } from 'typeorm';
import Items from '../entities/Items';

@EntityRepository(Items)
export class ItemRepository extends Repository<Items> {
  public async findByName(name: string): Promise<Items | undefined> {
    const item = this.findOne({
      where: {
        name,
      },
    });

    return item;
  }

  public async findById(id: number): Promise<Items | undefined> {
    const item = await this.findOne({
      where: {
        id,
      },
    });

    return item;
  }
}
