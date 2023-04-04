import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './teamsModel';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
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

  homeTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  awayTeamId: {
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
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

Teams.hasMany(Matches, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

export default Matches;
