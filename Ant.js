Ant = function(position)
{
	this.position = position;
	this.direction = Vector.randomUnitVector();
	this.carriedFood = null;
}

Ant.prototype.getLetter = function()
{
	return "a";
}

Ant.prototype.getColour = function()
{
	return "black";
}

Ant.prototype.getZIndex = function()
{
	return 5;
}

Ant.prototype.step = function(world)
{
	var before = this.position;
	this.position = this.position.add(this.direction).round();

	var newDirection = null;

	if(this.isCarryingFood()) {
		this.carriedFood.position = this.position;

		if(this.isAtAntHill(world.antHill)) {
			world.removeFood(this.dropFood());
			this.setRandomDirection();
		}
		else {
			if(this.isNextToAntHill(world.antHill)) {
				newDirection = this.position.directionTo(world.antHill.position);
			}
			else if(this.isOnPheromone(world.pheromoneGrid))
				newDirection = this.sensePheromoneInDirection(world.pheromoneGrid,
					this.position.directionTo(world.antHill.position));
			else
				newDirection = this.position.directionTo(world.antHill.position);
			world.pheromoneGrid.add(this.position);
		}
	}
	else {
		var food = this.findFood(world.foods);
		if(food) {
			this.pickUpFood(food);
			this.position = food.position;
			world.pheromoneGrid.add(this.position);
			newDirection = this.position.directionTo(world.antHill.position);
		}
		else {
			if(this.isOnPheromone(world.pheromoneGrid))
				newDirection = this.sensePheromoneInDirection(world.pheromoneGrid,
																											this.direction);
			else
				newDirection = this.senseDistantPheromone(world.pheromoneGrid);
		}
	}

	if(!world.rectangle.contains(this.position, false, false))
		newDirection = this.position.directionTo(world.antHill.position);

	if(newDirection !== null && this.turnRationally()) {
		this.direction = newDirection;
	}
	else
		this.turnRandomly();
}

Ant.prototype.isOnPheromone = function(pheromoneGrid)
{
	return pheromoneGrid.get(this.position) > 0;
}

Ant.prototype.sensePheromoneInDirection = function(pheromoneGrid, direction)
{
	var strongestDirection = null;
	var strongestStrength = 0;

	var forward = direction.toRadians()
	for(var radians = forward - Math.PI / 8;
			radians <= forward + Math.PI / 8;
			radians += Math.PI / 8) {
		var point = this.position.add(Vector.fromRadians(radians)).round();
		var strength = pheromoneGrid.get(point);
		if(strength > strongestStrength) {
			strongestStrength = strength
			strongestDirection = radians;
		}
	}

	return Vector.fromRadians(strongestDirection);
}

Ant.prototype.senseDistantPheromone = function(pheromoneGrid)
{
	var directionStrengths = [0, 0, 0, 0, 0, 0, 0, 0];

	for(var length = 0; length < Config.ant.SENSE_DISTANCE; length ++) {
		for(var direction = 0; direction < 8; direction ++) {
			var radians = direction * 2 * Math.PI / 8;
			var point = this.position
				.add(Vector.fromRadians(radians, length)).round();
			directionStrengths[direction] += pheromoneGrid.get(point);
		}
	}

	var strongestDirection = null;
	var strongestStrength = 0;
	for(var i = 0; i < 8; i ++) {
		if(directionStrengths[i] > strongestStrength) {
			strongestDirection = i;
			strongestStrength = directionStrengths[i];
		}
	}

	if(strongestDirection === null)
		return null;

	return Vector.fromRadians(strongestDirection * 2 * Math.PI / 8);
}

Ant.prototype.turnRationally = function()
{
	return Math.random() < Config.ant.RATIONALITY;
}

Ant.prototype.turnRandomly = function()
{
	var rotation = Math.random() * 2 * Config.ant.MAX_ROTATION -
		Config.ant.MAX_ROTATION;
	this.direction = this.direction.rotate(rotation);
}

Ant.prototype.findFood = function(foods)
{
	for(var i = 0; i < foods.length; i ++) {
		var food = foods[i];
		if(food && food.isOnGround && this.position.distance(food.position) <
			 food.radius)
			return food;
	}

	return null;
}

Ant.prototype.pickUpFood = function(food)
{
	if(!food)
		return;

	if(this.carriedFood)
		throw "Already carrying food";

	food.isOnGround = false;
	this.carriedFood = food;
}

Ant.prototype.isAtAntHill = function(antHill)
{
	return this.position.distance(antHill.position) < antHill.radius;
}

Ant.prototype.isNextToAntHill = function(antHill)
{
	return this.position.distance(antHill.position) < (antHill.radius + 1);
}

Ant.prototype.dropFood = function()
{
	if(!this.carriedFood)
		throw "Not carrying food";

	var food = this.carriedFood;
	this.carriedFood = null;
	return food;
}

Ant.prototype.setRandomDirection = function()
{
	this.direction = Vector.randomUnitVector();
}

Ant.prototype.isCarryingFood = function()
{
	return this.carriedFood != null;
}
