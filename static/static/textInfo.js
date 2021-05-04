let currentPlayer = new player("none", 100, 100, [], 30);

//This is the spot where we will hold the weapon that is currently being used: set at default right now
let defaultWeapon = new weapon("none", "none",  0, "none", false, 0);
let userWeapon = defaultWeapon;
let sword = new weapon("sword", "weapon", 10, "sword", false, 0);
let staff = new weapon("staff", "weapon", 10, "staff", true, 1);
let bowArrow = new weapon("bow & arrow", "weapon", 10, "bow & arrow", false, 0);
let club = new weapon("club", "weapon", 15, "club", false, 0);
let teeth = new weapon("teeth", "weapon", 5, "teeth", false, 0);
let upgradedSword = new weapon("Level 2 sword", "weapon", 20, "sword", false, 0);
let upgradedBowArrow = new weapon("Level 2 bow & arrow", "weapon", 20, "bow & arrow", false, 0);

let healingPotion = new potions("healing potion", "potion", "healing", 0, true, (player.maxHP - player.currentHP), false, 0);
//Creating Areas
let battlefield = new area("Battlefield", 1, 0, false, false, false, [1,2,3], 0, false);
let village = new area("Village", 12, 1, false, true, false, [0,5], 0, false);
let ogreTracks = new area("Ogre Tracks End", 13, 2, true, false, false, [0,4], 100, false);
let armyCamp = new area("Army Camp", 14, 3, false, false, true, [0], 50, false);
let middleForest = new area("Middle of Forest", "You continue your trek through the forest, sometimes it seems like there is no way out. Do you continue? Or do you turn around?", 4, false, false, false, [2,5], 0, false);
let deepForest = new area("Deep in the Forest", "As you get further and further into the forest. Soon you start hearing what sounds to be faint yelling. You begin running towards the noise in hopes that the screams could be from another soldier who is still alive. The screams lead you to an elf that looks like he could use some help.", 5, false, true, false, [1,4], 0, false);
let elfCastle = new area("Elf Castle", "The now healed elf leads you out of the forest and to the castle in which him and all the other elves live! As you two get back to the castle, you are met with loud cheers and excitement. Excitement that seems a little bit over-the-top for just a normal elf. You question this reaction from the other elves. The king and queen elves approach you.", 6, false, true, false, [5], 0, false);
let openField = new area("Open Field", "You finally make it out of the forest after what seems like a very long and confusing trek. You exit out of the forest into an open field.", 7, false, false, false, [5,8,9], 95, false);
let mysteriousLight = new area("Orge Trap", "You decide to walk towards the mysterious light and as you get closer and closer, there does not seem to be any type of village or camp. Instead you find it is just an unattended fire. As you walk closer the ground breaks from under you! You end up falling into a trap set by the ogres! This does not look good….", 8, false, false, false, 7, 0, false);
let mageTower = new area("Mage Tower", "You decide to walk towards the mysterious tower and as you get closer you are finding no traces of ogres. This relieves you. As you think about who else could live in a tower like this you remember hearing about mage towers when you were younger. Could it be? Perhaps this tower is friendly after all!", 9, false, false, false, [7,10], 0, false);
let insideTower = new area("Inside the Tower", "As you climb the stairs to the next floor, you take note of what looks to be a library off to the left and a storage room off to the right. You also notice that there is another large set of stairs that leads you up to the very top of the tower. You begin to think of where you should go next.", 10, false, false, false, [9,11,12,13], 0, false);
let library = new area("Library", "You decide to head to the library. As you enter the library you are met with a plethora of books on letying topics. But three books in particular catch your eye.", 11, false, false, true, [10], 45, false);
let upTheStairs = new area("Wizard's Office", "You decide to head up the stairs to meet with the head wizard. As you reach the top of the stairs, the wizard is there waiting for you. As if they had been waiting for you this entire time.", 12, false, true, false, [10], 0, false);
let storageRoom = new area("Storage Room", "You decide to enter the storage room and find that the items store away are guarded by a(n) {ENEMY TYPE}. In order to get to the items stored away, you must fight the {ENEMY TYPE}", 13, true, false, false, [10], 100, false);

//Create enemies
let ogre = new enemy('ogre', 50, club, 10, true, [], 1, false);
let wolf = new enemy('wolf', 25, teeth, 2, false, [], 2, false);

//Create NPC
let villager = new npc("villager", " Oh my! Were you fighting in that battle against the ogres? We were under the impression that everyone in our army had perished. How did you survive? ", "none", [], true, true, [], false);
let elfPrince = new npc("elf prince", "Help! Please Help! Could you please help me? I have injured myself from a wolf attack and I am in need of a healing potion. Could you please spare me one?", "healing potion", [], false, false, [], true);
let elfQueen = new npc("elf queen", "Thank you kind stranger for saving my son! What can we ever do to repay you for your selfless deed!", "none", [], true, false, [], false);
let wizard = new npc("wizard", "Ah hello {CHARACTER NAME}. I have been expecting you. But I must say, I feel as if there is a dark cloud surrounding you. I don’t quite understand why I have this feeling, but I fear there is something bad waiting for you in the future.", "none", [], true, false, [], true);

