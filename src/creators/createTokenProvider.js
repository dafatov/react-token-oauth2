export const createTokenProvider = ({storageKey, storage}) => {
  const parseToken = (data) => (data && JSON.parse(data)) || null;
  const decodeToken = (token) => JSON.stringify(token);

  const getToken = () => {
    return parseToken(storage.getItem(storageKey));
  };

  const setToken = (token) => {
    return token
      ? storage.setItem(storageKey, decodeToken(token))
      : storage.removeItem(storageKey);
  };

  return {
    getToken,
    setToken,
  };
};
