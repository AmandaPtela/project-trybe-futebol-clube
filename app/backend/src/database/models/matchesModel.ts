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

  homeTeamId: {
    field: 'home_team_id',
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  homeTeamGoals: {
    field: 'home_team_goals',
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  awayTeamId: {
    field: 'away_team_id',
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  awayTeamGoals: {
    field: 'away_team_goals',
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
