import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './entities/author.entity';

@Module({
  providers: [AuthorResolver, AuthorService],
  imports: [
    MongooseModule.forFeature([{name: Author.name, schema:AuthorSchema}])
  ]
})
export class AuthorModule {}
