const handleFrndrqst = (db, bcrypt) => (req, res) => {

		const { fromperson, toperson } = req.body;

			if( !fromperson || !toperson ){
				return res.status(400).json('Error sending frnd rqst !!!');
			}
	
			return db("frndrqst")
			.insert({fromperson: fromperson , toperson: toperson })
			.returning('*')
			.then(function (response) {
					res.json(response[0]);
			})
			.catch(err => {
				res.status(400).json('unable to send frndrqst');
				console.log(err);
			})
}

module.exports = {
	handleFrndrqst: handleFrndrqst
}