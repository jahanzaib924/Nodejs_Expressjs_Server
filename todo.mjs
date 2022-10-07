import express from 'express'
import cors from 'cors';
const app = express()
const port = process.env.PORT || 30000;
let todos = [];
app.use(express.json());
app.use(cors())
app.post('/todo', (req, res) => {
  console.log(req.body)
  todos.push(req.body.text);
  res.send({
    message: "Your data is saved",
    data: todos
  })
})

app.get('/todos', (req, res) => {
  res.send({
    message: "Here is your todos list",
    data: todos
  })

})
app.delete('/delete', (req, res) => {
  res.send({
    message: "your data is deleted",
    data: todos
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})