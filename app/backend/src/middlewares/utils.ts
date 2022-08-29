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

const throwTeamsError = (message: string): string => {
  const err = new Error(message);
  err.name = 'teamsError';
  throw err;
};

export { throwInvalidError, throwTeamsError };

export default throwInvalidTokenError;
