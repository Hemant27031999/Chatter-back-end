const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const contacts = require('./controllers/contacts');
const msges = require('./controllers/msges');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'faceapp', 
    database: 'chatterDB'
  }
}); 

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
	res.send('It is working well!');
}) 

app.post('/contacts', contacts.handleContacts(db, bcrypt))

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.post('/msges', msges.handleMsges(db, bcrypt))

app.listen(3000, () => {
	console.log('app is running on port 3000');
}) 