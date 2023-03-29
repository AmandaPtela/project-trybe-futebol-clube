import * as Joi from 'joi';
import Users from '../database/models/usersModel';
import IUsers from '../database/interfaces/IUsers';
import ILogin from '../database/interfaces/ILogin';
import generateToken from '../utils/generateToken';

export default class usersService {
  static async getAll(): Promise<IUsers[]> {
    const allUsers: IUsers[] = await Users.findAll();
    // console.log('return todos os users', allUsers);
    return allUsers;
  }

  // Revisar e refatorar
  static async login(user: ILogin): Promise<string> {
    const { email } = user;
    const schema = Joi.object({
      email: Joi.string().email().required().label('email'),
      password: Joi.string().min(6).required().label('password'),
    }).messages({
      'any.empty': 'All fields must be filled',
      'any.required': 'All fields must be filled',
    });
    const arraySchema = Joi.array().items(schema);
    const { error } = arraySchema.validate([user]);

    if (error) return (error.message);
    const userFound = await Users.findOne({ where: { email } });
    if (!userFound) return ('User not found');
    const newUser = { email: user.email, password: user.password, id: userFound.id };
    console.log('NEWUSERRRRRRRRRRRRRR', newUser);
    // PEGAR ID DO NEWUSER E MANDAR PRO VALIDATE PRA USAR NA FUNÇÃO ABAIXO
    return generateToken(newUser);
  }

  static async validate(user: IUsers): Promise<object | null> {
    const { id } = user;
    const userOk = await Users.findByPk(80);
    console.log('USEROK', id);
    return userOk;
  }
}
