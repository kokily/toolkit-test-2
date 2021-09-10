import { Context } from 'koa';
import { getManager, getRepository } from 'typeorm';
import { Notice } from '../../entities/Notice';

export default async function list(ctx: Context) {
  const { title, tag, cursor }: { title?: string; tag?: string; cursor?: string } =
    ctx.query;

  try {
    const query = await getManager()
      .createQueryBuilder(Notice, 'notices')
      .limit(20)
      .orderBy('notices.created_at', 'DESC')
      .addOrderBy('notices.id', 'DESC');

    if (title) {
      query.andWhere('notices.created_at like :title', {
        title: `%${title}%`,
      });
    }

    if (tag) {
      query.andWhere(":tag = ANY (string_to_array(notices.tags, ','))", {
        tag,
      });
    }

    if (cursor) {
      const notice = await getRepository(Notice).findOne({ id: cursor });

      if (!notice) {
        ctx.throw(404, 'NoContent');
      }

      query.andWhere('notices.created_at < :date', {
        date: notice.created_at,
      });

      query.orWhere('notices.created_at = :date AND notices.id < :id', {
        date: notice.created_at,
        id: notice.id,
      });
    }

    const notices = await query.getMany();

    ctx.body = notices;
  } catch (err) {
    if (err instanceof Error) {
      ctx.throw(500, err);
    }
  }
}
