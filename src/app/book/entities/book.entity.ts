import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongoSchema } from 'mongoose';
import { Author } from 'src/app/author/entities/author.entity';
import { User } from 'src/app/user/entities/user.entity';

@ObjectType()
export class Book {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId;

  //Ajout des proprietes utilisateurs
  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => Float)
  @Prop()
  price: number;

  @Field(() => String)
  @Prop()
  coverImage: string;

  @Field(() => String)
  @Prop({ unique: true })
  isbn: string;

  @Field(() => Author)
  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'Author' }] })
  author: Author;

  @Field(() => [User])
  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'User' }] })
  readers: User[];
}

@ObjectType()
export class GetBooksPaginatedResponse {
  @Field(() => [Book], { nullable: false, defaultValue: [] })
  books: Book[];

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  booksCount: number;
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);
