import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

//string으로 썼을 때 실수 방지
const Add = "Add";
const Minus = "Minus";

const countModifier = (count = 0, action) => {
  // if (action.type === "Add") {
  //   return count + 1;
  // } else if (action.type === "Minus") {
  //   return count - 1;
  // } else {
  //   return count;
  // }

  switch (action.type) {
    case Add:
      return count + 1;
    case Minus:
      return count - 1;
    default:
      return count;
  } //switch 권장
}; //reducer

const countStore = createStore(countModifier); //store

// add.addEventListener("click", () => countStore.dispatch({ type: "Add" }));
// minus.addEventListener("click", () => countStore.dispatch({ type: "Minus" }));
// 또는

const handleAdd = () => {
  countStore.dispatch({ type: Add }); //action은 object여야 한다.
};
const handleMinus = () => {
  countStore.dispatch({ type: Minus });
};
const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange); //subscribe

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

//redux 전 vanilla JS
// let count = 0;
// number.innerText = count;

// const updateText = () => {
//   number.innerText = count;
// };

// const handleAdd = () => {
//   console.log("add");
//   count += 1;
//   updateText();
// };

// const handleMinus = () => {
//   console.log("minus");
//   count -= 1;
//   updateText();
// };

// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);

//To Do List
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const Add_Todo = "Add_Todo";
const Delete_Todo = "Delete_Todo";

const addToDos = (text) => {
  return {
    type: Add_Todo,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: Delete_Todo,
    id,
  };
};

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case Add_Todo:
      return [{ text: action.text, id: Date.now() }, ...state];
    case Delete_Todo:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return [];
  }
};

const todoStore = createStore(todoReducer);

// const createToDo = (toDo) => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// };

const dispatchAddToDo = (text) => {
  todoStore.dispatch(addToDos(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = todoStore.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

todoStore.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
