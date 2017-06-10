var exec = require('sync-exec');
var async = require('async');
var fs = require("fs");


exports.projectCreate = function(data, connection, r, callback) {
    r.db('sipo').table('projects').insert([data]).run(connection, function(err, result) {
        if (err) throw err;
/*
        r.db('sipo').table('users')
            .filter((row) => {
            return row('group').setIntersection(['it', 'engineer']).count().gt(0)
        }).*/

        //r.db('sipo').table('users').pluck({'group' : ['it', 'engineer']}).
        //r.db('sipo').table('users').filter( r.row('group').contains(['it', 'engineer'])).
        //r.db('sipo').table('users').filter(r.row('group').eq("it")).
        


        r.db('sipo').table("users").filter(
          function (doc) {
            return r.expr(["engineer", "it"])
                    .contains(doc("group"));
          }
        ).


        //r.db('sipo').table('users').filter(r.row('group').eq("it")).

        run(connection, function(err, cursor) {
            if (err) throw err;
            cursor.toArray(function(err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
                for (var i = 0; i < result.length; i++) {
                    console.log(result[i].id);
                }
            });
        });
        callback(false, JSON.stringify(result, null, 2));
    });
}

exports.projectRead = function(data, connection, r, callback) {
    r.db('sipo').table('projects').get(data).run(connection, function(err, result) {
    if (err) throw err;
        callback(JSON.stringify(result, null, 2));
    });
}

exports.projectAllRead = function(connection, r, callback) {
    r.db('sipo').table('projects').run(connection, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            callback(JSON.stringify(result, null, 2));
        });
    });
}

exports.projectDelete = function(data, connection, r, callback) {
    r.db('sipo').table('projects').get(data).delete().run(connection, function(err, result) {
        if (err) throw err;
            callback(JSON.stringify(result, null, 2));
    });
}