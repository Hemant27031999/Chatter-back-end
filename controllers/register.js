const handleRegister = (db, bcrypt) => (req, res) => {
	const { name, email, password } = req.body;

	if(!name || !email || !password){
		return res.status(400).json('Incorrect form Submission !!!');
	} 

	console.log(name);

	db('chatterusers')
		.returning('*')
		.insert({
			email: email,
			name: name,
			password: password,
			joined: new Date()
		})
		.then(user => {
			res.json(user[0]);
		})
		.catch(err => res.status(400).json("Unable to Register !"));
}

module.exports = {
	handleRegister: handleRegister
}