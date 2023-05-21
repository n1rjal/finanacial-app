import { SignInResponse } from '@common/@types';
import { BaseFetchDto } from '@common/dto/base-fetch.dto';
import { User } from '@entities/user.entity';
import { Options as ArgonOptions, argon2id, hash, verify } from 'argon2';

const argon2Options: ArgonOptions & { raw?: false } = {
  type: argon2id,
  hashLength: 50,
  saltLength: 32,
  timeCost: 4,
};

export const HelperService = {
  /* `buildPayloadResponse` is a function that takes in a `User` object, an `accessToken` string, and
  an optional `refreshToken` string as parameters. It then returns an object of type
  `SignInResponse` that contains the `id` of the user, the `accessToken`, and the `refreshToken` (if
  provided). This function is typically used to build the response payload for a successful sign-in
  operation. */
  buildPayloadResponse(
    user: User,
    accessToken: string,
    refreshToken?: string,
  ): SignInResponse {
    return {
      user: {
        id: user.id,
      },
      accessToken,
      refreshToken,
    };
  },

  /* `verifyHash` is a function that takes in two string parameters: `userPassword` and
  `passwordToCompare`. It then uses the `verify` function from the `argon2` library to compare the
  hashed `userPassword` with the `passwordToCompare`. If the two passwords match, the function
  returns a Promise that resolves to `true`. Otherwise, it returns a Promise that resolves to
  `false`. This function is typically used to verify if a user-entered password matches the hashed
  password stored in a database. */
  verifyHash(
    userPassword: string,
    passwordToCompare: string,
  ): Promise<boolean> {
    return verify(userPassword, passwordToCompare, argon2Options);
  },

  /* `hashString` is a function that takes in a string `userPassword` and returns a Promise that
  resolves to a string. The function uses the `hash` function from the `argon2` library to hash the
  `userPassword` string using the `argon2id` algorithm and the options specified in `argon2Options`.
  The resulting hash string is then returned as the resolved value of the Promise. This function is
  typically used to hash passwords before storing them in a database or comparing them with a
  previously hashed password. */
  hashString(userPassword: string): Promise<string> {
    return hash(userPassword, argon2Options);
  },

  /* `dtoToFindOptions` is a helper function that takes in a generic type `T` that extends
  `BaseFetchDto` and an object `dto` of type `T`. It then returns an object with properties `limit`,
  `skip`, and `orderBy` that are derived from the properties of `dto`. */
  dtoToFindOptions<T extends BaseFetchDto>(dto: T) {
    return {
      limit: Number(dto.limit),
      skip: Number(dto.skip),
      orderBy: {
        [dto.sortKey]: dto.sortOrder,
      },
    };
  },
};
