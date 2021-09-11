import { Context, Middleware } from 'koa';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Admin } from '../../entities/Admin';
import { getRepository } from 'typeorm';
import { Token } from '../../entities/Token';

export type TokenType = {
  iat: number;
  exp: number;
  sub: string;
  iss: string;
};

export type AccessTokenType = {
  admin_id: string;
} & TokenType;

export type RefreshTokenType = {
  admin_id: string;
  token_id: string;
} & TokenType;

export const generateToken = async (
  payload: any,
  options?: SignOptions
): Promise<string> => {
  const secretKey = process.env.TOKEN_SECRET!;
  const jwtOptions: SignOptions = {
    issuer: 'dnkdream.com',
    expiresIn: '15d',
    ...options,
  };

  if (!jwtOptions.expiresIn) {
    delete jwtOptions.expiresIn;
  }

  return new Promise((resolve, reject) => {
    if (!secretKey) return;

    jwt.sign(payload, secretKey, jwtOptions, (err, token) => {
      if (err || token === undefined) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

export const decodeToken = async <T = any>(token: string): Promise<T> => {
  const secretKey = process.env.TOKEN_SECRET!;

  return new Promise((resolve, reject) => {
    if (!secretKey) return;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as any);
    });
  });
};

export function setCookie(
  ctx: Context,
  tokens?: { accessToken: string; refreshToken: string }
) {
  if (tokens) {
    ctx.cookies.set('access_token', tokens.accessToken, {
      httpOnly: tokens.accessToken ? true : undefined,
      domain: process.env.NODE_ENV === 'production' ? '.dnkdream.com' : undefined,
      secure: process.env.NODE_ENV === 'production' && true,
      sameSite: 'lax',
      maxAge: tokens.accessToken ? 1000 * 60 * 60 : undefined,
    });

    ctx.cookies.set('refresh_token', tokens.refreshToken, {
      httpOnly: tokens.refreshToken ? true : undefined,
      domain: process.env.NODE_ENV === 'production' ? '.dnkdream.com' : undefined,
      secure: process.env.NODE_ENV === 'production' && true,
      sameSite: 'lax',
      maxAge: tokens.refreshToken ? 1000 * 60 * 60 * 24 * 30 : undefined,
    });
  } else {
    ctx.cookies.set('access_token');
    ctx.cookies.set('refresh_token');
  }
}

export const refresh = async (ctx: Context, refreshToken: string) => {
  try {
    const decoded = await decodeToken<RefreshTokenType>(refreshToken);

    const admin = await getRepository(Admin).findOne(decoded.admin_id);
    if (!admin) {
      const error = new Error('InvalidUserError');
      throw error;
    }
    const tokens = await admin.refreshAdminToken(
      decoded.token_id,
      decoded.exp,
      refreshToken
    );

    setCookie(ctx, tokens);

    return decoded.admin_id;
  } catch (err) {
    throw err;
  }
};

const jwtMiddleware: Middleware = async (ctx, next) => {
  let accessToken: string | undefined = ctx.cookies.get('access_token');
  const refreshToken: string | undefined = ctx.cookies.get('refresh_token');

  const { authorization } = ctx.request.headers;

  if (!accessToken && authorization) {
    accessToken = authorization.split(' ')[1];
  }

  try {
    if (!accessToken) {
      throw new Error('NoAccessToken');
    }

    const accessTokenData = await decodeToken<AccessTokenType>(accessToken);

    ctx.state.admin_id = accessTokenData.admin_id;

    const diff = accessTokenData.exp * 1000 - new Date().getTime();

    if (diff < 1000 * 60 * 30 && refreshToken) {
      await refresh(ctx, refreshToken);
    }
  } catch (err) {
    if (!refreshToken) {
      return next();
    }

    try {
      const adminId = await refresh(ctx, refreshToken);

      ctx.state.admin_id = adminId;
    } catch (err) {}
  }

  return next();
};

export default jwtMiddleware;
