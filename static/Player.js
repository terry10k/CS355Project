class Player{
	name;						 //player's name (String)
	baseAttack;			//player's base attack strength (without weapons) (int)
	currentWeapon;	//current weapon user is using (weapon object)
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
		this.baseAttack = 8;
		this.maxMana = 50;
		this.currentMana = 0;//this.maxMana;
		this.maxHP = 100;
		this.currentHP = 10;//this.maxHP;
	}

	//Returns the name of the player
	getName(){
		return this.name;
	}

	//Returns the base attack strength of the player
	getBaseAttack(){
		return this.baseAttack;
	}

	//Sets base attack strength of player to a new value (int)
	setBaseAttack(baseAttack){
		this.baseAttack = baseAttack;
	}

	//Returns the weapon the player is currently using
	getCurrentWeapon(){
		return this.currentWeapon;
	}

	//Set current weapon the player is using to a new weapon (weapon object)
	setCurrentWeapon(currentWeapon){
		this.currentWeapon = currentWeapon;
	}

	//Returns the player's total attack strength (weapon + base)
	getCurrentAttack(){
		if (this.currentWeapon == null) {
			return this.baseAttack;
		}
		else return (this.baseAttack + this.currentWeapon.getStrength());
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
			if(this.inventory[i][0].getItemName() == item.getItemName()){
				found = true;
				this.inventory[i][1] = this.inventory[i][1] + 1;
				break;
			}
		}
		//if player does not already have this item in inventory, add item
		if(found ==  false){
			this.inventory.push([item, 1]);
		}

		this.displayInventory()
	}

	/**
	 * Removes an item from addInventory
	 * Parameters:
	 * item: item object to remove
	 */
	removeInventory(item){
		for(var i = 0; i < this.inventory.length; i++){
			//if item to remove is found
			if(this.inventory[i][0].getItemName() == item.getItemName()){
				this.inventory[i][1] = this.inventory[i][1] - 1; //decrement amount
				if(this.inventory[i][1] == 0){ //if item amount is 0
					this.inventory.splice(i, 1); //remove entry from array
				}
				break;
			}
		}
		this.displayInventory()
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

    displayStats() {
        $("#health").text(`Health: ${this.getCurrentHP()}/${this.getMaxHP()}`)
        $('.hpBar span').width(this.getCurrentHP() + "%");

        $("#mana").text(`Mana: ${this.getCurrentMana()}/${this.getMaxMana()}`)
        $('.manaBar span').width(this.getCurrentMana()*2 + "%");

        //fix this later for weapons
        $("#atk").text(`Attack Strength: ${this.getCurrentAttack()}`)
    }

	displayInventory() {
		var i;
		var currentItem;
		var currentItemCount;
		for (i = 0; i < 10; i++) {
			$(`#inventoryItem${i}`).empty();
			$(`#inventoryItem${i}`).off('click');

		}

		for (i = 0; i < this.inventory.length; i++) {
			currentItem = this.inventory[i][0];
			currentItemCount = this.inventory[i][1];
			$(`#inventoryItem${i}`).append($('<div>').prop({
				id: 'inventoryItem',
				innerHTML: `${currentItem.getItemName()}`,
			}));
			$(`#inventoryItem${i}`).append($('<div>').prop({id: 'count', innerHTML: `${currentItemCount}`,}));


			var player = this;

			if(currentItem.getItemType() == "weapon") {
				$(`#inventoryItem${i}`).click(function () {
					currentItem.useWeapon(player);
				})
			}
			else if(currentItem.getItemType() == "potion") {

				$(`#inventoryItem${i}`).click(function () {
					currentItem.usePotion(player);
					player.removeInventory(currentItem);
					console.log(this.innerText)
				})
			}
		}

	}
}