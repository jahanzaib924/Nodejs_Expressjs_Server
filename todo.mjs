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
app.put('/todo/:id', (req, res) => {
  const text = req.body.text
  const id = req.params.id
  todoModel.findByIdAndUpdate(id, { text: text }, (err, data) => {
      res.send({
          data: data
      })
  });
})

app.delete('/todo/:id', (req, res) => {
  const id = req.params.id
  console.log(id);
  todoModel.findByIdAndDelete(id, (err, data) => {
      res.send({
          data: data
      })
  })
})

app.delete('/todos/:course', (req, res) => {
  const course = req.params.course
  todoModel.deleteMany({ course: { $eq: course } }, (err, data) => {
      if (!err) {
          res.send({
              data
          })
      }
  })
})

app.get('*', (req, res) => {
  res.status(404).send('Page not Found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})