import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BusState from "./context/BusContext/BusState";
import UserState from "./context/UserContext/UserState";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BusState>
    <UserState>
    <App />
    </UserState>
    </BusState>
  </React.StrictMode>
);


reportWebVitals();
