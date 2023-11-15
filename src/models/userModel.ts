import  { Sequelize, Model, DataTypes } from 'sequelize';

export default class User extends Model {
    public id?: number;
    public userName!: string;
    public password!: string;
    public victories!: number;
    public games!: number;
  }

  export const UserMap = (sequelize: Sequelize) => {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userName: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false
      },
      victories:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      games:{
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'users',
      timestamps: false
    });
    User.sync();
  }