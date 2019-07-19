const handleContacts = (db, bcrypt) => (req, res) => {

				db.select('*').from('rukefriends')
				.then(friends => {
					res.json(friends);
				})
				.catch(err => res.status(400).json('unable to get users friends'))

}

module.exports = {
	handleContacts: handleContacts
}