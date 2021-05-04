class potions extends item{
    hpIncrease = 20; //healing amount for healing potions
    manaIncrease = 20 //mana amount for mana potions
    strengthIncrease = 2; //strength increase for strength potion

    /**
     * Constructor for potion instance
     * name - name of potion ("Healing Potion", "Mana Potion", "Strength Potion")
     * potionType - potion type ("healing", "mana", "strength")
     */
    constructor(name, potionType){
        super(name);
        this.potionType = potionType;
    }

    //Get type of potion
    getPotionType(){
        return this.potionType;
    }

    /**
     * Checks potion type and does the corresponding use action
     * Parameters:
     * player: a player object to use the potion on
     */
    usePotion(player){
        if(this.potionType === "healing"){
          //if using a healing potion would excede max health limit
          if(player.getCurrentHP() + this.hpIncrease >= player.getMaxHP()){
            //set player's current health to max
            player.setCurrentHP(player.getMaxHP());
          }
          else{
            player.setCurrentHP(player.getCurrentHP() + this.hpIncrease);
          }
        } //end of healing clause

        else if(this.potionType === "mana"){
          //if using a mana potion would excede max mana limit
          if(player.getCurrentMana() + this.manaIncrease >= player.getMaxMana()){
            //set player's current mana to max
            player.setCurrentMana(player.getMaxMana());
          }
          else{
            player.setCurrentMana(player.getCurrentMana() + this.manaIncrease);
          }
        }//end of mana clause

        else if(this.potionType === "strength"){
            player.setBaseAttack(player.getBaseAttack() + this.strengthIncrease);
        }//end of strength clause

        else if(this.potionType === "super healing"){
            player.setCurrentHP(player.getMaxHP());
        }

        else if(this.potionType === "super mana"){
            player.setCurrentMana(player.getMaxMana());
        }

        else if(this.potionType === "super strength"){
            player.setAttackStrength(player.getBaseAttack() + this.strengthIncrease * 2);
        }

        player.displayStats()
        /* Room for expansion
        else{
        }*/


    }//end of use potion function

    //Returns generic item/object type
    getItemType(){
      return "potion";
    }

    //Returns a string with a description of the item
    displayDescription(){
        if(this.potionType == "healing"){
          return `Consuming this healing potion will heal you for ${this.hpIncrease} health.`;
        }
        else if (this.potionType == "mana"){
          return `Consuming this mana potion will replenish ${this.manaIncrease} mana.`;
        }
        else if(this.potionType == "strength"){
          return `Consuming this strength potion will increase your attack strength by ${this.strengthIncrease}.`;
        }
    }
}
