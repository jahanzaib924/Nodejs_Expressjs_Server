import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';

let todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  classId: String,
  createdOn: { type: Date, default: Date.now }
});
const todoModel = mongoose.model('todos', todoSchema);


const app = express()
const port = process.env.PORT || 30000;
let todos = [];
app.use(express.json());
app.use(cors());

//await mongoose.connect('mongodb+srv://JahanzaibRana:<password>@cluster0.ruflohr.mongodb.net/?retryWrites=true&w=majority');
app.use(express.json());
app.use(cors());

app.post('/todo', (req, res) => {

    todoModel.create({ text: req.body.text }, (err, saved) => {
        if (!err) {
            console.log(saved);

            res.send({
                message: "your todo is saved"
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    })
})
app.get('/todos', (req, res) => {

    todoModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                message: "here is you todo list",
                data: data
            })
        }else{
            res.status(500).send({
                message: "server error"
            })
        }
    });
})
//DELETE All
app.delete('/todos', (req, res) => {

    todoModel.deleteMany({}, (err, data) => {
        if (!err) {
            res.send({
                message: "all todos are deleted successfully",
                data: data
            })
        }else{
            res.status(500).send({
                message: "server error"
            })
        }
    });
})  
//delete by id
// app.delete('/todo:id', (req, res) => {

//     todoModel.deleteOne({_id: req.params.id}, (err, data) => {
//         if (!err) {
//             res.send({
//                 message: "Your todo is delete",
//                 data: data
//             })
//         }else{
//             res.status(500).send({
//                 message: "server error"
//             })
//         }
//     });
// })
app.delete('/todo/:id', (req, res) => {

    todoModel.deleteOne({ _id: req.params.id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Todo has been deleted successfully",
                })
            } else {
                res.send({
                    message: "No todo found with this id: " + req.params.id,
                })
            }


        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})
app.listen(port, () => {
    console.log(`Server app is listening on port ${port}`)
})
/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = 'mongodb+srv://JahanzaibRana:b2XsTZYfjHqgSmS2@cluster0.ruflohr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////