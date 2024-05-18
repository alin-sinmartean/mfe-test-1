import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, data) => {
  console.log('ell', el)
  console.log("dataa", data)
  const { onNavigate, defaultHistory, initialPath } = data;
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  console.log("222", onNavigate);
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App history={history} />,
    el
  );

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
}

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {

  const devRoot = document.querySelector('#_marketing-dev-root');
  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory()
    });
  }
}


// We are running through container and we should export the mount function
export { mount };