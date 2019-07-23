const handleContacts = (db, bcrypt) => (req, res) => {

				const { name } = req.body;
				console.log(`${name}friends`.toLowerCase());

				var database = `${name}friends`.toLowerCase();

				db.select('*').from(database)
				.then(friends => {
					res.json(friends);
				})
				.catch(err => res.status(400).json('unable to get users friends'))

}

module.exports = {
	handleContacts: handleContacts
}