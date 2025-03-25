import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";
import User from "./user";

interface UserFavoritesAttributes {
  id?: number;
  userId: number;
  favoriteIds?: number[];
}

interface UserFavoritesCreationAttributes extends Optional<UserFavoritesAttributes, 'id'>{}

class UserFavorites extends Model<UserFavoritesAttributes, UserFavoritesCreationAttributes> implements UserFavoritesAttributes{
  public id!: number;
  public userId!: number;
  public favoriteIds?: number[] | undefined;

  public readonly createdAt!: Date;
  public readonly updateAt!: Date;
}

UserFavorites.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'}
      },
      favoriteIds: {
        type: DataTypes.JSON,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'user_favorites',
      modelName: 'UserFavorites',
      timestamps: true
});

User.hasOne(UserFavorites, { foreignKey: 'userId' });
UserFavorites.belongsTo(User, { foreignKey: 'userId' });

export default UserFavorites;
