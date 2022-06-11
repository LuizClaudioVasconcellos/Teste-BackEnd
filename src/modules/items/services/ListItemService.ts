import { getCustomRepository } from 'typeorm';
import Item from '../typeorm/entities/Items';
import { ItemRepository } from '../typeorm/repositories/ItemsRepositoriy';

class ListItemService {
  public async execute(): Promise<Item[]> {
    const itemRepository = getCustomRepository(ItemRepository);

    const items = await itemRepository.find();

    return items;
  }
}

export default ListItemService;
