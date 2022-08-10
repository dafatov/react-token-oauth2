export const createAuthFetch = (getAccessToken, fetchFunction) => {
  return async (input, init) => {
    const accessToken = await getAccessToken();

    init = init || {};

    if (accessToken) {
      init.headers = {
        ...init.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    } else {
      console.warn(
        '\'authFetch\' was called without access token. Probably storage has no session or session were expired',
      );
    }

    return fetchFunction(input, init);
  };
};
