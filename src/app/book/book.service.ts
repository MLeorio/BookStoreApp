import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './entities/book.entity';
import { Model, Schema as MongooSchema } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>,
  ) {}

  createBook(createBookInput: CreateBookInput) {
    const createdBook = new this.bookModel(createBookInput);
    return createdBook.save();
  }

  async findAllBooks(limit: number, skip: number) {
    const booksCount = await this.bookModel.countDocuments();
    const books = await this.bookModel
      .find()
      .populate('author')
      .skip(skip)
      .limit(limit);

    return {
      books,
      booksCount,
    };
  }

  getBookById(
    id: MongooSchema.Types.ObjectId,
    readersSkip: number,
    readersLimit: number,
  ) {
    return this.bookModel
      .findById(id)
      .populate('author')
      .populate({
        path: 'readers',
        options: {
          limit: readersLimit,
          skip: readersSkip,
        },
      });
  }

  updateBook(
    id: MongooSchema.Types.ObjectId,
    updateBookInput: UpdateBookInput,
  ) {
    return this.bookModel.findOneAndUpdate(id, updateBookInput);
  }

  removeBook(id: MongooSchema.Types.ObjectId) {
    return this.bookModel.deleteOne({ _id: id });
  }
}
