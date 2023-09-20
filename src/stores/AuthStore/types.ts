import { Nullable } from 'types/common';

export interface IAuthStore {
    isAuth: boolean;
    userData: Nullable<Record<string, any>>;

    setUserData: (userData: Nullable<Record<string, any>>) => void;
}
