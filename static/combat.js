const adjectives = ["Eldritch", "Vile", "Vicious", "Seething"];

//

function combat(player, enemy){
        $(".prompt").animate({height: '-=100%'}, 2500);
        $(".combatContainer").animate({height: '+=100%'}, 2500);

        //$('#combatAttack').attr('disabled','disabled');
        //$('#combatRun').attr('disabled','disabled');

        var wolfPic = '<img src="../assets/hell-hound-idle.gif" alt="wolfIdle" />';
        $("#combatEnemy").append(wolfPic);



        battle(player, enemy)
}

function battle(player, enemy) {
        var enemyMaxHP = enemy.getHealth();
        console.log(enemy)

        $("#enemyContainer").css("display", "flex");
        $("#combatMenu").css("display", "flex");
        updateEnemyStats(enemy, enemyMaxHP)
        var prefix = adjectives[Math.floor(Math.random() * adjectives.length)];
        $("#combatPrompt").text(`A ${prefix} ${enemy.getName()} prepares to attack you`);

        var turn = 0;

        $("#combatAttack").click(function() {
                turn = attackEnemy(enemy, enemyMaxHP, turn, player)
        });

        $("#combatRun").click(function () {

            var probability = Math.random() * 100;
            if (probability > 35) {
                endCombat("run");
            }
            else attackPlayer(player,enemy)
        });

}

function attackEnemy(enemy, enemyMaxHP, turn, player){
        enemy.setHealth(enemy.getHealth() - player.getCurrentAttack());
        updateEnemyStats(enemy,enemyMaxHP);
        if (enemy.getHealth() <= 0) {
                enemy.setDeathStatus(true);
                endCombat("win"); //won
        }

        attackPlayer(player,enemy);
}

function updateEnemyStats(enemy, enemyMaxHP) {
        $("#enemyStats").text(`${enemy.getName()}  Health: ${enemy.getHealth()}/${enemyMaxHP}`)
}

function attackPlayer(player, enemy) {
        player.setCurrentHP(player.getCurrentHP() - enemy.getAttackStrength());
        player.displayStats();
        if(player.getCurrentHP <= 0) {
            endCombat("lose"); //loss
        }
}

function endCombat(outcome) {
    if(outcome == "win") {
        // go to next area
        console.log("you have won")
    }
    if(outcome == "lose") {
        // go to death screen
        console.log("you ded son")
    }
    if(outcome == "run") {
        // go to prev area
        console.log("you alive son")
    }

    $("#enemyContainer").css("display", "none");
    $("#combatMenu").css("display", "none");
    $(".prompt").animate({height: '+=100%'}, 2500);
    $(".combatContainer").animate({height: '-=100%'}, 2500);
}
