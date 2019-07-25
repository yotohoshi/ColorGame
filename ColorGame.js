var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var selectedColor = selectColor();
var colorDisplay = document.querySelector("#colorDisplay");
var message = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");

//initialization
init();
resetButton.addEventListener("click", function () {reset(numSquares);});

function init() {
    selectMode();
    setupSquares();
}

function selectMode() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy"? numSquares = 3 : numSquares = 6;
            reset(numSquares);
        });
    }
}

function setupSquares() {
    //the colorDisplay show display the color should be selected
    colorDisplay.textContent = selectedColor;
    //give squares with random colors
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //get the clicked square's color
            var clickedColor = this.style.background;
            //check if clicked square's color is the same as the correct color
            if(clickedColor === selectedColor) {
                message.textContent = "Correct!";
                changeColors(selectedColor);
                h1.style.background = selectedColor;
                resetButton.textContent = "Play Again?";
            } 
            else {
                message.textContent = "Try Again!";
                this.style.background = "#232323";
            }
        });
    }
}

//change colors to selectedColor if the answer is correct
function changeColors(color) {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

//chose random color from the color array
function selectColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}


function generateRandomColors(num) {
    var arr = [];
    for(var i = 0; i < num; i++) {
        //generate random colors
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        arr.push("rgb(" + red + ", " + green + ", " + blue + ")");
    }
    return arr;
}

function reset(num) {
    colors = generateRandomColors(num);
    selectedColor = selectColor();
    h1.style.background = "steelblue";
    resetButton.textContent = "New Game";
    message.textContent = "";
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else squares[i].style.display = "none";
    }
}
