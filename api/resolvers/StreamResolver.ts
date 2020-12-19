import { ObjectId } from 'mongoose';
import {
  Resolver,
  Query,
  Mutation,
  FieldResolver,
  Ctx,
  Arg,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Stream, StreamModel } from '../entity/Stream';
import { ObjectIDScalar } from '../schema/object-id.scalar';
import { isAuth } from 'middleware';
import { MyContext, StreamInput } from 'types';
import { User, UserModel } from 'entity/User';

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  stream(@Arg('streamId', () => ObjectIDScalar) streamId: ObjectId) {
    return StreamModel.findById(streamId);
  }
  @Query(() => [Stream])
  @UseMiddleware(isAuth)
  streams(@Ctx() ctx: MyContext) {
    return StreamModel.find({ author: ctx.res.locals.userId });
  }
  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async addStream(@Arg('input') streamInput: StreamInput, @Ctx() ctx: MyContext): Promise<Stream> {
    const stream = new StreamModel({
      ...streamInput,
      author: ctx.res.locals.userId,
    });
    await stream.save();
    return stream;
  }
  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async editStream(@Arg('input') streamInput: StreamInput, @Ctx() ctx: MyContext): Promise<Stream> {
    const { title, url, description, id } = streamInput;
    const stream = await StreamModel.findOneAndUpdate(
      { _id: id, author: ctx.res.locals.userId },
      { title, description, url },
      { runValidators: true, new: true },
    );
    if (!stream) {
      throw new Error('Stream not found');
    }
    return stream;
  }
  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async deleteStream(
    @Arg('streamId', () => ObjectIDScalar) streamId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<boolean | undefined> {
    const deleted = await StreamModel.findOneAndUpdate(
      { _id: streamId },
      { author: ctx.res.locals.userId },
    );
    if (!deleted) {
      throw new Error('Stream not found');
    }
    return true;
  }
  @FieldResolver()
  async author(@Root() stream: Stream): Promise<User | null> {
    return await UserModel.findById(stream.author);
  }
}
