import * as bcryptjs from 'bcryptjs';
import Users from '../database/models/usersModel';
import IUsers from '../database/interfaces/IUsers';
import ILogin from '../database/interfaces/ILogin';
import { generateToken } from '../utils/generateToken';

export default class usersService {
  static async getAll(): Promise<IUsers[]> {
    const allUsers: IUsers[] = await Users.findAll();
    return allUsers;
  }

  static async login(user: ILogin): Promise<string> {
    const { email, password } = user;
    const eM = 'Invalid email or password';
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // Validar email e tamanho senha > 6
    if (!emailRegex.test(email) || password.length < 6) return eM;

    // Verificar existência no BD
    const userF = await Users.findOne({ where: { email } });
    if (!userF) return eM;
    if (!bcryptjs.compareSync(password, userF?.dataValues.password)) return eM;
    return generateToken({ email: userF?.email, role: userF?.role, id: userF?.id });
  }

  static async validate(user: IUsers): Promise<string | undefined> {
    const { id } = user;
    const userOk = await Users.findOne({ where: { id } });
    return userOk?.role;
  }
}
