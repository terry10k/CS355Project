class area {
    /**
     * Constructs new instance of an area
     * name - name of the area
     * description - description of the area
     * areaNumber - area ID number
     * hasEnemyInteractions - boolean for if the area has an enemy interaction
     * hasNPCInteractions - boolean for if the area has a friendly character interaction 
     * hasItemInteractions - boolean for if the area has an item interaction 
     * areaConnections - array of areas that are connected to the current area 
     * enemySpawnChance - number chance of an enemy spawning 
     * isVisted - boolean for if the area has been visted 
     */
    constructor(name, description, areaNumber, hasEnemyInteractions = false, hasNPCInteractions = false, hasItemInteractions = false, areaConnections, enemySpawnChance, isVisted = false){
        this.name = name;
        this.description = description;
        this.areaNumber = areaNumber;
        this.hasEnemyInteractions = hasEnemyInteractions;
        this.hasNPCInteractions = hasNPCInteractions;
        this.hasItemInteractions =  hasItemInteractions;
        this.areaConnections = areaConnections;
        this.enemySpawnChance = enemySpawnChance;
        this.isVisted = isVisted;
    }

    //When a new area is created, display description as next text node
    displayInfo(description){
        showTextNode(description);
    }

    //Calculate if there is an enemy spawn or not. If yes, enemyInteraction is true. If no, enemy interaction is false
    calculateEnemySpawn(enemySpawnChance){
        let probability = Math.random() * 100;
        if(probability <= enemySpawnChance){
            this.hasEnemyInteractions = true;
        }else{
            this.hasEnemyInteractions = false;
        }
    }

    //Get area name
    getName(){
        return this.name;
    }

    //Get area description
    getDescription(){
        return this.description;
    }

    //Get area number
    getAreaNumber(){
        return this.areaNumber;
    }

    //Get area connections
    getAreaConnections(){
        return this.areaConnections;
    }

    //Set new description of area (used for if the area has already been visited)
    setDescription(newDescription){
        this.description = newDescription;
    }

}