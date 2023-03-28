import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './teamsModel';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  homeTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  awayTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },

}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeam',
  as: 'homeTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
  as: 'home_team_id',
});

export default Matches;
