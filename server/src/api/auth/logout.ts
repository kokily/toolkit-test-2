import { Context } from 'koa';
import { setCookie } from '../../libs/middlewares/authenticate';

export default async function logout(ctx: Context) {
  setCookie(ctx);

  ctx.status = 204;
}
