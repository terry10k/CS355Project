const textContainer = document.getElementsByClassName('container')[0]
const combatContainer = document.getElementsByClassName('combatContainer')[0]

const adjectives = ["Eldritch", "Vile", "Vicious", "Seething"];


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

        /*while (enemy.getDeathStatus() == false) {
                if (turn % 2 == 0) {
                        $('#combatAttack').removeAttr('disabled');
                        $('#combatRun').removeAttr('disabled');

                }
                else if (turn %2 != 0) {
                        $('#combatAttack').attr('disabled','disabled');
                        $('#combatRun').attr('disabled','disabled');
                        attackPlayer(player, enemy)
                        turn++;
                }

        }*/

        console.log("victory")

}

function attackEnemy(enemy, enemyMaxHP, turn, player){
        enemy.setHealth(enemy.getHealth() - player.getCurrentAttack());
        updateEnemyStats(enemy,enemyMaxHP);
        if (enemy.getHealth() <= 0) {
                enemy.setDeathStatus(true);
        }


        console.log(turn);

        return turn + 1;
}

function updateEnemyStats(enemy, enemyMaxHP) {
        $("#enemyStats").text(`${enemy.getName()}  Health: ${enemy.getHealth()}/${enemyMaxHP}`)
}

function attackPlayer(player, enemy) {
        player.setHealth(player.getHealth() - enemy.getAttackStrength());
        player.displayStats();
}
