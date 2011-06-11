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
Config.food.MIN_AMOUNT = 3;
Config.food.MAX_AMOUNT = 8;
Config.food.SPREAD = 0;
Config.food.CREATE_PROBABILITY = .1;

Config.pheromone = {};
Config.pheromone.DISSIPATION = .07;
Config.pheromone.DISAPPEAR_THRESHOLD = .2;
Config.pheromone.STRENGTH = 1;