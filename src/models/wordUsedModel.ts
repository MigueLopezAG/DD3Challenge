import  { Sequelize, Model, DataTypes } from 'sequelize';

export default class Word extends Model {
    public id?: number;
    public word!: string;
    public attemnts!: number;
    public isDiscovered!: boolean;
  }

  export const WordMap = (sequelize: Sequelize) => {
    Word.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      word: {
        type: DataTypes.STRING(5)
      },
      attemnts:{
        type: DataTypes.INTEGER
      },
      isDiscovered:{
        type: DataTypes.BOOLEAN
      }
    }, {
      sequelize,
      tableName: 'words',
      timestamps: false
    });
    Word.sync();
  }