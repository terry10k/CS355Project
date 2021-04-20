class potions extends item{

    /**
     * Constructor for potion instance
     * name - optional name of potion
     * genericType - generic type (ex. potion, weapon, etc)
     * potionType - actual potion type (ex. healing, mana)
     * strengthIncrease - strength of potion if it is a potion that increases the players strength
     * canIncreaseHP - boolean to see if the potion increases hp
     * hpIncrease - number of the amount of hp added to the player
     * canIncreaseMana - boolean to see if the potion increases mana
     * ManaIncrease - number of the amount of mana added to the player
     */
    constructor(name, genericType, potionType, strengthIncrease, canIncreaseHP, hpIncrease, canIncreaseMana, ManaIncrease){
        super(name, genericType, strengthIncrease);
        this.potionType = potionType;
        this.canIncreaseHP = canIncreaseHP;
        this.hpIncrease = hpIncrease;
        this.canIncreaseMana = canIncreaseMana;
        this.ManaIncrease = ManaIncrease;
    }

    //Get type of potion
    getPotionType(){
        return this.potionType;
    }


    //Checks the potionType and does the corresponding action
    usePotion(){
        if(this.potionType === "healing"){
            currentPlayer.currentHP = currentPlayer.currentHP + this.hpIncrease;
        }else if(type === "mana"){
            currentPlayer.mana = currentPlayer.mana + this.ManaIncrease;
        }else if(type === "strength"){
            currentPlayer.strength = currentPlayer.strength + this.strength;
        }else{
            //Room for expansion
        }
    }
}