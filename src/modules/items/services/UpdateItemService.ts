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
  public async execute({
    id,
    dish_name,
    price,
    restaurant_id,
  }: IRequest): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemRepository);

    const item = await itemsRepository.findOne(id);

    if (!item) {
      throw new AppError('Item not found');
    }

    const itemExists = await itemsRepository.findByName(dish_name);

    if (itemExists && dish_name !== item.dish_name) {
      throw new AppError('There is already one item whith this name');
    }

    item.dish_name = dish_name;
    item.price = price;
    item.restaurant_id = restaurant_id;

    await itemsRepository.save(item);

    return item;
  }
}

export default UpdateItemService;
