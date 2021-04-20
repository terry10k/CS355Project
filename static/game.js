const textElement = document.getElementById('prompt')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

//This is the spot where we will hold the weapon that is currently being used: set at default right now
let defaultWeapon = new weapon("none", "none",  0, "none", false, 0);
let userWeapon = defaultWeapon;
let sword = new weapon("sword", "weapon", 10, "sword", false, 0);
let staff = new weapon("staff", "weapon", 10, "staff", true, 1);
let bowArrow = new weapon("bow & arrow", "weapon", 10, "bow & arrow", false, 0);



function game() {
    state = {}
    currentPlayer = new Player(playerName)

    showTextNode(1)

}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('button')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
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
    }
    showTextNode(nextTextNodeId);
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
        //this doesn't work for some reason have to change it later
        text: document.getElementById('hudTitle').textContent + `? Figured a weakling like you would have a name like that. Now let’s get this mission over with. Where do you think we should go first?`,
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
                text: 'Go towards village',
                nextText: 11
            },
            {
                text: 'Follow the ogre tracks',
                nextText: 12
            },
            {
                text: 'Explore the army camp',
                nextText: 13
            },
        ]
    },
    {
        id: 9,
        text: `You have chosen the staff. A ways down the road there seems to be what is left of a village. You wonder if there is a possibility that there are still inhabitants. Next to you is the base of your army. Is there possibly any supplies still lying around? Finally you notice what looks like orge tracks leading into the middle of the forest. Those will surely lead you to where you need to go, but do you dare follow them? Which option do you choose?`,
        options: [
            {
                text: 'Go towards village',
                nextText: 11
            },
            {
                text: 'Follow the ogre tracks',
                nextText: 12
            },
            {
                text: 'Explore the army camp',
                nextText: 13
            },
        ]
    },
    {
        id: 10,
        text: `You have chosen the bow & arrow. A ways down the road there seems to be what is left of a village. You wonder if there is a possibility that there are still inhabitants. Next to you is the base of your army. Is there possibly any supplies still lying around? Finally you notice what looks like orge tracks leading into the middle of the forest. Those will surely lead you to where you need to go, but do you dare follow them? Which option do you choose?`,
        options: [
            {
                text: 'Go towards village',
                nextText: 11
            },
            {
                text: 'Follow the ogre tracks',
                nextText: 12
            },
            {
                text: 'Explore the army camp',
                nextText: 13
            },
        ]
    },
    {
        id: 11,
        text: `You come upon a poor and desolate village. Buildings are abandoned and only a few villagers still remain. One approaches you...`,
        options: [
            {
                text: '...',
                nextText: 14
            },
        ]
    },
    {
        id: 12,
        text: `As you start your journey following the ogre tracks.. You get a sudden uneasy feeling. You look up and oh no! There’s an ogre straight ahead of you! It has not spotted you yet. So you still might be able to sneak past it! `,
        options: [
            {
                text: '...',
                nextText: 15
            },
        ]
    },
    {
        id: 13,
        text: `You enter the tent of your base and find upgraded weapons and a couple of potions. But before you can grab anything… you hear a growl coming from behind you. You turn around to see a wolf behind you. Quick! Fight it off!`,
        options: [
            {
                text: 'Start Combat',
                nextText: 116
            },
        ]
    },
    {
        id: 14,
        text: `Villager: Oh my! Were you fighting in that battle against the ogres? We were under the impression that everyone in our army had perished. How did you survive? \n Narrator: What do you think they are going to think when you tell them the truth of what happened on that battlefield. You will be the laughingstock of what is left of this village. Do you really think telling the truth is a good idea?`,
        options: [
            {
                text: 'Tell the truth',
                nextText: 117
            },
            {
                text: 'Lie',
                nextText: 118
            },
        ]
    },
    {
        id: 15,
        text: 'Which do you choose?',
        options:[
            {
                text: 'Sneak',
                nextText: 119
            },
            {
                text: 'Fight',
                nextText: 120
            }
        ]
    },
    {
        id: 16,
        text: 'Combat - to be continued',
        nextText: -1
    },
    {
        id: 17,
        text: 'truth chance - to be continued',
        nextText: -1
    },
    {
        id: 18,
        text: 'lie chance - to be continued',
        nextText: -1
    },
    {
        id: 19,
        text: 'sneak chance - to be continued',
        nextText: -1
    },
    {
        id: 20,
        text: 'combat - to be continued',
        nextText: -1
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

