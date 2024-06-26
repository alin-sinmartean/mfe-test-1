import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co' // putem sa-l punem si ca altceva daca vrem, ideea e sa fie unic.
  // e practic ca un fel de namespace
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false) }/>
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='/auth' >
                <AuthLazy  onSignIn={() => setIsSignedIn(true) }/>
              </Route>
              <Route path='/' component={MarketingLazy} />

            </Switch>
          </Suspense>
          {/* <MarketingApp /> */}
        </div>
      </StylesProvider>
    </BrowserRouter>
  )
}