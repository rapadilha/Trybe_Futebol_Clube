import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id: number;
  public teamName:string;
  public dataValues:object;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
