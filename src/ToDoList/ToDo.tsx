import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { StateCategories, IToDo, toDoState } from "../atoms";
import { ValidBtn } from "./CreateToDo";

const TodoItem = styled.li`
  color: ${(props) => props.theme.textColor};
  font-size: 1.3rem;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  span.text {
    transition: color 0.2s ease-in;
    width: 8rem;
    text-align: center;
    flex: 1;
  }
  span.custom {
    transition: color 0.2s ease-in;
    width: 5rem;
    text-align: center;
  }
`;

const ToggleToDoBtn = styled(ValidBtn)<{ name: IToDo["category"] }>`
  width: 60px;
  padding: 0;
  margin: 0 3px;
  background-color: inherit;
  background-image: linear-gradient(-180deg, #ff7e31, #e62c03);
  &:hover {
    background-image: linear-gradient(-180deg, #0a7373, #b7bf99);
  }
`;

function ToDo({ text, category, id, customCategory }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {
        text,
        id,
        category: name as StateCategories,
        customCategory,
      };
      localStorage.setItem(
        category,
        JSON.stringify([
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ])
      );
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <TodoItem>
      <span className="custom">{customCategory}</span>
      <span className="text">{text}</span>
      {category !== StateCategories.TO_DO && (
        <ToggleToDoBtn onClick={onClick} name={StateCategories.TO_DO}>
          To Do
        </ToggleToDoBtn>
      )}
      {category !== StateCategories.DOING && (
        <ToggleToDoBtn onClick={onClick} name={StateCategories.DOING}>
          Doing
        </ToggleToDoBtn>
      )}
      {category !== StateCategories.DONE && (
        <ToggleToDoBtn onClick={onClick} name={StateCategories.DONE}>
          Done
        </ToggleToDoBtn>
      )}
    </TodoItem>
  );
}

export default ToDo;
