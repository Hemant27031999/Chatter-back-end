const handleConfirmfrndrqst = (db, bcrypt) => (req, res) => {

		const { fromperson, toperson } = req.body;

			if( !toperson || !fromperson ){
				return res.status(400).json('Unable to confirm frnd rqst !!!');
			}
	
			db('frndrqst')
		  	.where( { toperson: toperson } )
		  	.where( { fromperson: fromperson } )
		  	.del()
			.then(result => {
				db.schema.createTable(`${fromperson}friend${toperson}`.toLowerCase(), function (table) {
				  table.increments('id');
				  table.string('name');
				  table.string('msg');
				  table.timestamp('time');
				})
				.then(data => {
					if(data.command){
						db.select('*').from('chatterusers')
						.where( 'name', '=', fromperson )
						.then(info => {
							db(`${toperson}friends`.toLowerCase())
							.insert({ name: info[0].name,
									  email: info[0].email, 
									  imageurl: info[0].imageurl,
									  lastmsg: new Date(),
									  msgdata: `${fromperson}friend${toperson}` 
									})
							.returning('*')
							.then(function (response) {

									db.select('*').from('chatterusers')
									.where( 'name', '=', toperson )
									.then(notrqrddata => {
										return db(`${fromperson}friends`.toLowerCase())
										.insert({ name: notrqrddata[0].name,
												  email: notrqrddata[0].email, 
												  imageurl: notrqrddata[0].imageurl,
												  lastmsg: new Date(),
												  msgdata: `${fromperson}friend${toperson}` 
												})
										.returning('*')
										.then(function (response123) {
												res.json(response);
										})
										.catch(err => res.status(400).json(`unable to save data ${fromperson}friend`))
									})
									.catch(err => { res.json("Unable to get info !!!123") })
							})
							.catch(err => res.status(400).json(`unable to save data ${toperson}friend`))
						})
						.catch(err => { res.json("Unable to get info !!!") })
					}
				})
				.catch(err => { res.json("Unable to make database !!!") })
			})
			.catch(err => res.json("Unable to confirm frndrqst !!!"))

}

module.exports = {
	handleConfirmfrndrqst: handleConfirmfrndrqst
}