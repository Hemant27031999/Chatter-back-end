const handleShowfrndrqst = (db, bcrypt) => (req, res) => {

		const { toperson } = req.body;

			if( !toperson ){
				return res.status(400).json('Unable to show frnd rqst');
			}
	
			return db('frndrqst').where({
			  toperson: toperson
			}).select('fromperson')
			.then(frompersons => {
				res.json(frompersons);
			})
			.catch(err => res.json("Unable to load frndrqsts !!!"))

}

module.exports = {
	handleShowfrndrqst: handleShowfrndrqst
}