World = function()
{
	this.ants = [];
	this.antHill = null;
	this.foods = [];
	this.foodFactory = new FoodFactory();
	this.rectangle = Config.world.RECTANGLE;
	this.pheromoneGrid = new PheromoneGrid(this.rectangle);

	// start without food, just for ants to walk out from the anthill
	this.autoCreateFood = false;
}

World.prototype.start = function()
{
	this.antHill = new AntHill(Config.antHill.POSITION.round(),
														 Config.antHill.RADIUS);

	for(var i = 0; i < Config.world.ANT_COUNT; i ++) {
		this.ants.push(new Ant(this.antHill.position));
	}
}

World.prototype.step = function()
{
	for(var i = 0; i < this.ants.length; i ++) {
		this.ants[i].step(this);
	}

	this.pheromoneGrid.dissipate();

	if(this.autoCreateFood) {
		this.createFood();
	}

	if(this.foods.length == 0 && this.pheromoneGrid.empty() &&
		 this.onComplete)
		this.onComplete();
}

World.prototype.createFood = function(force)
{
	var newFoods = this.foodFactory.create(force);
	if(newFoods) {
		for(var i = 0; i < newFoods.length; i ++) {
			var food = newFoods[i];
			food.index = this.foods.length;
			this.foods[food.index] = food;
		}
	}
}

World.prototype.removeFood = function(food)
{
	for(var i = 0; i < this.foods.length; i ++) {
		if(food == this.foods[i]) {
			Array.remove(this.foods, i);
			return;
		}
	}
}

// a list of all elements, for the view
World.prototype.elements = function()
{
	return this.ants.concat([this.antHill],
													this.foods,
													this.pheromoneGrid.getPheromones());
}

World.prototype.destroy = function()
{
	
}