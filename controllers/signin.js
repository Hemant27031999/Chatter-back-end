const handleSignin = (db, bcrypt) => (req, res) => {

	const { email, password } = req.body;

	if(!email || !password){
		return res.status(400).json('Incorrect form Submission !!!');
	} 

	db.select('email', 'password').from('chatterusers')
	.where( 'email', '=', email )
	.then(data => {
		const isValid = (password === data[0].password);
		if(isValid){
			return db.select('*').from('chatterusers')
			.where('email', '=', email)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json('unable to get user'))
		} else {
			 res.status(400).json('wrong credentials! Please try again.');
		}
	})
	.catch(err => res.status(400).json('wrong credentials !'))
}

module.exports = {
	handleSignin: handleSignin
}