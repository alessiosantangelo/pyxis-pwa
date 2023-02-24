import './index.scss'
import '@pyxis/scss/dist/pyxis.css'

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import logoSVG from './images/logo.svg'
import reportWebVitals from './reportWebVitals';

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    
    const registerServiceWorker = () => 
      navigator.serviceWorker.register("/service-worker.js")
        .then((registration) => registration) 
        .catch(() => console.error('Unable to register Service Worker. That makes impossibile to enable PWA features.'))
      
    registerServiceWorker();
  
    const askPermission = () => {
      return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
          resolve(result);
        });
    
        if (permissionResult) {
          permissionResult.then(resolve, reject);
        }
      }).then(function (permissionResult) {
        if (permissionResult !== 'granted') {
          throw new Error("We weren't granted permission.");
        }
      });
    }
    
    if ('Notification' in window) {
      if (window.Notification.permission === 'granted') {
        new Notification('Welcome to the PWA', {
          image: logoSVG,
          icon: logoSVG,
          body: 'Lorem ipsum dolor sit amet.',
          vibrate: [200, 100, 200]
        })
      }
      else {
        askPermission();
      }
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
