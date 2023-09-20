import { Dispatch } from 'react';

export interface ICheckbox {
    value: boolean;
    text?: string;

    setValue?: Dispatch<React.SetStateAction<boolean>>;
}
