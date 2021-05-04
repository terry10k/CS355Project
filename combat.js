const adjectives = ["Eldritch", "Vile", "Vicious", "Seething"];

//

function combat(player, enemy, previousArea, nextArea, endScreen){
        $(".prompt").animate({height: '-=100%'}, 2500);
        $(".combatContainer").animate({height: '+=100%'}, 2500);

        //$('#combatAttack').attr('disabled','disabled');
        //$('#combatRun').attr('disabled','disabled');

        var wolfPic = '<img src="../assets/hell-hound-idle.gif" alt="wolfIdle" />';
        $("#combatEnemy").append(wolfPic);



        battle(player, enemy, previousArea, nextArea, endScreen)
}

function battle(player, enemy, previousArea, nextArea, endScreen) {
        var enemyMaxHP = enemy.getHealth();
        console.log(enemy)

        $("#enemyContainer").css("display", "flex");
        $("#combatMenu").css("display", "flex");
        updateEnemyStats(enemy, enemyMaxHP)
        var prefix = adjectives[Math.floor(Math.random() * adjectives.length)];
        $("#combatPrompt").text(`A ${prefix} ${enemy.getName()} prepares to attack you`);

        var turn = 0;

        $("#combatAttack").click(function() {
                turn = attackEnemy(enemy, enemyMaxHP, turn, player, nextArea)
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
        updateEnemyStats(enemy,enemyMaxHP);
        if (enemy.getHealth() <= 0) {
                enemy.setDeathStatus(true);
                endCombat("win", nextArea); //won
        }

        attackPlayer(player,enemy, endScreen);
}

function updateEnemyStats(enemy, enemyMaxHP) {
        $("#enemyStats").text(`${enemy.getName()}  Health: ${enemy.getHealth()}/${enemyMaxHP}`)
}

function attackPlayer(player, enemy, endScreen) {
        player.setCurrentHP(player.getCurrentHP() - enemy.getAttackStrength());
        player.displayStats();
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
