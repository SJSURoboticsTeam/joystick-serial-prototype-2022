import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const STARTER_COMMAND = [{ speed: 0, angle: 0, mode: 'D', wheel_orientation: 0 }];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App commands={STARTER_COMMAND} />
  </React.StrictMode>
);
