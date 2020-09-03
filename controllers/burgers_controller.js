var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hdbrsObj = {
            burgers: data,
        };
        res.render("index", hdbrsObj);
    });
});

// adds the burger to the list
router.post("/api/burgers", function(req, res) {
    burger.insertOne(
        ["burger_name", "devoured"], [req.body.burger_name, req.body.devoured],
        function(result) {
            console.log("result from line 20 ", result);
            res.redirect("/");
        });
});

// changes the burger to devoured
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.updateOne({
            devoured: req.body.devoured,
        },
        condition,
        function(result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});

// Export routes for server.js to use.
module.exports = router;