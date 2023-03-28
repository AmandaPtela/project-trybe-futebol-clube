import Users from '../database/models/usersModel';
import IUsers from '../database/interfaces/IUsers';

export default class usersService {
  static async getAll(): Promise<IUsers[]> {
    const allUsers: IUsers[] = await Users.findAll();
    console.log('return todos os users', allUsers);
    return allUsers;
  }
}
