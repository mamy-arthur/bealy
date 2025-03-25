import { UpdateUserDto } from "../DTO/User.dto";
import User from "../models/user";
import UserFavorites from "../models/userfavorites";
import fs from "fs";
import path from "path";

class UserService {
    async getAllPublicUsers(userId: number) {
        const users = await User.findAll({
            where: {
                ispublic: true
            },
            include: {
                model: UserFavorites,
                attributes: ['id', 'favoriteIds']
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        }) || [];
        return users.filter(user => user.id !== userId);
    }

    async getUser(id: number) {
        return await User.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });
    }

    async updateUser(data: UpdateUserDto, id: number) {
        const user = await User.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });
        if (!user) {
            return null;
        }
        if (data.image) {
            await this.deleteUserPreviousImage(user);
        }
        await user.update(data);
        return user;
    }

    async getAllUsers() {
        return await User.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });
    }

    async deleteUser(id: number) {
        await User.destroy({
            where: {
                id: id
            }
        });
    }

    async deleteUserPreviousImage(user: User) {
        const image = user.image;
        if(!image) {
            return;
        }
        const filePath = path.join(process.cwd(), 'public', 'uploads', image);
        fs.unlink(filePath, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
}

export default UserService;