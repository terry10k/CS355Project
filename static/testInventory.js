const inventoryElement = document.getElementById('inventoryItems')

const  items = [
    {
        id: 100,
        text: "Potion of Healing",
        count: 1
    },

    {
        id: 101,
        text: "Sword",
        count: 2
    },

    {
        id: 102,
        text: "Potion of Mana",
        count: 5
    }
]


function displayInventory() {
    var i;

    var btn
    for (i = 0; i < items.length; i++) {
        btn = document.createElement("button")
        btn.setAttribute("class", "itemButton")
        itemName = document.createTextNode(items[i].text);
        btn.append(itemName); 

        inventoryElement.appendChild(btn);


    }

    var itemButtons =document.getElementsByClassName("itemButton")

    for (i = 0; i < itemButtons.length; i++) {
        itemButtons[i].onclick = use
    }
}

function use() {
    console.log("test")
    //use item lol

}

displayInventory()