import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from 'firebaseInit';
import { observer } from 'mobx-react';
import { IList, Nullable } from 'types/common';

import { ListModal } from 'components/widgets';

import { useRootStore } from 'stores/initStore';

import * as STYLE from '../units';

import { ListItem } from './ListItem';
import * as S from './units';

export const MainPage = observer(() => {
    const { authStore } = useRootStore();

    const [listsArr, setListsArr] = useState<IList[]>([]);
    const [filtredListsArr, setFiltredListsArr] = useState<IList[]>([]);

    const [searchValue, setSearchValue] = useState('');

    const [isListModalOpen, setListModalOpen] = useState(false);

    const [editListData, setEditListData] = useState<Nullable<IList>>(null);

    useEffect(() => {
        if (authStore.userData) {
            onValue(ref(database, `${authStore.userData.uid}`), (snapshot) => {
                const data = snapshot.val();

                setListsArr(data || []);
            });
        }
    }, [authStore.userData]);

    useEffect(() => {
        setFiltredListsArr(listsArr.filter((list) => list.listName.includes(searchValue)));
    }, [listsArr, searchValue]);

    const listEditHandler = (listId: number) => {
        setListModalOpen(true);
        setEditListData(listsArr.find((list) => list.id === listId)!);
    };

    return (
        <STYLE.PageWrapper>
            <S.SearchWrapper>
                <S.SearchInputStyled {...{ searchValue, setSearchValue }} />

                <S.ButtonInputStyled size="small" onClick={() => setListModalOpen(true)}>
                    Create new list
                </S.ButtonInputStyled>
            </S.SearchWrapper>

            <S.Content>
                {filtredListsArr.map((list) => (
                    <ListItem key={list.id} listData={list} {...{ listsArr, listEditHandler }} />
                ))}
            </S.Content>

            <ListModal
                isOpen={isListModalOpen}
                setOpen={setListModalOpen}
                {...{ listsArr, editListData, setEditListData }}
            />
        </STYLE.PageWrapper>
    );
});
