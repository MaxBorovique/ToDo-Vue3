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

export const deleteCompletedTodos = async () => {
  try {
    const response = await client.get('/todos?userId=6342');
    const todos = response.data;

    const completedTodos = todos.filter(todo => todo.completed);

    const deletePromises = completedTodos.map(todo => client.delete(`/todos/${todo.id}`));

    await Promise.all(deletePromises);

  } catch (error) {
    console.error('', error);
  }
};