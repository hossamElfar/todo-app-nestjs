import { Controller, Post, UsePipes, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { JoiValidationPipe } from '../shared/pipes/validation.pipe';
import { createUserSchema } from './conf/users.validations';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.passwordConfirmation)
        throw new BadRequestException({message: 'password confirmation mistmatches'});
    return this.userService.createUser(createUserDto);
  }
}
