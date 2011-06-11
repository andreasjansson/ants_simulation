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

Config = {};

Config.world = {};
Config.world.RECTANGLE = new Rectangle(0, 0, 50, 25);
Config.world.ANT_COUNT = 30;

Config.ant = {};
Config.ant.SENSE_DISTANCE = 10;
Config.ant.SPEED = 1;
Config.ant.MAX_ROTATION = Math.PI / 6;
Config.ant.RATIONALITY = .8;

Config.antHill = {};
Config.antHill.RADIUS = 1;
Config.antHill.POSITION = new Vector(25, 12);

Config.food = {};
Config.food.RECTANGLE = new Rectangle(2, 2, 48, 23);
Config.food.MIN_RADIUS = 1;
Config.food.MAX_RADIUS = 1;
Config.food.MIN_AMOUNT = 5;
Config.food.MAX_AMOUNT = 12;
Config.food.SPREAD = 0;
Config.food.CREATE_PROBABILITY = .1;

Config.pheromone = {};
Config.pheromone.DISSIPATION = .07;
Config.pheromone.DISAPPEAR_THRESHOLD = .2;
Config.pheromone.STRENGTH = 1;