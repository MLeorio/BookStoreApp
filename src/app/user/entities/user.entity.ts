import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Book } from 'src/app/book/entities/book.entity';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  //Ajouter les proprietes de l'utilisateur
  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => String)
  @Prop()
  address: string;

  @Field(() => [Book])
  @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Book' }] })
  books: Book;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
