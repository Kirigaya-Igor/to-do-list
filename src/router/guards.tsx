import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useRootStore } from 'stores/initStore';

import { SIGN_IN_PATH } from './const';
import * as T from './types';

export const AuthorizedRoute: FC<T.IRoute> = observer(({ children }) => {
    const {
        authStore: { isAuth },
    } = useRootStore();

    if (isAuth) {
        return children;
    }

    return <Navigate to={SIGN_IN_PATH} replace />;
});

export const NotAuthorizedRoute: FC<T.IRoute> = observer(({ children }) => {
    const {
        authStore: { isAuth },
    } = useRootStore();

    if (isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
});
