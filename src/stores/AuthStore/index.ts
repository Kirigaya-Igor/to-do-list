import { IAuthStore } from './types';
export * from './types';

export const AuthStore = (): IAuthStore => {
    return {
        isAuth: false,
        userData: null,

        setUserData(userData) {
            this.userData = userData;

            this.isAuth = !!userData;
        },
    };
};
