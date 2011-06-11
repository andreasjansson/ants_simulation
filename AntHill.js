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

AntHill = function(position, radius)
{
	this.position = position;
	this.radius = radius;
}

AntHill.prototype.getText = function()
{
	return "h";
}

AntHill.prototype.getColour = function()
{
	return "blue";
}

AntHill.prototype.getZIndex = function()
{
	return 3;
}
