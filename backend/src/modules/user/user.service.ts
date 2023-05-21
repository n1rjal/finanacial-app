import { AuthService } from '@libs/auth/auth.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { User } from '@entities/user.entity';
import { BaseRepository } from '@common/database/base.repository';
import { SignInResponse } from '@common/@types';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { HelperService } from '@common/helpers/helpers.utils';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/mongodb';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: BaseRepository<User>,
    private readonly em: EntityManager,
    private readonly authService: AuthService,
  ) {}

  /* `private readonly INITIAL_BUDGET_METADATA` is a constant object that contains the initial budget
  metadata for a new user. This object is used in the `signUpUser` method to create a new user with
  the initial budget metadata. The budget metadata includes properties such as `expenseBudget`,
  `incomeBudget`, `investment`, `lowBudgetThreshold`, and `savingBudget`. These properties are used
  to track the user's budget and spending habits. */
  private readonly INITIAL_BUDGET_METADATA = {
    expenseBudget: 0,
    incomeBudget: 0,
    investment: 0,
    lowBudgetThreshold: 10,
    savingBudget: 0,
  };

  /**
   * This function creates a new user with email, password, and metadata, persists it to the database,
   * and returns a sign-in response for the newly created user.
   * @param {SignInUserDto} signUpUser - The parameter `signUpUser` is of type `SignInUserDto`, which
   * is likely a data transfer object containing information about a user signing up for an account,
   * such as their email and password.
   * @returns The function `signUpUser` returns a Promise that resolves to a `SignInResponse` object.
   */
  async signUpUser(signUpUser: SignInUserDto): Promise<SignInResponse> {
    const newUser = this.userRepository.create({
      email: signUpUser.email,
      password: signUpUser.password,
      metaData: this.INITIAL_BUDGET_METADATA,
    });
    await this.em.persistAndFlush(newUser);
    return await this.signInUser({
      email: signUpUser.email,
      password: signUpUser.password,
    });
  }

  /**
   * This function signs in a user by verifying their email and password, checking if the user is
   * active, and returning a JWT access token.
   * @param {SignInUserDto}  - - `email`: a string representing the email address of the user trying to
   * sign in
   * @returns a Promise that resolves to a SignInResponse object. The SignInResponse object is built
   * using the HelperService.buildPayloadResponse() method, which takes in three arguments: the user
   * object, a JWT access token for the user, and an optional error message.
   */
  async signInUser({
    email,
    password,
  }: SignInUserDto): Promise<SignInResponse> {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new NotFoundException('User not found');
    if (!user.isActive) throw new NotFoundException('User not active');
    const passwordValid = await HelperService.verifyHash(
      user.password,
      password,
    );
    if (!passwordValid) throw new BadRequestException('Password is incorrect');
    const userJwtAccessToken = await this.authService.getUserJwt(user);
    return HelperService.buildPayloadResponse(user, userJwtAccessToken, null);
  }

  /**
   * This function retrieves a user's profile by their ID and throws an exception if the user is not
   * found.
   * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
   * a user. It is used to search for a user's profile in the database.
   * @returns The function `getUserProfile` returns a Promise that resolves to a `User` object.
   */
  async getUserProfile(userId: string): Promise<User> {
    const userProfile = await this.userRepository.findOne({
      id: userId,
    });
    if (!userProfile) throw new NotFoundException('User not found');
    return userProfile;
  }
  /**
   * This is an async function that updates a user's profile with new information and returns the updated
   * user object.
   * @param {User} user - The user object that needs to be updated.
   * @param {UpdateUserDto} updateUserDto - UpdateUserDto is a data transfer object that contains the
   * updated information for a user's profile. It may include properties such as the user's name, email,
   * password, and low budget threshold.
   * @returns a Promise that resolves to a User object.
   */

  async updateProfile(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const userMetadata = user.metaData;
    if (updateUserDto.lowBudgetThreshold)
      userMetadata.lowBudgetThreshold = updateUserDto.lowBudgetThreshold;
    this.userRepository.assign(user, {
      ...updateUserDto,
      metaData: {
        ...userMetadata,
      },
    });
    await this.em.persistAndFlush(user);
    return user;
  }
}
