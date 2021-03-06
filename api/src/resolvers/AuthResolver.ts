import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { UserModel } from '../entity/User';
import { AuthInput } from '../types/AuthInput';
import { MyContext } from '../types/MyContext';
import { UserResponse } from '../types/UserResponse';
import { Password } from '../utils/password';

const invalidLoginResponse = {
  errors: [
    {
      path: 'email',
      message: 'invalid login',
    },
  ],
};

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input')
    { email, password }: AuthInput,
  ): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return {
        errors: [
          {
            path: 'email',
            message: 'already in use',
          },
        ],
      };
    }

    const hashedPassword = await Password.toHash(password);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'aslkdfjoiq12312');

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(@Arg('input') { email, password }: AuthInput): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return invalidLoginResponse;
    }

    const valid = await Password.compare(user.password, password);

    if (!valid) {
      return invalidLoginResponse;
    }

    const payload = {
      id: user.id,
    };

    // Store it on session object
    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'aslkdfjoiq12312');

    return { user, token };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session?.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        return res(true);
      }),
    );
  }
}
