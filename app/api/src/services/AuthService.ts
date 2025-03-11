import { CreateUserDto } from "../DTO/User.dto";
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

class AuthService {
    async createUser(data: CreateUserDto) {
        try {
            return await User.create({
                ...data,
                ispublic: true
            });
        } catch(err) {
            return {
                status: 'error',
                message: 'An error occured'
            };
        }
    }

    async authenticate(email: string, password: string) {
        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        if (!user || !(await user.comparePassword(password))) {
            throw Error();
        }

        const userData = user.toJSON();
        const data = {
            id: userData.id,
            email: userData.email,
            username: userData.username
        }
        const token = jwt.sign(data, process.env.JWT_SECRET!, {expiresIn: '1h'});
        return {
            token: token,
            user: data
        }
    }
}

export default AuthService;