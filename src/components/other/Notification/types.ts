import { ReactNode } from 'react';

export interface INotification {
    children?: ReactNode;

    type?: 'info' | 'warning' | 'error';
    buttonText?: string;
    isLoading?: boolean;

    onClickButtonHandler?: () => void;
}
