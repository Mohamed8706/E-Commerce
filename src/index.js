import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css"
import "./Css/components/loading.css"
import "./Css/components/button.css"
import "./Css/components/alerts.css"
import "./Css/components/google.css"
import "./Pages/Auth/AuthOperations/auth.css"
import "./Pages/Dashboard/dashboard.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import  MenuContext  from './context/menucontext';
import WindowResize from './context/windowresize';
import 'animate.css';
import './custom.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <WindowResize>
    <MenuContext>
    <Router>
    <App />
    </Router>
    </MenuContext>
    </WindowResize>
    </React.StrictMode>
);


