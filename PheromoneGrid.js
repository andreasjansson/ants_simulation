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