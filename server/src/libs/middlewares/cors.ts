import { Middleware } from 'koa';

const cors: Middleware = (ctx, next) => {
  const allowedHosts = [/^https:\/\/dnkdream.com/, /^https:\/\/image.dnkdream.com/];

  if (process.env.NODE_ENV === 'development') {
    allowedHosts.push(/^http:\/\/localhost/);
  }

  const { origin } = ctx.headers;

  if (origin) {
    const valid = allowedHosts.some((regex) => regex.test(origin));

    if (!valid) return next();

    ctx.set('Access-Control-Allow-Origin', origin);
    ctx.set('Access-Control-Allow-Credentials', 'true');

    if (ctx.method === 'OPTIONS') {
      ctx.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Cookie'
      );
      ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');
    }

    return next();
  } else {
    return next();
  }
};

export default cors;
