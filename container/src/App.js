import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const createGenerateClassName = createGenerateClassName({
  productionPrefix: 'co' // putem sa-l punem si ca altceva daca vrem, ideea e sa fie unic.
  // e practic ca un fel de namespace
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider createGenerateClassName={createGenerateClassName}>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </StylesProvider>
    </BrowserRouter>
  )
}