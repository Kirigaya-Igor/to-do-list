import { ITask } from 'types/common';

export interface ITaskInput {
    task: ITask;
    index: number;
    length: number;

    taskStatusHandler: (taskId: number) => void;
    taskNameHandler: (taskId: number, taskName: string) => void;
    deleteTaskHandler: (taskId: number) => void;
}
