import { CustomController } from '@common/decorators/custom-controller';
import { Public } from '@common/decorators/public';
import { LoggedInUser } from '@common/decorators/user';
import { Body, Get, Post, Put } from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { UserService } from './user.service';
import { User } from '@entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@CustomController('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  @Public()
  async signInUser(
    @Body()
    signInUserDto: SignInUserDto,
  ) {
    return this.userService.signInUser(signInUserDto);
  }

  @Post('signup')
  @Public()
  async signUpUser(@Body() signUpUserDto: SignUpUserDto) {
    return this.userService.signUpUser(signUpUserDto);
  }

  @Get('profile')
  async getUserProfile(@LoggedInUser() user: User) {
    return user;
  }

  @Put()
  async updateUserProfile(
    @LoggedInUser() user: User,

    @Body()
    updateProfileDto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(user, updateProfileDto);
  }
}
