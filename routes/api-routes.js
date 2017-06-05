var db = require("../models");

module.exports = function(app) {
	
	app.post("/api/burger", function(req,res) {
		db.Burgers.create({
			burger_name: req.body.burger_name,
			devoured: req.body.devoured
		}).then(function(newBurger) {
			res.json(newBurger);
		});
	});//end of post

	// GET route for getting all of the todos
  app.get("/api/burger", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burgers.findAll({}).then(function(burgers) {
      // We have access to the todos as an argument inside of the callback function
      res.json(burgers);
    });
  });

  // PUT route for updating todos. We can get the updated todo data from req.body
 app.put("/api/burger", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
   db.Burgers.update({
      //text: req.body.text,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }// end of where
    })// end of update
    .then(function(burgers) {
      res.json(burgers);
    });// end of then
  });// end of put


};// end of module.exports