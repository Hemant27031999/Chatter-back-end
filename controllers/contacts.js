const handleContacts = (db, bcrypt) => (req, res) => {

	const { email, password } = req.body;

	if(!email || !password){
		return res.status(400).json('Incorrect form Submission !!!');
	} 

	let enteringUser;

	db.select('email', 'password').from('chatterusers')
	.where( 'email', '=', email )
	.then(data => {
		const isValid = (password === data[0].password);
		if(isValid){
			db.select('*').from('chatterusers')
			.where('email', '=', email)
			.then(user => {
				enteringUser = user[0];
				// return res.json(enteringUser)

				db.select('*').from('rukefriends')
				.then(friends => {
					res.json(friends);
				})
			})
			.catch(err => res.status(400).json('unable to get user'))
		} else {
			 res.status(400).json('wrong credentials! Please try again.');
		}
	})
	.catch(err => res.status(400).json('wrong credentials !'))




	  // var schools;

	  // db.select().from('chatterusers')
	  // .then(function(ret){
	  //   schools=ret
	  //   returndb.select().from('rukeFriends')
	  // }).then(function(students){
	  //   res.render("schools",{
	  //     students: students,
	  //     schools: schools
	  //   })
	  // })
	  // .catch(err => res.status(400).json('unable to get info'))



}

module.exports = {
	handleContacts: handleContacts
}