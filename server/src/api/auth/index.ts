import Router from 'koa-router';
import authorized from '../../libs/middlewares/authorize';
import login from './login';
import logout from './logout';
import me from './me';

const auth = new Router();

auth.post('/login', login);
auth.post('/logout', logout);
auth.get('/me', authorized, me);

export default auth;
