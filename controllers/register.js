const handleRegister = (db, bcrypt) => (req, res) => {
	const { name, email, password, imageurl } = req.body;

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
			joined: new Date(),
			imageurl: imageurl
		})
		.then(user => {
			db.schema.createTable(`${name}friends`.toLowerCase().replace(/ +/g, "") , function (table) {
			  table.increments('id');
			  table.string('name');
			  table.string('email');
			  table.string('imageurl');
			  table.timestamp('lastmsg');
			  table.string('msgdata');
			})
			.then(data => {
				if(data.command){
				res.json(user[0]);
			}
			})
			.catch(err => { res.json("Unable to make database !!!") })
		})
		.catch(err => res.status(400).json("Unable to Register !"));

}

module.exports = {
	handleRegister: handleRegister
}