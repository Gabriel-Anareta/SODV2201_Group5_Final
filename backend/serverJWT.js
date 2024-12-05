const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const { fileAuth, generateJWT, getUsers, verifyJWT } = require('./auth');
const booksRouter = require('./routes/booksJWT');

const usersFilePath = path.join(__dirname, 'data', 'users.json');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.post('/signup', (req, res) => {
    const { username, password } = req.body
    const user = fileAuth(username, password);
    if (user) {
        return res.status(401).json({ message: 'username already exists' });
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds)

    const usersData = fs.readFileSync(usersFilePath);
    const users = JSON.parse(usersData);
    users.push({ 
        username: username, 
        password: hash 
    })

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4))

    const token = generateJWT(username);
    res.json({ 
        token: token, 
        username: username
    });
})

app.post('/login', (req, res) => {

    const { username, password } = req.body;
    // get user from file
    const user = fileAuth(username, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    // JWT Auth
    const token = generateJWT(username);
    res.json({ 
        token: token, 
        username: username
    });
    
});

app.post('/verifyJWT', (req, res) => {
    const { token } = req.body
    console.log(token)
    const decoded = verifyJWT(token)
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid user' });
    }

    res.json({ message: 'Valid user'})
})

app.use('/books', booksRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});