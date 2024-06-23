import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author, GetAuthorPaginatedResponse } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { GetPaginatedArgs } from '../common/dto/get-paginated.args';
import {Schema as MongoSchema} from 'mongoose'

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  createAuthor(@Args('createAuthorInput') createAuthorInput: CreateAuthorInput) {
    return this.authorService.create(createAuthorInput);
  }

  @Query(() => GetAuthorPaginatedResponse, {name:'allAuthors'})
  findAll(@Args() args: GetPaginatedArgs){
    const {limit, skip} = args
    return this.authorService.findAll(limit, skip)
  }

  @Query(() => Author, { name: 'author' })
  findAuthorById(@Args('id', { type: () => String }) id: MongoSchema.Types.ObjectId) {
    return this.authorService.findAuthorById(id);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput
  ) {
    return this.authorService.updateAuthor(updateAuthorInput._id, updateAuthorInput);
  }

  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => String }) id: MongoSchema.Types.ObjectId) {
    return this.authorService.remove(id);
  }
}
