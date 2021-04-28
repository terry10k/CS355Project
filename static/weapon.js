class weapon extends item{
    /**
     * Constructs weapon instance
     * name - Name of weapon
     * strength - Strength that weapon adds to the player
     * weaponType - Specific type of weapon(ex. sword, staff, bow & arrow)
     * manaCost - mana cost per attack (set to 0 if not magic type weapon)
     */
    constructor(name, strength, weaponType, manaCost){
        super(name);
        this.weaponType = weaponType;
        this.strength = strength;
        this.manaCost = manaCost;
    }

    /**
     * Deducts mana cost from player - possibly add other stuff
     * Parameters:
     * player: a player object
     */
    useWeapon(player){
        player.setCurrentMana(player.getCurrentMana() - manaCost);
    }

    //Get type of weapon
    getWeaponType(){
        return this.weaponType;
    }

    //Returns the weapon's strength
    getStrength(){
      return this.strength;
    }

    //Sets the strength of the weapon to a new value (int)
    setStrength(strength){
      this.strength = strength;
    }
    //Get mana cost of weapon
    getManaCost(){
        return this.manaCost;
    }

    //Set mana cost of weapon
    setManaCost(manaCost){
      this.manaCost = manaCost;
    }

    //Returns generic item/object type
    getItemType(){
      return "weapon";
    }

    //Returns a string with a description of the item
    displayDescription(){
        return '${this.itemName} attacks for ${strength} damage.';
    }

}
