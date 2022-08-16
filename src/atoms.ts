import { atom, selector } from "recoil";

export enum StateCategories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface ICustomCategories {
  customCategories: string;
}

export interface IToDo {
  text: string;
  id: number;
  category: StateCategories;
  customCategory: string;
}

export const categoryState = atom<StateCategories>({
  key: "categoryState",
  default: StateCategories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDos",
  default: JSON.parse(localStorage.getItem(StateCategories.TO_DO) || "[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
