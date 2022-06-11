import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import { RestaurantsRepository } from '../typeorm/repositories/RestaurantsRepository';
import { RestaurantTokensRepository } from '../typeorm/repositories/RestaurantTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);
    const restaurantTokenRepository = getCustomRepository(
      RestaurantTokensRepository,
    );

    const restaurant = await restaurantsRepository.findByEmail(email);

    if (!restaurant) {
      throw new AppError('Restaurant does not exists.');
    }

    const token = await restaurantTokenRepository.generate(restaurant.id);

    const forgotPasswordTamplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: restaurant.restaurantName,
        email: restaurant.email,
      },
      subject: '[Desafio Envts] Recuperação de senha',
      templateData: {
        file: forgotPasswordTamplate,
        variables: {
          name: restaurant.restaurantName,
          link: `http://localhost:3000/reset_password?token=${token.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
