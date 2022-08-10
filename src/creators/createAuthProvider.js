import {extractFromSession} from '../utils/extractors';
import {isTokenExpired} from '../utils/isTokenExpired';
import {createAuthFetch} from './createAuthFetch';
import {createListenersContainer} from './createListenersContainer';
import {createTokenProvider} from './createTokenProvider';
import {createTokenUpdater} from './createTokenUpdater';
import {createUseAuth} from './createUseAuth';

export const createAuthProvider = ({
  storageKey = 'REACT_TOKEN_AUTH_KEY',
  onUpdateToken,
  onHydration,
  storage = sessionStorage,
  fetchFunction = fetch,
  getAccessToken,
  getExpiresIn,
  expirationThresholdMillisec = 5000,
}) => {
  const listenersContainer = createListenersContainer();
  const tokenProvider = createTokenProvider({storageKey, storage});
  const tokenUpdater = onUpdateToken && createTokenUpdater(onUpdateToken);

  let _session = tokenProvider.getToken();

  const updateSession = (session) => {
    if (session) {
      session.updated_at = Date.now();
    }
    tokenProvider.setToken(session);
    _session = session;
    listenersContainer.notify();
  };

  const login = (session) => updateSession(session);

  const logout = () => updateSession(null);

  const getSessionState = () => _session;

  const getSession = async () => {
    const expiresIn = extractFromSession(getSessionState(), getExpiresIn);

    if (_session && tokenUpdater && expiresIn && isTokenExpired(getSessionState().updated_at, expiresIn, expirationThresholdMillisec)) {
      const updatedSession = await tokenUpdater.updateToken(_session);
      updateSession(updatedSession);
    }
    return getSessionState();
  };

  const authFetch = createAuthFetch(
    async () => extractFromSession(await getSession(), getAccessToken),
    fetchFunction,
  );

  const useAuth = createUseAuth({
    getSessionState,
    onHydration,
    listenersContainer,
  });

  return {
    useAuth,
    authFetch,
    login,
    logout,
    getSession,
    getSessionState,
  };
};
