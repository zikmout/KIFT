var appRouter = function(app, path, projects, connection, r) {

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    app.post('/projects', function(req, res) {

        console.log(req.body);
        var project_data = req.body;
        projects.projectCreate(project_data, connection, r, function(err, info) {
            if (err) res.status(400).send(err);
            else {
                console.log(info);
                res.send(info);
            }
        });
        //res.end();
    });

    app.get('/projects', function(req, res) {

        projects.projectAllRead(connection, r, function(err, info) {
            if (err) res.status(400).send(err);
            else {
                console.log(info);
                res.send(info);
            }
        });
    });

    app.get('/projects/:id', function(req, res) {

        var project_id = req.params.id;
        console.log(project_id);
        projects.projectRead(project_id, connection, r, function(err, info) {
            if (err) res.status(400).send(err);
            else {
                console.log(info);
                res.send(info);
            }
        });
    });

    app.delete('/projects/:id', function(req, res) {

        var deleted_project_id = req.params.id;
        console.log(deleted_project_id);
        projects.projectDelete(deleted_project_id, connection, r, function(err, info) {
            if (err) res.status(400).send(err);
            else {
                console.log(info);
                res.send(info);
            }
        });
    });


}
module.exports = appRouter;
