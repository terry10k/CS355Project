function displayInventory() {
    var i;

    inventory = currentPlayer.getInventory()



    for (i = 0; i < inventory.length; i++) {
        $(`#inventoryItem${i+1}`).append($('<div>').prop({id: 'inventoryItem', innerHTML: `${inventory[i][0].getItemName()}`,}));
        $(`#inventoryItem${i+1}`).append($('<div>').prop({id: 'count', innerHTML: `${inventory[i][1]}`,}));
        $(`#inventoryItem${i+1}`).click(use(inventory[i][0], currentPlayer))




       // inventoryItem = document.getElementById(`#inventoryItem${i+1}`)
       // inventoryItem.onclick = use(inventory, i)
    }






}

function use(item, player){
    item.usePotion(player);

}

