const throwUnexistUserError = (message: string): string => {
  const err = new Error(message);
  err.name = 'unexistUserError';
  throw err;
};

export default throwUnexistUserError;
