import * as Joi from 'joi';
import Users from '../database/models/usersModel';
import IUsers from '../database/interfaces/IUsers';
import ILogin from '../database/interfaces/ILogin';
import generateToken from '../utils/generateToken';

export default class usersService {
  static async getAll(): Promise<IUsers[]> {
    const allUsers: IUsers[] = await Users.findAll();
    return allUsers;
  }

  static async login(user: ILogin): Promise<string> {
    const { email } = user;
    const errorMessage = 'Invalid email or password';
    const schema = Joi.object({
      email: Joi.string().email().required().label('email'),
      password: Joi.string().min(6).required().label('password'),
    }).messages({
      'any.required': 'All fields must be filled',
    });
    const arraySchema = Joi.array().items(schema);
    const { error } = arraySchema.validate([user]);
    if (error && error.message.includes('must')) return (errorMessage);
    if (error && error.message.includes('empty')) return (errorMessage);
    if (error) return (error.message);
    const userF = await Users.findOne({ where: { email } });
    const pass = userF?.password.length;
    if (!userF?.email || (pass && pass < 6)) return (errorMessage);
    const newUser = { email: userF.email, role: userF.role, id: userF.id };
    return generateToken(newUser);
  }

  static async validate(user: IUsers): Promise<string | undefined> {
    const { role } = user;
    const userOk = await Users.findOne({ where: { role } });
    return userOk?.role;
  }
}
