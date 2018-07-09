import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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
}
