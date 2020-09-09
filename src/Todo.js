import React from "react";

const Todo = ({ task, completed }) => {
  return (
    <li>
      <input type="checkbox" />
      <label>{task}</label>
    </li>
  );
};

export default Todo;
