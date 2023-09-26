import React, { FC, MouseEvent, MutableRefObject, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useBlockBodyScroll } from 'hooks';

import { IModalProps } from './types';
import * as S from './units';

export const Modal: FC<IModalProps> = ({
    title,
    colorScheme = 'secondary',
    isBodyScrollBlocked = true,
    withCross = true,
    ...props
}) => {
    const ref = useRef() as MutableRefObject<HTMLInputElement>;

    isBodyScrollBlocked && useBlockBodyScroll(!!props.isOpen);

    const closeModalHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (e.target === ref.current) {
            props.setOpen && props.setOpen(false);
        }
    };

    const closeCrossHandler = () => {
        props.setOpen ? props.setOpen(false) : props.onClose && props.onClose();
    };

    return ReactDOM.createPortal(
        <S.ModalOverlay
            onMouseDown={closeModalHandler}
            isOpen={props.isOpen}
            isHide={props.isHide}
            {...{ ref }}
        >
            <S.ModalPaper withTitle={!!title} {...{ colorScheme, ...props }}>
                {!!title && (
                    <S.TitleWrapper>
                        <S.TitleStyled>{title}</S.TitleStyled>

                        {withCross && (
                            <S.CrossStyled onClick={closeCrossHandler} position={props.position} />
                        )}
                    </S.TitleWrapper>
                )}

                {!title && withCross && (
                    <S.CrossStyled onClick={closeCrossHandler} position={props.position} />
                )}

                {props.children}
            </S.ModalPaper>
        </S.ModalOverlay>,
        document.getElementById('modal-root') as Element,
    );
};
