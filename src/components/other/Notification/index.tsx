import React, { FC } from 'react';

import { Loader } from 'components/core';

import * as T from './types';
import * as S from './units';

export const Notification: FC<T.INotification> = ({ type = 'info', ...props }) => {
    return (
        <S.Wrapper withButton={!!props.buttonText} {...{ type }} {...props}>
            {props.isLoading && <Loader />}

            {type === 'info' && <S.InfoIcon />}

            <S.Text>{props.children}</S.Text>

            {!!props.buttonText && (
                <S.CircleButtonStyled
                    styleScheme="outline"
                    size="small"
                    onClick={props.onClickButtonHandler}
                >
                    {props.buttonText}
                </S.CircleButtonStyled>
            )}
        </S.Wrapper>
    );
};
