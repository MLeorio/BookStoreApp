import { ArgsType, Field, PartialType } from '@nestjs/graphql';
import { GetPaginatedArgs } from './get-paginated.args';
import { Schema as MongooSchema } from 'mongoose';

@ArgsType()
export class GetPaginatedSubDocumentArgs extends PartialType(GetPaginatedArgs) {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;
}
