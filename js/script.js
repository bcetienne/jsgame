$(document).ready(function () {
    //TODO : Add a scoring system with pieces that appear, normal pieces increment the score by 1 and glitch pieces remove 1 point.
    //TODO : Linking the portfolio to the game through Konami Code
    //TODO : Correct the problem of poor game board display.
    //TODO : Optimize the code.

    /**
     * Checks whether there is an already existing game state in local storage
     */
    function init() {
        // If there is no value in the local storage then the options screen is displayed.
        if (localStorage.getItem("gameState") == null) {
            localStorage.setItem("gameState", "optionScreen");
            displayScreen(localStorage.getItem("gameState"));
        } else {
            // If the game already exists, reload it
            if (localStorage.getItem("gameState") === "gameScreen"){
                generateGame();
            }
            displayScreen(localStorage.getItem("gameState"));
        }
    }

    /**
     * Displays and determines the locations of game elements such as player, enemies, obstacles,...
     */
    function insertObjects() {
        // Player's basic position
        var posPlayer = {
            "x": 1,
            "y": 1
        };
        // Defines the enemy's position randomly
        var posEnemy = {
            "randX" : getRandNumber(JSON.parse(localStorage.getItem("gameAxes")).x, 1),
            "randY" : getRandNumber(JSON.parse(localStorage.getItem("gameAxes")).y, 1)
        };
        // Goal's position
        var posGoal = {
            "x": JSON.parse(localStorage.getItem("gameAxes")).x,
            "y": JSON.parse(localStorage.getItem("gameAxes")).y
        };

        // If the player has no basic position
        if (localStorage.getItem("playerPos") == null){
            // JSON file passed in string
            localStorage.setItem("playerPos", JSON.stringify(posPlayer));
        }
        // If the goal has no basic position
        if (localStorage.getItem("goalPos") == null){
            // JSON file passed in string
            localStorage.setItem("goalPos", JSON.stringify(posGoal));
        }
        // If the enemy has no basic position
        if (localStorage.getItem("enemyPos") == null){
            // JSON file passed in string
            localStorage.setItem("enemyPos", JSON.stringify(posEnemy));
        }
        // If the enemy appears on the hero
        if (localStorage.getItem("enemyPos") == localStorage.getItem("playerPos")){
            //JSON file passed in string
            localStorage.setItem("enemyPos", JSON.stringify(posEnemy));
        }
        // Displays the character
        $(".gameDiv[data-x='" + posPlayer.x + "'][data-y='" + posPlayer.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
        // Displays the goal
        $(".gameDiv[data-x='" + posGoal.x + "'][data-y='" + posGoal.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/door.gif'>");
        //Displays the enemy
        $(".gameDiv[data-x='" + posEnemy.randX + "'][data-y='" + posEnemy.randY + "']").html("<img style='width:100%; height:100%;' src='../imgs/adolf.gif'>");
        // Moving the character
        $("body").on("keydown", function (e) {
            // Up key
            if (e.keyCode == 38) {
                movePlayer("UP");
                moveEnemy();
                // Down key
            } else if (e.keyCode == 40) {
                movePlayer("DOWN");
                moveEnemy();
                // Left key
            } else if (e.keyCode == 37) {
                movePlayer("LEFT");
                moveEnemy();
                // Right key
            } else if (e.keyCode == 39) {
                movePlayer("RIGHT");
                moveEnemy();
            }
        });
    }

    /**
     * Generate the game and place the game elements
     */
    function generateGame() {
        // Retrieve x and y values
        // JSON parse transforms a JSON text back to object JSON
        var baseX = JSON.parse(localStorage.getItem("gameAxes")).x,
            baseY = JSON.parse(localStorage.getItem("gameAxes")).y,
            gameScreen = $("section[data-state='gameScreen']"),
            html = "<div style='width:" + (baseX * 42) + "px' class='gameContainer'>";
        for (var y = 1; y <= baseX; y++) {
            for (var x = 1; x <= baseY; x++) {
                html += "<div class='gameDiv' data-x='" + x + "' data-y='" + y + "'></div>";
            }
        }
        $(gameScreen).html(html);
        insertObjects();
    }

    /**
     * Defines the direction in which the character will move
     * @param {String} direction - Direction in the form of string
     */
    function movePlayer(direction){
        var currentPlayerPos = JSON.parse(localStorage.getItem('playerPos')),
            gameSize = JSON.parse(localStorage.getItem('gameAxes'));
        if (direction === "UP") {
            if ((currentPlayerPos.y - 1) > 0) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.y -= 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkDefeat(currentPlayerPos);
                checkVictory(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
                checkDefeat(currentPlayerPos);
            }
        } else if (direction === "DOWN") {
            if ((currentPlayerPos.y + 1) <= gameSize.y) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.y += 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkDefeat(currentPlayerPos);
                checkVictory(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
                checkDefeat(currentPlayerPos);
            }
        } else if (direction === "LEFT") {
            if ((currentPlayerPos.x - 1) > 0) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.x -= 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkDefeat(currentPlayerPos);
                checkVictory(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
                checkDefeat(currentPlayerPos);
            }
        } else if (direction === "RIGHT") {
            if ((currentPlayerPos.x + 1) <= gameSize.x) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.x += 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkDefeat(currentPlayerPos);
                checkVictory(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
                checkDefeat(currentPlayerPos);
            }
        }
        checkDefeat(currentPlayerPos);
        moveEnemy();
        checkDefeat(currentPlayerPos);
    }

    /**
     * Moves the enemy in random directions
     */
    function moveEnemy() {
        var currentEnemyPos = JSON.parse(localStorage.getItem("enemyPos")),
            gameSize = JSON.parse(localStorage.getItem('gameAxes'));

        if (getRandNumber(2, 1) == 1) {
            if (getRandNumber(2, 1) == 1) {
                // Moves up
                if ((currentEnemyPos.randY - 1) > 0) {
                    $(".gameDiv[data-x='" + currentEnemyPos.randX + "'][data-y='" + currentEnemyPos.randY + "']").html("");
                    currentEnemyPos.randY -= 1;
                    $(".gameDiv[data-x='" + currentEnemyPos.randX + "'][data-y='" + currentEnemyPos.randY + "']").html("<img style='width:100%; height:100%;' src='../imgs/adolf.gif'>");
                    localStorage.setItem("enemyPos", JSON.stringify(currentEnemyPos));
                }
            } else {
                // Moves down
                if ((currentEnemyPos.randY + 1) <= gameSize.y) {
                    $(".gameDiv[data-x='" + currentEnemyPos.randX + "'][data-y='" + currentEnemyPos.randY + "']").html("");
                    currentEnemyPos.randY += 1;
                    $(".gameDiv[data-x='" + currentEnemyPos.randX + "'][data-y='" + currentEnemyPos.randY + "']").html("<img style='width:100%; height:100%;' src='../imgs/adolf.gif'>");
                    localStorage.setItem("enemyPos", JSON.stringify(currentEnemyPos));
                }
            }
        } else {
            if (getRandNumber(2, 1) == 1) {
                // Moves right
                if ((currentEnemyPos.randX + 1) <= gameSize.x) {
                    $(".gameDiv[data-x='" + currentEnemyPos.randX + "'][data-y='" + currentEnemyPos.randY + "']").html("");
                    currentEnemyPos.randX += 1;
                    $(".gameDiv[data-x='" + currentEnemyPos.randX + "'][data-y='" + currentEnemyPos.randY + "']").html("<img style='width:100%; height:100%;' src='../imgs/adolf.gif'>");
                    localStorage.setItem("enemyPos", JSON.stringify(currentEnemyPos));
                }
            } else {
                // Moves left
                if ((currentEnemyPos.randX - 1) > 0) {
                    $(".gameDiv[data-x='" + currentEnemyPos.randX + "'][data-y='" + currentEnemyPos.randY + "']").html("");
                    currentEnemyPos.randX -= 1;
                    $(".gameDiv[data-x='" + currentEnemyPos.randX + "'][data-y='" + currentEnemyPos.randY + "']").html("<img style='width:100%; height:100%;' src='../imgs/adolf.gif'>");
                    localStorage.setItem("enemyPos", JSON.stringify(currentEnemyPos));
                }
            }
        }
    }

    /**
     * Check if the player has reached the goal
     * @param {String} currentPlayerPos - Defines the player's position
     */
    function checkVictory(currentPlayerPos) {
        if (currentPlayerPos.x == JSON.parse(localStorage.getItem("goalPos")).x && currentPlayerPos.y == JSON.parse(localStorage.getItem("goalPos")).y) {
            displayScreen("victoryScreen");
            returnHomeScreen(2500);
        }
    }

    /**
     * Check if the player has arrived on the bad guy
     * @param {String} currentPlayerPos - Defines the player's position
     */
    function checkDefeat(currentPlayerPos) {
        if (currentPlayerPos.x == JSON.parse(localStorage.getItem("enemyPos")).randX && currentPlayerPos.y == JSON.parse(localStorage.getItem("enemyPos")).randY) {
            displayScreen("defeatScreen");
            returnHomeScreen(2500);
        }
    }

    /**
     * Changes the class of an element to display it or not
     * @param {String} gameState - Window's state
     */
    function displayScreen(gameState) {
        $.each($("section[data-state!='" + gameState + "']"), function (key, value) {
            $(this).addClass("hidden");
        });
        $("section[data-state='" + gameState + "']").removeClass("hidden");
    }

    /**
     * Returns to the home screen after a set time by deleting the local storage.
     * @param {Number} delay The time for the message to be displayed
     */
    function returnHomeScreen(delay) {
        setTimeout(function () {
            eraseLocalStorage();
        }, delay);
    }

    /**
     * Returns a random number by entering a minimum and maximum value in parameters
     * @param {Number} max - The maximum of random numbers
     * @param {Number} min - The minimum of random numbers
     * @returns {number}
     */
    function getRandNumber(max, min) {
        return Math.floor((Math.random() * max) + min)
    }

    /**
     * Erase local storage and reloads the page
     */
    function eraseLocalStorage() {
        localStorage.clear();
        location.reload();
    }

    /**
     * Retrieves the values of x and y by clicking on the startGame button and whether or not to start the game.
     */
    $("button[data-action='startGame']").on("click", function () {
        var baseX = $("input[name='x']").val(),
            baseY = $("input[name='y']").val();

        // Test if values are indicated
        if (baseX === "" || baseY === "") {
            alert("Error values X or Y");
            // If values are indicated, the code is launched
        } else {
            // Create a JSON object with axes
            var axes = {
                "x": baseX,
                "y": baseY
            };
            // Takes a JSON object and returns a string
            localStorage.setItem("gameAxes", JSON.stringify(axes));
            // Change the local storage of the options page by the game page
            localStorage.setItem("gameState", "gameScreen");
            // Loads game generation
            generateGame();
            // Displays the game screen
            displayScreen(localStorage.getItem("gameState"));
        }
    });

    /**
     * Emptying local storage
     */
    $("button[data-action='reset']").on("click", function () {
        eraseLocalStorage();
    });
    init();
});
