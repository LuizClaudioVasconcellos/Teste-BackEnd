import { Request, Response } from 'express';
import UpdateFoodImageService from '../services/UpdateFoodImageService';

export default class FoodImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateImage = new UpdateFoodImageService();

    const item = updateImage.execute({
      itemId: request.itemId.id,
      avatarFileName: request.file?.filename as string,
    });

    return response.json(item);
  }
}
