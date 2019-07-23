const handleMsges = (db, bcrypt) => (req, res) => {

			const { database } = req.body;

			if( !database ){
				return res.status(400).json('Error getting msges out');
			}
	
				db.select('*').from(database.toLowerCase())
				.then(msges => {
					res.json(msges);
			})
			.catch(err => res.status(400).json('unable to get msges'))

}

module.exports = {
	handleMsges: handleMsges
}