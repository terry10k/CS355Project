class Enemy{
	var enemyType = {"wolf", "giant spider", "ogre", "bandit", "necromancer"};
	name;
	attackStrength;
	health;
	deathStatus;
	dropChance;
	dropItem;


	/* Creates an instance of an enemy object
	   Parameters:
		 player: a Player object
		 name: intended enemy name, if random enemy then use a placeholder
		 random: true - enemy is randomly generated, false - enemy is predetermined
		 strengthFactor: floating point factor - how strong the enemy is compared to the player
		 drop: true - enemy drops an item, false - no item drop */
	constructor(player, name, random, strengthFactor, dropChance){
		this.deathStatus = false;
		this.health = player.getHealth() * strengthFactor;
		this.attackStrength = player.getAttackStrength() * strengthFactor;

		if(random == true){
			this.name = enemyType[Math.floor(Math.random() * enemyType.length)];
			this.dropChance = Boolean(Math.floor(Math.random() * 2));
		}
		else{
			this.name = name;
			this.dropChance = dropChance;
		}
	}

	getName(){
		return name;
	}

	setName(name){
		this.name = name;
	}

	getAttackStrength(){
		return attackStrength;
	}

	setAttackStrength(attackStrength){
		this.attackStrength = attackStrength;
	}

	getHealth(){
		return health;
	}

	setHealth(health){
		this.health = health;
	}

	getDeathStatus(){
		return deathStatus;
	}

	setDeathStatus(deathStatus){
		this.deathStatus = deathStatus;
	}

	getDropChance(){
		return dropChance;
	}

	setDropChance(dropChance){
		this.dropChance = dropChance;
	}

}
