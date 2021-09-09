import { Context } from 'koa';
import Joi from 'joi';
import { validateBody } from '../../libs/utils';
import { getManager } from 'typeorm';
import { Admin } from '../../entities/Admin';
import { setCookie } from '../../libs/middlewares/authenticate';

export default async function login(ctx: Context) {
  type RequestType = {
    password: string;
  };

  const schema = Joi.object().keys({
    password: Joi.string().min(4).required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { password }: RequestType = ctx.request.body;

  try {
    const admin = await getManager().createQueryBuilder(Admin, 'admin').getOne();

    if (!admin) {
      ctx.status = 404;
      ctx.body = {
        name: '관리자가 등록되지 않았습니다',
      };
      return;
    }

    const valid = await admin.validPassword(password);

    if (!valid) {
      ctx.status = 401;
      ctx.body = {
        name: '비밀번호가 틀렸습니다',
      };
      return;
    }

    const tokens = await admin.generateToken();

    setCookie(ctx, tokens);

    ctx.body = {
      tokens: {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(500, err);
    }
  }
}
