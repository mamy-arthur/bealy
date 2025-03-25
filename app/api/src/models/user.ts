import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "./index";
import bcrypt from "bcrypt";

interface UserAttributes {
  id?: number;          // Primary key
  username: string;
  email: string;
  password: string;
  age?: number;
  description?: string;
  image?: string;
  ispublic?: boolean;
  reset_token?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public age?: number;
  public description?: string;
  public image?: string;
  public ispublic?: boolean;
  public reset_token?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ispublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    hooks: {
      async beforeCreate(user: User) {
        const salt = 10;
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
});

export default User;