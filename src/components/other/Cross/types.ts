export interface ICross {
    size?: 'small' | 'normal';
    type?: 'delete' | 'default';

    onClick?: (event: any) => void;
}
