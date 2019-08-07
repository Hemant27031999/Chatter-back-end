const handleContacts = (db, bcrypt) => (req, res) => {

				const { name } = req.body;


				// channels_client.trigger('my-channel', 'my-event', {
				//   "message": "hello world"
				// });


				var database = `${name}friends`.toLowerCase();

				db.select('*')
				.from(database)
				.orderBy('lastmsg')
				.then(friends => {
					res.json(friends);
				})
				.catch(err => res.status(400).json('unable to get users friends'))

}

module.exports = {
	handleContacts: handleContacts
}