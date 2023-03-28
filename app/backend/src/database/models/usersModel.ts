import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

export default Users;
