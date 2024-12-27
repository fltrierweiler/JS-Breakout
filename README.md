# JS Breakout
#### Video Demo:  [Youtube Video](https://youtu.be/AOI4Xenb45Q)
#### Description:
This is a small project inspired by [this](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript), created to be the final project for CS50x 2024.

The project consists of a simple Breakout game designed to showcase the capabilities of web development using just HTML, CSS and vanilla JavaScript.

#### CSS
The project contains only one `.css` file, the stylesheet for all pages (`styles.css`). It sets a monospace font for the body, centers elements like canvas and sections, and applies consistent padding and margins. Sections have a shadowed border, and headers are fixed at the top with a dark background. Links are styled in green, changing to light green with underlining on hover. Input text fields have a green border and light green text on a dark background. The canvas element has a dark background and rounded edges, while utility classes like `.sideBySideItem` and `.sectionContainer` help with spacing and alignment. 

#### HTML
The project contains three different `.html` files: `index.html`,`breakout.html` and `about.html`, each representing a page.

The `index` page shows a short description of the project, as well as my name and my GitHub and edX profile username (as requested by CS50x). It also shows the current date.

The `breakout` page is where the fun happens. That's where the game is displayed through a `<canvas>` element, which interacts with the `breakout.js` script. There are two html buttons inside the canvas: the player can choose between playing with the mouse or with the arrow keys. The script is set to listen for button clicks. If either button is pressed, then both buttons' display is set to "None" and the game starts accordingly.

Finally, the `about` page contains some information about the project's creator, such as experience & education, skills & strengths, hobbies, as well as contact information. For styling, the information is displayed using bootstrap's `accordion`.

#### JavaScript
In the `scripts` folder, there's a fille called `breakout.js`. That's the heart of the project, responsible for the client-side interactivity that makes the game playable.

The player can choose from playing with the mouse or with the arrow keys. Depending on the user's choice, the script adds an Event Listener to the desired controls. The script is divided between multiple functions that are responsible for different parts of the game:
* `drawPaddle()`, as the name suggests, is responsible for drawing the paddle into the canvas;
* `drawBall()` draws the ball;
*  `drawBricks()` draws every brick of each level;
* `drawScoreAndLevel()` shows the current score and level at the top of the screen;
* `collisionDetection()` is responsible for determining what happens when the ball hits a brick. If the brick is too strong, then some of its strength is depleted; if it's weak, then it's broken and a point is scored. If there are no bricks left, then the player has to go to the next level. If there are no more levels, then the game has to end;
* `initializeBricks()` is responsible for determining how many bricks are going to appear for each stage and how strong they should be;
* `promptNextLevel()` clears the canvas, shows a message with the current score and, after three seconds, sends the player to the next part of the game;
* `showSuccess()` is responsible for showing the current score of the player at the end of each level;
* `goToNextLevel()` clears the canvas and draws the next level;
* `draw()` is responsible for calling each key function of the game, such as `drawPaddle()`, `drawBall()`, `drawBricks()` and `collisionDetection()`;
* `endGame()` is responsible for showing the end game screen, be if a failure or a success;
* `showResult()` shows the final message to the player, game over or game completed;
* `startGame()` hides the buttons for control choice and then starts the game;
* `playWithKeyboard()` and `playWithMouse()` are responsible for adding the EventListener to the desired controls;
* `keyDownHandler(e)`, `keyUpHandler(e)` and `mouseMoveHandler(e)` set the logic for following the paddle's momentum.

The game mechanics are simple: move left or right to control the paddle. The objective is to bounce the ball until all bricks are cleared. The ball changes direction depending on the movement of the paddle.

Each time a brick is broken, the score goes up one point. If all bricks of a level are cleared, the player moves on to the next stage. As the game progresses, it gets harder and harder: the ball gets smaller and faster, the rows of bricks increase and the bricks get stronger as well. If the player makes to the tenth level and beats it, he's rewarded with a winning screen. Otherwise, there's a game over screen that shows the player's score. Either way, the game is reset.

Have fun!
