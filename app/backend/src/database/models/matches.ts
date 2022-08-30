import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!:number;
  public awayTeam!:number;
  public awayTeamGoals!:number;
  public inProgress!:boolean;
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
    field: 'home_team',
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
  },
  awayTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team',
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'teamAway' });

export default Matches;
