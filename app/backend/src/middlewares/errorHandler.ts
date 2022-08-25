import { NextFunction, Request, Response } from 'express';

const errors: Record<string, number> = {
  unexistUserError: 400,
};

interface Ierror {
  name: string;
  message: string;
}

const errorHandler = (
  { name, message }: Ierror,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[name];

  if (!status) return res.status(500).json({ message });

  res.status(status).json({ message });
};

export default errorHandler;
