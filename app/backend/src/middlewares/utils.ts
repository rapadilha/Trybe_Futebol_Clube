const throwInvalidTokenError = (message: string): string => {
  const err = new Error(message);
  err.name = 'invalidTokenError';
  throw err;
};

const throwInvalidError = (message: string): string => {
  const err = new Error(message);
  err.name = 'invalidError';
  throw err;
};

export { throwInvalidError };

export default throwInvalidTokenError;
