import React, { useState } from 'react';
import { observer } from 'mobx-react';

// import { useRootStore } from 'stores/initStore';
import * as STYLE from '../units';

import { ListItem } from './ListItem';
import * as S from './units';

export const MainPage = observer(() => {
    // const { authStore } = useRootStore();
    // authStore.userData
    const [searchValue, setSearchValue] = useState('');

    return (
        <STYLE.PageWrapper>
            <S.SearchWrapper>
                <S.SearchInputStyled {...{ searchValue, setSearchValue }} />

                <S.ButtonInputStyled size="small">Create new list</S.ButtonInputStyled>
            </S.SearchWrapper>

            <S.Content>
                <ListItem />

                <ListItem />

                <ListItem />
            </S.Content>
        </STYLE.PageWrapper>
    );
});
