const textElement = document.getElementById('prompt');
const optionButtonsElement = document.getElementById('option-buttons');

//This is the spot where we will hold the weapon that is currently being used: set at default right now
var defaultWeapon = new weapon("none",  0, "none", 0);
var userWeapon = defaultWeapon;
var sword = new weapon("sword", 10, "sword", 0);
var staff = new weapon("staff", 10, "staff", 1);
var bowArrow = new weapon("bow & arrow", 10, "bow & arrow", 0);
var upgradedSword = new weapon("Level 2 sword", 20, "sword", 0);
var upgradedBowArrow = new weapon("Level 2 bow & arrow", 20, "bow & arrow", 0);
var upgradedStaff = new weapon("Level 2 staff", 20, "staff", 2);
var enchantedStaff = new weapon("Level 3 staff", 30, "staff", 3);
var enchantedBowArrow = new weapon("Level 3 Bow & Arrow", 30, "bow & arrow", 0);
var enchantedSword = new weapon("level 3 sword", 30, "sword", 0);

//Creating potions
var healingPotion = new potions("healing potion",  "healing");
var strengthPotion = new potions("strength potion", "strength");
var manaPotion = new potions("mana potion", "mana");
var superHealingPotion = new potions("super healing potion", "super healing");
var superStrengthPotion = new potions("super strength potion", "super strength");
var superManaPotion = new potions("super mana potion", "super mana");

var currentPlayer = new Player(localStorage.getItem("playerName"));
currentPlayer.setCurrentWeapon(defaultWeapon);

//Creating Areas
var battlefield = new area("Battlefield", 1, false, 0, false);
var village = new area("Village", 12, false, 0, false);
var ogreTracks = new area("Ogre Tracks End", 13, true, 100, false);
var armyCamp = new area("Army Camp", 14, false, 50, false);
var startForest = new area("Start of Forest", 28, true, 100, false);
var deepForest = new area("Deep in the Forest", 29, false, 0, false);
var elfCastle = new area("Elf Castle", 34, false, 0, false);
var openField = new area("Open Field", 35, false, 95, false);
var mysteriousLight = new area("Orge Trap", 38, false, 0, false);
var mageTower = new area("Mage Tower", 39, false,  0, false);
var insideTower = new area("Inside the Tower", 43, false, 0, false);
var storageRoom = new area("Storage Room", 45, true, 100, false);
var library = new area("Library", 46, false, 45, false);
var upTheStairs = new area("Wizard's Office", 47, false, 0, false);
var blacksmith = new area("Blacksmith's", 54, false, 0, false);
var potionMaster = new area("Potion Master's",65,false, 0, false);


//enemy possibilities
var wolf = new Enemy(currentPlayer, "none", false, 0.7, false);
var ogre = new Enemy(currentPlayer, "none", false, 1.2, false);
var randomEnemy = new Enemy(currentPlayer, "none", 0.5, 0, false);
var malikai = new Enemy(currentPlayer, "none", false, 0.9, false);
var voice = new Enemy(currentPlayer, "none", false, 1.0, false);
var randomEnemyName = "";

var state = {};

var itemsList = [healingPotion, strengthPotion, manaPotion, bowArrow, staff, sword, upgradedBowArrow, upgradedSword]

function getRandomItems(){
    var itemAmount = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    for(var i = 0; i <= itemAmount; i++){
        var itemIndex = Math.floor(Math.random() * (7-0 + 1)) + 0;
        var item = itemsList[itemIndex];
        currentPlayer.addInventory(item);
    }
}

function getProbability(choice1, choice2, percentage){
    var probability = Math.random() * 100;
    if(probability > percentage){
        showTextNode(choice1);
    }else{
        showTextNode(choice2);
    }
}

function randomizeCombat(path1, path2, percentage){
    combat(currentPlayer, wolf);
    var probability = Math.random() * 100;
    console.log(probability);
    if(probability > percentage){
        getRandomItems();
        showTextNode(path1);
    }else{
        showTextNode(path2);
    }
}


