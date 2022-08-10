export const createListenersContainer = () => {
  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  const unsubscribe = (listener) => {
    listeners = listeners.filter((l) => l !== listener);
  };

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

  return {subscribe, unsubscribe, notify};
};
