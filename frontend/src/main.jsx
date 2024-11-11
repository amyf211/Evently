import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <GoogleOAuthProvider clientId='811762733485-nhdpb2luhlm9l8dfafdscm69qskvr61o.apps.googleusercontent.com'>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    //</GoogleOAuthProvider>
)


