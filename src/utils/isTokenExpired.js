export const isTokenExpired = (updatedAt, expiresIn, thresholdMillisec) => {
  if (!expiresIn) {
    return false;
  }
  return Date.now() - updatedAt > 1000 * expiresIn - (thresholdMillisec
    ? thresholdMillisec
    : 0);
};
