import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux'; // Import the provider from redux if using Redux

import store from './store'; // Import your Redux store
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <Provider store={store}>  {/* Wrap your App in the Provider */}
      <App />
    </Provider>
    </Router>
  </StrictMode>
);
