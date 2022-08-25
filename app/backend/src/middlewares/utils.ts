const throwUnexistUserError = (message: string): string => {
  const err = new Error(message);
  err.name = 'unexistUserError';
  throw err;
};

const throwInvalidError = (message: string): string => {
  const err = new Error(message);
  err.name = 'invalidError';
  throw err;
};

export { throwInvalidError };

export default throwUnexistUserError;
