import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async login({ email, password }: LoginDTO) {
        try {
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new Error('E-mail não cadastrado');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Você digitou a senha errada');
            }

            return {
                status: 'success',
                access_token: this.jwtService.sign({ sub: user.id, email: user.email, name: user.name }),
            }

        } catch (error) {
            return {
                status: 'error',
                message: error.message
            }
        }

    }

    async register({ name, email, password }: RegisterDTO) {
        try {
            const user = await this.userService.create(name, email, password);

            return {
                status: 'success',
                access_token: this.jwtService.sign({ sub: user.id, email: user.email, name: user.name }),
            }

        } catch (error) {
            return {
                status: 'error',
                message: error.message
            }
        }

    }
}