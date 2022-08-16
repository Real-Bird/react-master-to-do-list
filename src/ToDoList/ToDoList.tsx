import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { StateCategories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const TodoOverview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px auto;
  width: fit-content;
  max-width: 640px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const TodoItemWrapper = styled.ul`
  width: inherit;
`;

const SelectBox = styled.select`
  width: 5rem;
  text-align: center;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
  cursor: pointer;
  font-family: "Gugi", cursive;
  height: 2rem;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as StateCategories);
  };
  return (
    <TodoOverview>
      <Title>To Dos</Title>
      <hr style={{ width: "100%" }} />
      <SelectBox onInput={onInput} value={category}>
        <option value={StateCategories.TO_DO}>To Do</option>
        <option value={StateCategories.DOING}>Doing</option>
        <option value={StateCategories.DONE}>Done</option>
      </SelectBox>
      <CreateToDo />
      <TodoItemWrapper>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </TodoItemWrapper>
    </TodoOverview>
  );
}

export default ToDoList;
