const handleAllusers = (db, bcrypt) => (req, res) => {

			

			return db.select('*').from('chatterusers')
				.then(users => {
					// pusher.trigger('my-channel', 'my-event', {
					//   "message": "hello world"
					// });
					res.json(users);
				})
				.catch(err => res.status(400).json('unable to get users'))

}

module.exports = {
	handleAllusers: handleAllusers
}