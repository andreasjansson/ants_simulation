AntHill = function(position, radius)
{
	this.position = position;
	this.radius = radius;
}

AntHill.prototype.getLetter = function()
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
