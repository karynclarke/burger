var orm = require("../config/orm.js");

var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    insertOne: function(name, cb) {
        console.log("inside insert one", cols, vals);
        orm.insertOne("burgers", ["burger_name", "devoured"], [name, false], cb);


        // function(res) {
        //     cb(res);
        // });
    },


    updateOne: function(objColVals, condition, cb) {
        orm.selectAll("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    },

    deleteOne: function(condition, cb) {
        orm.selectAll("burgers", condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;