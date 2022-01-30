const express = require('express')
const cors = require('cors')
const app = express()
const storage = require('node-persist');
const api = require('./api')

storage.init();

app.use(cors())
app.use(express.json());

const PORT = 3001

//app.get('/', (req, res) => res.send('Hello World!'))

app.get('/getTodo', (req, res) => {
  api.getTodos().then(todo => res.send(todo)).catch(err => res.send(err))
})

app.post('/updateTodo', (req, res) => {
  api.updateTodos(req.body).then(todo => res.send(todo.content.value)).catch(err => res.send(err))
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))