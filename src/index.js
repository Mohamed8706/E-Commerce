import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css"
import "./Css/components/loading.css"
import "./Css/components/button.css"
import "./Css/components/alerts.css"
import "./Css/components/google.css"
import "./Pages/Auth/auth.css"
import 'bootstrap/dist/css/bootstrap.min.css';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <Router>
    <App />
    </Router>
    </React.StrictMode>
);


