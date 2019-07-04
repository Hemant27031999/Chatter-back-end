const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const contacts = require('./controllers/contacts');
const msges = require('./controllers/msges');
const newmsges = require('./controllers/newmsges');
const userfrienddatabase = require('./controllers/userfrienddatabase');
const frndrqst = require('./controllers/frndrqst');
const showfrndrqst = require('./controllers/showfrndrqst');
const confirmfrndrqst = require('./controllers/confirmfrndrqst');

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

app.post('/newmsges', newmsges.handleNewmsges(db, bcrypt))

app.post('/userfriend', userfrienddatabase.handleUserfriend(db, bcrypt))

app.post('/frndrqst', frndrqst.handleFrndrqst(db, bcrypt))

app.post('/showfrndrqst', showfrndrqst.handleShowfrndrqst(db, bcrypt))

app.post('/confirmfrndrqst', confirmfrndrqst.handleConfirmfrndrqst(db, bcrypt))

app.listen(3000, () => {
	console.log('app is running on port 3000');
}) 