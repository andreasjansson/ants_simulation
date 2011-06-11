Pheromone = function(position, strength)
{
	this.position = position;
	this.strength = strength;
	this.letter = 'p';
}

Pheromone.prototype.getLetter = function()
{
	return this.letter;
}

Pheromone.prototype.getColour = function()
{
	var strength = Math.max(1 - this.strength * .4, 0);
	return "rgb(237, " + Math.round(strength * 218)  + ", " +
		Math.round(strength * 164) + ")";
}

Pheromone.prototype.getZIndex = function()
{
	return 1;
}
