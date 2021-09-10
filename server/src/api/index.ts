import Router from 'koa-router';
import auth from './auth';
import notices from './noties';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/notices', notices.routes());

export default api;
