import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ref, set } from 'firebase/database';
import { database } from 'firebaseInit';
import { observer } from 'mobx-react';
import { ITask } from 'types/common';

import { Modal } from 'components/containers';
import { Input } from 'components/interactions';

import { useRootStore } from 'stores/initStore';

import { TaskInput } from './TaskInput';
import * as T from './types';
import * as S from './units';

const defaultTask = {
    id: 1,
    taskName: '',
    isDone: false,
};

export const ListModal: FC<T.IListModal> = observer((props) => {
    const { authStore } = useRootStore();

    const [listName, setListName] = useState('');

    const [tasksArr, setTasksArr] = useState<ITask[]>([defaultTask]);

    const { t } = useTranslation();

    const conditionForButtonDisabled = !listName || tasksArr.some((task) => !task.taskName);

    useEffect(() => {
        if (!!props.editListData) {
            setListName(props.editListData.listName);
            setTasksArr(props.editListData.tasks);
        }
    }, [props.editListData, props.isOpen]);

    useEffect(() => {
        if (!props.isOpen) {
            setListName('');
            setTasksArr([defaultTask]);
            props.setEditListData(null);
        }
    }, [props.isOpen]);

    const newTaskHandler = () => {
        setTasksArr([
            ...tasksArr,
            {
                ...defaultTask,
                id: Date.now(),
            },
        ]);
    };

    const taskStatusHandler = (taskId: number) => {
        setTasksArr(
            tasksArr.map((task) => (task.id === taskId ? { ...task, isDone: !task.isDone } : task)),
        );
    };

    const taskNameHandler = (taskId: number, taskName: string) => {
        setTasksArr(tasksArr.map((task) => (task.id === taskId ? { ...task, taskName } : task)));
    };

    const deleteTaskHandler = (taskId: number) => {
        setTasksArr(tasksArr.filter((task) => task.id !== taskId));
    };

    const createListHandler = () => {
        if (authStore.userData) {
            set(ref(database, `${authStore.userData.uid}`), [
                ...props.listsArr,
                {
                    id: Date.now(),
                    listName,
                    date: Date.now(),
                    tasks: tasksArr,
                },
            ]);

            props.setOpen(false);
        }
    };

    const updateListHandler = (listId: number) => {
        if (authStore.userData) {
            set(
                ref(database, `${authStore.userData.uid}`),
                props.listsArr.map((list) =>
                    list.id === listId ? { ...list, listName, tasks: tasksArr } : list,
                ),
            );

            props.setOpen(false);
        }
    };

    const deleteListHandler = (listId: number) => {
        if (authStore.userData) {
            set(
                ref(database, `${authStore.userData.uid}`),
                props.listsArr.filter((list) => list.id !== listId),
            );

            props.setOpen(false);
        }
    };

    return (
        <Modal title={t('ListModal.Create new list')} {...props}>
            <S.Wrapper>
                <Input value={listName} setValue={setListName} label={t('ListModal.List Name')} />

                {tasksArr.map((task, index) => (
                    <TaskInput
                        key={task.id}
                        length={tasksArr.length}
                        {...{ task, index, taskStatusHandler, taskNameHandler, deleteTaskHandler }}
                    />
                ))}

                <S.ButtonsWrapper>
                    {!!props.editListData && (
                        <S.DeleteButton onClick={() => deleteListHandler(props.editListData!.id)}>
                            {t('ListModal.Delete list')}
                        </S.DeleteButton>
                    )}

                    <S.CircleButtonStyled onClick={newTaskHandler}>
                        {t('ListModal.Add task')}
                    </S.CircleButtonStyled>
                </S.ButtonsWrapper>

                <S.ButtonStyled
                    disabled={conditionForButtonDisabled}
                    onClick={() =>
                        !!props.editListData
                            ? updateListHandler(props.editListData.id)
                            : createListHandler()
                    }
                >
                    {!!props.editListData ? t('ListModal.Update') : t('ListModal.Create')}
                </S.ButtonStyled>
            </S.Wrapper>
        </Modal>
    );
});
