import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Token } from '../../entities/Token';
import { setCookie } from '../../libs/middlewares/authenticate';

export default async function logout(ctx: Context) {
  try {
    const id: string = ctx.state.admin_id;

    if (!id) {
      ctx.status = 401;
      return;
    }

    await getRepository(Token).delete({ fk_admin_id: id });

    setCookie(ctx);
    ctx.state.admin_id = undefined;

    ctx.status = 204;
  } catch (err) {
    console.log(ctx.state.admin_id);
    if (err instanceof Error) {
      ctx.throw(500, err);
    }
  }
}
