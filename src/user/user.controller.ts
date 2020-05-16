import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

interface ILoginPayload {
  email: string;
  password: string;
}

@Controller()
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  // @MessagePattern({ cmd: 'find' })
  // find(): Promise<UserModel[]> {
  //   // return this.userService.findAll();
  // }

  @MessagePattern({ cmd: 'createUser' })
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'loginUser' })
  login(data: ILoginPayload): Promise<User> {
    return this.userService.loginUser(data.email, data.password);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  getUserByEmail(email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById({ headers, data }): Promise<User> {
    return this.userService.getUserById(data.id);
  }
}
