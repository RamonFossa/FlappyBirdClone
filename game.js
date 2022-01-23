console.log('[Xerlyz] Flappy Bird');

const hitSound = new Audio();
hitSound.src = './SFX/sfx_hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvas.height - 204,

    draw() {
      context.fillStyle = '#70c5ce';
      context.fillRect(0,0, canvas.width, canvas.height)
  
      context.drawImage(
        sprites,
        background.spriteX, background.spriteY,
        background.width, background.height,
        background.x, background.y,
        background.width, background.height,
      );
  
      context.drawImage(
        sprites,
        background.spriteX, background.spriteY,
        background.width, background.height,
        (background.x + background.width), background.y,
        background.width, background.height,
      );
    },
  };

  const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,

    draw() {
      context.drawImage(
        sprites,
        floor.spriteX, floor.spriteY,
        floor.width, floor.height,
        floor.x, floor.y,
        floor.width, floor.height,
      );
  
      context.drawImage(
        sprites,
        floor.spriteX, floor.spriteY,
        floor.width, floor.height,
        (floor.x + floor.width), floor.y,
        floor.width, floor.height,
      );
    },
  };

  function collide(flappyBird, floor) {
        const flappyBirdY = flappyBird.y + flappyBird.height;

        if(flappyBirdY >= floor.y) {
            return true;
        }
        return false;
  }

  function createFlappyBird() {
            
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        width: 33,
        height: 24,
        x: 10,
        y: 50,
        gravity: 0.25,
        velocity: 0,
        flyVelocity: 4.8,

        draw() {
            context.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.width, flappyBird.height,
                flappyBird.x, flappyBird.y,
                flappyBird.width, flappyBird.height
                );
        },

        update() {  
            if(collide(flappyBird, floor)) {
                changeLevel(level.START);
                return;
            } 
            flappyBird.velocity += flappyBird.gravity;
            flappyBird.y += flappyBird.velocity;
        },

        fly() {
            flappyBird.velocity = -flappyBird.flyVelocity;
        }
    }
    return flappyBird;

  }

const messageGetReady = {
    sX: 134,
    sY: 0,
    width: 174,
    height: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    draw(){
        context.drawImage(
            sprites,
            messageGetReady.sX, messageGetReady.sY,
            messageGetReady.width, messageGetReady.height,
            messageGetReady.x, messageGetReady.y,
            messageGetReady.width, messageGetReady.height
        )
    }
}

const globals = {};

let activeLevel = {};
function changeLevel(newLevel) {
    activeLevel = newLevel;
    if(activeLevel.start){        
        activeLevel.start();
    }
}

const level = {
    START: {
        start(){
            globals.flappyBird = createFlappyBird();
        },
        draw() {
            background.draw();
            floor.draw();
            globals.flappyBird.draw();
            messageGetReady.draw();
        },
        update() {

        },
        click(){
            changeLevel(level.GAME);
        }
    },

    GAME: {
        draw() {
            background.draw();
            floor.draw();
            globals.flappyBird.draw();
        },
        update() {            
            globals.flappyBird.update();
        },
        click(){
            globals.flappyBird.fly();
        }
    }
}

function loop() {
    activeLevel.draw();
    activeLevel.update();
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(activeLevel.click) {
        activeLevel.click();
    }
});
changeLevel(level.START);
loop();