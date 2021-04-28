const startButton = document.getElementById('startButton')
const titleScreen = document.getElementById('titleScreen')
const nameContainer = document.getElementById('nameContainer')
const namePrompt = document.getElementById('namePrompt')


var playerName;

function startGame() {
    startButton.remove()

    input = document.createElement('input');
    input.setAttribute("type", "text")
    input.setAttribute("id", "nameBox")
    nameContainer.append(input)

    namePrompt.style.display ="block"
    nameContainer.style.display = "flex"



    confirmBtn = document.createElement("button")
    confirmBtn.setAttribute("type", "button")
    confirmBtn.setAttribute("id", "confirmBtn")
    confirmBtn.innerText = "Confirm"
    nameContainer.append(confirmBtn)

    //this has to be here because its dynamically added
    document.getElementById("confirmBtn").onclick = hideTitle

}


function hideTitle() {
    playerName = document.getElementById("nameBox").value;
    titleScreen.style.display = "none";
    //add animations
    //console.log(playerName); //replace playername with this
    localStorage.setItem("playerName", playerName);
    document.getElementById('hudTitle').innerHTML = playerName;

    game()
}


startButton.onclick = startGame
