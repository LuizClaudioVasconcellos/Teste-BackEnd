import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Item from '../typeorm/entities/Items';
import { ItemRepository } from '../typeorm/repositories/ItemsRepositoriy';

interface IRequest {
  id: string;
}

class ShowItemService {
  public async execute({ id }: IRequest): Promise<Item> {
    const itemsRepository = getCustomRepository(ItemRepository);

    const item = await itemsRepository.findOne(id);

    if (!item) {
      throw new AppError('Item not found');
    }

    return item;
  }
}

export default ShowItemService;
