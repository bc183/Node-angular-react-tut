const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
// models import
const User = require('./models/UserModel');
const Post = require('./models/PostModel');
const auth = require('./middleware/auth');

const app = express();

//parsing data into json
app.use(express.json());

//parsing cookie into a object
app.use(cookieParser());





app.get("", (request, response) => {
    response.send("hello world!");
});

//User routes
app.post("/user/register", async (request, response) => {
    // gettting data from client
    const { username, firstname, lastname, password } = request.body;

    //checking for another user with the same username
    User.find({
        username: username
    }).then((data) => {
        if (data.length > 0) {
            return response.status(400).send({username: "Username already exists"});
        } 
    }).catch((err) => {
        console.log(err);
        return response.status(500).send(err);
    });

    if (password.trim() === "") {
        return response.status(400).send({password: "password should not be empty"});
    }

    try {
        //encoding password
        const encodedPassword = await bcrypt.hash(password, 6);
        const user = new User({
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: encodedPassword,
            createdAt: new Date().toISOString()
        });
    
        user.save().then((data) => {
            return response.status(201).send(data);
        }).catch((err) => {
            console.log(err);
            return response.status(500).send(err);
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
});

app.post('/user/login', async (request, response) => {
    const { username, password } = request.body;

    // todo validate username and password.
    try {
        const user = await User.findOne({ username: username });
        //checking username
        if (!user) {
            return response.status(400).send({ username: "Username is incorrect" });
        }
        //checking password
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return response.status(400).send({ password: "Password is incorrect" });
        }
        //generating token or ticket
        const token = jwt.sign({ username }, "uodyiodyoqudihjjdnalnd8098098093787234");

        response.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            sameSite: true,
            maxAge: 3600,
            path: "/"
        }));

        return response.status(200).send(user);

    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
});

app.get('/user/logout', auth, (request, response) => {
    console.log(response.locals.user);
    response.set('Set-Cookie', cookie.serialize('token', "", {
        httpOnly: true,
        sameSite: true,
        maxAge: 0,
        path: "/"
    }));

    return response.status(200).send({ message: "Logout Successfull" });
})

// post routes
app.post('/post/create', auth, (request, response) => {
    //destructure data
    const { title, body } = request.body;

    const user = response.locals.user;

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
});

app.listen(3000, ()=> {
    console.log("server connected at http://localhost:3000");
});

mongoose.connect("mongodb+srv://bar007:msdhoni007@cluster0.fsffd.mongodb.net/socialMediaDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("database connected");
});

