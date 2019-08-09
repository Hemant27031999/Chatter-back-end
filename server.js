const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
var Pusher = require('pusher');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const contacts = require('./controllers/contacts');
const msges = require('./controllers/msges');
const newmsges = require('./controllers/newmsges');
const userfrienddatabase = require('./controllers/userfrienddatabase');
const frndrqst = require('./controllers/frndrqst');
const showfrndrqst = require('./controllers/showfrndrqst');
const confirmfrndrqst = require('./controllers/confirmfrndrqst');
const allusers = require('./controllers/allusers');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
}); 
// socket = io.listen(process.env.PORT);

var pusher = new Pusher({
				  appId: '816891',
				  key: '7c4198eef984dd85a08e',
				  secret: '94d91cb137b556c94433',
				  cluster: 'ap2',
				  encrypted: true
				});

const app = express();

app.use(bodyParser.json());
app.use(cors())

// var channels_client = new Pusher({
//   appId: '831858',
//   key: 'd29496a4b6da7ece45f8',
//   secret: '712addc6f8f998dba339',
//   cluster: 'ap2',
//   useTLS: true
// });

app.get('/', (req, res) => {
	res.send('It is working well!');
}) 

app.post('/contacts', contacts.handleContacts(db, bcrypt))

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.post('/msges', msges.handleMsges(db, bcrypt))

app.post('/newmsges', newmsges.handleNewmsges(db, bcrypt, pusher))

app.post('/userfriend', userfrienddatabase.handleUserfriend(db, bcrypt))

app.post('/frndrqst', frndrqst.handleFrndrqst(db, bcrypt))

app.post('/showfrndrqst', showfrndrqst.handleShowfrndrqst(db, bcrypt))

app.post('/confirmfrndrqst', confirmfrndrqst.handleConfirmfrndrqst(db, bcrypt))

app.post('/allusers', allusers.handleAllusers(db, bcrypt))

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port 3000 ${process.env.PORT}`);
}) 