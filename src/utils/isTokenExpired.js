export const isTokenExpired = (expiresIn, thresholdMillisec) => {
  if (!expiresIn) {
    return false;
  }
  return Date.now() > expiresIn - (thresholdMillisec
    ? thresholdMillisec
    : 0);
};
