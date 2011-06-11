Food = function(position, radius, index)
{
	this.position = position;
	this.radius = radius;
	this.isOnGround = true;
}

Food.prototype.getLetter = function()
{
	return "f";
}

Food.prototype.getColour = function()
{
	return "green";
}

Food.prototype.getZIndex = function()
{
	return 7;
}