function game(){
    state = {}

    //var value = localStorage.getItem("playerName");
    //currentPlayer = new Player(value);
    currentPlayer.displayStats();
    currentPlayer.displayInventory();

    battlefield.displayInfo(battlefield.description);
    battlefield.isVisted = true;

}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while(optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    textNode.options.forEach(option =>{
        if(showOption(option)){
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    //CHANGE HERE FOR GOING FROM CREATING AREAS TO SHOWING TEXT NODES TO BATTLES ETC.
    const nextTextNodeId = (option.nextText % 100);
    console.log(currentPlayer.getInventory());
    if(nextTextNodeId <= 0){
        document.location.reload();
    }
    state = Object.assign(state, option.setState);
    if(option.nextText > 107 && option.nextText < 111){
        var weaponChoice = option.text;
        if(weaponChoice === "Sword"){
            userWeapon = sword;
        }else if(weaponChoice === "Staff"){
            userWeapon = staff;
        }else {
            userWeapon = bowArrow;
        }
        currentPlayer.setCurrentWeapon(userWeapon);
        currentPlayer.addInventory(userWeapon);
        showTextNode(nextTextNodeId);
    }else if(option.nextText == 111 || option.nextText == 112 || option.nextText == 113 || option.nextText == 114 || option.nextText == 128 || option.nextText == 129 || option.nextText == 134 || option.nextText == 135 || option.nextText == 138 || option.nextText == 139 || option.nextText == 143 || option.nextText == 145 || option.nextText == 146 || option.nextText == 147 || option.nextText == 154 || option.nextText == 165){
        if(option.nextText == 112){
            village.displayInfo(village.description);
            village.isVisted = true;
        }else if(option.nextText === 113){
            ogre = new Enemy(currentPlayer, "ogre", false, 2, true);
            ogreTracks.displayInfo(ogreTracks.description);
            ogreTracks.isVisted = true;
        }else if(option.nextText === 114 && !armyCamp.isVisted){
            armyCamp.calculateEnemySpawn(armyCamp.enemySpawnChance);
            if(!armyCamp.hasEnemyInteractions){
                armyCamp.setDescription(22);
            }else{
                wolf = new Enemy(currentPlayer, "wolf", false, 1, false);
            }
            armyCamp.displayInfo(armyCamp.description);
            armyCamp.isVisted = true;
        }else if(option.nextText == 114 && armyCamp.isVisted){
            showTextNode(11);
        }else if(option.nextText == 111){
            currentPlayer.addInventory(upgradedSword);
            currentPlayer.addInventory(upgradedBowArrow);
            currentPlayer.addInventory(healingPotion);
            showTextNode(nextTextNodeId);
        }else if(option.nextText == 128){
            randomEnemy = new Enemy(currentPlayer, "random", true, 0.3, true);
            randomEnemyName = randomEnemy.getName();
            startForest.isVisted = true;
            startForest.displayInfo(startForest.description);
        }else if(option.nextText == 129){
            deepForest.isVisted = true;
            deepForest.displayInfo(deepForest.description);
        }else if(option.nextText == 134){
            elfCastle.isVisted = true;
            elfCastle.displayInfo(elfCastle.description);
        }else if(option.nextText == 135){
            openField.isVisted = true;
            openField.displayInfo(openField.description);
        }else if(option.nextText == 138){
            mysteriousLight.isVisted = true;
            mysteriousLight.displayInfo(mysteriousLight.description);
        }else if(option.nextText == 139){
            mageTower.isVisted = true;
            mageTower.displayInfo(mageTower.description);
        }else if(option.nextText == 143){
            insideTower.isVisted = true;
            insideTower.displayInfo(insideTower.description);
        }else if(option.nextText == 145 && !storageRoom.isVisted){
            randomEnemy = new Enemy(currentPlayer, "random", true, 0.5, true);
            randomEnemyName = randomEnemy.getName();
            storageRoom.isVisted = true;
            storageRoom.displayInfo(storageRoom.description);
        }else if(option.nextText == 146 && !library.isVisted){
            library.isVisted = true;
            library.displayInfo(library.description);
        }else if(option.nextText == 147 && !upTheStairs.isVisted){
            upTheStairs.isVisted = true;
            upTheStairs.displayInfo(upTheStairs.description);
        }else if(option.nextText == 145 && storageRoom.isVisted){
            showTextNode(43);
        }else if(option.nextText == 146 && library.isVisted){
            showTextNode(43);
        }else if(option.nextText == 147 && upTheStairs.isVisted){
            showTextNode(43);
        }else if(option.nextText == 154){
            blacksmith.isVisted = true;
            blacksmith.displayInfo(blacksmith.description);
        }else if(option.nextText == 165){
            potionMaster.isVisted = true;
            potionMaster.displayInfo(potionMaster.description);
        }
    }else if(option.nextText == 118){
        getProbability(18, 23, 50);

    }else if(option.nextText == 119){
        getProbability(19,24,50);
    }else if(option.nextText == 120){
        getProbability(20,21,50);
    }else if(option.nextText == 125){
        console.log("yes");
        getRandomItems();
        showTextNode(nextTextNodeId);
    }else if(option.nextText == 127){
        getRandomItems();
        showTextNode(nextTextNodeId);
    }else if(option.nextText == 148){
        currentPlayer.setBaseAttack(currentPlayer.getBaseAttack() + 2);
    }else if(option.nextText == 149){
        ogre.setAttackStrength(ogre.getAttackStrength() - 5);
        malikai.setAttackStrength(malikai.getAttackStrength() - 5);
    }else if(option.nextText == 117){
        randomizeCombat(17,98, 50);
    }else if(option.nextText == 189){
        randomizeCombat(89, 98, 50);
    }else if(option.nextText == 190){
        randomizeCombat(90, 98, 50);
    }else if(option.nextText == 191){
        randomizeCombat(91, 98, 50);
    }else if(option.nextText == 192){
        randomizeCombat(92, 98, 50);
    }else if(option.nextText == 193){
        randomizeCombat(93, 98, 50);
    }else if(option.nextText == 194){
        randomizeCombat(94, 98, 50);
    }else if(option.nextText == 195){
        randomizeCombat(95, 98, 50);
    }else if(option.nextText == 196){
        randomizeCombat(96, 98, 50);
    }else if(option.nextText > 156 && option.nextText < 159){
        var weaponChoice = option.text;
        if(weaponChoice === "Strong Sword"){
            userWeapon = enchantedSword;
        }else if(weaponChoice === "Strong Staff"){
            userWeapon = enchantedStaff;
        }else {
            userWeapon = enchantedBowArrow;
        }
        currentPlayer.setCurrentWeapon(userWeapon);
        currentPlayer.addInventory(userWeapon);
        showTextNode(nextTextNodeId);
    }else if(option.nextText > 167 && option.nextText < 170){
        var potionChoice = option.text;
        var userPotion = new potions("none", "none");
        if(potionChoice == "Super Healing"){
            userPotion = superHealingPotion;
        }else if(potionChoice == "Super Mana"){
            userPotion = superManaPotion;
        }else{
            userPotion = superStrengthPotion;
        }
        currentPlayer.addInventory(userPotion);
        showTextNode(nextTextNodeId);
    }else if(option.nextText == 161){
        getProbability(61, 63, 50);
    }else if(option.nextText == 163){
        randomizeCombat(63,98, 50)
    }else if(option.nextText == 188){
        randomizeCombat(88,98,50);
    }else{
        showTextNode(nextTextNodeId);
    }
}

const textNodes = [
    {
        id: 1,
        text: 'Years ago the country of Teavra was a beautiful society. A country full of lush forests and alluring nature. A country where different groups could live in unison, free from harm. However, one night a darkness was casted over the country, groups turned hostile and the beautiful scenery that once was Teavra was now dull and frightful.',
        options: [
            {
                text: '...',
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: 'Now that’s where you come in weakling. Here you lay on the battlefield surrounded by your soldiers who bravely fought to their death against those ogres. And what did you do? You laid unconsious for the entire fight after being knocked out by one slight blow to the head. *Scoffs* Your weakness disgusts me. ',
        options: [
            {
                text: 'Wha- who are you? Where are you?',
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: 'Where am I? Look around you? Do you see anyone else? No. Where do you think I am? I am in your mind of course and unluckily for you and luckily for me there is a LOT of room up here. As for who am I, well… some may say I am a guide, others say I am their guardian. But, what others think of me is unimportant, what I care about is what I am here to do for you.',
        options: [
            {
                text: '...',
                nextText: 4
            },
        ]
    },
    {
        id: 4,
        text: 'You must avenge the deaths of your fellow soldiers. You must do this by defeating the strongest enemy in Teavra. Now who do you think that is? ',
        options: [
            {
                text: 'The leader of the ogres?',
                nextText: 5
            },
        ]
    },
    {
        id: 5,
        text: ' Look at you, maybe you aren’t as dumb as I think you are. Yes, you must kill the ogre leader Malikai. Which I find to be quite a hard task for you considering how weak of a human you are. But, now that you have asked who I am. I must ask the same of you. Who are you?',
        options: [
            {
                text: 'Tell him your real name',
                nextText: 6
            },
            {
                text: 'Make up a fake name',
                nextText: 99
            },
            {
                text: 'Refuse to give up your name',
                nextText: 99
            }
        ]
    },
    {
        id: 6,
        text: `${currentPlayer.getName()}? Figured a weakling like you would have a name like that. Now let’s get this mission over with. Where do you think we should go first?`,
        options: [
            {
                text: '...',
                nextText: 7
            },
        ]
    },
    {
        id: 7,
        text: 'You look around. There are three different types of weapons laying around the battlefield. A sword, a staff, and a bow and arrow. Which do you choose?',
        options: [
            {
                text: 'Sword',
                nextText: 108
            },
            {
                text: 'Staff',
                nextText: 109
            },
            {
                text: 'Bow & Arrow',
                nextText: 110
            },
        ]
    },
    {
        id: 8,
        text: `You have chosen the sword. A ways down the road there seems to be what is left of a village. You wonder if there is a possibility that there are still inhabitants. Next to you is the base of your army. Is there possibly any supplies still lying around? Finally you notice what looks like orge tracks leading into the middle of the forest. Those will surely lead you to where you need to go, but do you dare follow them? Which option do you choose?`,
        options: [
            {
                text: '...',
                nextText: 11
            },
        ]
    },
    {
    id: 9,
    text: `You have chosen the staff. A ways down the road there seems to be what is left of a village. You wonder if there is a possibility that there are still inhabitants. Next to you is the base of your army. Is there possibly any supplies still lying around? Finally you notice what looks like orge tracks leading into the middle of the forest. Those will surely lead you to where you need to go, but do you dare follow them? Which option do you choose?`,
    options: [
            {
                text: '...',
                nextText: 11
            },
        ]
    },
    {
        id: 10,
        text: `You have chosen the bow & arrow. A ways down the road there seems to be what is left of a village. You wonder if there is a possibility that there are still inhabitants. Next to you is the base of your army. Is there possibly any supplies still lying around? Finally you notice what looks like orge tracks leading into the middle of the forest. Those will surely lead you to where you need to go, but do you dare follow them? Which option do you choose?`,
        options: [
            {
                text: '....',
                nextText: 11
            },
        ]
    },{
        id: 11,
        text: 'Which do you choose?',
        options: [
            {
                text: 'Go to village',
                nextText: 112
            },
            {
                text: 'Follow ogre tracks',
                nextText: 113
            },
            {
                text: 'Explore army camp',
                nextText: 114
            }
        ]
    },
    {
        id: 12,
        text: `You come upon a poor and desolate village. Buildings are abandoned and only a few villagers still remain. One approaches you...`,
        options: [
            {
                text: '...',
                nextText: 15
            },
        ]
    },
    {
        id: 13,
        text: `As you start your journey following the ogre tracks.. You get a sudden uneasy feeling. You look up and oh no! There’s an ogre straight ahead of you! It has not spotted you yet. So you still might be able to sneak past it! \n \n Narrator: Now is your shot to start avenging your fallen friends! If you try to sneak off you’re only emphasizing how weak of a person you are. Are you ready to be a strong person for once? Go on. Do it. `,
        options: [
            {
                text: '...',
                nextText: 16
            },
        ]
    },
    {
        id: 14,
        text: `You enter the tent of your base and find upgraded weapons and a couple of potions. But before you can grab anything… you hear a growl coming from behind you. You turn around to see a wolf behind you. Quick! Fight it off!`,
        options: [
            {
                text: 'Start Combat',
                nextText: 117
            },
        ]
    },
    {
        id: 15,
        text: `Villager: Oh my! Were you fighting in that battle against the ogres? We were under the impression that everyone in our army had perished. How did you survive? \n Narrator: What do you think they are going to think when you tell them the truth of what happened on that battlefield. You will be the laughingstock of what is left of this village. Do you really think telling the truth is a good idea?`,
        options: [
            {
                text: 'Tell the truth',
                nextText: 118
            },
            {
                text: 'Lie',
                nextText: 119
            },
        ]
    },
    {
        id: 16,
        text: 'Which do you choose?',
        options:[
            {
                text: 'Sneak',
                nextText: 120
            },
            {
                text: 'Fight',
                nextText: 195
            }
        ]
    },
    {
        id: 17,
        text: 'Congrats! You have successfully slayed the wolf!',
        options:[
            {
                text: '...',
                nextText: 111
            }
        ]
    },
    {
        id: 18,
        text: 'You: I actually don’t remember the fight at all. I was knocked out at the beginning of the fight from getting hit by a rock that was thrown. I really wish I could have fought for our safety. I apologize for letting our people down. It will haunt me forever. \n \n Villager: Please do not feel bad young soldier, I can sense in you a great strength hidden within. I sense that you would have done great things in that battle had you had not have gotten struck so early. Please, take these in order to get back to full health and to prepare for your journey ahead!',
        options:[
            {
                text: 'Thank you kind villager!',
                nextText: 125
            }
        ]
    },
    {
        id: 19,
        text: 'You: Well, I fought very valiantly. I was slaying ogres left and right alongside my fellow soldiers. However, the ogre attacks became too much for my body to handle and I was left too weak to continue to fight, despite my very best efforts. \n \n Villager: Oh my, you are a hero! We must reward you for your efforts! On behalf of myself and the other villagers, we would like to give you this gift!',
        options: [
            {
                text: 'Thank you kind villager!',
                nextText: 125
            }
        ]
    },
    {
        id: 20,
        text: 'You decide to try to sneak around the ogre. There is an overgrown path off to the side of the ogre. You slowly start to inch your way over to the path... After a long slow walk through the brush of the forest you finally make it past the ogre without alerting it! Phew. ',
        options:[
            {
                text: 'Continue on...',
                nextText: 128
            }
        ]
    },
    {
        id: 21,
        text: 'You decide to try to sneak around the ogre. There is an overgrown path off to the side of the ogre. You slowly start to inch your way over to the path... *Crack* Oh no! You stepped on a branch and it alerted the ogre! He starts coming towards you. Looks like it is time to fight!',
        options:[
            {
                text: 'Start Combat',
                nextText: 195
            }
        ]
    },
    {
        id: 22,
        text: 'You enter the tent of your base and find upgraded weapons and a couple of potions. You recieve an upgraded sword, an upgraded bow & arrow, and a healing potion.',
        options:[
            {
            text: 'Go back',
            nextText: 111
            },
        ]
    },
    {
        id: 23,
        text: 'You: I actually don’t remember the fight at all. I was knocked out at the beginning of the fight from getting hit by a rock that was thrown. I really wish I could have fought for our safety. I apologize for letting our people down. It will haunt me forever. \n \n Villager: *Scoff* And you dare come into our village after such a poor show out on the field. You should be ashamed for how you fought in that battle. If I were you I wouldn’t bother to show my face around here. I think it is best for you to leave. Goodbye. ',
        options: [
            {
                text: '...',
                nextText: 25
            }
        ]
    },
    {
        id: 24,
        text: 'You: Well, I fought very valiantly. I was slaying ogres left and right alongside my fellow soldiers. However, the ogre attacks became too much for my body to handle and I was left too weak to continue to fight, despite my very best efforts. \n \n Villager: While you do look awfully rough, if I remember right, some villagers went out to the battlegrounds after the ogres had left, and there were no ogre bodies in sight. How could you have been killing multiple, but no bodies were found? You are not being truthful. I refuse to communicate with liars. Goodbye. ',
        options:[
            {
            text: '...',
            nextText: 25
            },
        ]
    },
    {
        id: 25,
        text: 'You have the thought to search some of the buildings in the village to see if there are any valuable items to salvage. But is it worth it? Else, there is a path leading from the village into the forest. Should you venture into unknowns of that deep forest?',
        options:[
            {
                text: '...',
                nextText: 26
            },
        ]
    },
    {
        id: 26,
        text: 'Which do you choose?',
        options:[
            {
                text: 'Search The Abandoned Buildings',
                nextText: 127
            },
            {
                text: 'Follow The Path Into The Forest',
                nextText: 128
            },
            {
                text: 'Go back',
                nextText: 11
            }
        ]
    },
    {
        id: 27,
        text: 'You search through the buildings and find various items.',
        options:[
            {
                text: 'Follow The Path Into The Forest',
                nextText: 28
            },
            {
                text: 'Go Back',
                nextText: 11
            }
        ]
    },
    {
        id: 28,
        text: `As you continue your trek through the dark and thick forest, you come across a ${randomEnemyName} and this ${randomEnemyName} does not look happy.`,
        options:[
            {
                text: 'Start Combat',
                nextText: 194
            }
        ]
    },
    {
        id: 29,
        text: 'As you get further & further into the forest. Soon you start hearing what sounds to be faint yelling. You begin running towards the noises in hopes that the screams could be from another solider who is still alive. The screams lead you to an elf that looks like he could use some help...',
        options:[
            {
                text: '...',
                nextText: 30
            }
        ]
    },
    {
        id: 30,
        text: `Elf: Help! Please Help! Could you please help me? I have injured myself from a wolf attack and I am in need of a healing potion. Could you please spare me one? \n \n Voice: ${currentPlayer.getName()} why would you help him? Why waste one of your healing potions on him? He is just a lowly little elf, he surely would not be able to help you in your journey to fight the strongest creature in Teavra. What do you choose?`,
        options:[
            {
                text: 'Give Potion',
                nextText: 131
            },
            {
                text: 'Ignore',
                nextText: 132
            },
            {
                text: 'Say No',
                nextText: 133
            }
        ]
    },
    {
        id: 31,
        text: 'You decide to give one of your healing potions to the elf. \n \n Elf: Thank you! Thank you kind stranger! As a token of my gratitude, please let me show you a shortcut out of the forest! It takes you right to our castle and I am sure the other elves would love to express their gratitude to you as well!',
        options: [
            {
                text: 'Follow the elf',
                nextText: 34
            }
        ]
    },
    {
        id: 32,
        text: 'Elf: Stranger! Stranger please help! Ah. I see how it is. You don’t want to help an ailing elf. It would be a shame if you were to be put into the same situation as me… Perhaps I can make that happen. Prepare to fight stranger!',
        options: [
            {
                text: 'Start combat',
                nextText: 193
            }
        ]
    },
    {
        id: 33,
        text: 'Elf: Do not fret stranger! I understand! Healing potions are quite hard to come by and with how Teavra is these days I understand your want to keep those potions to yourself. I hope you find your way out of the woods unscathed!',
        options: [
            {
                text: 'Continue further into the forest',
                nextText: 35
            }
        ]
    },
    {
        id: 34,
        text: 'The now healed elf leads you out of the forest and to the castle in which him and all the other elves live! As you two get back to the castle, you are met with loud cheers and excitement. Excitement that seems a little bit over-the-top for just a normal elf. You question this reaction from the other elves. The king and queen elves approach you. ',
        options: [
            {
                text: '...',
                nextText: 36
            }
        ]
    },
    {
        id: 35,
        text: `You finally make it out of the forest after what seems like a very long and confusing trek. You exit out of the forest into an open field. Sitting in the middle of the field is a ${randomEnemyName}. The ${randomEnemyName} spots you. Quick! Get ready to fight!`,
        options: [{
                text: 'Start Combat',
                nextText: 192
            }
        ]
    },
    {
        id: 36,
        text: `Queen Elf: Hello, I am Queen Elivia! Thank you kind stranger for saving my son! What can we ever do to repay you for your selfless deed! Here take these enchanted weapons as a token of our appreciation! Would you like a bed to sleep in for the night? \n\n Voice: Oh no, you must not waste another minute straying away from the task at hand! Tell them that you must be going! \n\n You: I am so sorry Queen Elivia, but I must be going. I am on a very important mission! \n\n Queen Elivia: No worries my dear! May we point you in the way of a potion maker down the road, I'm sure he will be able to help you in your journey!`,
        options:[
            {
                text: 'Thank you Queen Elivia! I will follow your advice',
                nextText: 165
            }
        ]
    },
    {
        id: 37,
        text: ` Night is setting in and from this field you can see two paths. One leads to a mysterious light. Could it be another village? A travelers camp? No matter what it is, you hope that it leads to some sort of help. The other leads to what appears to be a giant tower. Could it be the ogre’s tower? Which option do you choose?`,
        options: [{
                text: 'Follow the light',
                nextText: 38
            },
            {
                text: 'Go towards the tower',
                nextText: 39
            }
        ]
    },
    {
        id: 38,
        text: `You decide to walk towards the mysterious light and as you get closer and closer, there does not seem to be any type of village or camp. Instead you find it is just an unattended fire. As you walk closer the ground breaks from under you! You end up falling into a trap set by the ogres! This does not look good….`,
        options: [{
                text: '...',
                nextText: 96
            }
        ]
    },
    {
        id: 39,
        text: `You decide to walk towards the mysterious tower and as you get closer you are finding no traces of ogres. This relieves you. As you think about who else could live in a tower like this you remember hearing about mage towers when you were younger. Could it be? Perhaps this tower is friendly after all! However, you do not want to let down your guard too early. As you approach the front door you must make a decision. Do you want to just go straight through the front door, or try to sneak in through a different door off to the side? `,
        options: [
            {
                text: 'Go through the front door',
                nextText: 140
            },
            {
                text: 'Sneak in the side door',
                nextText: 141
            }
        ]
    },
    {
        id: 40,
        text: `You decide to walk through the front door. Prepared to meet whatever creature lays waiting on the other side. You open the door and find a large beast staring at you. It lunges towards you and you prepare for a battle.`,
        options: [
            {
                text: 'Start combat',
                nextText: 191
            },
        ]
    },
    {
        id: 41,
        text: `You begin to slowly creep towards the side door. Slowly creaking the door open hoping to not make any sounds that alert what enemies could be hiding throughout the tower... You open the door only to find a large beast staring right at you. Looks like you won’t get into this tower that easy.`,
        options: [
            {
                text: 'Start combat',
                nextText: 191
            },
        ]
    },
    {
        id: 42,
        text: `You begin to slowly creep towards the side door. Slowly creaking the door open hoping to not make any sounds that alert what enemies could be hiding throughout the tower... You slowly open the door and see no enemies in sight. You find that your suspicion was correct and this tower does in fact belong to the Mage! You quickly run up the stairs to the next floor.`,
        options: [
            {
                text: '...',
                nextText: 43
            },
        ]
    },
    {
        id: 43,
        text: `As you climb the stairs to the next floor, you take note of what looks to be a library off to the left and a storage room off to the right. You also notice that there is another large set of stairs that leads you up to the very top of the tower. You begin to think of where you should go next. Could the library help you learn more information on ogres? The storage room could surely offer you some good items to add to your inventory right? And up those stairs, you know you would be met by the head wizard. Could they help you with your journey?`,
        options: [
            {
                text: '...',
                nextText: 44
            },
        ]
    },
    {
        id: 44,
        text: `Which option do you choose?`,
        options: [
            {
                text: 'Storage Room',
                nextText: 145
            },
            {
                text: 'Library',
                nextText: 46
            },
            {
                text: 'Up the Stairs',
                nextText: 47
            },
        ]
    },
    {
        id: 45,
        text: `You decide to enter the storage room and find that the items store away are guarded by a(n) ${randomEnemyName}. In order to get to the items stored away, you must fight the ${randomEnemyName}`,
        options: [
            {
                text: 'Start Combat',
                nextText: 190
            },
        ]
    },
    {
        id: 46,
        text: `You decide to head to the library. As you enter the library you are met with a plethora of books on varying topics. But three books in particular catch your eye. Their titles are “Fighting for Dummies”, “All About Ogres”, and “Diary of A Wimpy Soldier”. As you are debating on which book to read first you hear something approaching you from behind. You only have time to grab one book. Which do you grab?`,
        options: [
            {
                text: 'Fighting for Dummies',
                nextText: 148
            },
            {
                text: 'All About Ogres',
                nextText: 149
            },
            {
                text: 'Diary of A Wimpy Soldier',
                nextText: 50
            },
        ]
    },
    {
        id: 47,
        text: `You decide to head up the stairs to meet with the head wizard. As you reach the top of the stairs, the wizard is there waiting for you. As if they had been waiting for you this entire time. \n \n Wizard: Ah hello ${currentPlayer.getName()}. I have been expecting you. But I must say, I feel as if there is a dark cloud surrounding you. I don’t quite understand why I have this feeling, but I fear there is something bad waiting for you in the future.`,
        options: [
            {
                text: '...',
                nextText: 51
            },
        ]
    },
    {
        id: 48,
        text: `You decide to grab “Fighting for Dummies”. This book gives you plenty of information regarding different fighting techniques and strategies. The knowledge in this book increases your overall strength in battles!`,
        options: [
            {
                text: 'Go back',
                nextText: 133
            },
        ]
    },
    {
        id: 49,
        text: `You decide to grab “All About Ogres”. This book gives you information on the best ways to fight off an ogre and win! The knowledge you learn increases your strength when you are fighting ogres!`,
        options: [
            {
                text: 'Go back',
                nextText: 133
            },
        ]
    },
    {
        id: 50,
        text: `You decide to grab “Diary of a Wimpy Soldier”. You remember this book from when you were a kid! As you reread the old book you notice a lot of similarites between you and the main character... too bad the main character dies at the end of the book!`,
        options: [
            {
                text: 'Go back',
                nextText: 133
            },
        ]
    },
    {
        id: 51,
        text: `Narrator: Can you believe this guy? Who do they think they are! Do not worry ${currentPlayer.getName()}. I would tell you if I saw something bad waiting for you in the future. I think this guy is bad news. Maybe you should just kill him and we can ransack his room for information on the ogres. \n\n What do you choose?`,
        options: [
            {
                text: 'Talk to the Wizard',
                nextText: 52
            },
            {
                text: 'Fight the Wizard',
                nextText: 153
            }
        ]
    },
    {
        id: 52,
        text: `You disregard the advice of the mysterious voice and sit down to have a conversation with the wizard. \n\n You: Mr. Wizard, I've been tasked with killing the strongest being in Teavra. Now we all know that is the ogre, Malikai. But I have no idea how to stop him. Do you have any suggestions? \n\n Wizard: Ah yes! I do have some help for you, but I must warn you I believe there might be something stronger than just Malikai out there. \n\n Voice: *Scoff* What does this guy know, he is a frail old wizard. Everything out there is scary and strong to him \n\n Wizard: But, to help you with your quest to kill Malikai. Here are some potions to help you out. They are super potions, so make sure not to misuse them! They will be very helpful when the time comes! Also, I must suggest getting some new weaponry. There is a blacksmith down the road who will be able to fashion you some great weaponry!`,
        options:[{
            text: 'Thank you kind Wizard! I will see my way out and get on my way to the blacksmith!',
            nextText: 154
        }]
    },
    {
        id: 53,
        text: 'You follow the advice of the mysterious voice and attack the wizard. Hopefully you are ready for the fight!',
        options:[
            {
                text: "Start Combat",
                nextText: 189
            }
        ]
    },
    {
        id: 54,
        text: `You leave the Mage Tower and begin walking towards the blacksmith. The sun is starting to rise as you approach the blacksmith's door. Right as you are about to knock, the door swings open! \n\n Blacksmith: Ah ${currentPlayer.getName()}, I have been waiting for you! Please come in!`,
        options:[
            {
            text: `Enter the blacksmith's`,
            nextText: 55
            }
        ]
    },
    {
        id: 55,
        text: `You: Did the wizard tell you I was coming? \n\n "Blacksmith: Of course he did young soldier! Here, have your pick of one of the three strongest weapons I have to offer!`,
        options:[
            {
                text: 'Strong Sword',
                nextText: 156
            },
            {
                text: 'Strong Staff',
                nextText: 157
            },
            {
                text: 'Strong Bow & Arrow',
                nextText: 158
            }
        ]
    },
    {
        id: 56,
        text: `Blacksmith: Ah, the Sword. Good choice! Before you go, I must give you one piece of advice. Your weapons are only as strong as the person who is weilding them. Embrace your strength. \n\n Voice: Howwwwwwwwww inspirational. Let's get out of here before I have to listen to another thing this blacksmith says.`,
        options:[
            {
                text: 'Thank the Blacksmith & Leave',
                nextText: 59
            }
        ]
    },
    {
        id: 57,
        text: `Blacksmith: Ah, the Staff. Good choice! Before you go, I must give you one piece of advice. Your weapons are only as strong as the person who is weilding them. Embrace your strength. \n\n Voice: Howwwwwwwwww inspirational. Let's get out of here before I have to listen to another thing this blacksmith says.`,
        options:[
            {
                text: 'Thank the Blacksmith & Leave',
                nextText: 59
            }
        ]
    },
    {
        id: 58,
        text: `Blacksmith: Ah, the Bow & Arrow. Good choice! Before you go, I must give you one piece of advice. Your weapons are only as strong as the person who is weilding them. Embrace your strength. \n\n Voice: Howwwwwwwwww inspirational. Let's get out of here before I have to listen to another thing this blacksmith says.`,
        options:[
            {
                text: 'Thank the Blacksmith & Leave',
                nextText: 59
            }
        ]
    },
    {
        id: 59,
        text: `Voice: I think it is time for you to finally fight Malikai. Head just over that hill over there and you will find yourself at the ogre's base camp. `,
        options:[
            {
                text: 'Head over the hill',
                nextText: 60
            }
        ]
    },
    {
        id: 60,
        text: `Just as you get to the camp you have an idea! You see Malikai off in the distance and notice that he is standing right at the edge of a lush forest. Perhaps you can sneak through the forest and attack him from behind. Else, you could prove your strength to the mysterious voice and run into the camp ready to fight. Which will it be?`,
        options:[
            {
                text: 'Sneak Attack',
                nextText: 161
            },
            {
                text: 'Run in & Attack',
                nextText: 188
            }
        ]
    },
    {
        id: 61,
        text: `Your sneak attempt succeeded, now you should be able to get a good first strike!`,
        options:[
            {
                text: 'Start Combat',
                nextText: 188
            }
        ]
    },
    {
        id: 62,
        text: `You: IT WAS YOU WASN'T IT! \n\n Suddenly a ghostly figure appears before you. \n\n Figure: Of course it was me. It took years for me to finally get into all of the minds of the ogres, and I was ready to make the land of Teavra MINE! But, after the battle between your kind and the ogres, I could sense my army starting to resist more and more. My grasp on them was not as strong as it once was. I thought I was going to lose everything. But then I met you, when you so wimply collapsed at the beginning of the battle, I knew I could build you up into whatever I needed you to become, and you would not hate me for it. You would praise me for it! So, what do you think, should we make Teavra ours?`,
        options:[
            {
                text: 'Fight the voice!',
                nextText: 163
            },
            {
                text: 'Agree with the voice',
                nextText: 64
            }
        ]
    },
    {
        id: 63,
        text: `After you successfully had killed the voice. You noticed all of the ogres and other once peaceful creatures around you to lose their hostile nature. Eventually, Teavra went back to how the country once was, living in complete harmony. The end. Would you like to play again?`,
        options:[{
            text: 'Restart game',
            nextText: -1
        }]
    },
    {
        id: 64,
        text: `You agree with the voice, and together you begin your powertrip to take over the country. However, soon you begin to feel as though your strength is depleting. You come to find out that the longer the voice stayed connected to you, the more and more of your strength was transferred to him. You become too weak to continue, but your mysterious counterpart becomes strong enough to apparate into a fully human body. He leaves you alone to die, as he had planned to do all along. As you take your last few breaths, you ponder if you had made the right choice, or if this is karma's cruel way of getting back at you for your greedy decision. The end. Would you like to play again?`,
        options:[{
            text: 'Restart game',
            nextText: -1
        }]
    },
    {
        id: 65,
        text: `You leave the Elf Castle and begin walking towards the potion master. The sun is starting to rise as you approach the potion master's door. Right as you are about to knock, the door swings open! \n\n Potion Master: Ah ${currentPlayer.getName()}, I have been waiting for you! Please come in!`,
        options:[
            {
            text: `Enter the Potion Master's`,
            nextText: 66
            }
        ]
    },
    {
        id: 66,
        text: `You: Did the elf queen tell you I was coming? \n\n "Potion Master: Of course she did young soldier! Here, have your pick of one of the three strongest potions I have to offer!`,
        options:[
            {
                text: 'Super Healing',
                nextText: 167
            },
            {
                text: 'Super Mana',
                nextText: 168
            },
            {
                text: 'Super Strength',
                nextText: 169
            }
        ]
    },
    {
        id: 67,
        text: `Potion Master: Ah, Super Healing. Good choice! Before you go, I must give you one piece of advice. Even the strongest of warriors still need to use potions, do not let the use of potions make you feel weaker than others. Embrace your strength. \n\n Voice: Howwwwwwwwww inspirational. Let's get out of here before I have to listen to another thing this potion brewer says.`,
        options:[
            {
                text: 'Thank the Potion Master & Leave',
                nextText: 59
            }
        ]
    },
    {
        id: 68,
        text: `Potion Master: Ah, Super Mana. Good choice! Before you go, I must give you one piece of advice. Even the strongest of warriors still need to use potions, do not let the use of potions make you feel weaker than others. Embrace your strength. \n\n Voice: Howwwwwwwwww inspirational. Let's get out of here before I have to listen to another thing this potion brewer says.`,
        options:[
            {
                text: 'Thank the Potion Master & Leave',
                nextText: 59
            }
        ]
    },
    {
        id: 69,
        text: `Potion Master: Ah, Super Strength. Good choice! Before you go, I must give you one piece of advice. Even the strongest of warriors still need to use potions, do not let the use of potions make you feel weaker than others. Embrace your strength.\n\n Voice: Howwwwwwwwww inspirational. Let's get out of here before I have to listen to another thing this potion brewer says.`,
        options:[
            {
                text: 'Thank the Potion Master & Leave',
                nextText: 59
            }
        ]
    },
    {
        id: 87,
        text:  `You were unable to successfully sneak up on Malikai. Get ready to fight!`,
        options:[{
            text: 'Start Combat',
            nextText: 188
        }]
    },
    {
        id: 88,
        text: `You have successfully killed Malikai! But, as Malikai lays there, you hear him mutter some final words. \n\n Malikai: Thank... you... I... am... finally rid... of this... awful voice... \n\n Suddenly, you realize something. You remember on the battlefield the day those ogres attacked. Right before they began their first move, they hesitated as if they did not want to take part in what they were about to do. Something clicks in your head. The orges were led by a voice. The voice Malikai was talking abbout. The voice that is currently in your own head.`,
        options:[
            {
                text: 'Confront the voice',
                nextText: 62
            }
        ]
    },
    {
        id: 89,
        text: `You have successfully fight off the Wizard. \n\n Voice: Congrats! Look at you getting stronger and stronger each battle! Now you are almost ready to fight Malikai. \n\n You look around the room and find a few healing, strength, & mana potions. As you are heading towards the door, you see a letter addressed to a blacksmith, maybe you should go there next! You begin your trek to find this blacksmith!`,
        options: [{
                text: '...',
                nextText: 154
            }
        ]
    },
    {
        id: 90,
        text: `You have successfully beaten the ${randomEnemyName}! You have collected various items from the storage room! Now what would you like to do?`,
        options: [{
                text: 'Library',
                nextText: 46
            },
            {
                text: 'Up the Stairs',
                nextText: 47
            }
        ]
    },
    {
        id: 91,
        text: `Congrats! You have successfully protected yourself against the large beast! You see a set of stairs in front of you. Hurry up before another beast comes to finish you off!`,
        options: [{
                text: '...',
                nextText: 43
            }
        ]
    },    {
        id: 92,
        text: `Congrats! You have slayed the ${randomEnemyName}`,
        options: [{
                text: '...',
                nextText: 37
            }
        ]
    },    {
        id: 93,
        text: `Congrats! You have beaten the elf! \n\n Voice: Finally you are starting to listen to me! That lowly elf was not worth your saving! Let's continue through the forest!`,
        options: [{
                text: '...',
                nextText: 35
            }
        ]
    },    {
        id: 94,
        text: `Congrats! You have beaten the ${randomEnemyName}`,
        options: [{
                text: '...',
                nextText: 29
            }
        ]
    },
     {
        id: 95,
        text: `You have successfully beating the ogre! \n\n Voice: Wow, I did not think you had that in you. I was expecting you to die within seconds. Well, let's keep moving I guess.`,
        options: [{
                text: '...',
                nextText: 29
            }
        ]
    },
    {
        id: 96,
        text: `Turns out the light you were walking towards led you straight into a trap by the ogres. You have died. Try again?`,
        options: [{
                text: '...',
                nextText: 96
            }
        ]
    },
    {
        id: 97,
        text: 'You do not have a healing potion. Please pick a different option!',
        options: [
            {
                text: 'Say no',
                nextText: 133
            },
            {
                text: 'Ignore',
                nextText: 132
            }
        ]
    },
    {
        id: 98,
        text: `You have died in battle. Try Again?`,
        options: [
            {
                text: 'Restart Game',
                nextText: -1
            },
        ]
    },
    {
        id: 99,
        text: `The mysterious voice was not happy with you refusing to tell him your real name. He left you alone to die on the battlefield. Try Again?`,
        options: [
            {
                text: 'Restart Game',
                nextText: -1
            },
        ]
    },


]

game()
