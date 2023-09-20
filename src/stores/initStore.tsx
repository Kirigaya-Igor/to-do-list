import React, { createContext, FC, ReactNode } from 'react';
import { useLocalObservable } from 'mobx-react';

import { AuthStore, IAuthStore } from './AuthStore';
import { CommonStore, ICommonStore } from './CommonStore';

interface IStoreContext {
    commonStore: ICommonStore;
    authStore: IAuthStore;
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext);

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const commonStore = useLocalObservable(CommonStore);
    const authStore = useLocalObservable(AuthStore);

    const stores = {
        commonStore,
        authStore,
    };

    return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>;
};

export const useRootStore = () => {
    const rootStore = React.useContext(StoreContext);

    if (!rootStore) {
        throw new Error('useStore must be used within a StoreProvider');
    }

    return rootStore;
};
