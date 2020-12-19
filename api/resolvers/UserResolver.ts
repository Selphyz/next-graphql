import { isAuth } from 'middleware';
import { ObjectId } from 'mongoose';
import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { MyContext } from '../types';
import { User, UserModel } from '../entity/User';
import { ObjectIDScalar } from '../schema/object-id.scalar';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('userId', () => ObjectIDScalar) userId: ObjectId) {
    return await UserModel.findById(userId);
  }
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async currentUser(@Ctx() ctx: MyContext): Promise<User | null> {
    return await UserModel.findById(ctx.res.locals.userId);
  }
}
