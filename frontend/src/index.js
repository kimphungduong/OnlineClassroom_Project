import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </ThemeProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
