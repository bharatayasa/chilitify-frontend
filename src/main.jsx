import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './context/ScrollToTop.jsx';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
            <ScrollToTop />
            <App />
        </BrowserRouter>
    </AuthProvider>,
)