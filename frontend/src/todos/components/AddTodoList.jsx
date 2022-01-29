import React, { Fragment } from 'react'
import { Button} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

export const AddTodoList = ({ todoLists, saveTodoList }) => {

  const generateNextId = () => {
    return Object.keys(todoLists).length > 0 ? parseInt(Object.keys(todoLists)[Object.keys(todoLists).length-1])+1 : 1
  }

  const addList = () => {
    const title = prompt('Please enter list name')
    if (title) {
      const id = generateNextId()
      saveTodoList(id, title)
    }
  }

  return (
    <Fragment>
      <Button
        type='button'
        color='primary'
        onClick={() => {
          addList()
        }}
      >
        Add List <AddIcon />
      </Button>
    </Fragment>
  )
}
