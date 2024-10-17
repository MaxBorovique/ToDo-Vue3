import { client } from "../../httpClient";

export const getTodos = () => {
  return client.get('/todos?userId=6342')
};

export const createTodos = (title) => {
  return client.post('/todos', {
    title,
    completed: false,
    userId: 6342,
  });
};

export const updateTodos = ({id, title, completed}) => {
  return client.patch(`/todos/${id}`, {
    title,
    completed,
  });
};

export const deleteTodos = (todoId) => {
  return client.delete(`/todos/${todoId}`);
};