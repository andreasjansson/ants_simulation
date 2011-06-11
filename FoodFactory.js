FoodFactory = function()
{

}

FoodFactory.prototype.create = function(force)
{
	if(force || Math.random() < Config.food.CREATE_PROBABILITY) {
		var foods = [];
		var centreX = Math.random() * Config.food.RECTANGLE.width() +
			Config.food.RECTANGLE.topLeft.x;
		var centreY = Math.random() * Config.food.RECTANGLE.height() +
			Config.food.RECTANGLE.topLeft.y;
		var count = Math.floor(
			Math.random() * (Config.food.MAX_AMOUNT -	Config.food.MIN_AMOUNT)) +
			Config.food.MIN_AMOUNT;
		
		for(var i = 0; i < count; i ++) {
			var position = new Vector(centreX, centreY);
			position = position.add(Vector.randomUnitVector()
															.multiply(Config.food.SPREAD)
															.multiply(Math.random())).round();
			var radius = Math.random() *
				(Config.food.MAX_RADIUS - Config.food.MIN_RADIUS) +
				Config.food.MIN_RADIUS;

			foods.push(new Food(position, radius));
		}

		return foods;
	}

	return null;
}