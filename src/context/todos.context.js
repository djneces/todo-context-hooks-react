import React, { createContext } from 'react';
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';
import todoReducer from '../reducers/todo.reducer';

const defaultTodos = [
  { id: 1, task: 'Mow the lawn using goats', completed: false },
  { id: 2, task: 'Release lady bugs into garden', completed: true },
];

export const TodosContext = createContext();
export const DispatchContext = createContext();

export function TodosProvider(props) {
  const [todos, dispatch] = useLocalStorageReducer(
    'todos',
    defaultTodos,
    todoReducer
  );

  return (
    //context split in 2, one for only todos, one for dispatch actions (add, toggle....), so we avoid unnecessary rendering
    //we DONT PASS  value={{todos}} -> only the actual value {todos} and {dispatch}, => we don't create new object each time -> re-rendering
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
}
