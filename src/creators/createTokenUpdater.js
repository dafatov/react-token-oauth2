export const createTokenUpdater = (onUpdateToken) => {
  let updatingPromise = null;

  const updateToken = async (session) => {
    if (updatingPromise) {
      return updatingPromise;
    }
    updatingPromise = onUpdateToken(session).then((updatedSession) => {
      updatingPromise = null;
      return updatedSession;
    });
    return updatingPromise;
  };

  return {updateToken};
};
