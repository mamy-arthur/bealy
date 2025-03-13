import { CreateUserDto, UpdateUserDto } from "../DTO/User.dto";
import User from "../models/user";
import UserFavorites from "../models/userfavorites";

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
        await User.update(data, {
            where: {
                id: id
            }
        });
        return await User.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });
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
}

export default UserService;