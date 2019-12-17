const handleNewmsges = (db, bcrypt, pusher) => (req, res) => {

			const { name, msg, toperson, database, email } = req.body;

			if( !database || !name ){
				return res.status(400).json('Error sending msg !!!');
			}

			if(msg === "@nomsg@"){
				db.select('*').from(database.toLowerCase().replace(/ +/g, "") )
				.then(msges => {
					res.json(msges);
				})
				.catch(err => res.status(400).json('unable to get msges'))
			}
			else{
			return db(database.toLowerCase().replace(/ +/g, "") )
			.insert({name: name , msg: msg , time: new Date()})
			.returning('*')
			.then(function (response) {
				db.select('*').from(database.toLowerCase().replace(/ +/g, "")  )
				.then(msges => {

					 db(`${name}friends`.toLowerCase().replace(/ +/g, "") )
					  .whereIn('name', [name, toperson])
					  .update({
					    lastmsg: new Date()
					  })
					  .then(data1 => {

					  	db(`${toperson}friends`.toLowerCase().replace(/ +/g, "") )
						  .whereIn('name', [name, toperson])
						  .update({
						    lastmsg: new Date()
						  })
						  .then(data2 => {
						  	console.log(data2);
						  	console.log(`${email}-channel`);
	 						pusher.trigger(`${email}-channel`, 'my-event', {
							  "database": database,
								"fromPerson": name
							});
							res.json(msges);
						  })
						  .catch(err => res.status(400).json('unable to get msges! Damn it 12345!!!'))
					})
					.catch(err => res.status(400).json('unable to get msges! Damn it 123!!!'))
				})
				.catch(err => res.status(400).json('unable to get msges! Damn it !!!'))
			})
			.catch(err => res.status(400).json('unable to get msges'))
		}
}

module.exports = {
	handleNewmsges: handleNewmsges
}


 // pusher.trigger(`${email}-channel`, 'my-event', {
	// 					  "database": database
	// 					});
