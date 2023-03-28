import Users from '../database/models/usersModel';
import IUsers from '../database/interfaces/IUsers';
import generateToken from '../utils/generateToken';

export default class usersService {
  static async getAll(): Promise<IUsers[]> {
    const allUsers: IUsers[] = await Users.findAll();
    console.log('return todos os users', allUsers);
    return allUsers;
  }

  static async login(user: IUsers): Promise<number | string> {
    const { email, password } = user;
    if (!email || !password) return (400);
    // if (password.length < 6) return { status: 2, message: 'pass < 6' };
    // if (email !== 'email@email.com') return { status: 3, message: 'email erro' };

    await Users.findOne({ where: { email, password } });
    // console.log('return token');
    return generateToken(user);
  }
}
