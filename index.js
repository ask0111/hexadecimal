const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
app.use(express.json());
const PORT  = 8000;

app.use(cors())



app.get('/', async(req, res)=>{
    const userData = await axios('https://jsonplaceholder.typicode.com/users');
    console.log(userData);
    res.send(userData.data);

})


const userTodo = (data, id)=>{
    const singleTodo = data.filter((ele)=>{
        if(ele.userId == id){
            return ele;
        }
    })

    return singleTodo;
}

app.get('/user/todo/:id', async(req, res)=>{
    const id  = req.params.id;
    const todoDatas = await axios('https://jsonplaceholder.typicode.com/todos');
    const singleTodo = userTodo(todoDatas.data, id);
    res.send(singleTodo);
})


app.listen(PORT, ()=>{
    console.log("backend Connected On PORT", PORT);
})