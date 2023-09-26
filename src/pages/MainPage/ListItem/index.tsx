import React, { FC, useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from 'firebaseInit';
import { observer } from 'mobx-react';

import { Checkbox } from 'components/interactions';
import { Expand } from 'components/other';

import { useRootStore } from 'stores/initStore';
import { getFormatedDate } from 'utils';

import * as T from './types';
import * as S from './units';

export const ListItem: FC<T.IListItem> = observer((props) => {
    const { authStore } = useRootStore();

    const [isOpen, setOpen] = useState(false);

    const date = getFormatedDate(props.listData.date);

    const tasks = props.listData.tasks;
    const doneTasks = tasks.filter((task) => task.isDone);

    const editModalHandler = (e: any, listId: number) => {
        e.stopPropagation();

        props.listEditHandler(listId);
    };

    const taskStatusHandler = (listId: number, taskId: number) => {
        if (authStore.userData) {
            set(
                ref(database, `${authStore.userData.uid}`),
                props.listsArr.map((list) =>
                    list.id === listId
                        ? {
                              ...list,
                              tasks: list.tasks.map((task) =>
                                  task.id === taskId ? { ...task, isDone: !task.isDone } : task,
                              ),
                          }
                        : list,
                ),
            );
        }
    };

    return (
        <S.PaperStyled>
            <S.Header onClick={() => setOpen(!isOpen)}>
                <S.ListName>{props.listData.listName}</S.ListName>

                <S.Progress>{`(progress: ${doneTasks.length}/${tasks.length})`}</S.Progress>

                <S.Date>created date: {`${date.day}.${date.month}.${date.year}`}</S.Date>

                <S.ButtonsWrapper>
                    <S.CircleButtonStyled
                        size="small"
                        onClick={(e) => editModalHandler(e, props.listData.id)}
                    >
                        Edit
                    </S.CircleButtonStyled>

                    <S.PivotArrowStyled isActive={isOpen} isReverse={isOpen} />
                </S.ButtonsWrapper>
            </S.Header>

            <Expand {...{ isOpen }}>
                <S.ExpandContent>
                    {props.listData.tasks.map((task) => (
                        <S.CheckbowWrapper
                            key={task.id}
                            onClick={() => taskStatusHandler(props.listData.id, task.id)}
                        >
                            <Checkbox value={task.isDone} />

                            <S.CheckboxText isDone={task.isDone}>{task.taskName}</S.CheckboxText>
                        </S.CheckbowWrapper>
                    ))}
                </S.ExpandContent>
            </Expand>
        </S.PaperStyled>
    );
});
