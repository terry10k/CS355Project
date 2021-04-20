class weapon extends item{
    /**
     * Constructs weapon instance
     * name - optional name of weapon
     * genericType - generic type (ex. weapon, potion, etc)
     * strength - Strength that weapon adds to the player
     * weaponType - Specific type of weapon(ex. sword, staff, bow & arrow)
     * isMage - boolean that checks if the weapon is mage
     * manaCost - number of the amount of mana that using mage weapon's cost
     */
    constructor(name, genericType, strength, weaponType, isMage = false, manaCost){
        super(name, genericType, strength);
        this.weaponType = weaponType;
        this.strength = strength;
        this.isMage = isMage;
        this.manaCost = manaCost;
    }

    //Checks weapon type and makes that weapon the user's current weapon
    useWeapon(){
        if(weaponType === "sword"){
            userWeapon = sword;
        }else if(weaponType === "staff"){
            userWeapon = staff;
        }else if(weaponType === "bow & arrow"){
            userWeapon = bowArrow;
        }else{
            //Room for expansion
        }
    }

    //Get type of weapon
    getWeaponType(){
        return this.weaponType;
    }

    //Get mana cost of weapon
    getManaCost(){
        return this.manaCost;
    }

}