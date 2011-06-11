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

FoodFactory = function()
{

}

/**
 * Create a new cluster of foods. If force is true, a cluster
 * is definitely created. If false, it could be created based
 * on probability.
 */
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