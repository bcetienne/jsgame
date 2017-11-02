$(document).ready(function () {
    /**
     * function init
     * description : Checks whether there is an already existing game state in local storage
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
     * function insertObjects
     * description : Displays and determines the locations of game elements such as player, enemies, obstacles,...
     */
    function insertObjects() {
        // If the player has no basic position
        if (localStorage.getItem("playerPos") == null){
            // Player's basic position
            var posPlayer = {
                "x": 1,
                "y": 1
            };
            // JSON file passed in string
            localStorage.setItem("playerPos", JSON.stringify(posPlayer));
        }
        // If the goal has no basic position
        if (localStorage.getItem("goalPos") == null){
            // Goal's position
            var posGoal = {
                "x": JSON.parse(localStorage.getItem("gameAxes")).x,
                "y": JSON.parse(localStorage.getItem("gameAxes")).y
            };
            // JSON file passed in string
            localStorage.setItem("goalPos", JSON.stringify(posGoal));
        }
        // If the enemy has no basic position
        if (localStorage.getItem("enemyPos") == null){
            // Defines the enemy's position randomly
            var posEnemy = {
                "randX" : Math.floor((Math.random() * JSON.parse(localStorage.getItem("gameAxes")).x) + 1),
                "randY" : Math.floor((Math.random() * JSON.parse(localStorage.getItem("gameAxes")).y) + 1)
            };
            // JSON file passed in string
            localStorage.setItem("enemyPos", JSON.stringify(posEnemy));
        }
        var playerPos = JSON.parse(localStorage.getItem("playerPos"));
        var goalPos = JSON.parse(localStorage.getItem("goalPos"));
        // Displays the character
        $(".gameDiv[data-x='" + posPlayer.x + "'][data-y='" + posPlayer.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
        // Displays the goal
        $(".gameDiv[data-x='" + posGoal.x + "'][data-y='" + posGoal.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/door.jpg'>");
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
     * function movePlayer
     * description : Defines the direction in which the character will move
     * @param direction string
     */
    function movePlayer(direction){
        var currentPlayerPos = JSON.parse(localStorage.getItem('playerPos')),
            gameSize = JSON.parse(localStorage.getItem('gameAxes'));
        if (direction === "UP") {
            if ((currentPlayerPos.y - 1) > 0) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.y -= 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkVictory(currentPlayerPos);
                checkDefeat(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
            } else {
                console.warn("Aïe");
            }
        } else if (direction === "DOWN") {
            if ((currentPlayerPos.y + 1) <= gameSize.y) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.y += 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkVictory(currentPlayerPos);
                checkDefeat(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
            } else {
                console.warn("Aïe");
            }
        } else if (direction === "LEFT") {
            if ((currentPlayerPos.x - 1) > 0) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.x -= 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkVictory(currentPlayerPos);
                checkDefeat(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
            } else {
                console.warn("Aïe");
            }
        } else if (direction === "RIGHT") {
            if ((currentPlayerPos.x + 1) <= gameSize.x) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.x += 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkVictory(currentPlayerPos);
                checkDefeat(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
            } else {
                console.warn("Aïe");
            }
        }
    }

    /**
     * function moveEnemy
     * description : Moves the enemy in a random direction
     * @param direction
     */
    function moveEnemy(direction) {
        var arrayDirection = {
            "up" : 38,
            "down" : 40,
            "left" : 37,
            "right" : 39
        },
            randomDirection = arrayDirection[Math.floor(Math.random() * arrayDirection. length)];

        var currentEnemyPos = JSON.parse(localStorage.getItem('enemyPos')),
            gameSize = JSON.parse(localStorage.getItem('gameAxes'));
        if (direction === "UP") {
            if ((currentPlayerPos.y - 1) > 0) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.y -= 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkVictory(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
            } else {
                console.warn("Aïe");
            }
        } else if (direction === "DOWN") {
            if ((currentPlayerPos.y + 1) <= gameSize.y) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.y += 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkVictory(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
            } else {
                console.warn("Aïe");
            }
        } else if (direction === "LEFT") {
            if ((currentPlayerPos.x - 1) > 0) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.x -= 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkVictory(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
            } else {
                console.warn("Aïe");
            }
        } else if (direction === "RIGHT") {
            if ((currentPlayerPos.x + 1) <= gameSize.x) {
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("");
                currentPlayerPos.x += 1;
                $(".gameDiv[data-x='" + currentPlayerPos.x + "'][data-y='" + currentPlayerPos.y + "']").html("<img style='width:100%; height:100%;' src='../imgs/mario-cape.gif'>");
                checkVictory(currentPlayerPos);
                localStorage.setItem("playerPos", JSON.stringify(currentPlayerPos));
            } else {
                console.warn("Aïe");
            }
        }
    }
    
    /**
     * function checkVictory
     * description : Check if the player has reached the goal
     * @param currentPlayerPos
     */
    function checkVictory(currentPlayerPos) {
        var delay = 2500;
        if (currentPlayerPos.x == JSON.parse(localStorage.getItem("goalPos")).x && currentPlayerPos.y == JSON.parse(localStorage.getItem("goalPos")).y) {
            displayScreen("victoryScreen");
            // Returns to options screen after a while
            setTimeout(function () {
                localStorage.clear();
                location.reload();
            }, delay);
        }
    }

    /**
     * function checkDefeat
     * description : Check if the player has arrived on the bad guy
     * @param currentEnemyPos
     */
    function checkDefeat(currentPlayerPos) {
        var delay = 2500;
        if (currentPlayerPos.x == JSON.parse(localStorage.getItem("enemyPos")).randX && currentPlayerPos.y == JSON.parse(localStorage.getItem("enemyPos")).randY) {
            displayScreen("defeatScreen");
            // Returns to options screen after a while
            setTimeout(function () {
                localStorage.clear();
                location.reload();
            }, delay);
        }
    }
    
    /**
     * function generateGame
     * description :
     */
    function generateGame() {
        // Retrieve x and y values
        // JSON parse transforms a JSON text back to object JSON
        var baseX = JSON.parse(localStorage.getItem("gameAxes")).x,
            baseY = JSON.parse(localStorage.getItem("gameAxes")).y,
            gameScreen = $("section[data-state='gameScreen']"),
            html = "<div style='width:" + (baseX * 20) + "px' class='gameContainer'>";
        for (var y = 1; y <= baseX; y++) {
            for (var x = 1; x <= baseY; x++) {
                html += "<div class='gameDiv' data-x='" + x + "' data-y='" + y + "'></div>";
            }
        }
        $(gameScreen).html(html);
        insertObjects();
    }
    
    /**
     * function displayScreen
     * description : Changes the class of an element to display it or not
     * @param gameState string
     */
    function displayScreen(gameState) {
        $.each($("section[data-state!='" + gameState + "']"), function (key, value) {
            $(this).addClass("hidden");
        });
        $("section[data-state='" + gameState + "']").removeClass("hidden");
    }

    /**
     * anonymous function button startGame
     * description : Retrieves the values of x and y by clicking on the startGame button and whether or not to start the game.
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
     * anonymous function button reset
     * description : Emptying local storage
     */
    $("button[data-action='reset']").on("click", function () {
        localStorage.clear();
        location.reload();
    });

    init();
});