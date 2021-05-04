class Enemy{
	enemyType = ["wolf", "giant spider", "ogre", "bandit", "necromancer"];
	name;
	attackStrength;
	health;
	deathStatus;
	dropChance;
	dropItem;
	gif = ["../assets/hell-hound-idle.gif", "", "../assets/ork.gif", "../assets/knight idle.gif", "../assets/wizard.gif"];


	/* Creates an instance of an enemy object
	   Parameters:
		 player: a Player object
		 name: intended enemy name, if random enemy then use a placeholder
		 random: true - enemy is randomly generated, false - enemy is predetermined
		 strengthFactor: floating point factor - how strong the enemy is compared to the player
		 drop: true - enemy drops an item, false - no item drop */
	constructor(player, name, random, strengthFactor, dropChance){
		this.deathStatus = false;
		this.health = player.getCurrentHP() * strengthFactor;
		this.attackStrength = player.getCurrentAttack() * strengthFactor;

		if(random == true){
			this.name = this.enemyType[Math.floor(Math.random() * this.enemyType.length)];
			this.dropChance = Boolean(Math.floor(Math.random() * 2));
		}
		else{
			this.name = name;
			this.dropChance = dropChance;
		}
	}

	getName(){
		return this.name;
	}

	setName(name){
		this.name = name;
	}

	getAttackStrength(){
		return this.attackStrength;
	}

	setAttackStrength(attackStrength){
		this.attackStrength = attackStrength;
	}

	getHealth(){
		return this.health;
	}

    setHealth(health){
        if(health <= 0){
            this.health = 0;
        }
        else{
            this.health = health;
        }
    }

	getDeathStatus(){
		return this.deathStatus;
	}

	setDeathStatus(deathStatus){
		this.deathStatus = deathStatus;
	}

	getDropChance(){
		return this.dropChance;
	}

	setDropChance(dropChance){
		this.dropChance = dropChance;
	}

}