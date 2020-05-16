import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as shortid from 'shortid';
import { EntityManager, Repository } from 'typeorm';
import { Authentication } from '../utils/auth';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  private readonly userRepositoy: Repository<User>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.userRepositoy = entityManager.getRepository(User);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = shortid.generate();
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.email = data.email;

    if (data.password) {
      const salt = Authentication.generateSalt();
      const password = Authentication.generatePasswordHash(data.password, salt);
      user.password = `${salt}.${password}`;
    }
    {
      // TODO: automatic password generation and send mail to user
    }

    try {
      await this.userRepositoy.save(user);

      delete user.password;
      return user;
    } catch (err) {
      throw new RpcException('Error creating user ' + err.message);
    }
  }

  async loginUser(email: string, password: string): Promise<User> {
    let user: User = await this.userRepositoy.findOne({ email });

    if (!user) {
      throw new RpcException('user email does not exist');
    }

    if (!user.active) {
      throw new RpcException('user has been de-activated');
    }

    const salt = user.password.split('.')[0];
    const hashPassword = user.password.split('.')[1];

    const flag: boolean = Authentication.comparePassword(
      password,
      hashPassword,
      salt,
    );

    if (!flag) {
      throw new RpcException('Invalid Password');
    }

    user = await this.userRepositoy.findOne({
      where: { id: user.id },
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepositoy.findOne({ email });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepositoy.findOne({ id });
    delete user.password;
    return user;
  }
}
