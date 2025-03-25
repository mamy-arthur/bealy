import { CreateUserDto } from "../DTO/User.dto";
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
const bcrypt = require("bcrypt");
const salt = 10;

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

    async getUserByMail(email: string) {
        return await User.findOne({
            where: {
                email: email
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        });
    }

    async generateAndSaveToken(email: string, user: User) {
        const token = jwt.sign(email, process.env.JWT_SECRET!);
        user.set('reset_token', token);
        await user.save();
        return token;
    }

    async getUserByToken(token: string) {
        return await User.findOne({
            where: {
                reset_token: token
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
    }

    async setUserNewPassword(user: User, password: string) {
        const passwordHash = await bcrypt.hash(password, salt);
        user.set('password', passwordHash);
        user.set('reset_token', '');
        await user.save();
    }
}

export default AuthService;