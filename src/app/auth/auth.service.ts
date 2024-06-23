import { ConflictException, Injectable } from '@nestjs/common';
import { LoginUserInput } from './dto/login-user.input';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from '../user/dto/create-user.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async validateUser(loginUserInput: LoginUserInput) {
        const { email, password } = loginUserInput
        const user = await this.userService.findOneByEmail(email)
        const isMatch = await bcrypt.compare(password, user?.password)

        if (user && isMatch) {
            return user;
        }

        return null
    }

    login(user: User) {
        return {
            user,
            authToken: this.jwtService.sign(
                {
                    email: user.email,
                    name: user.name,
                    sub: user._id
                },
                {
                    secret: this.configService.get<string>('JWT_SECRET')
                }
            )
        }
    }

    async signup(payload: CreateUserInput) {
        // Verifier si l'utilisateur existe deja
        const user = await this.userService.findOneByEmail(payload.email)

        if (user) {
            throw new ConflictException("L'utilisateur existe deja")
        }
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(
            payload.password,
            Number(this.configService.get<string>('SALT_ROUND'))
        );

        return this.userService.createUser({ ...payload, password: hashedPassword })
    }
}
