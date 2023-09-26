import { IList } from 'types/common';

export interface IListItem {
    listData: IList;
    listsArr: IList[];

    listEditHandler: (listId: number) => void;
}
