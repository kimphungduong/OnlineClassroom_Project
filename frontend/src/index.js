import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}> 
        <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId={clientId}>
                <React.StrictMode>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </React.StrictMode>
            </GoogleOAuthProvider>
        </PersistGate>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
