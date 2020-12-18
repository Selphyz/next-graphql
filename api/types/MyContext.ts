import { Request, Response } from 'express';

export interface MyContext {
  req: Request;
  res: Response;
}
export default MyContext;
