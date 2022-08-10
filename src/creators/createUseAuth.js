import {useCallback, useEffect, useState} from 'react';

export const createUseAuth = ({
  getSessionState,
  onHydration,
  listenersContainer,
}) => {
  return () => {
    const [session, setSession] = useState(null);

    const updateIsLoggedIn = () => {
      const actualSession = getSessionState();
      if (onHydration) {
        onHydration(actualSession);
      }
      setSession(actualSession);
    };

    useEffect(() => {
      updateIsLoggedIn();
    }, []);

    const listener = useCallback(() => {
      updateIsLoggedIn();
    }, []);

    useEffect(() => {
      listenersContainer.subscribe(listener);
      return () => {
        listenersContainer.unsubscribe(listener);
      };
    }, [listener]);

    return [!!session, session];
  };
};
