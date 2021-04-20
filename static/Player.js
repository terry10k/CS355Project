class Player{
	name;
	attackStrength;
	mana;
	health;
	inventory = {};
	states = {}

	constructor(name){
		this.name = name;
		this.attackStrength = 8;
		this.mana = 50;
		this.health = 100;
	}


	getName(){
		return this.name;
	}

	getAttackStrength(){
		return this.attackStrength
	}

	setAttackStrength(attackStrength){
		this.attackStrength = attackStrength;
	}

	getMana(){
		return this.mana;
	}

	setMana(mana){
		this.mana = mana;
	}

	getHealth(){
		return health;
	}

	setHealth(health){
		this.health = health;
	}

	getInventory(){
		return inventory;
	}

	//edit this to grab item class name - item classes needs a getType code that returns "weapon", "item", "potion"
	addInventory(item){
		var found = false;
		for(var i = 0; i < inventory.length; i++){
			if(inventory[i][1] == item){
				found = true;
				inventory[i][2] = inventory[i][2] + 1;
				break;
			}
		}

		if(found ==  false){
			inventory.push([item.getType()], item.getName(), 1);
		}
	}

	removeInventory(item){
		for(var i = 0; i < inventory.length; i++){
			if(inventory[i][1] == item){
				inventory[i][2] = inventory[i][2] - 1;
				if(inventory[i][2] == 0){
					inventory.splice(i, 1);
				}
				break;
			}
		}
	}

	searchItem(item){
		for(var i = 0; i < inventory.length; i++){
			if(inventory[i][1] == item){
				return true;
			}
		}
		return false;
	}

	getState(){
		return state;
	}

	addState(key, value){
		states.push(key, value);
	}

	removeState(stateEntry){
		delete states.stateEntry;
	}

	searchState(stateEntry){
		return states.stateEntry;
	}
}
