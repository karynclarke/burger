var orm = require("../config/orm.js");

var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },

    // adds a burger
    insertOne: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals,
            function(res) {
                cb(res);
            });
    },

    // moves the burger to the other side
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    },

};

module.exports = burger;