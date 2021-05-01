function displayInventory() {
    var i;

    inventory = currentPlayer.getInventory()


    for (i = 0; i < inventory.length; i++) {
        item = inventory[i][0]
        $(`#inventoryItem${i+1}`).append($('<div>').prop({id: 'inventoryItem', innerHTML: `${item.getItemName()}`,}));
        $(`#inventoryItem${i+1}`).append($('<div>').prop({id: 'count', innerHTML: `${inventory[i][1]}`,}));


        //you have to pass stuff into function()

        $(`#inventoryItem${i+1}`).click(function( item ){ use(item,currentPlayer); })
        console.log(item)



       // inventoryItem = document.getElementById(`#inventoryItem${i+1}`)
       // inventoryItem.onclick = use(inventory, i)
    }






}

function use(){
    console.log(item)
    item.usePotion(currentPlayer)
}

