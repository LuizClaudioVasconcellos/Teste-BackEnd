import { Request, Response } from 'express';
import CreateItemService from '../services/CreateItemService';
import DeleteItemService from '../services/DeleteItemService';
import ListItemService from '../services/ListItemService';
import ShowItemService from '../services/ShowItemService';
import UpdateItemService from '../services/UpdateItemService';

export default class ItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listItems = new ListItemService();

    const items = await listItems.execute();

    return response.json(items);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showItem = new ShowItemService();

    const item = await showItem.execute({ id });

    return response.json(item);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { dish_name, price, restaurant_id } = request.body;

    const createItem = new CreateItemService();

    const item = await createItem.execute({
      dish_name,
      price,
      restaurant_id,
    });

    return response.json(item);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { dish_name, price, restaurant_id } = request.body;
    const { id } = request.params;

    const updateItem = new UpdateItemService();

    const item = await updateItem.execute({
      id,
      dish_name,
      price,
      restaurant_id,
    });

    return response.json(item);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteItem = new DeleteItemService();

    await deleteItem.execute({ id });

    return response.json([]);
  }
}
