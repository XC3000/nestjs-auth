import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserRequest } from './dto/create-user.request';

import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(data: CreateUserRequest) {
    await new this.userModel({
      ...data,
      password: await argon2.hash(data.password),
    }).save();
  }
}
