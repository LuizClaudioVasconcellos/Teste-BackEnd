import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import Items from '../typeorm/entities/Items';
import { ItemRepository } from '../typeorm/repositories/ItemsRepositoriy';
import uploadConfig from '@config/upload';

interface IRequest {
  itemId: number;
  avatarFileName: string;
}

class UpdateFoodImageService {
  public async execute({ itemId, avatarFileName }: IRequest): Promise<Items> {
    const itemsRepository = getCustomRepository(ItemRepository);

    const item = await itemsRepository.findById(itemId);

    if (!item) {
      throw new AppError('Item not found.');
    }

    if (item.food_image) {
      const itemAvatarFilePath = path.join(
        uploadConfig.directory,
        item.food_image,
      );
      const itemAvatarFileExists = await fs.promises.stat(itemAvatarFilePath);

      if (itemAvatarFileExists) {
        await fs.promises.unlink(itemAvatarFilePath);
      }
    }

    item.food_image = avatarFileName;

    await itemsRepository.save(item);

    return item;
  }
}

export default UpdateFoodImageService;
