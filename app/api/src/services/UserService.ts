import { CreateUserDto, UpdateUserDto } from "../DTO/User.dto";
import User from "../models/user";

class UserService {
    async getAllPublicUsers() {
        return await User.findAll({
            where: {
                ispublic: true
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });
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
        return await User.update(data, {
            where: {
                id: id
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