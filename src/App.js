import React, { useState, useEffect, useRef } from "react";
import useDebounce from "./useDebounce";
import "./styles.css";

import TodoList from "./TodoLIst";

const data = [
  {
    id: 1,
    task: "task1",
    completed: true
  },
  {
    id: 2,
    task: "task2",
    completed: true
  },
  {
    id: 3,
    task: "task3",
    completed: true
  },
  {
    id: 4,
    task: "task4",
    completed: true
  },
  {
    id: 5,
    task: "task5",
    completed: true
  },
  {
    id: 6,
    task: "task6",
    completed: true
  }
];

export default function App() {
  const [todos, setTodos] = useState(data);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState({
    task: "",
    isSearching: false,
    results: []
  });

  const index = useRef(7);

  const debouncedTerm = useDebounce(search.task, 500);

  useEffect(() => {
    if (debouncedTerm) {
      setSearch({
        ...search,
        isSearching: true
      });

      const searchTimer = setTimeout(() => {
        setSearch(
          {
            ...search,
            isSearching: false,
            results: todos.filter((item) =>
              item.task.toLowerCase().includes(debouncedTerm.toLowerCase())
            )
          },
          1000
        );
      });

      return () => {
        clearTimeout(searchTimer);
      };
    } else {
      setSearch({
        ...search,
        results: todos
      });
    }
  }, [debouncedTerm, todos]);

  const handleSearch = (event) => {
    setSearch({
      ...search,
      task: event.target.value
    });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAdd = () => {
    setTodos([
      ...todos,
      {
        id: index.current,
        task: value,
        completed: false
      }
    ]);

    index.current = index.current + 1;
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <input type="text" value={search.task} onChange={handleSearch} />

      <input type="text" value={value} onChange={handleChange} />
      <input type="button" value="Add" onClick={handleAdd} />
      {search.isSearching && <div>Searching ...</div>}
      <TodoList tasks={search.results} />
    </div>
  );
}
