export type Nullable<GenericType> = GenericType | null;
export type Undefinable<GenericType> = GenericType | undefined;

export enum Language {
    EN = 'en',
    RU = 'ru',
    PL = 'pl',
}

export interface IList {
    id: number;
    listName: string;
    date: number;
    tasks: ITask[];
}

export interface ITask {
    id: number;
    taskName: string;
    isDone: boolean;
}
