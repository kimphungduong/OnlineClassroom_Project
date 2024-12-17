import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { logout, refreshToken } from './store/slices/authSlice';
import { useSelector } from 'react-redux';

function AppContent() {
    // const dispatch = useDispatch();
    // var persistedState = localStorage.getItem('persist:auth') || null;
    // var accessToken = null;

    // if (persistedState !== null) {
    //     try {
    //         const authState = JSON.parse(persistedState);
    //         if (authState && authState.accessToken) {
    //             accessToken = authState.accessToken;
    //         } else {
    //             console.warn("persistedState không chứa accessToken hợp lệ:", authState);
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi parse persistedState từ localStorage:", error);
    //     }
    // }
    // var isExpToken = (token) => {
        
    //     if (!token || token === "null") {
    //         return true;
    //     }
    //     const jwt = JSON.parse(atob(token.split('.')[1]));
    //     const exp = jwt.exp * 1000;
    //     const now = new Date().getTime();
    //     return now > exp;
    // }
    // useEffect(() => {
    //     const checkAndRefreshToken = async () => {
    //         var checkAccessToken = isExpToken(accessToken);
    //         // Kiểm tra xem accessToken có hết hạn không
    //         if (checkAccessToken && accessToken) {
    //             try {
    //                 await dispatch(refreshToken()).unwrap();
    //             } catch (error) {
    //                 console.error("Làm mới token thất bại:", error);
    //                 dispatch(logout()); // Logout nếu refresh token thất bại
    //             }
    //         }
    //     };

    //     checkAndRefreshToken();
    // }, []);
    const [rehydrated, setRehydrated] = useState(false);
    const auth = useSelector((state) => state.auth);
  
    useEffect(() => {
      // Đảm bảo Redux Persist đã hoàn thành rehydrate
      persistor.subscribe(() => {
        if (persistor.getState().bootstrapped) {
          setRehydrated(true);
        }
      });
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        let Auth = route.auth;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = React.Fragment;
                        }

                        if (!route.auth) {
                            Auth = ({ children }) => <>{children}</>;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Auth>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </Auth>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppContent />
            </PersistGate>
        </Provider>
    );
}

export default App;