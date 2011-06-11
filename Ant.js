/*
 * ants_simulation - A naive Javascript simulation of an ant colony
 * Copyright (C) 2011 Andreas Jansson
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

Ant = function(position)
{
	this.position = position;
	this.direction = Vector.randomUnitVector();
	this.carriedFood = null;
}

Ant.prototype.getText = function()
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

/**
 * Apply the rules described in README.
 */
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

/**
 * Sense a pheromone in an arc of 3/8 * pi radians in direction,
 * right in front of the ant.
 * Returns the direction of the found pheromone, as a vector, or
 * null if none were found.
 * If there are more than one, return the direction of the strongest.
 */
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

/**
 * Sense pheromone by "looking" in eight directions.
 * Return the direction that has the most pheromones in it.
 * All pheromones are equally weighted (strength not taken
 * into consideration), but the fact that coverage is decreasing
 * exponentially the further out from the ant you get
 * effectively means that pheromone further away is less
 * important.
 * Returns a vector or null.
 */
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

/**
 * Will the ant turn according to rules, or just randomly?
 */
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
