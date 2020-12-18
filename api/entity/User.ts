import { prop, getModelForClass } from '@typegoose/typegoose';
import { ObjectID } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'User' })
export class User {
  @Field()
  readonly _id: ObjectID;

  @Field()
  @prop({ required: true })
  email: string;

  @Field()
  @prop({ required: true })
  password: string;
}
export const UserModel = getModelForClass(User);
