import React, { useState } from 'react';

import { Checkbox } from 'components/interactions';
import { Expand } from 'components/other';

import * as S from './units';

export const ListItem = () => {
    const [isOpen, setOpen] = useState(false);

    const [isChecked, setChecked] = useState(false);

    const editModalHandler = (e: any, listId: string) => {
        e.stopPropagation();

        console.log('open', listId);
    };

    return (
        <S.PaperStyled>
            <S.Header onClick={() => setOpen(!isOpen)}>
                <S.ListName>ListName</S.ListName>

                <S.Progress>(progress: 7/10)</S.Progress>

                <S.Date>created date: 20.09.2023</S.Date>

                <S.CircleButtonStyled size="small" onClick={(e) => editModalHandler(e, '12')}>
                    Edit
                </S.CircleButtonStyled>

                <S.PivotArrowStyled isActive={isOpen} isReverse={isOpen} />
            </S.Header>

            <Expand {...{ isOpen }}>
                <S.ExpandContent>
                    <S.CheckbowWrapper onClick={() => setChecked(!isChecked)}>
                        <Checkbox value={isChecked} />

                        <S.CheckboxText>test task</S.CheckboxText>
                    </S.CheckbowWrapper>

                    <S.CheckbowWrapper onClick={() => setChecked(!isChecked)}>
                        <Checkbox value={isChecked} />

                        <S.CheckboxText>test task</S.CheckboxText>
                    </S.CheckbowWrapper>
                </S.ExpandContent>
            </Expand>
        </S.PaperStyled>
    );
};
