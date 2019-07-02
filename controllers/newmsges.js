const handleNewmsges = (db, bcrypt) => (req, res) => {

			const { name, msg} = req.body;

			var database = "rukefriendyoung";

			console.log(name+" "+msg+" "+database);

			if( !msg || !database || !name ){
				return res.status(400).json('Error sending msg !!!');
			}
	
			return db(database).insert({name: name , msg: msg , time: new Date()})
			.returning('*')
			.then(function (response) {
				db.select('*').from(database)
				.then(msges => {
					res.json(msges);
				})
				.catch(err => res.status(400).json('unable to get msges'))
			})
			.catch(err => res.status(400).json('unable to get msges'))

}

module.exports = {
	handleNewmsges: handleNewmsges
}