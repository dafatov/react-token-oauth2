export const extractFromSession = (session, func) => {
  if (!session) {
    return null;
  }
  if (func) {
    return func(session);
  }
  return session;
};
