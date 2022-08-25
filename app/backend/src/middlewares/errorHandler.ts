import { NextFunction, Request, Response } from 'express';

const errors: Record<string, number> = {
  unexistUserError: 400,
  validationError: 400,
};

interface Ierror {
  name: string;
  message: string;
  isJoi: object
}

const errorHandler = (
  error: Ierror,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errors[error.name];

  if (error.isJoi) return res.status(400).json({ message: error.message });

  if (!status) return res.status(500).json({ message: error.message });

  res.status(status).json({ message: error.message });
};

export default errorHandler;
