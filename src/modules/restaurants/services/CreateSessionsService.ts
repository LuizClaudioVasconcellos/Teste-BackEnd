import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import Restaurant from '../typeorm/entities/Restaurant';
import { RestaurantsRepository } from '../typeorm/repositories/RestaurantsRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  restaurant: Restaurant;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);
    const restaurant = await restaurantsRepository.findByEmail(email);

    if (!restaurant) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    const passwordConfirmed = await compare(password, restaurant.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    const token = sign({ id: restaurant.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { restaurant, token };
  }
}

export default CreateSessionsService;
