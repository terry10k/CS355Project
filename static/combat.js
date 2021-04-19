const textContainer = document.getElementsByClassName('container')[0]
const combatContainer = document.getElementsByClassName('combatContainer')[0]


$(function () {
    $(".container").click(function (){
        $(".prompt").animate({height: '-=90%'}, 2500);
        $(".combatContainer").animate({height: '+=90%'}, 2500);
    })
})
