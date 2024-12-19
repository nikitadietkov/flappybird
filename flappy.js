let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let scored_sound = new Audio();
let fly_audio = new Audio();

let pipeBottom = new Image();
let pipeUp = new Image();
let road = new Image();
let back = new Image();
let bird = new Image();

let pipes = [];
pipes[0] = {
    x: canvas.width,
    y: Math.random() * -118,
    gap: 200,
    spawnDistance: 20,
    speed: 2,
}

let gap = 40;
let Xpos = 20;
let Ypos = 150; 
let Yvel = 0; 
let gravity = 0.2;

let scored = 0;
let best_scored = 0; 
let buttonActive = false;
// let lastSpeed = 0;

scored_sound.src = "./audio/score.mp3";
fly_audio.src = "./audio/fly.mp3";

pipeBottom.src = "img/pipeBottom.png";
pipeUp.src = "img/pipeUp.png";
road.src = "img/road.png";
back.src = "img/back.png";
bird.src = "img/bird.png";


canvas.width = 256;
canvas.height = 512;


canvas.addEventListener('click', moveUp);


function moveUp() {
    Yvel = -4;
    fly_audio.volume = 0.1  
    fly_audio.play();
}


function draw() {
    ctx.drawImage(back, 0, 0);
    ctx.drawImage(road, 0, canvas.height - 118)
    ctx.drawImage(bird, Xpos, Ypos);


    Yvel += gravity;
    Ypos += Yvel;

    
    for (let i = 0; i < pipes.length; i++) {
        if (pipes.length >= 10) {
            pipes.shift();
        } else {
            ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
            ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + pipes[i].gap);

            // function game_pause() {
            //     if (buttonActive) {
            //         pipes[i].speed = 0;
            //         buttonActive = false;
            //     } else {
            //         lastSpeed = pipes[i].speed;
            //         pipes[i].speed = lastSpeed;
            //         buttonActive = true;
            //     }
            // }


            pipes[i].x -= pipes[i].speed;

            if (pipes[i].x == pipes[i].spawnDistance) {
                pipes.push({
                    x: canvas.width,
                    y: Math.random() * -118,
                    gap: pipes[i].gap - (pipes[i].speed + 2),
                    spawnDistance: pipes[i].spawnDistance + (pipes[i].speed),
                    speed: 2,
                });
            }
        }

        

        if (Xpos + bird.width >= pipes[i].x &&
            Xpos <= pipes[i].x + pipeUp.width &&
            (Ypos <= pipes[i].y + pipeUp.height ||
                Ypos + bird.height >= pipes[i].y + pipeUp.height + pipes[i].gap))
            reload();
        {}
        if (pipes[i].x == 0) {
            scored_sound.volume = 0.05;  
            scored_sound.play();
            scored += 1;
            document.getElementById("score").innerHTML = `Score: ${scored}`;
            if (scored >= best_scored) {
                best_scored = scored
                document.getElementById("best_score").innerHTML = `Best Score: ${best_scored}`;
            }
        }
        
    }

    if (Ypos >= canvas.height - road.height - bird.height || Ypos <= 0) {
        reload()
    }

    

}

function reload() {
    Xpos = 10;
    Yvel = 0;
    Ypos = 150;
    pipes = [];
    pipes[0] = {
        x: canvas.width,
        y: Math.random() * -118,
        gap: 200,
        spawnDistance: 20,
        speed: 2,
    }
    scored = 0;
    document.getElementById("score").innerHTML = `Score: ${scored}`;
}


setInterval(draw, 20);