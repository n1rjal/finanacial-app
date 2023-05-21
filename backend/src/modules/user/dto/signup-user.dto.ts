import { IsOptional, IsStrongPassword } from 'class-validator';
import { SignInUserDto } from './signin-user.dto';

export class SignUpUserDto extends SignInUserDto {
  @IsOptional()
  @IsStrongPassword({
    minLength: 5,
  })
  password: string;
}
