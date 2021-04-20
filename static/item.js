class item  {
    /**
     * Constructs generic item instance 
     * itemName - optional name of item
     * genericType - generic type of item (potion, weapon)
     * strength - Amount of strength the item adds to the player 
     */
    constructor(itemName, genericType, strength){
        this.itemName = itemName;
        this.genericType = genericType;
        this.strength = strength;
    }
    
    //Displays basic item information
    displayDescription(){
        `This is a ${this.genericType} that has ${strength}.`
    }

    //Gets name
    getName(){
        return this.itemName;
    }
    
    //Gets strength
    getStrength(){
        return this.strength;
    }

    //Gets type
    getGenericType(){
        return this.genericType;
    }

}