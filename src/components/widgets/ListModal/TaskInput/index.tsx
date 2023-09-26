import React, { FC } from 'react';

import { Checkbox, Input } from 'components/interactions';
import { Cross } from 'components/other';

import * as T from './types';
import * as S from './units';

export const TaskInput: FC<T.ITaskInput> = (props) => {
    return (
        <S.Wrapper>
            <p>{props.index + 1}.</p>

            <Checkbox
                value={props.task.isDone}
                setValue={() => props.taskStatusHandler(props.task.id)}
            />

            <Input
                value={props.task.taskName}
                setValue={(value) => props.taskNameHandler(props.task.id, value)}
                label="Task Name *"
            />

            {props.length > 1 && (
                <Cross type="delete" onClick={() => props.deleteTaskHandler(props.task.id)} />
            )}
        </S.Wrapper>
    );
};
