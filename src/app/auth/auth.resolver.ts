import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from '../gql-auth.guards';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService){}

    @Mutation(() => LoginUserResponse)
    @UseGuards(GqlAuthGuard)
    login(
        @Args('loginUserInput') loginUserInput: LoginUserInput,
        @Context() context: any,
    ) {
        return this.authService.login(context.user);
    }

}
