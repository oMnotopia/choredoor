//Global Variables
//Vars to get HTML elements
const startButton = document.getElementById('start')
const currentScore = document.getElementById('current-score')
const bestScore = document.getElementById('best-score')
const submitBtn = document.getElementById('btn')
const doorParentID = document.getElementById('door-rows')

//Vars for image paths
const botDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/robot.png"
const beachDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/beach.png"
const spaceDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/space.png"
const closedDoorPath = "file:///C:/Users/persi/JavascriptProjects/CC-ChoreDoor/resources/closed_door.png"

//Vars for javascript interactivity
let numClosedDoors = 0;
let numberOfRobots = 1;
let userInputOfDoors;
let storedUserInputofDoors; 
let currentlyPlaying = false;
let currentWinCounter = 0;
let bestWinCounter = 0;

//Checks to see if the user has opened a door with the robot.
const isBot = door => {
    return (door.src===botDoorPath) ? true:false;
}

//Makes sure each door is only clickable once.
const isClicked = door => {
    return (door.src===closedDoorPath) ? false:true;
}

//reduces numClosedDoors so when it hits 0 there is a winner.
const playDoor = door => {
    numClosedDoors--;
    if(numClosedDoors===0) {
        gameOver('win')
    } else if(isBot(door)===true) {
        gameOver('lose')
    };
}

//Assigns a random image to each door as the door is clicked.
const randomChoreDoorGenerator = () => {
    //If only one door left assign robot
    if ((numberOfRobots===numClosedDoors)&&(numberOfRobots!==0)) {
        return botDoorPath;
    } else { //assign either space door or robot, more doors = lower chance of robot.
        let choreDoor = Math.floor(Math.random()*numClosedDoors);
        if ((choreDoor===1)&&(numberOfRobots!==0)) {
            numberOfRobots--
            return botDoorPath;  
        } else {
            return spaceDoorPath;
        }
    }
}

//Takes user input from submit button and allows for use when game is restarted.
const storedUserInput = (userInputOfDoors) => {
    //Stores value
    if(userInputOfDoors){
        storedUserInputofDoors = userInputOfDoors
    }
    //Retrieves value
    if(!userInputOfDoors){
        return storedUserInputofDoors
    }
}

//Event listener 'click', starts/restarts the game.
startButton.addEventListener('click', () => {
    if(currentlyPlaying===false) startRound();
})


//Event listener 'click' on form button captures user input.
submitBtn.addEventListener('click', ev => {
    if(currentlyPlaying===true) return
    currentlyPlaying=true;
    ev.preventDefault();//stops the form submitting
    
    //Sets variables for parent node and door nodes
    userInputOfDoors = document.getElementById('numOfDoors').value

    //Stores user input in a function for next round
    storedUserInput(userInputOfDoors)

    //Needs to be converted from int to num in order for addition below.
    numClosedDoors = parseInt(numClosedDoors,10)
    userInputOfDoors = parseInt(userInputOfDoors, 10)
    //Numeric values to decide how many loops are needed to complete addition/subtraction of door elements.
    let addOrSubtractDoors = userInputOfDoors-numClosedDoors
    let newDoorID = numClosedDoors+1
    let removeDoorID = Math.abs(numClosedDoors)

    numClosedDoors = userInputOfDoors;

    console.log(addOrSubtractDoors)
    //Determines if doors are going to be added/subtracted/or nothing done.
    if (addOrSubtractDoors===0) return
    //If doors added, create nodes and assign attributes.
    if (addOrSubtractDoors>0) {
        while(addOrSubtractDoors!==0) {

            let newDoor = document.createElement("img")
            let newDoorNumber = doorParentID.appendChild(newDoor)

            newDoorNumber.setAttribute("id", "door"+newDoorID)
            newDoorNumber.setAttribute("class", "door-frame")
            newDoorNumber.setAttribute("src", closedDoorPath)
            newDoorNumber.addEventListener('click', () => {
                if((isClicked(newDoorNumber)===false)&&(currentlyPlaying===true)) {
                    newDoorNumber.src = randomChoreDoorGenerator(addOrSubtractDoors);
                    playDoor(newDoorNumber);     
                }
            })
            //Variables to adjust for loop increase and door class names.
            addOrSubtractDoors--
            newDoorID++;
        }
    //If doors removed, remove nodes.    
    } else {
        console.log(addOrSubtractDoors)
        while(addOrSubtractDoors!==0) {

            let removeDoor = document.getElementById("door"+removeDoorID)
            console.log(removeDoorID)

            addOrSubtractDoors++
            removeDoorID--
        }  
    }
})

//Restarts the game based off previous input value the user supplied.
const startRound = () => {
    //Reset necessary values for new start to game.
    startButton.innerHTML = 'Good Luck!'
    currentlyPlaying = true;
    numberOfRobots = 1;
    numClosedDoors = storedUserInput()//Gets stored input.

    //Getting door image nodes and turning them into an array for manipulation.
    let childOfDoors = doorParentID.childNodes;
    let ChildOfDoorsArray = Array.from(childOfDoors)
    //Resets doors to blank and reassigns event listeners based off previous number of doors.
    ChildOfDoorsArray.forEach(element => {
        element.setAttribute("src", closedDoorPath) 
        element.addEventListener('click', () => {
            if((isClicked(element)===false)&&(currentlyPlaying===true)) {
               element.src = randomChoreDoorGenerator(addOrSubtractDoors);
                playDoor(element);     
            }
        })  
    })
}

//Called when lose or win condition from playDoor() is met.
const gameOver = status => {
    //Changes the score counters based off win or lose.
    if(status==='win') {
        currentWinCounter++;
        if(currentWinCounter>bestWinCounter){
            bestWinCounter=currentWinCounter;
        }
        bestScore.innerHTML = bestWinCounter;
        currentScore.innerHTML = currentWinCounter;
        startButton.innerHTML = 'You win! Play again?'
    }else if(status==='lose'){
        currentWinCounter = 0;
        currentScore.innerHTML = currentWinCounter;
        startButton.innerHTML = 'You Lose! Play again?'
    }
    currentlyPlaying = false; //reset playing to false
}


