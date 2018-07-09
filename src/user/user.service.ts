import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto){
        const user: User = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = await bcrypt.hash(createUserDto.password, 10);
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            throw new BadRequestException({meassage: error.sqlMessage});
        }
    }

    async loginUser(loginUserDto: LoginUserDto){
        const user = await this.userRepository.findOne({email: loginUserDto.email});
        const match = await bcrypt.compare(loginUserDto.password, user.password);
        if (match){
        const payload: JwtPayload = { email: user.email};
        const expiresIn = process.env.JWT_EXPIRY;
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
        return {expiresIn, accessToken};
        }else{
            throw new UnauthorizedException('wrong credentials');
        }
    }
}
