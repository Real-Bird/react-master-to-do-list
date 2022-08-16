import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputBox = styled.div`
  margin: 15px 0 15px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  input {
    order: 2;
    background: none;
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    padding: 0 10px 0 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${(props) => props.theme.textColor};
    &:focus {
      outline: none;
    }
    &:focus ~ label {
      color: ${(props) => props.theme.accentColor};
    }
    &:focus ~ span.bar:before {
      width: 100%;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
  label {
    order: 1;
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    font-weight: normal;
    pointer-events: none;
    transition: 0.3s ease all;
  }
  span.bar {
    order: 3;
    position: relative;
    display: block;
    width: 100%;
    &:before {
      content: "";
      height: 2px;
      width: 0;
      bottom: 0px;
      position: absolute;
      background: ${(props) => props.theme.accentColor};
      transition: 0.3s ease all;
      left: 0%;
    }
  }
`;

export const ValidBtn = styled.button`
  margin-bottom: 5px;
  background-color: initial;
  background-image: linear-gradient(-180deg, #ff7e31, #e62c03);
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
  color: #ffffff;
  cursor: pointer;
  font-family: "Gugi", cursive;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  outline: 0;
  overflow: hidden;
  padding: 0 20px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: top;
  white-space: nowrap;
  width: 100%;
  z-index: 9;
  border: 0;
  transition: 0.2s ease-in-out;
  &:hover {
    box-shadow: rgba(253, 76, 0, 0.5) 0 3px 8px;
  }
`;

const CustomInput = styled(InputBox)`
  width: 10rem;
  margin-right: 5px;
  text-align: center;
  input {
    &::placeholder {
      text-align: center;
    }
  }
`;

interface ITodoForm {
  todo: string;
  customCategory: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const storageToDos = JSON.parse(localStorage.getItem(category) || "[]");
  const { register, handleSubmit, reset } = useForm<ITodoForm>();
  const onValid = ({ todo, customCategory }: ITodoForm) => {
    const newToDo = {
      text: todo,
      category,
      id: Date.now(),
      customCategory: customCategory as any,
    };
    setToDos((oldTodos) => [newToDo, ...oldTodos]);
    storageToDos.push(newToDo);
    localStorage.setItem(category, JSON.stringify(storageToDos));
    reset();
  };
  return (
    <FormBox onSubmit={handleSubmit(onValid)}>
      <div style={{ display: "flex" }}>
        <CustomInput>
          <input
            {...register("customCategory", {
              required: "Plz, your Category",
            })}
            type="text"
            placeholder="Categories"
          />
          <span className="bar"></span>
        </CustomInput>
        <InputBox>
          <input
            {...register("todo", {
              required: "Plz, your todo",
            })}
            type="text"
            placeholder="Write a to do"
          />
          <span className="bar"></span>
        </InputBox>
      </div>
      <ValidBtn type="submit">Add</ValidBtn>
    </FormBox>
  );
}

export default CreateToDo;
