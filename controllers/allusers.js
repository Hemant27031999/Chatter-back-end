const handleAllusers = (db, bcrypt) => (req, res) => {

			return db.select('*').from('chatterusers')
				.then(users => {
					res.json(users);
				})
				.catch(err => res.status(400).json('unable to get users'))

}

module.exports = {
	handleAllusers: handleAllusers
}