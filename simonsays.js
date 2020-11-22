var correctAnswer = [],
    counter = 1,
    init = false;
logo = document.getElementById("zsl");
s5 = document.querySelector(".s5");

function startG() {
    if (init === false) {
        document.removeEventListener("click", startG);
        levelDisplay(1);
        generateNextLevel();
        init = true;
        startGame();
    }
}

function startGame() {
    var currentLevel = 1,
        counter = 1;
    $(".square").click(function (event) {
        let userAnswer = classNumberCorversion(event.target.className);
        let target = event.target;
        if (target === logo) {
            target = s5
        }
        squarePress(target);
        if (correctAnswer[counter - 1] === userAnswer) {
            if (correctAnswer.length === counter) {
                currentLevel++;
                levelDisplay(currentLevel);
                generateNextLevel();
                counter = 0;
            }
            counter++
        } else {
            $(".announcer").text("You Lost, click anywhere to try again.");
            correctAnswer = [],
                init = false;
            $(".square").off("click");
            setTimeout(() => {
                document.addEventListener("click", startG);
            }, 500);

        }
    })
}

function levelDisplay(level) {
    $(".announcer").text("Level " + level);
}

function playCombination() {
    setTimeout(() => {
        for (let i = 0; i < correctAnswer.length; i++) {
            setTimeout(() => {
                console.log(correctAnswer[i])
                squareHighlight(classNumberCorversion(correctAnswer[i]));
            }, 750 * i);
        }
    }, 1000)
}

function generateNextLevel() {
    let rand = Math.floor(Math.random() * 9);
    correctAnswer.push(rand);
    playCombination();
}

function squarePress(target) {
    let input = target.className.split(" ");
    input = input[0] + " " + input[1];
    target.className = input + " clicked";
    setTimeout(() => {
        target.className = input;
    }, 250);
}

function squareHighlight(target) {
    let input = target.className.split(" ");
    input = input[0] + " " + input[1];
    target.className = input + " highlighted";
    setTimeout(() => {
        target.className = input;
    }, 350);
}

function classNumberCorversion(input) {
    if (input === "zsl") {
        input = "square s5"
    }
    if (typeof (input) === "number") {
        switch (input) {
            case 0:
                return document.querySelector(".s1");
            case 1:
                return document.querySelector(".s2");
            case 2:
                return document.querySelector(".s3");
            case 3:
                return document.querySelector(".s4");
            case 4:
                return document.querySelector(".s5");
            case 5:
                return document.querySelector(".s6");
            case 6:
                return document.querySelector(".s7");
            case 7:
                return document.querySelector(".s8");
            case 8:
                return document.querySelector(".s9");
            default:
                console.error("number conversion error")
        }
    } else {
        input = input.split(" ");
        input = input[0] + " " + input[1];
        switch (input) {
            case "square s1":
                return 0;
            case "square s2":
                return 1;
            case "square s3":
                return 2;
            case "square s4":
                return 3;
            case "square s5":
                return 4;
            case "square s6":
                return 5;
            case "square s7":
                return 6;
            case "square s8":
                return 7;
            case "square s9":
                return 8;
            default:
                console.error("class conversion error")
        }
    }
}
document.addEventListener("click", startG);