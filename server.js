const express = require('express');
const mongoose = require('mongoose');
// models import
const User = require('./models/UserModel');
const Post = require('./models/PostModel');

const app = express();

//parsing data into json
app.use(express.json());



app.get("", (request, response) => {
    response.send("hello world!");
});

//User routes
app.post("/user/create", (request, response) => {
    // gettting data from client
    const { username, firstname, lastname, password } = request.body;

    const user = new User({
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password,
        createdAt: new Date().toISOString()
    });

    user.save().then((data) => {
        response.status(201).send(data);
    }).catch((err) => {
        console.log(err);
        response.status(500).send(err);
    });
});

// post routes
app.post('/post/create', (request, response) => {
    //destructure data
    const { title, body, user } = request.body;

    const post = new Post({
        title,
        body,
        user,
        createdAt: new Date().toISOString()
    });

    post.save().then((data) => {
        response.status(201).send(data);
    }).catch((err) => {
        console.log(err);
        response.status(500).send(err)
    });
})

app.listen(3000, ()=> {
    console.log("server connected at http://localhost:3000");
});

mongoose.connect("mongodb+srv://bar007:msdhoni007@cluster0.fsffd.mongodb.net/socialMediaDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("database connected");
});

