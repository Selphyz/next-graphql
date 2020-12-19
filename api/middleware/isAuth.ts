import jwt from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import MyContext from '../types/MyContext';

const APP_SECRET = process.env.SESSION_SECRET || 'sdfgggrtgm56j';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authoritation = context.req.headers['authorization'];
  try {
    const token = authoritation?.replace('Bearer', '');
    const user = jwt.verify(token!, APP_SECRET) as any;
    context.res.locals.userId = user.id;
    return next();
  }catch(err){
    throw new Error(err.message);
  }
};
