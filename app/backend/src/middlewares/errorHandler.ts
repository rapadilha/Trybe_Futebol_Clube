import { NextFunction, Request, Response } from 'express';

const errors: Record<string, number> = {
  invalidTokenError: 400,
  invalidError: 401,
  'string.empty': 400,
};

interface Ierror{
  name: string;
  message: string;
  isJoi: object
  details: Array<any>
}

const errorHandler = (
  error: Ierror,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // console.log(error);

  if (error.isJoi) {
    const statusJoi = errors[error.details[0].type];

    return res.status(statusJoi).json({ message: error.message });
  }

  const status = errors[error.name];

  if (!status) return res.status(500).json({ message: error.message });

  res.status(status).json({ message: error.message });
};

export default errorHandler;
