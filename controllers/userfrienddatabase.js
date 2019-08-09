const handleUserfriend = (db, bcrypt) => (req, res) => {
	const { name } = req.body;

	if(!name ){
		return res.status(400).json('Incorrect form Submission !!!');
	} 

	console.log(name);

	db.schema.createTable(`${name}friends`.toLowerCase().replace(/ +/g, "") , function (table) {
	  table.increments('id');
	  table.string('name');
	  table.string('email');
	  table.string('imageurl');
	  table.timestamp('lastmsg');
	  table.string('magdata');
	})
	.then(data => {
		res.json(data) 
	})
	.catch(err => { res.json("Unable to make database !!!") })
}

module.exports = {
	handleUserfriend: handleUserfriend
}