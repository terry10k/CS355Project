const adjectives = ["Eldritch", "Vile", "Vicious", "Seething"];

//

function combat(player, enemy, previousArea, nextArea, endScreen){
    $(".prompt").animate({height: '-=100%'}, 2500);
    $(".combatContainer").animate({height: '+=100%'}, 2500);

    $('#combatAttack').prop('disabled', false);
    $('#combatRun').prop('disabled', false);
    $("#combatEnemy").empty()
    var pic = '<img src="../assets/hell-hound-idle.gif", alt="wolfIdle" />';
    $("#combatEnemy").append(pic);



    battle(player, enemy, previousArea, nextArea, endScreen)
}

function battle(player, enemy, previousArea, nextArea, endScreen) {
    var enemyMaxHP = enemy.getHealth();
    console.log(enemy)

    $("#enemyContainer").css("display", "flex");
    $("#combatMenu").css("display", "flex");
    updateEnemyStats(enemy, enemyMaxHP);
    var prefix = adjectives[Math.floor(Math.random() * adjectives.length)];
    $("#combatPrompt").text(`A ${prefix} ${enemy.getName()} prepares to attack you`);

    var turn = 0;

    $("#combatAttack").click(function() {
        turn = attackEnemy(enemy, enemyMaxHP, turn, player, nextArea)
        $('#combatAttack').prop('disabled', true);
        $('#combatRun').prop('disabled', true);

    });

    $("#combatRun").click(function () {

        var probability = Math.random() * 100;
        if (probability > 35) {
            endCombat("run", previousArea);
        }
        else attackPlayer(player,enemy, endScreen)
    });

}

function attackEnemy(enemy, enemyMaxHP, turn, player, nextArea){
    enemy.setHealth(enemy.getHealth() - player.getCurrentAttack());
    $("#combatPrompt").text(`You attacked ${enemy.getName()}, dealing ${player.getCurrentAttack().toFixed()} damage.`);
    updateEnemyStats(enemy,enemyMaxHP);
    if (enemy.getHealth() <= 0) {
        enemy.setDeathStatus(true);
        endCombat("win", nextArea); //won
    }
    else {
        setTimeout(function () {
            attackPlayer(player, enemy, nextArea);
        }, 1000);
    }


}

function updateEnemyStats(enemy, enemyMaxHP) {
    $("#enemyStats").text(`${enemy.getName()}  Health: ${enemy.getHealth()}/${enemyMaxHP}`)
}

function attackPlayer(player, enemy, endScreen) {
    player.setCurrentHP(player.getCurrentHP() - enemy.getAttackStrength());
    $("#combatPrompt").text(`${enemy.getName()} attacked ${player.getName()}, dealing ${enemy.getAttackStrength()} damage.`);
    player.displayStats();
    $('#combatAttack').prop('disabled', false);
    $('#combatRun').prop('disabled', false);
    if(player.getCurrentHP <= 0) {
        endCombat("lose", endScreen); //loss
    }
}

function endCombat(outcome, area) {
    if(outcome == "win") {
        // go to next area
        showTextNode(area);
    }
    if(outcome == "lose") {
        // go to death screen
        showTextNode(area);
    }
    if(outcome == "run") {
        // go to prev area
        showTextNode(area);
    }

    $("#enemyContainer").css("display", "none");
    $("#combatMenu").css("display", "none");
    $(".prompt").animate({height: '+=100%'}, 2500);
    $(".combatContainer").animate({height: '-=100%'}, 2500);
}
