import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ItemRepository } from '../typeorm/repositories/ItemsRepositoriy';

interface IRequest {
  id: string;
}

class DeleteItemService {
  public async execute({ id }: IRequest): Promise<void> {
    const itemRepository = getCustomRepository(ItemRepository);

    const item = await itemRepository.findOne(id);

    if (!item) {
      throw new AppError('Item not found');
    }

    await itemRepository.remove(item);
  }
}

export default DeleteItemService;
