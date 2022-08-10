export const createAuthFetch = (getAccessToken, fetchFunction) => {
  return async (input, init) => {
    const accessToken = await getAccessToken();

    init = init || {};
    init.headers = init.headers || {};

    if (accessToken) {
      init.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn(
        '\'authFetch\' was called without access token. Probably storage has no session or session were expired',
      );
    }

    return fetchFunction(input, init);
  };
};
