const storage = require('node-persist');

const updateTodos = (todo) => {
  return storage.updateItem('todo', todo).then(todo => {
    if (todo) {
      return todo
    } else {
      return storage.setItem('todo', todo).then(todo => todo)
    }
  }).catch(err => err)
}

const getTodos = () => {
  return storage.getItem('todo').then(todo => {
    if (todo) {
      return todo
    } else {
      return {}
    }
  }).catch(err => err)
}

module.exports = {
  updateTodos,
  getTodos
}