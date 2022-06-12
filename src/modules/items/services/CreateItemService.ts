import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Item from '../typeorm/entities/Items';
import { ItemRepository } from '../typeorm/repositories/ItemsRepositoriy';

interface IRequest {
  dish_name: string;
  price: number;
  restaurant_id: number;
}

class CreateItemService {
  public async execute({
    dish_name,
    price,
    restaurant_id,
  }: IRequest): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemRepository);
    // const itemExists = await itemsRepository.findByName(dish_name);

    // if (itemExists) {
    //   throw new AppError('There is already one dish whith this name');
    // }

    const item = itemsRepository.create({
      dish_name,
      price,
      restaurant_id,
    });

    await itemsRepository.save(item);

    return item;
  }
}

export default CreateItemService;
