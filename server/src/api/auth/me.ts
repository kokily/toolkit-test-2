import { Context } from 'koa';
import { setCookie } from '../../libs/middlewares/authenticate';
import { AccessTokenType, decodeToken } from '../../libs/token';

export default async function me(ctx: Context) {
  try {
    const accessToken: string | undefined = ctx.cookies.get('access_token');

    if (!accessToken) {
      return;
    }

    const accessTokenData = await decodeToken<AccessTokenType>(accessToken);

    if (accessTokenData.admin_id === ctx.state.admin_id) {
      ctx.body = ctx.state.admin_id;
    } else {
      setCookie(ctx);
      ctx.status = 204;
    }
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(500, err);
    }
  }
}
