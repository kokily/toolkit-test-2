import Router from 'koa-router';
import authorized from '../../libs/middlewares/authorize';
import add from './add';
import list from './list';

const notices = new Router();

notices.post('/', authorized, add);
notices.get('/', list);

export default notices;
