const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/ping', (req, res) => {
    res.status(200).json({
        success: true
    });
});

// GET users
app.get('/api/users', (req, res) => {
    res.status(200).json({
        success: true, 
        users: users
    });
});

// GET user
//requires: id
//Optional: none

app.get('/api/user/:id', (req, res) => {
    console.log(req);
    res.status(200).json({
        success: true, 
        user: users[req.params.id]

    });
});

// POST user
//requires: firstname, lastname, email, password
//Optional: none

app.post('/api/users', (req, res) => {
    const firstname = typeof(req.body.firstname) === 'string' && req.body.firstname.trim().length > 0 ? req.body.firstname : false;
    const lastname = typeof(req.body.lastname) === 'string' && req.body.lastname.trim().length > 0 ? req.body.lastname : false;
    const email = typeof(req.body.email) === 'string' && req.body.email.trim().length > 0 ? req.body.email : false;
    const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 3 ? req.body.password : false;

    if (firstname && lastname && email && password){

        const newUser = {
            id: users.length,
            firstname,
            lastname,
            email,
            password
        }

        users.push(newUser);
        delete newUser.password;

        res.status(201).json({
            success: true,
            user: newUser
        });





    }
    else{
        res.status(400).json({
            success: false,
            message: 'Required fields missing'
        });
    }
});


app.listen(4200, () => {
    console.log('Server running')
});


const users = [
    {
        id: 0,
        firstname: 'Juku',
        lastname: 'Tamm',
        email: 'test@test.ee',
        password: 'nipitiri'

    },
    {
        id: 1,
        firstname: 'Valli',
        lastname: 'Puu',
        email: 'test@testnipi.ee',
        password: 'tiritamm2'

    }
];