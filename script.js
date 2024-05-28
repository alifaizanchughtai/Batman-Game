console.log("Batman: Arkham City");

let score = 0;
collide = true;

let gameOverAudio = new Audio('sounds/gameOver.mp3');
gameOverAudio.playbackRate = 1.5;
let backgroundAudio = new Audio('sounds/bg.mp3');
backgroundAudio.playbackRate = 1.65;
backgroundAudio.loop = true;
backgroundAudio.play();


document.onkeydown = function (e) {
    // console.log("KeyCode: ", e.keyCode)
    if (e.keyCode == 38) {
        batman = document.querySelector('.batman');
        batman.classList.add('jumpBatman');
        setTimeout(() => {
            batman.classList.remove('jumpBatman')
        }, 700)
    }

    if (e.keyCode == 39) {
        batman = document.querySelector('.batman');
        batmanX = parseInt(window.getComputedStyle(batman, null).getPropertyValue('left'));
        batman.style.left = (batmanX + 75) + "px";
    }
    if (e.keyCode == 37) {
        batman = document.querySelector('.batman');
        batmanX = parseInt(window.getComputedStyle(batman, null).getPropertyValue('left'));
        batman.style.left = (batmanX - 75) + "px";
    }
}

setInterval(() => {
    batman = document.querySelector('.batman');
    joker = document.querySelector('.joker');
    gameOver = document.querySelector('.gameOver');

    batmanX = parseInt(window.getComputedStyle(batman, null).getPropertyValue('left'));
    batmanY = parseInt(window.getComputedStyle(batman, null).getPropertyValue('top'));

    jokerX = parseInt(window.getComputedStyle(joker, null).getPropertyValue('left'));
    jokerY = parseInt(window.getComputedStyle(joker, null).getPropertyValue('top'));

    differenceX = Math.abs(batmanX - jokerX);
    differenceY = Math.abs(batmanY - jokerY);

    if (differenceX < 100 && differenceY < 100) {
        gameOverAudio.play();
        gameOver.style.visibility = 'visible';
        joker.classList.remove('jokerAnimation');
        backgroundAudio.pause();

    }
    else if (differenceX < 145 && collide) {
        score += 10;
        scoreCont = document.getElementById('scoreCont');
        scoreCont.innerHTML = "Score: " + score;

        // updateScore(score);
        console.log(score);
        collide = false;
        setTimeout(() => {
            collide = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(joker, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.05;
            joker.style.animationDuration = newDur + 's';
            // console.log('New animation duration: ', newDur)
        }, 500);
    }
}, 10)