let state = {};

function game(){
    state = {}
    player.inventory = [];
    battlefield.displayInfo(battlefield.description);
    battlefield.isVisted = true;

}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    /**if(textNodeIndex == 117){
        var truthChance = Math.random();
        if(truthChance <= 0.75){
            textNode.text = 'You: I actually don’t remember the fight at all. I was knocked out at the beginning of the fight from getting hit by a rock that was thrown. I really wish I could have fought for our safety. I apologize for letting our people down. It will haunt me forever. \n Villager: Please do not feel bad young soldier, I can sense in you a great strength hidden within. I sense that you would have done great things in that battle had you had not have gotten struck so early. Please, take these in order to get back to full health and to prepare for your journey ahead! \n The villager empathizes with you. They have given you a health potion.';
            currentPlayer.addItem(healingPotion);
        }else{
            textNode.text = "You: I actually don’t remember the fight at all. I was knocked out at the beginning of the fight from getting hit by a rock that was thrown. I really wish I could have fought for our safety. I apologize for letting our people down. It will haunt me forever. \n Villager:  *Scoff* And you dare come into our village after such a poor show out on the field. You should be ashamed for how you fought in that battle. If I were you I wouldn’t bother to show my face around here. I think it is best for you to leave. Goodbye."
        }
    }else if(textNodeIndex == 118){
        var lieChance = Math.random();
        if(lieChance <= 0.25){
            textNode.text = "You: Well, I fought very valiantly. I was slaying ogres left and right alongside my fellow soldiers. However, the ogre attacks became too much for my body to handle and I was left too weak to continue to fight, despite my very best efforts. /n Villager: Oh my, you are a hero! We must reward you for your efforts! On behalf of myself and the other villagers, we would like to give you this gift! /n Your lie attempt has succeeded! The residents of the village have given you a healing potion."
            currentPlayer.addItem(healingPotion);
        }else{
            textNode.text = "You: Well, I fought very valiantly. I was slaying ogres left and right alongside my fellow soldiers. However, the ogre attacks became too much for my body to handle and I was left too weak to continue to fight, despite my very best efforts. /n Villager: While you do look awfully rough, if I remember right, some villagers went out to the battlegrounds after the ogres had left, and there were no ogre bodies in sight. How could you have been killing multiple, but no bodies were found? You are not being truthful. I refuse to communicate with liars. Goodbye. /n Your lie attempt has failed" 
        }
    }*/
    console.log(textNode.text);
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
    if(nextTextNodeId <= 0){
        return game();
    }
    state = Object.assign(state, option.setState);
    if(option.nextText > 107 && option.nextText < 111){
        let weaponChoice = option.text;
        if(weaponChoice === "Sword"){
            userWeapon = sword;
        }else if(weaponChoice === "Staff"){
            userWeapon = staff;
        }else {
            userWeapon = bowArrow;
        }
        showTextNode(nextTextNodeId);
    }else if(option.nextText == 112 || option.nextText == 113 || option.nextText == 114){
        console.log(option.nextText);
        if(option.nextText == 112){
            village.displayInfo(village.description);
            village.isVisted = true;
        }else if(option.nextText === 113){
            ogreTracks.displayInfo(ogreTracks.description);
            ogreTracks.isVisted = true;
        }else if(option.nextText === 114 && !armyCamp.isVisted){
            armyCamp.calculateEnemySpawn(armyCamp.enemySpawnChance);
            console.log(armyCamp.hasEnemyInteractions);
            if(!armyCamp.hasEnemyInteractions){
                console.log("yes");
                armyCamp.setDescription(22);
            }
            armyCamp.displayInfo(armyCamp.description);
            armyCamp.isVisted = true;
        }else if(option.nextText == 114 && armyCamp.isVisted){
            showTextNode(11);
        }else if(option.nextText == 111){
            currentPlayer.addItem(upgradedSword);
            currentPlayer.addItem(upgradedBowArrow);
            currentPlayer.addItem(healingPotion);
            currentPlayer.displayInventory(currentPlayer.inventory);
        }
    }else{
        showTextNode(nextTextNodeId);
    }
}

var value = localStorage.getItem("playerName");
currentPlayer.setName(value);

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
        text: ' Look at you, maybe you aren’t as dumb as I think you are. Yes, you must kill the ogre leader {NAME}. Which I find to be quite a hard task for you considering how weak of a human you are. But, now that you have asked who I am. I must ask the same of you. Who are you?',
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
        text: `As you start your journey following the ogre tracks.. You get a sudden uneasy feeling. You look up and oh no! There’s an ogre straight ahead of you! It has not spotted you yet. So you still might be able to sneak past it! `,
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
                nextText: 121
            }
        ]
    },
    {
        id: 17,
        text: 'Combat - to be continued',
        nextText: -1
    },
    {
        id: 18,
        text: 'truth chance - to be continued',
        nextText: -1
    },
    {
        id: 19,
        text: 'lie chance - to be continued',
        nextText: -1
    },
    {
        id: 20,
        text: 'sneak chance - to be continued',
        nextText: -1
    },
    {
        id: 21,
        text: 'combat - to be continued',
        nextText: -1
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