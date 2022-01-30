const storage = require('node-persist');

const updateTodos = async (todo) => {
  try {
    return await storage.updateItem('todo', todo);
  } catch (err) {
    console.log(err)
    return err;
  }
}

const getTodos = async () => {
  try {
    let currentTodos = await storage.getItem('todo');
    if (currentTodos) {
      return currentTodos;
    } else {
      return {};
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  updateTodos,
  getTodos
}