import React from "react";
import Todo from "./Todo";

const TodoList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => {
        return (
          <Todo key={task.id} task={task.task} completed={task.completed} />
        );
      })}
    </ul>
  );
};

export default TodoList;
