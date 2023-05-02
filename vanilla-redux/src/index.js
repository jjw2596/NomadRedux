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
