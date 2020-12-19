import { getModelForClass, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';
import { Ref } from 'types/Ref';
import { User } from './User';

@ObjectType({ description: 'Stream de contenido' })
export class Stream {
  @Field() readonly _id: ObjectId;

  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ required: true })
  description: string;

  @Field()
  @prop({ required: true })
  url: string;

  @Field()
  @prop({ ref: User, required: true })
  author: Ref<User>;
}
export const StreamModel = getModelForClass(Stream);
