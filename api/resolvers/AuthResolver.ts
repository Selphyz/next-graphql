import { Arg, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { hash, verify } from 'argon2';
import { AuthInput, UserResponse } from '../types';
import { UserModel } from 'entity/User';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(@Arg('input') { email, password }: AuthInput): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const hashedPassword = await hash(password);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'dirtysecrets');
    return { user, token };
  }
  @Mutation(() => UserResponse)
  async login(@Arg('input') { email, password }: AuthInput): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw new Error('Invalid credentials');
    }
    const valid = await verify(password, existingUser.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    const payload = { id: existingUser.id };
    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'dirtysecrets');
    return { user: existingUser, token };
  }
}
