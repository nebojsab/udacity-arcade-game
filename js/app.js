// Enemies our player must avoid
var Enemy = function (posX, posY, speed) {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    this.startPoint = 0;
    this.x = posX;
    this.y = posY;
    this.speed = 305 * Math.random();
    this.width = 50;
    this.height = 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/fighter.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for
    // all computers.
    if ((this.x + 25) <= 525)
        this.x += this.speed * dt;
    else {
        this.x = this.startPoint * this.speed * dt;
        this.y = Math.floor(Math.random() * 3) * 83 + 60;
    }

    if (this.row == player.row) {
        if (this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.height + this.y > player.y) {
            player.reset(true);
        }

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    // location of the player
    this.x = 100 * 2;
    this.y = 100 * 4.2;
    this.width = 100;
    this.height = 200;

    // avatar of the player
    this.sprite = 'images/millennium-falcon.png';

    //when initializing you specify that input has to be handled
    this.shouldHandleInput = true;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function (state) {
    this.x = 100 * 2;
    this.y = 100 * 4.2;
    if (state) {
        var div = document.getElementById('bb');
        div.innerHTML = div.innerHTML + "<div id='alert'><div class='yodaWrap'><img src='images/yoda.png' width='150' height='auto'></div><div class='yodaTextWrap'><h2>Disturbance in the force I felt.</h2><h3>Try again!</h3></div></div>";

        //disable controls for message display
        this.shouldHandleInput = false;

        //add delay and reset game/screen
        var delay = 3000; //3 seconds
        setTimeout(function () {
            window.location.reload();
        }, delay);

        this.reset(false);
    }
};

Player.prototype.update = function (dt) {

    // Check if player wins
    if (this.y <= 50) {
        var div = document.getElementById('bb');
        div.innerHTML = div.innerHTML + "<div id='alert'><div class='yodaWrap'><img src='images/luke.png' width='100' height='auto'></div><div class='yodaTextWrap'><h2>You Win, the Force is strong with you!</h2><h3>Fight against dark side again!</h3></div></div>";

        //disable controls for message display
        this.shouldHandleInput = false;

        //add delay and reset game/screen
        var delay = 4000; //4 seconds
        setTimeout(function () {
            window.location.reload();
        }, delay);

        this.reset(false);
    }
};

// Player handleInput() method
Player.prototype.handleInput = function (keyCode) {
    //check if we should handle the input
    //tracked by shouldHandleInput
    if (this.shouldHandleInput) {
        //Handle user input
        switch (keyCode) {
            case 'left':
                this.x -= ((this.x - 50) > 0) ? 50 : 0;
                break;
            case 'right':
                this.x += ((this.x + 50) < 305) ? 50 : 0;
                break;
            case 'up':
                this.y -= ((this.y - 50) > 0) ? 50 : 0;
                break;
            case 'down':
                this.y += ((this.y + 50) < 355) ? 50 : 0;
                break;
        }
    } else {
        //do nothing i.e ignoring the user input
        //you can safely remove this empty else block
    }
};
//
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
