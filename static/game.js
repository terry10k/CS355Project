const textElement = document.getElementById('prompt')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function game() {
    state = {}
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

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return game()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    { id: 1,
      text: "Hey, you. You're finally awake.",
      options: [
          {
              text: "...",
              nextText: 2
          }
      ]


    },

    {
        id: 2,
        text: 'You were trying to cross the border, right? Walked right into that Imperial ambush, same as us, and that thief over there.',
        options: [
            {
                text: 'Stay silent',
                nextText: 3
            }
        ]
    },

    {
        id: 3,
        text: "Damn you Stormcloaks. Skyrim was fine until you came along. Empire was nice and lazy. If they hadn't been looking for you, I could've stolen that horse and be halfway to Hammerfell. You there. You and me - we shouldn't be here. It's these Stormcloaks the Empire wants.",
        options: [
            {
                text: 'Stay silent',
                nextText: 4
            }
        ]
    },

    {
        id: 4,
        text: "We're all brothers and sisters in binds now, thief.",
        options: [
            {
                text: 'Stay silent',
                nextText: 5
            }
        ]
    },

    {
        id: 5,
        text: "And what's wrong with him, huh?",
        options: [
            {
                text: 'Stay silent',
                nextText: 6
            }
        ]
    },

    {
        id: 6,
        text: "Watch your tongue. You're speaking to Ulfric Stormcloak, the true High King.",
        options: [
            {
                text: 'Stay silent',
                nextText: 7
            }
        ]
    },

    {
        id: 7,
        text: "Ulfric? The Jarl of Windhelm? You're the leader of the rebellion. But if they've captured you... Oh gods, where are they taking us?",
        options: [
            {
                text: 'Stay silent',
                nextText: 8
            }
        ]
    },

    {
        id: 8,
        text: " I don't know where we're going, but Sovngarde awaits.",
        options: [
            {
                text: 'Stay silent',
                nextText: 9
            }
        ]
    },

]

game()