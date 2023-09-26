import { ReactNode } from 'react';

export interface ICrossPosition {
    top: string;
    right: string;
}

export interface IModalProps {
    children?: ReactNode;

    colorScheme?: 'primary' | 'secondary';
    title?: string | ReactNode;
    position?: ICrossPosition;

    isHide?: boolean;
    isOpen?: boolean;
    isBodyScrollBlocked?: boolean;
    withCross?: boolean;

    onClose?: () => void;
    setOpen?: (bool: boolean) => void;
}

export interface IModalOverlayProps extends Pick<IModalProps, 'isHide' | 'isOpen'> {
    isSideMenuOpen?: boolean;
    withTitle?: boolean;
}
