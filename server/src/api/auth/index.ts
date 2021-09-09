import Router from 'koa-router';
import login from './login';
import logout from './logout';
import me from './me';

const auth = new Router();

auth.post('/login', login);
auth.post('/logout', logout);
auth.get('/me', me);

export default auth;
