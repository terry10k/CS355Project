class Player{
	name;						 //player's name (String)
	attackStrength;  //player's damage (int)
	currentMana;		 //player's current mana (int)
	maxMana;				 //player's max max (int)
	currentHP;			 // player'current health (int)
	maxHP;					 // player's max health (int)
	inventory = [];	 //players inventory - each entry has the format of: [item object, number of items]
	states = {}			 //player states - each entry has format of: "state_name":boolean_Value

/**
 * Constructs a player class
 * Parameters:
 * name (string): player's name
 */
	constructor(name){
		this.name = name;
		this.attackStrength = 8;
		this.maxMana = 50;
		this.currentMana = this.maxMana;
		this.maxHP = 100;
		this.currentHP = this.maxHP
	}

	//Returns the name of the players
	getName(){
		return this.name;
	}

	//Returns the attack strength of the player
	getAttackStrength(){
		return this.attackStrength
	}

	//Sets attack strength of player to a new value (int)
	setAttackStrength(attackStrength){
		this.attackStrength = attackStrength;
	}

	//Returns player's max possible mana
	getMaxMana(){
		return this.maxMana;
	}

	//Sets player's max mana to a new value (int)
	setMaxMana(maxMana){
		this.maxMana = maxMana;
	}

	//Returns player's current mana
	getCurrentMana(){
		return this.currentMana;
	}

	//Sets player's current mana to a new value (int)
	setCurrentMana(currentMana){
		this.currentMana = currentMana;
	}

	//Returns player's current health
	getCurrentHP(){
		return this.currentHP;
	}

	//Sets player's current health to a new value (int)
	setCurrentHP(currentHP){
		this.currentHP = currentHP;
	}

	//Gets player's max possible health
	getMaxHP(){
		return this.maxHP;
	}

	//Sets player's max health to a new value (int)
	setMaxHP(maxHP){
		this.maxHP = maxHP;
	}

	//Returns the whole inventory array
	getInventory(){
		return this.inventory;
	}

	/**
	 * Adds an item to the inventory
	 * Parameter:
	 * item (item object) : item to add to inventory
	 */
	addInventory(item){
		var found = false;
		for(var i = 0; i < this.inventory.length; i++){
			//if the player already has another item of the same type in the inventory, increment amount
			if(this.inventory[i][0].getItemName() == item.getItemName){
				found = true;
				this.inventory[i][1] = this.inventory[i][1] + 1;
				break;
			}
		}
		//if player does not already have this item in inventory, add item
		if(found ==  false){
			this.inventory.push([item, 1]);
		}
	}

	/**
	 * Removes an item from addInventory
	 * Parameters:
	 * item: item object to remove
	 */
	removeInventory(item){
		for(var i = 0; i < inventory.length; i++){
			//if item to remove is found
			if(inventory[i][0].getitemName() == item.getItemName()){
				inventory[i][1] = inventory[i][1] - 1; //decrement amount
				if(inventory[i][1] == 0){ //if item amount is 0
					this.inventory.splice(i, 1); //remove entry from array
				}
				break;
			}
		}
	}

/**
 * Searches for an item in inventory. Returns true if found, false if not found.
 */
	searchItem(item){
		for(var i = 0; i < inventory.length; i++){
			if(inventory[i][0].getItemName() == item.getItemName()){
				return true;
			}
		}
		return false;
	}

	//Returns the state array
	getState(){
		return state;
	}

	/**
	 * Adds a state to the array
	 * key (string) - name of the state
	 * value (boolean) - true or false value for the respective state
	 */
	addState(key, value){
		states.push(key, value);
	}


	removeState(stateEntry){
		delete states.stateEntry;
	}

	searchState(stateEntry){
		return states.stateEntry;
	}

	/*
		This updates the stats on the hud (left side of screen)
	 */
	displayStats() {
		$("#health").text(`Health: ${currentPlayer.getCurrentHP()}/${currentPlayer.getMaxHP()}`)
		$('.hpBar span').width(currentPlayer.getCurrentHP() + "%");

		$("#mana").text(`Health: ${currentPlayer.getCurrentMana()}/${currentPlayer.getMaxMana()}`)
		$('.manaBar span').width(currentPlayer.getCurrentMana()*2 + "%");

		$("#atk").text(`Attack Strength: ${currentPlayer.getAttackStrength()}`)
	}
}
