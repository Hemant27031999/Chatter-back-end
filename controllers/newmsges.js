const handleNewmsges = (db, bcrypt, pusher) => (req, res) => {

			const { name, msg, toperson } = req.body;

			var database = "rukefriendyoung";

			if( !database || !name ){
				return res.status(400).json('Error sending msg !!!');
			}
	
			if(msg === "@nomsg@"){
				db.select('*').from(database)
				.then(msges => {
					res.json(msges);
				})
				.catch(err => res.status(400).json('unable to get msges'))
			}
			else{
			return db(database).insert({name: name , msg: msg , time: new Date()})
			.returning('*')
			.then(function (response) {
				db.select('*').from(database)
				.then(msges => {
					 pusher.trigger(`${toperson}-channel`, 'my-event', {
					  "database": database
					});
					res.json(msges);
				})
				.catch(err => res.status(400).json('unable to get msges! Damn it !!!'))
			})
			.catch(err => res.status(400).json('unable to get msges'))
		}

}

module.exports = {
	handleNewmsges: handleNewmsges
}