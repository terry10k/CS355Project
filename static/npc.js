class npc {

    /**
     * Constructs nonviolent characters 
     * name - string of character name, can be very generic
     * questNeed - the item needed for their "quest" (if needed)
     * inventory - character's inventory, will be empty until the character has their quest item 
     * hasQuestNeed - boolean to check if the "quest" is completed or not
     * hasReward - boolean for if there is a reward for the quest
     * reward - array of item(s) that the character will give, will not be random
     */
    constructor(name, questNeed, inventory, hasQuestNeed = false, hasReward, reward){
        this.name = name;
        this.questNeed = questNeed;
        this.inventory = inventory;
        this.hasQuestNeed = hasQuestNeed;
        this.hasReward = hasReward;
        this.reward = reward;
    }

    //Checks to see if the character has the quest need in their inventory, if so mark true if not keep false
    completeQuest(questNeed){
        if(inventory.includes(questNeed)){
            this.hasQuestNeed = true;
        }else{
            this.hasQuestNeed = false;
        }
    }

    //Adds item to the character's inventory
    addItem(item){
        this.inventory.push(item.name);
    }


}