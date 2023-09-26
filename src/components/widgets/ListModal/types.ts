import { IList, Nullable } from 'types/common';

export interface IListModal {
    isOpen: boolean;
    listsArr: IList[];
    editListData: Nullable<IList>;

    setOpen: (value: boolean) => void;
    setEditListData: (value: Nullable<IList>) => void;
}
