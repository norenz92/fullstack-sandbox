import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ReceiptIcon from '@material-ui/icons/Receipt'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import { TodoListForm } from './TodoListForm'
import { AddTodoList } from './AddTodoList'
const axios = require('axios').default;

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [firstLoadDone, setFirstLoadDone] = useState(false)

  const getTodos = async () => {
    try {
      return await axios.get('http://localhost:3001/getTodo').then(res => res.data)
    } catch (err) {
      window.alert(err)
      return {}
    } finally {
      setIsLoading(false)
    }
  }

  

  const deleteList = async (id) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      setIsLoading(true)
      let updatedLists = todoLists;
      delete updatedLists[id]
      setTodoLists({...updatedLists})
    }
  }

  useEffect(() => {
    const updateTodos = async () => {
      try {
        return await axios.post('http://localhost:3001/updateTodo', todoLists)
      } catch (err) {
        window.alert(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (firstLoadDone) updateTodos()
  }, [todoLists])

  useEffect(() => {
    getTodos()
      .then(setTodoLists).then(() => setFirstLoadDone(true))
  }, [])

  const listCompleted = (todos) => {
    return todos.every(item => item.completed === true)
  }

  const completedTodosText = (todos) => {
    let totalTodosCount = todos.length;
    let completedTodosCount = todos.reduce(function(n, todo) {
      return n + (todo.completed === true);
  }, 0);
    return `(${completedTodosCount}/${totalTodosCount})`
  }

  if (isLoading) return <CircularProgress/>

  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My Todo Lists
        </Typography>
        <List>
          {Object.keys(todoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${todoLists[key].title} ${completedTodosText(todoLists[key].todos)}`}
              secondary={((!listCompleted(todoLists[key].todos)) || (todoLists[key].todos.length < 1)) ? 'Not completed' : 'Completed'}
              secondaryTypographyProps={{color: ((!listCompleted(todoLists[key].todos)) || (todoLists[key].todos.length < 1)) ? 'error' : 'primary'}} />
            <ListItemSecondaryAction>
              <IconButton edge="end" color="secondary" aria-label="delete" onClick={() => {
                deleteList(key)
              }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>)}
        </List>
        <AddTodoList
          todoLists={todoLists}
          saveTodoList={(id, title) => {
            setTodoLists({
              ...todoLists,
              [id]: {id, title, todos: []}
            })
        }}/>
      </CardContent>
    </Card>
    {todoLists[activeList] && <TodoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      todoList={todoLists[activeList]}
      saveTodoList={(id, { todos }) => {
        const listToUpdate = todoLists[id]
        setTodoLists({
          ...todoLists,
          [id]: { ...listToUpdate, todos }
        })
      }}
    />}
    
  </Fragment>
}
