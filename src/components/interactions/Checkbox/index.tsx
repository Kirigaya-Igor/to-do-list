import React, { FC } from 'react';

import { ICheckbox } from './types';
import * as S from './units';

export const Checkbox: FC<ICheckbox> = (props) => {
    const onToggleHandler = () => {
        !!props.setValue && props.setValue(!props.value);
    };

    return (
        <S.Wrapper onClick={onToggleHandler} {...props}>
            <S.Checkbox value={props.value} />

            {!!props.text && <p>{props.text}</p>}
        </S.Wrapper>
    );
};
