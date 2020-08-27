var connection = require("../config/connection.js");

function createQmarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function translateSql(ob) {
    var arr = [];
    var value = "";
    console.log(ob);
    for (var key in ob) {
        if (Object.hasOwnProperty.call(ob, key)) {
            value = ob[key];
            // console.log("line18 orm" + key);
            // console.log("line19 orm" + value);
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function(table, cb) {
        var dbQuery = "SELECT * FROM " + table + ";";
        connection.query(dbQuery, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var dbQuery = "INSERT INTO " + table;

        dbQuery +=
            "(" +
            cols.toString() +
            ") " +
            "VALUES (" +
            createQmarks(vals.length) +
            ") ";

        console.log("48: orm " + dbQuery);
        connection.query(dbQuery, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    updateOne: function(table, objColVals, condition, cb) {
        // console.log("condition : " + condition);
        var dbQuery = "UPDATE " + table;

        dbQuery += " SET ";
        dbQuery += translateSql(objColVals);
        dbQuery += " WHERE ";
        dbQuery += condition;


        console.log("74. " + dbQuery);
        connection.query(dbQuery, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // deleteOne: function(table, condition, cb) {
    //     var dbQuery = "DELETE FROM " + table;
    //     dbQuery += " WHERE ";
    //     dbQuery += condition;

    //     connection.query(dbQuery, function(err, result) {
    //         if (err) {
    //             throw err;
    //         }

    //         cb(result);
    //     });
    // }
};

module.exports = orm;