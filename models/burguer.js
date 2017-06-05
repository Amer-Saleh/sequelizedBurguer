// here you will build / create your burguer model
module.exports = function(sequelize, DataTypes) {
	var Burgers = sequelize.define("Burgers", {
			burger_name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			devoured: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
	});// end of sequelize.define	

	return Burgers;

};// end of module.exports