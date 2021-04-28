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

}
