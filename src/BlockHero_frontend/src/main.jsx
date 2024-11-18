import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HashRouter ,Routes, Route} from "react-router-dom";
import App from './App';
import Page from './Page';
import './index.scss';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter basename="/">
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/page" element={<Page />} />
    </Routes>
  </HashRouter>
);
