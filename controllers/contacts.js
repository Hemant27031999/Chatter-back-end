const handleContacts = (db, bcrypt, pusher) => (req, res) => {

				db.select('*').from('rukefriends')
				.then(friends => {
					pusher.trigger('my-channel', 'my-event', {
					  "message": "hello world"
					});
					res.json(friends);
				})
				.catch(err => res.status(400).json('unable to get users friends'))

}

module.exports = {
	handleContacts: handleContacts
}