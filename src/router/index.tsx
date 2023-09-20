import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from 'firebaseInit';
import { observer } from 'mobx-react';

import { Header, MobileMenu } from 'components/core';

import { useMountEffect } from 'hooks';
import * as PAGES from 'pages';
import { useRootStore } from 'stores/initStore';
import { dark, light } from 'styles/themes';

import * as C from './const';
import { AuthorizedRoute, NotAuthorizedRoute } from './guards';
import * as S from './units';

export const NavigationRouter = observer(() => {
    const { commonStore, authStore } = useRootStore();

    const [isAccountLoading, setAccountLoading] = useState(true);

    const currentTheme = commonStore.isLight ? light : dark;

    useMountEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authStore.setUserData(user);
            } else {
                signOut(auth)
                    .then(() => {
                        authStore.setUserData(null);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            setAccountLoading(false);
        });
    });

    useEffect(() => {
        document.body.style.color = commonStore.isLight ? '#092636' : '#ffffff';

        document.body.style.backgroundColor = commonStore.isLight ? '#ffffff' : '#1E2934';
    }, [commonStore.isLight]);

    return (
        <ThemeProvider theme={currentTheme}>
            <Router>
                <S.MainWrapper>
                    <Header />

                    <MobileMenu />

                    {isAccountLoading ? (
                        <S.LoaderStyled />
                    ) : (
                        <Routes>
                            <Route
                                path={C.MAIN_PAGE}
                                element={
                                    <AuthorizedRoute>
                                        <PAGES.MainPage />
                                    </AuthorizedRoute>
                                }
                            />

                            <Route
                                path={C.SIGN_IN_PATH}
                                element={
                                    <NotAuthorizedRoute>
                                        <PAGES.SignInPage />
                                    </NotAuthorizedRoute>
                                }
                            />

                            <Route
                                path={C.SIGN_UP_PATH}
                                element={
                                    <NotAuthorizedRoute>
                                        <PAGES.SignUpPage />
                                    </NotAuthorizedRoute>
                                }
                            />

                            <Route path="*" element={<PAGES.MainPage />} />
                        </Routes>
                    )}
                </S.MainWrapper>
            </Router>
        </ThemeProvider>
    );
});
