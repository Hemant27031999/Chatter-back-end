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
				db.schema.createTable(`${fromperson}friend${toperson}`, function (table) {
				  table.increments('id');
				  table.string('name');
				  table.string('msg');
				  table.timestamps('time');
				})
				.then(data => {
					if(data.command){
					res.json(result);
				}
				})
				.catch(err => { res.json("Unable to make database !!!") })
				
			})
			.catch(err => res.json("Unable to confirm frndrqst !!!"))

}

module.exports = {
	handleConfirmfrndrqst: handleConfirmfrndrqst
}