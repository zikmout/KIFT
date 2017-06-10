exports.userReadById = function(data, connection, r, callback) {
	
	r.db('sipo').table('users').get(data.id).run(connection, function(err, result) {
		if (err) callback(true, err);
		else callback(false, result);
	});
}

exports.userRead = function(connection, r, callback) {
	
	r.db('sipo').table('users').run(connection, function(err, cursor) {
		if (err) callback(true, err);
		else { 
			cursor.toArray(function(err, result){
				callback(false, result );
			});
		}
	});
}

exports.userDelete = function(data, connection, r, callback) {
	
	r.db('sipo').table('users').get(data.id).delete().run(connection, function(err, result) {
		if (err) callback(true, err);
		else callback(false, result );
	});
}

exports.userCreate = function(data, connection, r, callback) {
	
	r.db('sipo').table('users').insert([data]).run(connection, function(err, result) {
		if (err) callback(true, err);
		else callback(false, { id: result.generated_keys[0] } );
	});
}
