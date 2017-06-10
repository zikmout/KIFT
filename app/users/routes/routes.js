var appRouter = function(app, path, users, connection, r) {
var fs = require('fs');
var data_path = '/../../data/';
var bodyParser = require('body-parser');
r = require('rethinkdb');

app.use(bodyParser.json());


//GET REQUESTS
app.get('/users/:id', function(req, res) {

	users.userReadById({ id: req.params.id }, connection, r, function(err, info) {
		if (err) res.status(400).send(err);
		else res.json(info);
	});
});

app.get('/users', function(req, res) {

	users.userRead(connection, r, function(err, info) {
		if (err) res.status(400).send(err);
		else res.json(info);
	});
});


//DELETE REQUESTS
app.delete('/users/:id', function(req, res) {

	users.userDelete({ id: req.params.id }, connection, r, function(err, info) {
		if (err) res.status(400).send(err);
		else res.json(info);
	});
});

//POST REQUESTS
app.post('/users', function(req, res) {

	users.userCreate(req.body, connection, r, function(err, info) {
		if (err) res.status(400).send(err);
		else res.json(info);
	});
});
	
}
module.exports = appRouter;
