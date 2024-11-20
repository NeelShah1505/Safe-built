import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HashRouter ,Routes, Route} from "react-router-dom";
import App from './App';
import Page from './Page';
import './index.scss';
import './index.css';
import { IdentityProvider } from './IdentityContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <IdentityProvider>
    <HashRouter basename="/">
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/page" element={<Page />} />
      </Routes>
    </HashRouter>
  </IdentityProvider>
);
