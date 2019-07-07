const handleShowfrndrqst = (db, bcrypt) => (req, res) => {

		const { toperson } = req.body;

			if( !toperson ){
				return res.status(400).json('Unable to show frnd rqst');
			}


			function friends(array){
			    var arr = [];
			    for(var i=0;i<array.length;i++){
			        arr.push(array[i].fromperson);}
			    return arr;
			}
	
			db('frndrqst').where({ toperson: toperson })
			.select('fromperson')
			.then(frompersons => {

				var myfrnds = friends(frompersons);

				return db.select('*').from('chatterusers')
  				.whereIn('name', myfrnds)
  				.then(data => {
  					res.json(data);
  				})

				 //  db.select('*').from('chatterusers')
					// .where( 'name', '=', frompersons )
					// .then(data => {
					// 	res.json(data);
					// })
					// .catch(err => res.json("Unable to load frndrqsts !!!"))
				})
			.catch(err => res.json("Unable to load frndrqsts !!!"))

}

module.exports = {
	handleShowfrndrqst: handleShowfrndrqst
}