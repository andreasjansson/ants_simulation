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

/**
 * Pheromones are represented as values on a grid. The higher
 * the value, the stronger the pheromone at that particular square.
 */
PheromoneGrid = function(rectangle)
{
	this.rectangle = rectangle;
	this.grid = [[]];

	for(var i = 0; i < this.rectangle.width(); i ++) {
		this.grid[i] = [];
		for(var j = 0; j < this.rectangle.height(); j ++)
			this.grid[i][j] = 0;
	}
}

PheromoneGrid.prototype.dissipate = function()
{
	for(var i = 0; i < this.rectangle.width(); i ++)
		for(var j = 0; j < this.rectangle.height(); j ++) {
			this.grid[i][j] -= Config.pheromone.DISSIPATION;
			if(this.grid[i][j] < Config.pheromone.DISAPPEAR_THRESHOLD)
				this.grid[i][j] = 0;
		}
}

PheromoneGrid.prototype.add = function(point)
{
	if(this.rectangle.contains(point))
		this.grid[point.x][point.y] += Config.pheromone.STRENGTH;
}

PheromoneGrid.prototype.get = function(point)
{
	if(this.rectangle.contains(point))
		return this.grid[point.x][point.y];

	return 0;
}

/**
 * Return pheromones for rendering
 */
PheromoneGrid.prototype.getPheromones = function()
{
	var pheromones = [];
	for(var i = 0; i < this.rectangle.width(); i ++)
		for(var j = 0; j < this.rectangle.height(); j ++)
			if(this.grid[i][j] > 0)
				pheromones.push(new Pheromone(new Vector(i, j), this.grid[i][j]));

	return pheromones;
}

PheromoneGrid.prototype.empty = function()
{
	for(var i = 0; i < this.rectangle.width(); i ++)
		for(var j = 0; j < this.rectangle.height(); j ++)
			if(this.grid[i][j] > 0)
				return false;
	return true;
}