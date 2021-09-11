import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Admin } from '../../entities/Admin';

export default async function me(ctx: Context) {
  const adminId = ctx.state.admin_id;

  try {
    const admin = await getRepository(Admin).findOne({ id: adminId });

    if (!admin) {
      ctx.status = 401;
      return;
    }

    ctx.body = admin.id;
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(500, err);
    }
  }
}
