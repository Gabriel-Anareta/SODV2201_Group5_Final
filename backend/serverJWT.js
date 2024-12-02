const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { fileAuth, generateJWT, getUsers } = require('./auth');
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
    console.log(user)
    if (user) {
        return res.status(401).json({ message: 'username already exists' });
    }

    const usersData = fs.readFileSync(usersFilePath);
    const users = JSON.parse(usersData);
    users.push({ username, password })
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4))

    const token = generateJWT(username);
    res.json({ token });
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
    res.json({ token });
    
});

app.use('/books', booksRouter);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});