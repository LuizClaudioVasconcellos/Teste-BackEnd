import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Item from '../typeorm/entities/Items';
import { ItemRepository } from '../typeorm/repositories/ItemsRepositoriy';

interface IRequest {
  id: string;
  dish_name: string;
  price: number;
  restaurant_id: number;
}

class UpdateItemService {
  public async execute({ id, dish_name, price }: IRequest): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemRepository);

    const item = await itemsRepository.findOne(id);

    if (!item) {
      throw new AppError('Item not found');
    }

    item.dish_name = dish_name;
    item.price = price;

    await itemsRepository.save(item);

    return item;
  }
}

export default UpdateItemService;
